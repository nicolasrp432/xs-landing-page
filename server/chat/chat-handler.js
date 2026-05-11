import { CONTENT } from '../../src/data/content.js';

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

export async function handleChatMessage(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
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
  return data.choices[0].message.content;
}
