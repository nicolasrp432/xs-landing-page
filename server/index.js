import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createCheckoutSession } from './stripe/create-checkout-session.js';
import { handleWebhook } from './stripe/webhook.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Webhook must come before express.json() if we want raw body, 
// or we use express.raw({type: 'application/json'}) for this specific route.
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const result = await handleWebhook(req.body, sig);
    res.json(result);
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { planId } = req.body;
    const session = await createCheckoutSession(planId);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
