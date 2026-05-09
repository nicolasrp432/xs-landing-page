# Stripe Local Development Workflow

To test the payment flow locally, follow these steps:

## 1. Prerequisites

- Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
- Log in to your Stripe account: `stripe login`.

## 2. Running the Backend

Start the backend server:
```bash
node server/index.js
```
The server runs on port 3001.

## 3. Webhook Forwarding

To receive webhooks on your local machine, run:
```bash
stripe listen --forward-to localhost:3001/api/stripe-webhook
```
Stripe will provide a **Webhook Secret** (starts with `whsec_`). 
Copy this secret and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`.

## 4. Environment Variables

Ensure your `.env` has:
- `STRIPE_SECRET_KEY`: Your Stripe secret key.
- `STRIPE_WEBHOOK_SECRET`: The secret from `stripe listen`.
- `STRIPE_PRICE_ID_STARTER`: The price ID for the Starter Pack.
- `STRIPE_PRICE_ID_PRO`: The price ID for the Pro Pack.
- `APP_URL`: `http://localhost:5173` (your Vite dev server).
- `ORDER_NOTIFICATION_EMAIL`: Where you want to receive order emails.
- `MAIL_PROVIDER_API_KEY`: API key for Resend/other.
- `MAIL_FROM_EMAIL`: Authorized sender email.

## 5. Testing Payments

Use [Stripe Test Cards](https://stripe.com/docs/testing) to simulate successful payments.
Common test card: `4242 4242 4242 4242`.

## 6. Verifying Orders

- Orders are saved to `server/data/orders.json`.
- Processed events are tracked in `server/data/processed-events.json`.
- Notification emails are sent via the configured provider.
