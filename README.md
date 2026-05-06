# kaushik.murali — Portfolio

Personal portfolio site. Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion.

## Development

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
npm run lint       # ESLint (zero warnings enforced)
npm run format     # Prettier
```

## Deploy

### Vercel (recommended)
1. Push to GitHub
2. Import project at vercel.com
3. Framework: Vite — Vercel detects this automatically
4. Build command: `npm run build` · Output: `dist`
5. Done — `vercel.json` handles SPA routing and security headers

### Netlify
1. Push to GitHub, import on Netlify
2. Build command: `npm run build` · Publish: `dist`
3. Add a `_redirects` file in `public/`: `/* /index.html 200`

### GitHub Pages
1. Install: `npm i -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Set `base: '/repo-name/'` in `vite.config.ts`
4. Run `npm run build && npm run deploy`

## Customisation

**Colors** — edit CSS variables in `src/index.css` and the `colors` block in `tailwind.config.ts`.

**Copy & content** — all project/experience data lives in `src/data/`. No copy is hardcoded across multiple files; update once in data files and everything re-renders.

**Pricing data** — update model prices in `src/data/pricing.ts` as API pricing changes.

**Fonts** — swap the Google Fonts imports in `index.html` and update `--font-*` variables in `index.css`.
