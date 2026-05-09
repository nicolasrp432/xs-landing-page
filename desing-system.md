# ⚡ Design System: XS™ Wild Berry - Premium Edition

## 1. Fundamentos de Diseño (Tokens / Átomos)

La base visual de la interfaz. Diseñada para un entorno *Dark Mode* que resalta la energía del producto y le otorga un estatus premium y misterioso.

### 1.1. Paleta de Color

**Colores de Marca (Brand Colors)**
* **Primary Purple (Baya Silvestre):** `#5D2B9C` — Color principal de la marca. Usado para fondos secundarios y elementos de gran peso.
* **Neon Magenta (Energía XS):** `#FF007F` — Color de acento hiper-visible. Usado para CTA (Call to Action) principales y destacados.
* **Electric Cyan (Contraste):** `#00F0FF` — Usado sutilmente para detalles tecnológicos o líneas de separación.

**Colores Neutros (Fondo y Texto)**
* **Deep Void (Fondo Principal):** `#0A0A0C` — Negro absoluto con un levísimo tinte púrpura. Da profundidad.
* **Dark Glass (Superficies/Cards):** `#16161A` — Gris muy oscuro para crear niveles de elevación.
* **Pure White (Texto Principal):** `#FFFFFF` — Para titulares y legibilidad máxima.
* **Silver Ash (Texto Secundario):** `#A1A1AA` — Para párrafos descriptivos y detalles nutricionales.

**Colores Semánticos**
* **Success (Verde Flúor):** `#39FF14` — Para confirmaciones de compra o stock disponible.
* **Error (Rojo Alerta):** `#FF3333` — Para mensajes de error en formularios.

### 1.2. Tipografía

Basada en un contraste entre impacto visual (cinético) y legibilidad clínica para los datos nutricionales.

* **Tipografía Primaria (Headings & Display):** `Montserrat` (Pesos: ExtraBold 800, Black 900, Italic).
    * *Uso:* Titulares de la Hero Section, ganchos de venta, números grandes (Ej: "0g Azúcar").
    * *Estilo:* Siempre en MAYÚSCULAS y con un ligero *letter-spacing* (-1px) para dar sensación de bloque sólido.
* **Tipografía Secundaria (Body & UI):** `Inter` (Pesos: Regular 400, Medium 500, SemiBold 600).
    * *Uso:* Párrafos explicativos, botones, tablas nutricionales, menú de navegación.
    * *Estilo:* Limpia, geométrica, perfecta legibilidad en pantallas pequeñas.

### 1.3. Espaciado y Layout (Grid System)

Sistema estricto basado en **múltiplos de 8px** para mantener consistencia y ritmo vertical.

* **Micro (Componentes internos):** 4px, 8px.
* **Base (Márgenes de elementos):** 16px, 24px.
* **Macro (Separación de secciones):** 48px, 64px, 96px, 128px.
* **Grid General:** 12 columnas (Desktop), 6 columnas (Tablet), 4 columnas (Mobile). *Gutter* de 24px.

### 1.4. Iconografía
* **Estilo:** Lineal, grosor de 2px, bordes ligeramente redondeados.
* **Color por defecto:** `Pure White` o `Neon Magenta` cuando están activos.
* **Regla:** Minimalismo total. Nada de iconos complejos; deben parecer trazados por láser.

---

## 2. Componentes UI (Moléculas y Organismos)

### 2.1. Botones (Buttons)

**Primary Button (Comprar Ahora)**
* **Fondo:** `Neon Magenta` (#FF007F)
* **Texto:** `Pure White` (#FFFFFF), `Inter SemiBold`, 16px, Todo Mayúsculas.
* **Borde:** Ninguno, pero incluye un *Outer Glow* (Sombra paralela: `0px 4px 20px rgba(255, 0, 127, 0.4)`).
* **Border-Radius:** 4px (Ligeramente cuadrado para un look agresivo/deportivo).

**Secondary Button (Ver Detalles)**
* **Fondo:** Transparente.
* **Texto:** `Pure White` (#FFFFFF).
* **Borde:** 2px sólido `Primary Purple` (#5D2B9C).
* **Border-Radius:** 4px.

### 2.2. Tarjetas (Cards - Bento UI)

Usadas para mostrar los beneficios y componentes del producto.

* **Estilo "Dark Glassmorphism":**
    * Fondo: `rgba(22, 22, 26, 0.7)` (Dark Glass con 70% opacidad).
    * Borde: 1px sólido `rgba(255, 255, 255, 0.05)` con un gradiente tenue púrpura en la esquina superior izquierda.
    * *Backdrop-filter:* Blur(12px) para distorsionar ligeramente el fondo de bayas/neón que haya detrás.
    * *Border-Radius:* 16px.
    * Padding interno: 32px.

### 2.3. Tabla Nutricional (Data Display)

* **Contenedor:** Fondo `Dark Glass`, borde sin esquinas redondeadas.
* **Filas:** Separadas por una línea de 1px `rgba(255, 255, 255, 0.1)`.
* **Tipografía:** Valores destacados (ej: "0g", "120%") en `Pure White SemiBold`. Conceptos en `Silver Ash Regular`.

---

## 3. Patrones de Interacción (States & Motion)

El comportamiento de la interfaz debe sentirse rápido, responsivo y fluido (como la energía que aporta la bebida).

* **Hover en Botón Primario:** El botón se escala a `1.05x`. El *Outer Glow* se intensifica al doble de su tamaño (`0px 8px 30px rgba(255, 0, 127, 0.6)`). Duración de la transición: `0.2s Ease-in-out`.
* **Hover en Bento Cards:** Ligero efecto de elevación (Translación Y: `-5px`) y el borde superior se ilumina en `Neon Magenta`.
* **Carga de Imágenes (Lazy Load):** Revelación con efecto *Fade-in* + leve movimiento de abajo hacia arriba.
* **Scroll:** Uso de *Parallax* muy sutil en las imágenes de las latas de XS para que parezca que flotan sobre el fondo.

---

## 4. Guías de Uso y Voz de Marca (Documentation)

### 4.1. Tono de Voz
* **Directo y al grano:** Sin textos de relleno. Los usuarios de XS tienen un estilo de vida ajetreado.
* **Energético y Empoderador:** Hablar de rendimiento, enfoque, éxito y vitalidad.
* **Transparente:** Destacar orgullosamente el "0% Azúcar" y las "Vitaminas B". No ocultar la información nutricional.

### 4.2. Reglas Estrictas (Do's and Don'ts)
* ✅ **DO:** Usar siempre fotografías de alta resolución de las latas con efecto de condensación (gotas de agua) para que luzcan refrescantes.
* ✅ **DO:** Mantener alto contraste visual. El texto blanco siempre debe ir sobre fondo negro o gris muy oscuro.
* ❌ **DON'T:** No usar fondos blancos o grises claros. Rompe la estética premium y nocturna del producto.
* ❌ **DON'T:** No centrar grandes bloques de texto. Alinear a la izquierda para mejor escaneabilidad (excepto en titulares Hero muy cortos).