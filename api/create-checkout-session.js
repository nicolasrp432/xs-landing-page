import { createCheckoutSession } from '../server/stripe/create-checkout-session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { planId } = req.body;
    const session = await createCheckoutSession(planId);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Vercel API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
