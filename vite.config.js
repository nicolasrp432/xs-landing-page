import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { AgentClient } from '@21st-sdk/node'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.API_KEY_21ST
  const openrouterApiKey = env.OPENROUTER_API_KEY

  function agentTokenPlugin() {
    return {
      name: 'agent-token',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/an-token' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => {
              body += chunk.toString()
            })
            req.on('end', async () => {
              try {
                const { agent } = JSON.parse(body || '{}')
                const client = new AgentClient({ apiKey })
                const response = await client.tokens.create({ agent: agent || 'my-agent' })
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(response))
              } catch (e) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: e.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  }

  function chatApiPlugin() {
    const SYSTEM_PROMPT = `Eres el asistente virtual de XS Energy Drink. Tu objetivo es responder preguntas sobre el producto de forma breve, directa y persuasiva.

REGLAS IMPORTANTES:
- Respuestas MÁXIMO 2-3 frases cortas
- Sé conciso y ve al grano
- Usa un tono energético pero profesional
- Si no sabes algo, sugiere contactar al equipo de soporte
- Siempre intenta guiar hacia la compra cuando sea apropiado

INFORMACIÓN DEL PRODUCTO:
- 0g de azúcar añadido, Solo 10 calorías por lata
- Cafeína natural para energía sostenida (sin nerviosismo)
- Vitaminas del grupo B (B12 al 120%, ácido pantoténico)

SABORES: Jengibre y Maracuyá, Naranja, Baya Silvestre, Pomelo Rosa, Manzana Verde, Lima-Limón, Lima-Naranja

PACKS:
- Pack Descubrimiento: 12 Latas, ideal para probar
- Pro Pack Mensual: 36 Latas, ahorro 20%, envío gratis 24-48h

GARANTÍAS: 30 días devolución, Envío 24-48h (Pro Pack), Pago seguro Stripe

Recuerda: respuestas cortas, directas y enfocadas en el valor del producto.`

    return {
      name: 'chat-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => {
              body += chunk.toString()
            })
            req.on('end', async () => {
              try {
                if (!openrouterApiKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'OPENROUTER_API_KEY not configured' }))
                  return
                }

                const { messages } = JSON.parse(body || '{}')
                
                if (!messages || !Array.isArray(messages)) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Messages array required' }))
                  return
                }

                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${openrouterApiKey}`,
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
                })

                if (!response.ok) {
                  const error = await response.text()
                  throw new Error(`OpenRouter API error: ${error}`)
                }

                const data = await response.json()
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ content: data.choices[0].message.content }))
              } catch (e) {
                console.error('Chat error:', e)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: e.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  }

  return {
    plugins: [react(), agentTokenPlugin(), chatApiPlugin()],
    server: {
      proxy: {
        '/api/create-checkout-session': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/api/stripe-webhook': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    }
  }
})
