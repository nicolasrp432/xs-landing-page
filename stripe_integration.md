# Arquitectura de Integración con Stripe

Para cumplir con los objetivos de conversión directa de la Landing Page de XS, se ha optado por el siguiente modelo de integración con Stripe:

## 1. Flujo Elegido: Stripe Payment Links (con opción a Checkout Sessions)
**Decisión:** Utilizaremos **Stripe Payment Links** para la versión inicial (MVP), ya que permite venta directa sin necesidad de un backend complejo. A futuro, o si se requiere control total del inventario/carrito, se migrará a **Stripe Checkout Sessions** mediante funciones serverless (Cloudflare Workers o Vercel Functions).

## 2. Flujo del Usuario (Checkout, Success, Cancel)
1. **Inicio:** El usuario hace clic en un CTA ("Comprar Ahora" o "Adquirir Unidad").
2. **Checkout:** Se redirige a una URL segura alojada por Stripe (Payment Link).
3. **Success:** Una vez completado el pago, Stripe redirige al usuario de vuelta a `misitio.com/success` pasando el `session_id`.
4. **Cancel:** Si el usuario retrocede o cancela, se redirige a `misitio.com/cancel`.

## 3. Webhooks y Estado de Compra
Dado que la aplicación actual es estática (Vite), la gestión de Webhooks (`checkout.session.completed`) requiere un endpoint backend.
- **Implementación:** Se deberá configurar un endpoint (ej. en Netlify Functions, Vercel o un worker) que escuche los eventos de Stripe.
- **Acción:** Al recibir un webhook exitoso, se actualizará el estado de la compra en la base de datos (si la hubiera) o se enviará un email de confirmación mediante un servicio de terceros (Resend/SendGrid).

## 4. Tracking de Eventos (Analytics)
Se ha añadido una capa base para el seguimiento de eventos clave:
- `track_cta_click`: Disparado al presionar cualquier botón comercial.
- `track_checkout_start`: Disparado justo antes de la redirección a Stripe.
- `track_purchase_success`: Disparado cuando el usuario aterriza en la página de éxito.

*Nota: En esta Fase 2, el flujo está simulado en el frontend de Vite para validar la experiencia de usuario (UX) de punta a punta.*
