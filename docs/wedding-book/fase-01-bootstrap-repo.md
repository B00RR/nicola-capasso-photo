# Fase 1 — Bootstrap repo

⏱ **2 giorni** · ⛓ Fase 0 · ⚪ **stato: todo**

## Obiettivo

Repo Vite+React+TS funzionante, deployato in CI su GitHub Pages, con tooling identico al portfolio.

## Task

- **1.1** `npm create vite@latest` → scegli `React + TypeScript + SWC`. Init repo, primo commit.
- **1.2** Aggiungere dipendenze runtime: `react-router-dom`, `@supabase/supabase-js`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `sonner`, `zod`, `@fontsource/cormorant-garamond`, `@fontsource/inter`.
- **1.3** Aggiungere dipendenze dev: `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.
- **1.4** Configurare Tailwind (`tailwind.config.ts` clone da portfolio adattato), PostCSS, base CSS con font self-hosted.
- **1.5** Configurare TypeScript (strict, paths con `@/*` su `./src`).
- **1.6** Configurare ESLint + Prettier (clonando le regole del portfolio).
- **1.7** Configurare Vitest con `jsdom` (clonando da portfolio).
- **1.8** `vite.config.ts`: `base: "/"` (perché useremo subdomain custom), HMR, alias `@/`.
- **1.9** Creare la prima pagina `App.tsx` minimale con un "Hello world" + `<BrowserRouter>`.
- **1.10** Creare `public/CNAME` con `book.nicolacapassophoto.com`.
- **1.11** Creare `.github/workflows/deploy.yml`: trigger su push main, build, upload, deploy a `gh-pages`. Clonare dal portfolio e adattare.
- **1.12** Creare `.github/workflows/test.yml`: lint + test + typecheck su PR.
- **1.13** Creare `public/_redirects` (formato Cloudflare/Netlify per il futuro):

  ```
  /*    /index.html   200
  ```

  E un `404.html` SPA-redirect per GitHub Pages (clonato dal portfolio).
- **1.14** Aggiungere `.env.example` con `VITE_SUPABASE_URL=` e `VITE_SUPABASE_ANON_KEY=`.
- **1.15** Push, verificare deploy GitHub Actions.
- **1.16** Verificare che `book.nicolacapassophoto.com` mostri "Hello world".

## Output

Repo deployato e funzionante con uno schermo bianco e un titolo.

## ✅ Definition of Done

Apri il sottodominio dal cellulare in 4G e vedi la pagina < 2 secondi.

## 💡 Miglioramenti suggeriti

- Aggiungi a questa fase il setup di un `Lighthouse CI` clonato dal portfolio (gate su PR). Investimento 30 minuti, garantisce che la performance non degradi mai.
- Includi `CHANGELOG.md` versionato dalla Fase 1: ogni release un'entry. Aiuta a comunicare a Nicola cosa è cambiato.
