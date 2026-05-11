export const CONTENT = {
  hero: {
    badge: "+10,000 Atletas lo toman",
    titleWords: [
      { text: "TU ENERGÍA.", style: "", delay: "0.1s" },
      { text: "SIN LÍMITES.", style: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500", delay: "0.2s", paddingBottom: "10px" },
      { text: "SIN AZÚCAR.", style: "text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] via-[#00f0ff] to-[#39ff14]", delay: "0.3s" }
    ],
    description: "Wild Berry Blast. El sabor intenso que tu rutina exige, con vitamina B para combatir la fatiga. Siente el impulso al instante.",
    guarantees: ["Garantía 30 Días", "Envío 24H"]
  },
  features: {
    badge: "Últimas unidades en stock",
    title: { line1: "Sabor", line2: "Impactante" },
    description: "Una explosión de frutos del bosque que despierta tus sentidos. Todo el poder y la intensidad que buscas, sin los temidos bajones de azúcar.",
    stats: [
      { value: "0g", label: "Azúcar Añadido", color: "pink" },
      { value: "10", label: "Calorías (Kcal)", color: "purple" }
    ]
  },
  vitamins: {
    badge: "002 / Vitamina B Power",
    title: { line1: "Mantén tu", line2: "Ritmo" },
    subtitle: "Enfrenta tu día con claridad y sin excusas.",
    cards: [
      { percentage: 120, label: "Vitamina B12", description: "Contribuye a reducir el cansancio y la fatiga diaria.*", color: "cyan" },
      { icon: "Zap", label: "Ácido Pantoténico", description: "Apoya el rendimiento intelectual normal.*", color: "purple" }
    ],
    disclaimer: "*Declaraciones de propiedades saludables aprobadas."
  },
  comparison: {
    badge: "003 / Fórmula Superior",
    title: { line1: "Por qué", line2: "superamos", line3: "al resto" },
    rows: [
      { icon: "Zap", name: "Cafeína", xs: "Energía Sostenida", rest: "Nerviosismo" },
      { icon: "Shield", name: "Azúcar", xs: "0g (Sin Picos)", rest: "Hasta 27g" },
      { icon: "null", name: "Calorías", xs: "10 kcal", rest: "110+ kcal" }
    ]
  },
  faq: {
    badge: "004 / FAQ",
    title: "Preguntas Frecuentes",
    items: [
      { q: "¿Cuánto tarda el envío?", a: "Nuestros envíos prioritarios (incluidos en el Pro Pack) tardan entre 24 y 48 horas laborables. Para el resto de pedidos, el plazo es de 3 a 5 días." },
      { q: "¿Tiene efectos secundarios?", a: "No. Al no contener azúcares añadidos ni taurina sintética, XS proporciona energía limpia sin \"bajones\" repentinos ni temblores. Solo vitaminas y cafeína equilibrada." },
      { q: "¿Cómo funciona la garantía de 30 días?", a: "Si después de probar tu primera caja de XS no notas un incremento claro en tu rendimiento o energía, contáctanos y te devolveremos el 100% de tu dinero. Sin preguntas." }
    ]
  },
  flavors: {
    badge: "005 / Sabores",
    title: { line1: "Explora los", line2: "sabores" },
    subtitle: "Cada sabor mantiene el estilo XS y cubre un momento distinto: energía, pre-entreno o rehidratación.",
    items: [
      {
        name: "Jengibre y Maracuyá",
        tag: "Power Drink +",
        description: "Perfil vibrante, especiado y tropical. Ideal cuando quieres una sensación más intensa y un sabor con carácter.",
        note: "Pensado para quienes buscan una energía con presencia y un acabado más exótico."
      },
      {
        name: "Naranja",
        tag: "Orange Kumquat Blast",
        description: "Una mezcla cítrica y luminosa con una salida fresca. Muy fácil de beber durante la rutina diaria.",
        note: "Sabor limpio, brillante y con un punto dulce-acidulado muy equilibrado."
      },
      {
        name: "Baya Silvestre",
        tag: "Wild Berry Blast",
        description: "El sabor más clásico de la línea XS: afrutado, potente y directo. Mantiene el estilo que ya define la marca.",
        note: "Es el sabor de referencia para el Pack Descubrimiento y el Pro Pack."
      },
      {
        name: "Pomelo Rosa",
        tag: "Pink Grapefruit Blast",
        description: "Cítrico, elegante y con un toque más seco. Aporta variedad para quien prefiere sabores menos dulces.",
        note: "Buena opción para consumo frecuente con una sensación más adulta y fresca."
      },
      {
        name: "Manzana Verde",
        tag: "Green Apple Blast",
        description: "Fresco, afilado y ligero. Un perfil muy fácil de integrar si quieres algo distinto a los cítricos clásicos.",
        note: "Ideal para quienes prefieren una entrada más verde y refrescante."
      },
      {
        name: "Lima-Limón",
        tag: "Bebida Pre-Entrenamiento",
        description: "Pensado para activarte antes de entrenar. Sabor cítrico y directo con sensación deportiva y funcional.",
        note: "La opción más orientada a rendimiento y uso pre-workout."
      },
      {
        name: "Lima-Naranja",
        tag: "Bebida Rehidratante",
        description: "Una combinación fresca para recuperar sensaciones tras el esfuerzo. Ligera, clara y fácil de tomar.",
        note: "Encaja muy bien en momentos de rehidratación y recuperación."
      }
    ]
  },
  pricing: {
    badge: "Decisión Sin Riesgo",
    title: { line1: "ASEGURA TU", line2: "RENDIMIENTO" },
    subtitle: "Únete a más de 10,000 personas que ya han dado el salto. Garantía de devolución de 30 días.",
    plans: [
      {
        id: "starter_pack",
        name: "Pack Descubrimiento",
        quantity: "1 Caja",
        description: "12 Latas de Wild Berry Blast",
        features: ["Ideal para probar el impacto XS", "2 semanas de energía táctica"],
        cta: "Adquirir Unidad",
        stripePriceId: "price_1TVDqiEwYxThilPskHNTNxzI"
      },
      {
        id: "pro_pack",
        name: "Pro Pack Mensual",
        isPopular: true,
        quantity: "3 Cajas",
        price: "90€",
        description: "36 Latas · El hábito de los campeones",
        features: ["Ahorro garantizado del 20%", "Envío Gratuito Incluido", "Entrega Prioritaria (24/48h)"],
        cta: "Comprar Pro Pack",
        ctaVariantB: "Suscribirme al Pro Pack",
        stripePriceId: "price_1TVDqiEwYxThilPsx3cjzrEX"
      }
    ],
    trustBadges: ["Pago Seguro Stripe", "Envíos Globales", "Garantía de Calidad"]
  }
};
