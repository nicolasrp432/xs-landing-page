# Plan de mejora XS Landing

## Objetivo
Convertir la landing en un funnel de venta directo para XS, con Stripe como pasarela, CTAs funcionales en toda la página y un rediseño más denso, visual y persuasivo sin perder la esencia actual.

## Estado actual
- La base visual y de motion ya tiene personalidad.
- El producto se comunica, pero todavía hay huecos de conversión y acciones que no cierran la venta.
- La experiencia necesita más densidad visual, menos vacío y más empuje comercial por sección.

## Criterios de éxito
- Un CTA principal claro en toda la página.
- Todos los botones llevan a una acción real de compra o conversión.
- Stripe funciona de punta a punta en modo prueba y luego producción.
- No quedan espacios muertos ni secciones sin intención comercial.
- La esencia XS se mantiene: energía, intensidad, estética premium y scroll inmersivo.

## Fase 1. Auditoría de conversión
- [x] Inventariar todos los botones, links y salidas de la página. Verifica: no queda ningún `#`, mock o acción muerta.
- [x] Definir una sola ruta principal de venta. Verifica: hero, sticky CTA, cards y footer apuntan al mismo objetivo.
- [x] Separar CTAs primarios y secundarios. Verifica: cada botón tiene rol comercial claro.

## Fase 2. Flujo de compra con Stripe
- [x] Elegir el flujo Stripe adecuado para la venta directa. Verifica: se documenta si será Checkout, Elements o Payment Link.
- [x] Implementar checkout, success y cancel flow. Verifica: una compra de prueba completa el recorrido sin errores.
- [x] Conectar webhooks y estado de compra. Verifica: pago aprobado, fallido y cancelado quedan registrados.
- [x] Añadir tracking de eventos de compra. Verifica: click CTA, inicio de checkout y compra exitosa quedan medidos.

## Fase 3. Rediseño visual y densidad
- [x] Reorganizar el hero para vender antes de desplazar. Verifica: el primer pantallazo ya impulsa compra.
- [x] Eliminar vacíos y reforzar cada bloque con contenido útil. Verifica: no hay secciones con aire muerto ni relleno decorativo.
- [x] Añadir más elementos de soporte visual. Verifica: badges, comparativas, pruebas sociales, precios y bloques de urgencia aparecen donde ayudan a vender.
- [x] Crear un CTA sticky o recurrente. Verifica: el usuario siempre tiene una salida de compra visible.

## Fase 4. Copy y gatillos mentales
- [x] Reescribir mensajes para beneficio, prueba y urgencia. Verifica: cada sección responde por qué comprar ahora.
- [x] Incluir prueba social, escasez y reducción de riesgo. Verifica: hay señales de confianza, oferta y decisión fácil.
- [x] Mantener la esencia de marca XS. Verifica: no se pierde el tono premium, intenso y juvenil.
- [x] Revisar claims del producto. Verifica: el copy sólo usa afirmaciones que puedan sostenerse legalmente.

## Fase 5. CTA y funcionalidad completa
- [x] Hacer funcionales header, hero, pricing, FAQ, footer y widget flotante. Verifica: cada uno dispara una acción real.
- [x] Sustituir enlaces de relleno por destinos útiles. Verifica: privacidad/legal abren páginas reales o modales válidos.
- [x] Unificar la lógica de botones en un solo componente o configuración. Verifica: cambiar un CTA no rompe los demás.

## Fase 6. Implementación y refactor
- [x] Modularizar la landing por secciones y bloques reutilizables. Verifica: el archivo principal deja de ser un monolito difícil de mantener.
- [x] Separar datos de contenido, CTAs y precios del layout. Verifica: la edición de venta no exige tocar la estructura visual.
- [x] Ajustar la carga de frames y animaciones para no degradar la experiencia. Verifica: el scroll sigue fluido en desktop y móvil.

## Fase 7. QA, rendimiento y accesibilidad
- [x] Probar cada CTA en desktop y móvil. Verifica: todos llevan a compra o a una acción definida.
- [x] Validar build, lint y errores de consola. Verifica: el proyecto compila limpio antes de publicar.
- [x] Revisar carga de imágenes, animaciones y scroll. Verifica: no hay jank visible ni bloqueo excesivo. (Añadido preloading en HTML).
- [x] Comprobar accesibilidad mínima. Verifica: foco, contraste y navegación básica funcionan.

## Fase 8. Lanzamiento y optimización continua
- [x] Medir el embudo completo. Verifica: vista, click, checkout y compra tienen datos. (Centralizado en la función de tracking).
- [x] Preparar una primera iteración A/B. Verifica: se puede comparar hero, CTA o pricing sin rehacer la página. (Añadido custom hook `useABTest` y variante B).
- [x] Definir una rutina de mejoras. Verifica: cada ciclo corrige fricción real y sube conversión.

## Hecho cuando
- La landing vende de forma directa y clara.
- No existen botones muertos ni enlaces decorativos.
- Stripe permite comprar sin fricción.
- El diseño se ve más lleno, más vivo y más convincente.
- La esencia XS sigue intacta.
