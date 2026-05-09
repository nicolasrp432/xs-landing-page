# AGENTS.md

## Project State
- Single-page Vite + React landing page for XS Power Drink.
- Works: `npm run dev`, `npm run build`, `npm run lint`, scroll animation stack, and the 192-frame sequence in `public/frames/`.
- Watchouts: `README.md` is still template text, there is no test or typecheck script, and `src/FloatingAgent.jsx` is a local mock rather than a live 21st SDK chat flow.

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Repo Map
- `src/main.jsx`: React bootstrap.
- `src/App.jsx`: hero, scroll sections, canvas rendering, GSAP + Lenis choreography.
- `src/FloatingAgent.jsx`: floating chat widget mock.
- `agents/my-agent/index.ts`: sample 21st SDK agent.
- `vite.config.js`: dev-only `/api/an-token` middleware.

## Gotchas
- `API_KEY_21ST` is required for `/api/an-token`; the route only exists in the Vite dev server.
- Keep `scroll-container`, `.scroll-section`, `.s-elem`, and `data-enter`/`data-leave` aligned with the animation code.
- If the frame sequence changes, update both `public/frames/frame_####.webp` and `FRAME_COUNT` in `src/App.jsx`.

## Quality Gates
- Run `npm run lint` before `npm run build`.
- There is no configured test runner or typecheck step in `package.json`.
- Trust `package.json`, `vite.config.js`, and source files over the template README when docs conflict.

## Commit Attribution
- AI commits must include a `Co-Authored-By` trailer.
