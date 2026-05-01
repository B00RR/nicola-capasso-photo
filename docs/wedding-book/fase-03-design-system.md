# Fase 3 — Design system & client Supabase

⏱ **2 giorni** · ⛓ Fase 1 · ⚪ **stato: todo**

## Obiettivo

Infrastruttura comune (UI primitives + accesso dati) prima delle pagine.

## Task

- **3.1** Creare `src/lib/supabase.ts` che esporta il singleton `createClient(...)` con `persistSession: true`.
- **3.2** Creare `src/lib/types.ts` con i tipi delle tabelle (può essere generato con `supabase gen types typescript --linked > src/lib/database.types.ts`).
- **3.3** Creare `src/lib/auth.ts`: hook `useAuth()` che espone `user`, `role`, `signInAnonymously()`, `signInAdmin(email,pwd)`, `signOut()`.
- **3.4** Creare componenti UI primitives clonati dal portfolio: `Button`, `Input`, `Textarea`, `Card`, `Modal`, `Toast`, `Tabs`, `Switch`, `Toggle`. Stessa estetica, stessi token Tailwind.
- **3.5** Creare `src/components/PictureImg.tsx` (lo stesso del portfolio: WebP/AVIF source set).
- **3.6** Creare `src/components/Layout.tsx` (wrapper minimo: header + main + toaster).
- **3.7** Creare `src/components/SkeletonCard.tsx` per loading states.
- **3.8** Creare `src/lib/storage-paths.ts`: helper per generare path coerenti (`coverPath(weddingId)`, `mediaPath(weddingId, contributionId, ext)`, `thumbPath(...)`, `proPath(...)`).
- **3.9** Creare `src/lib/compression.ts`: wrapper attorno a `browser-image-compression` con preset (`compressContributionPhoto`, `compressCoverPhoto`).
- **3.10** Creare `src/lib/fingerprint.ts`: device fingerprint leggero (canvas + UA hash). 30-50 righe.
- **3.11** Aggiungere i font self-hosted (clone da portfolio) e definire i token Tailwind `font-serif` / `font-sans-tight`.
- **3.12** Tema base: palette monocromatica + accento oro `#c9a96e`. Variabili CSS in `index.css`.
- **3.13** Test di base per `Button`, `compression.ts`, `fingerprint.ts`.

## Output

Una pagina demo `/dev/components` (gated dietro un env var `VITE_DEV_MODE=true`) che mostra tutti i componenti UI uno sotto l'altro per verifica visiva.

## ✅ Definition of Done

La pagina demo è bella e coerente con il portfolio, i tipi compilano, i test passano.
