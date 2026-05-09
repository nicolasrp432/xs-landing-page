import { handleWebhook } from '../server/stripe/webhook.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  
  try {
    const rawBody = await getRawBody(req);
    const result = await handleWebhook(rawBody, sig);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Vercel Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
