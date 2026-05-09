# Stripe Checkout Email Automation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a secure Stripe payment flow to the XS landing page that creates checkout sessions, confirms payments via webhook, and emails the owner with buyer and shipping details.

**Architecture:** Keep the current Vite/React landing page intact and add a minimal backend layer for payment creation and webhook handling. Use Stripe Checkout for PCI-safe card handling, a webhook to confirm paid orders, and a mail provider to notify the owner with the order and contact/shipping data.

**Tech Stack:** Vite, React 19, Stripe Checkout, Stripe webhooks, Node serverless API or dev middleware, email provider (Resend/Postmark/SendGrid), optional database for order records.

---

## Context

- Current repo is a single-page Vite + React landing page.
- `PricingSection.jsx` already sends `onCTA('checkout', ...)`.
- `App.jsx` currently only logs checkout intent and redirects success/cancel pages.
- There is no real payment backend yet.
- The fastest safe path is Stripe Checkout + webhook + notification email.

## Target Flow

1. User clicks a pricing CTA.
2. Frontend requests a Stripe Checkout Session from the backend.
3. Stripe Checkout collects payment and shipping/contact data.
4. Stripe sends a webhook when payment succeeds.
5. Webhook verifies signature, stores the order, and sends an email notification.
6. Frontend shows success/cancel pages as post-checkout destinations only.

## Non-Goals

- Do not build a custom card form.
- Do not store raw card data.
- Do not treat the frontend success page as payment confirmation.
- Do not add a large backend framework unless needed for deployment.

## Required Environment Variables

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_STARTER`
- `STRIPE_PRICE_ID_PRO`
- `APP_URL`
- `ORDER_NOTIFICATION_EMAIL`
- `MAIL_PROVIDER_API_KEY`
- `MAIL_FROM_EMAIL`

## Implementation Tasks

### Task 1: Define the payment data contract

**Files:**
- Modify: `src/data/content.js`
- Modify: `src/components/PricingSection.jsx`
- Modify: `src/App.jsx`

**Step 1: Write the failing test or assertion path**

- No test runner exists yet, so verify by tracing the checkout CTA and confirming it lacks a backend session call.

**Step 2: Implement the minimal contract**

- Add plan metadata for Stripe price IDs.
- Ensure each CTA knows which Stripe product/price it maps to.
- Keep the existing CTA visuals and labels unchanged.

**Step 3: Verify**

- Run: `npm run lint`
- Expected: passes

### Task 2: Add a minimal Stripe session creation endpoint

**Files:**
- Create: `server/stripe/create-checkout-session.js`
- Create: `server/stripe/stripe-client.js`
- Create: `server/index.js`
- Modify: `vite.config.js`

**Step 1: Write the failing test or assertion path**

- Confirm there is currently no API route that returns a Stripe Checkout Session URL.

**Step 2: Implement the minimal endpoint**

- Add a server entry that reads `STRIPE_SECRET_KEY`.
- Expose `POST /api/create-checkout-session`.
- Accept `planId` and create a Stripe Checkout Session in payment mode.
- Set `success_url` and `cancel_url` to the existing site routes.
- Enable `shipping_address_collection` if shipping is required.
- Request email collection through Checkout.

**Step 3: Verify**

- Run: `node server/index.js` or the chosen dev server command.
- Expected: endpoint returns a session or a meaningful error when env vars are missing.

### Task 3: Wire the frontend checkout CTA to the backend

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/PricingSection.jsx`

**Step 1: Write the failing test or assertion path**

- Confirm `handleCTA('checkout')` currently only logs and does not call the backend.

**Step 2: Implement the minimal client change**

- Replace the console-only branch with a `fetch('/api/create-checkout-session')` call.
- Pass the selected `planId`.
- Redirect the browser to `session.url`.
- Preserve the existing tracking event.

**Step 3: Verify**

- Run: `npm run lint`
- Expected: passes

### Task 4: Add Stripe webhook handling

**Files:**
- Create: `server/stripe/webhook.js`
- Modify: `server/index.js`

**Step 1: Write the failing test or assertion path**

- Confirm there is currently no webhook endpoint.

**Step 2: Implement the minimal webhook**

- Add `POST /api/stripe-webhook`.
- Preserve raw body before parsing.
- Verify signature with `STRIPE_WEBHOOK_SECRET`.
- Handle at least `checkout.session.completed`.
- Re-fetch payment/session details from Stripe before trusting data.
- Make the handler idempotent with event ID checks.

**Step 3: Verify**

- Run: local webhook test using Stripe CLI.
- Expected: valid events are accepted once, invalid signatures are rejected.

### Task 5: Persist order information

**Files:**
- Create: `server/storage/orders.js`
- Create: `server/storage/processed-events.js`
- Optional create: `db/schema.sql`

**Step 1: Write the failing test or assertion path**

- Confirm webhook processing does not yet store order records.

**Step 2: Implement the minimal storage**

- Store order ID, payment intent ID, customer email, name, phone, shipping address, amount, currency, plan, and timestamps.
- Store processed Stripe event IDs for idempotency.
- Use SQLite, Postgres, Supabase, or Neon if you want a real record system.

**Step 3: Verify**

- Run the webhook once and confirm one order record is written.

### Task 6: Send owner notification emails

**Files:**
- Create: `server/email/send-order-email.js`
- Create: `server/email/email-client.js`

**Step 1: Write the failing test or assertion path**

- Confirm order completion does not yet send email.

**Step 2: Implement the minimal email notification**

- Send a structured email to `ORDER_NOTIFICATION_EMAIL`.
- Include buyer info, shipping info, plan, amount, and Stripe IDs.
- Keep the subject short and operational.

**Step 3: Verify**

- Trigger a test payment in Stripe test mode.
- Expected: one notification arrives with the order payload.

### Task 7: Add customer-facing confirmation

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Modals.jsx` if needed

**Step 1: Write the failing test or assertion path**

- Confirm success page currently only shows generic text.

**Step 2: Implement the minimal improvement**

- Show a simple order confirmation message on `/success`.
- Optionally read session details from a safe backend endpoint.

**Step 3: Verify**

- Run: `npm run build`
- Expected: passes

### Task 8: Add Stripe CLI + local development workflow

**Files:**
- Create: `docs/stripe-dev.md`
- Optional modify: `package.json`

**Step 1: Write the failing test or assertion path**

- Confirm there is no documented local Stripe flow.

**Step 2: Document the setup**

- Explain how to run Stripe CLI forwarding.
- Document test card numbers.
- Document webhook forwarding command.

**Step 3: Verify**

- Run the documented command sequence locally.

## Verification Checklist

- Checkout button opens real Stripe Checkout.
- Payment success triggers webhook once.
- Webhook stores the order.
- Owner receives an email with contact and shipping details.
- Test mode and live mode are separated.
- No raw card data is handled by your app.
- `npm run lint` passes.
- `npm run build` passes.

## Recommended Execution Order

1. Build the session endpoint.
2. Connect the CTA.
3. Add the webhook.
4. Add order storage.
5. Add email notifications.
6. Test locally with Stripe CLI.
7. Move to production keys.

## Notes

- If you want the fastest deployment path, use a small Node server or serverless functions.
- If you want the simplest ops path, add Supabase or Neon for order records and Resend for email.
- If you want, the next step is to turn this plan into actual code changes.
