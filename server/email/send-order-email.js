import resend from './email-client.js';
import dotenv from 'dotenv';

dotenv.config();

export async function sendOrderNotification(orderData) {
  const { 
    orderId, 
    customerEmail, 
    customerName, 
    customerPhone, 
    shippingAddress, 
    amount, 
    currency, 
    plan 
  } = orderData;

  const toEmail = process.env.ORDER_NOTIFICATION_EMAIL;
  const fromEmail = process.env.MAIL_FROM_EMAIL || 'orders@xs-energy.com';

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `Nuevo Pedido XS: ${plan} - ${customerName}`,
    html: `
      <h1>¡Nuevo pedido recibido!</h1>
      <p><strong>Plan:</strong> ${plan}</p>
      <p><strong>Importe:</strong> ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</p>
      <hr />
      <h3>Datos del Cliente:</h3>
      <p><strong>Nombre:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Teléfono:</strong> ${customerPhone || 'No proporcionado'}</p>
      <hr />
      <h3>Dirección de Envío:</h3>
      <p>${shippingAddress.line1}</p>
      ${shippingAddress.line2 ? `<p>${shippingAddress.line2}</p>` : ''}
      <p>${shippingAddress.postal_code} ${shippingAddress.city}</p>
      <p>${shippingAddress.state ? shippingAddress.state + ', ' : ''}${shippingAddress.country}</p>
      <hr />
      <p>ID de Sesión: ${orderId}</p>
    `,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw error;
  }

  return data;
}
