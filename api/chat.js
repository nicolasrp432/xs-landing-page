const CONTENT = {
  flavors: {
    items: [
      { name: "Jengibre y Maracuyá", tag: "Power Drink +", description: "Perfil vibrante, especiado y tropical." },
      { name: "Naranja", tag: "Orange Kumquat Blast", description: "Una mezcla cítrica y luminosa." },
      { name: "Baya Silvestre", tag: "Wild Berry Blast", description: "Afrutado, potente y directo." },
      { name: "Pomelo Rosa", tag: "Pink Grapefruit Blast", description: "Cítrico, elegante y con un toque seco." },
      { name: "Manzana Verde", tag: "Green Apple Blast", description: "Fresco, afilado y ligero." },
      { name: "Lima-Limón", tag: "Bebida Pre-Entrenamiento", description: "Pensado para activarte antes de entrenar." },
      { name: "Lima-Naranja", tag: "Bebida Rehidratante", description: "Combinación fresca para recuperación." }
    ]
  },
  pricing: {
    plans: [
      { name: "Pack Descubrimiento", description: "12 Latas de Wild Berry Blast", features: ["Ideal para probar el impacto XS", "2 semanas de energía táctica"] },
      { name: "Pro Pack Mensual", description: "36 Latas · El hábito de los campeones", features: ["Ahorro garantizado del 20%", "Envío Gratuito Incluido", "Entrega Prioritaria (24/48h)"] }
    ]
  },
  faq: {
    items: [
      { q: "¿Cuánto tarda el envío?", a: "Envíos prioritarios (Pro Pack) en 24-48h. Resto de pedidos en 3-5 días." },
      { q: "¿Tiene efectos secundarios?", a: "No. Sin azúcares añadidos ni taurina sintética, energía limpia sin bajones." },
      { q: "¿Cómo funciona la garantía?", a: "30 días de garantía. Si no notas mejora, devolución del 100%." }
    ]
  }
};

const SYSTEM_PROMPT = `Eres el asistente virtual de XS Energy Drink. Tu objetivo es responder preguntas sobre el producto de forma breve, directa y persuasiva.

REGLAS IMPORTANTES:
- Respuestas MÁXIMO 2-3 frases cortas
- Sé conciso y ve al grano
- Usa un tono energético pero profesional
- Si no sabes algo, sugiere contactar al equipo de soporte
- Siempre intenta guiar hacia la compra cuando sea apropiado

INFORMACIÓN DEL PRODUCTO:

CARACTERÍSTICAS PRINCIPALES:
- 0g de azúcar añadido
- Solo 10 calorías por lata
- Cafeína natural para energía sostenida (sin nerviosismo)
- Vitaminas del grupo B (B12 al 120%, ácido pantoténico)
- Sin bajones de azúcar

SABORES DISPONIBLES:
${CONTENT.flavors.items.map(f => `- ${f.name} (${f.tag}): ${f.description}`).join('\n')}

PACKS Y PRECIOS:
${CONTENT.pricing.plans.map(p => `- ${p.name}: ${p.description}. ${p.features.join(', ')}`).join('\n')}

BENEFICIOS VS COMPETENCIA:
- Cafeína: Energía sostenida (vs nerviosismo de otros)
- Azúcar: 0g sin picos (vs hasta 27g en otros)
- Calorías: 10 kcal (vs 110+ kcal en otros)

GARANTÍAS:
- Garantía de devolución de 30 días
- Envío en 24-48h (Pro Pack)
- Pago seguro con Stripe

FAQ:
${CONTENT.faq.items.map(f => `P: ${f.q}\nR: ${f.a}`).join('\n\n')}

Recuerda: respuestas cortas, directas y enfocadas en el valor del producto.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://xs-energy.com',
        'X-Title': 'XS Energy Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-8b-instruct:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    res.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message });
  }
}
