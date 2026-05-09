import stripe from './stripe-client.js';
import dotenv from 'dotenv';
import { saveOrder } from '../storage/orders.js';
import { isEventProcessed, markEventProcessed } from '../storage/processed-events.js';
import { sendOrderNotification } from '../email/send-order-email.js';

dotenv.config();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function handleWebhook(payload, sig) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // Idempotency check
  if (await isEventProcessed(event.id)) {
    console.log(`Event ${event.id} already processed.`);
    return { status: 'already_processed' };
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`Checkout Session completed for ${session.id}`);
      
      // Fetch the full session to get line items and customer details if needed
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'payment_intent'],
      });

      const orderData = {
        orderId: fullSession.id,
        paymentIntentId: fullSession.payment_intent?.id,
        customerEmail: fullSession.customer_details?.email,
        customerName: fullSession.customer_details?.name,
        customerPhone: fullSession.customer_details?.phone,
        shippingAddress: fullSession.shipping_details?.address,
        amount: fullSession.amount_total,
        currency: fullSession.currency,
        plan: fullSession.line_items?.data[0]?.description,
      };

      await saveOrder(orderData);
      await markEventProcessed(event.id);
      
      try {
        await sendOrderNotification(orderData);
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
      
      return { status: 'success', orderId: orderData.orderId };
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
      return { status: 'unhandled' };
  }
}
