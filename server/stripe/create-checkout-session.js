import stripe from './stripe-client.js';
import dotenv from 'dotenv';

dotenv.config();

const appUrl = process.env.APP_URL || 'http://localhost:5173';

const priceMap = {
  'starter_pack': process.env.STRIPE_PRICE_ID_STARTER,
  'pro_pack': process.env.STRIPE_PRICE_ID_PRO,
};

export async function createCheckoutSession(planId) {
  const priceId = priceMap[planId];
  
  if (!priceId) {
    throw new Error(`Invalid plan ID: ${planId}`);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cancel`,
    shipping_address_collection: {
      allowed_countries: ['ES', 'US', 'GB'], // Adjust as needed
    },
    phone_number_collection: {
      enabled: true,
    },
  });

  return session;
}
