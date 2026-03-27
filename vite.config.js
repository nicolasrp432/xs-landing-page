import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { AgentClient } from '@21st-sdk/node'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.API_KEY_21ST

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

  return {
    plugins: [react(), agentTokenPlugin()],
  }
})
