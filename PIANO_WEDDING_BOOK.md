# Piano di implementazione — Wedding Book

Piano operativo end-to-end per la nuova funzionalità del sito di Nicola Capasso: un **libro digitale collaborativo** dove gli invitati di un matrimonio possono lasciare foto, brevi video e messaggi per gli sposi, intrecciati poi con le foto professionali di Nicola.

Il piano è strutturato in 4 livelli:

1. **Decisioni preliminari** — cose da chiarire prima di toccare il computer.
2. **Materiali da raccogliere** — input che servono dal cliente.
3. **Le 14 fasi tecniche** — dal repo vuoto al primo matrimonio reale.
4. **Milestone gates** — punti di verifica e rilascio.

---

## Indice

- [Sezione A — Decisioni preliminari](#sezione-a--decisioni-preliminari)
- [Sezione B — Materiali da raccogliere](#sezione-b--materiali-da-raccogliere)
- [Sezione C — Le 14 fasi tecniche](#sezione-c--le-14-fasi-tecniche)
- [Sezione D — Milestone gates](#sezione-d--milestone-gates)
- [Sezione E — Timeline & risorse](#sezione-e--timeline--risorse)
- [Sezione F — Rischi da monitorare](#sezione-f--rischi-da-monitorare)
- [Sezione G — Dipendenze umane](#sezione-g--dipendenze-umane)
- [Sezione H — Note finali](#sezione-h--note-finali)

---

## Sezione A — Decisioni preliminari

Prima di iniziare, vanno congelate queste scelte. Per ognuna è proposto un **default** ragionevole.

| #   | Decisione                                | Default proposto                                                                |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| A1  | Nome del prodotto e dominio              | `book.nicolacapassophoto.com` (working name "Il Libro del Matrimonio")          |
| A2  | Provider DNS                             | Cloudflare DNS gratuito (anche se il dominio è registrato altrove)              |
| A3  | Repo: account                            | stesso account `b00rr` (coerente con il portfolio)                              |
| A4  | Repo: nome                               | `nicola-capasso-wedding-book`                                                   |
| A5  | Repo: visibilità                         | privata fino al go-live, poi pubblica (mostra il lavoro nel portfolio)          |
| A6  | Lingua app v1                            | solo italiano                                                                   |
| A7  | Tono e brand                             | stessa tipografia (Cormorant Garamond + Inter) e palette del sito principale, accento `#c9a96e` |
| A8  | Account Supabase                         | nuovo progetto dedicato `nc-wedding-book`                                       |
| A9  | Region Supabase                          | EU Central (Francoforte) — vicinanza fisica + minor latenza per ospiti italiani + coerenza GDPR |
| A10 | Versione del testo dei consensi          | `v1.0-2026-04` (data di partenza, mai modificare retroattivamente)              |
| A11 | Retention default                        | book navigabile 12 mesi post-evento, poi archivio metadata permanente, media già cancellati prima |
| A12 | Numero massimo foto/ospite               | 5 (proposta — solo "1 video" è esplicitamente fissato dal cliente)              |
| A13 | Limite hard contributi/matrimonio        | 800 (circuit breaker)                                                           |
| A14 | Apertura book a chi non ha consensi minimi | accesso read-only                                                             |
| A15 | Modalità "test/dry-run"                  | sì da subito                                                                    |

---

## Sezione B — Materiali da raccogliere

Cose che vanno **ottenute da Nicola o decise insieme** prima della Fase 4 (design system) e della Fase 11 (export):

- **B1.** Logo / monogramma SVG da usare nell'app (probabilmente lo stesso del portfolio, già nel repo).
- **B2.** 5–10 foto dimostrative pulite per la copertina di matrimoni di esempio (per dry-run e demo).
- **B3.** Testo dei 3 consensi GDPR rivisti da un consulente legale (basterà un avvocato con un'ora di consulenza, ~150€). Non si parte senza.
- **B4.** Privacy policy specifica del wedding book (separata da quella del sito) — anche questa va validata legalmente.
- **B5.** Indirizzo email di contatto Nicola che apparirà sul book come "data controller" (pubblico).
- **B6.** Indirizzo email transazionale (per le notifiche Nicola): può essere lo stesso, può essere un alias `book@`.
- **B7.** Decisione se mostrare la **galleria pubblica** sul sito principale dal day-one o solo dopo qualche matrimonio (proposta: solo dopo i primi 2-3 archiviati, per partire con contenuto vero).
- **B8.** Pacchetti di vendita offline che Nicola intende offrire (servono solo per copy del prodotto, non per code).
- **B9.** Una conversazione con Nicola di 30 minuti per validare il flusso ospite **insieme su un telefono**, prima della Fase 4.

---

## Sezione C — Le 14 fasi tecniche

**Convenzioni:**
- ⏱ stima tempo part-time (pessimistic).
- ⛓ pre-requisiti = fase/i da completare prima.
- ✅ definition of done = condizione per chiudere la fase.

---

### FASE 0 — Setup infrastrutture (no codice)

⏱ **1 giorno** · ⛓ Sezione A approvata

**Obiettivo:** avere tutti gli account e gli accessi pronti.

**Task:**

- **0.1** Spostare DNS di `nicolacapassophoto.com` su Cloudflare (se non già lì). Aggiungere il sottodominio `book` come record A/CNAME placeholder che punta a GitHub Pages (`b00rr.github.io`). HTTPS Cloudflare ON.
- **0.2** Creare account Supabase (se non esiste già) e progetto `nc-wedding-book` in region EU Central. Salvare URL + anon key + service_role key in un password manager.
- **0.3** Abilitare in Supabase Studio: Auth → Providers → Email (per Nicola), Anonymous (per ospiti).
- **0.4** Creare l'utente admin di Nicola in Supabase: Studio → Authentication → Users → "Invite". Email + password temporanea, ruolo `admin` settato via:

  ```sql
  update auth.users
  set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
  where email = 'nicola@...';
  ```

- **0.5** Configurare GitHub:
  - Creare repo privato `nicola-capasso-wedding-book` sotto account `b00rr`.
  - Abilitare GitHub Pages dal branch `gh-pages`.
  - Aggiungere secret `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` ai repository secrets.
  - Aggiungere `SUPABASE_ACCESS_TOKEN` per le migrazioni CI.
- **0.6** Installare Supabase CLI in locale (`brew install supabase/tap/supabase` o npm equivalente).
- **0.7** Cloudflare: aggiungere sottodominio `book.nicolacapassophoto.com`, configurare Page Rule "Always Use HTTPS".

**Output:** un foglio (Notion o `SETUP.md` privato) con tutti gli URL, gli account, le credenziali in chiaro.

✅ **Done quando:** `book.nicolacapassophoto.com` risponde con un 404 di GitHub Pages (DNS funziona), Nicola può loggarsi in Supabase Studio.

---

### FASE 1 — Bootstrap repo

⏱ **2 giorni** · ⛓ Fase 0

**Obiettivo:** repo Vite+React+TS funzionante, deployato in CI su GitHub Pages, con tooling identico al portfolio.

**Task:**

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

**Output:** repo deployato e funzionante con uno schermo bianco e un titolo.

✅ **Done quando:** apri il sottodominio dal cellulare in 4G e vedi la pagina < 2 secondi.

> 💡 **Miglioramento:** aggiungi a questa fase il setup di un `Lighthouse CI` clonato dal portfolio (gate su PR). Investimento 30 minuti, garantisce che la performance non degradi mai.

---

### FASE 2 — Database & RLS

⏱ **3 giorni** · ⛓ Fase 0, Fase 1

**Obiettivo:** schema completo, RLS attive, migrazioni versionate.

**Task:**

- **2.1** `supabase init` nella root del repo → crea cartella `supabase/`.
- **2.2** `supabase link --project-ref <id>` → collega al progetto cloud.
- **2.3** Creare migrazione `0001_types.sql` con gli ENUM definiti nello schema (`wedding_status`, `contribution_type`, `contribution_status`).
- **2.4** Creare migrazione `0002_helpers.sql` con `is_admin()`, `is_guest_of()`, `wedding_accepts_uploads()`.
- **2.5** Creare migrazioni `0003_..0011_*.sql` una per tabella, **in ordine di dipendenza**: `weddings → wedding_moments → guests → contributions → pro_photos → hearts → book_drafts → preview_tokens → scaletta_templates → audit_log`.
- **2.6** Creare migrazione `0012_indexes.sql` con tutti gli indici.
- **2.7** Creare migrazione `0013_triggers.sql` con `set_updated_at`, `sync_hearts_count`, `audit_*`.
- **2.8** Creare migrazione `0014_rls_enable.sql` che abilita RLS su tutte le tabelle.
- **2.9** Creare migrazione `0015_rls_policies.sql` con tutte le policies row-level.
- **2.10** Creare migrazione `0016_storage.sql` che crea i 4 bucket (`covers`, `media`, `pro`, `public-thumbs`).
- **2.11** Creare migrazione `0017_storage_policies.sql` con le policies su `storage.objects`.
- **2.12** Eseguire `supabase db push` → applicare al cloud.
- **2.13** Creare un seed manuale per Nicola: la sua row in `auth.users` esiste, niente da seedare in tabelle dominio.
- **2.14** Configurare workflow GitHub Actions `db-migrate.yml`: su merge a main, applica migrazioni mancanti via Supabase CLI (con `SUPABASE_ACCESS_TOKEN`).

**Verifica manuale critica:**

- **2.15** In Studio, prova INSERT con utente non-admin in `weddings` → deve fallire (RLS).
- **2.16** Prova SELECT su `weddings` con `status='draft'` da utente non-admin → 0 righe.
- **2.17** Crea manualmente in Studio un wedding `live`, poi crea un guest con `signInAnonymously()` da console JS, prova a scrivere un contributo → deve riuscire.
- **2.18** Prova hide+select dello stesso contributo da un altro guest → non deve apparirgli.

✅ **Done quando:** tutti e 4 i test manuali passano + le migrazioni girano da CI.

> 💡 **Miglioramento strutturale:** aggiungi una migrazione `9999_seed_dev.sql` opzionale (gated da env) che crea un wedding di test "DEV-WEDDING-LOCAL" + 5 guest finti + 20 contributi. Durante lo sviluppo locale lo applichi a un Supabase locale via Docker, e hai sempre dati di esempio.

---

### FASE 3 — Design system & client Supabase

⏱ **2 giorni** · ⛓ Fase 1

**Obiettivo:** infrastruttura comune (UI primitives + accesso dati) prima delle pagine.

**Task:**

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

**Output:** una pagina demo `/dev/components` (gated dietro un env var `VITE_DEV_MODE=true`) che mostra tutti i componenti UI uno sotto l'altro per verifica visiva.

✅ **Done quando:** la pagina demo è bella e coerente con il portfolio, i tipi compilano, i test passano.

---

### FASE 4 — Routing & shell pubblica

⏱ **2 giorni** · ⛓ Fase 3

**Obiettivo:** struttura di navigazione completa, anche se le pagine sono vuote.

**Task:**

- **4.1** Definire le rotte in `App.tsx`:
  - `/` → landing pubblica del prodotto (vendita)
  - `/w/:slug` → atterraggio matrimonio (Schermata ①)
  - `/w/:slug/onboarding` → schermate ② e ③
  - `/w/:slug/book` → hub principale (Schermata ④)
  - `/w/:slug/add/photo` → ⑤a
  - `/w/:slug/add/video` → ⑤b
  - `/w/:slug/add/message` → ⑤c
  - `/w/:slug/me` → tab "Tu" (⑦)
  - `/admin/login` → ① Nicola
  - `/admin` → dashboard (③ Nicola)
  - `/admin/w/:id` → vista singolo matrimonio (⑤ Nicola)
  - `/admin/w/:id/edit` → wizard (④ Nicola)
  - `/admin/w/:id/qr` → ⑥ Nicola
  - `/admin/w/:id/book-editor` → ⑫ Nicola
  - `/admin/w/:id/export` → ⑬ Nicola
  - `/admin/settings` → ⑮ Nicola
- **4.2** Creare wrapper `<RequireAdmin>` che reindirizza a `/admin/login` se `role !== 'admin'`.
- **4.3** Creare wrapper `<RequireGuest>` che, se non c'è una sessione anonima per il wedding corrente, manda a `/w/:slug/onboarding`.
- **4.4** Creare `<WeddingProvider>` che, dato `:slug`, fa fetch del `wedding` e dei `wedding_moments` e li espone via context. Errori → 404.
- **4.5** Implementare `<NotFound />` e `<ErrorBoundary />` (clone dal portfolio).
- **4.6** Implementare `ScrollToTop` e `PageTransition` (clone dal portfolio).
- **4.7** Stub di tutte le pagine con un titolo placeholder e un link alla precedente. Tutta l'app navigabile.

**Output:** scheletro completo navigabile, ogni pagina ha un titolo, niente funzionalità.

✅ **Done quando:** puoi cliccare da `/admin` fino a `/admin/w/:id/export` senza errori, e le rotte protette reindirizzano correttamente.

---

### FASE 5 — Onboarding ospite

⏱ **3 giorni** · ⛓ Fase 4

**Obiettivo:** Schermate ① ② ③ funzionanti end-to-end.

**Task:**

- **5.1** Pagina `/w/:slug` (①):
  - Hero con cover image (caricata da `covers` bucket).
  - Stati: evento non aperto → countdown live; evento chiuso → redirect a `/w/:slug/book` read-only.
- **5.2** Pagina `/w/:slug/onboarding` step 1 — nome (②):
  - Form con un solo input, validazione 2-40 char.
  - Salva `display_name` in localStorage tramite hook custom.
- **5.3** Pagina `/w/:slug/onboarding` step 2 — consensi (③):
  - 3 toggle, primo obbligatorio.
  - Bottone "Entra nel libro" attivato solo dopo il primo.
- **5.4** All'invio finale:
  1. `signInAnonymously()` → ottieni `auth.uid()`.
  2. Calcola `device_fingerprint`.
  3. INSERT in `guests` con tutti i campi.
  4. INSERT in `audit_log` (azione `guest.consents_signed`, payload con versione testo + IP via Edge Function).
  5. localStorage.setItem `guest_session_${slug}` = `{guestId, displayName, consents, signedAt}`.
  6. Redirect a `/w/:slug/book`.
- **5.5** Stato "minore di 14": placeholder per ora, senza il flusso parent-consent (rinviato alla Fase 13).
- **5.6** Errore "fingerprint duplicato": gestire con messaggio amichevole + pulsante "continua come ospite di nuovo" (cancella localStorage, rifà onboarding).
- **5.7** Test E2E con Vitest+jsdom oppure Playwright: copri il happy path.

**Verifica:**

- **5.8** Da DevTools mobile, fare l'onboarding completo per un wedding di test.
- **5.9** Controllare in Supabase Studio che la riga `guests` sia stata creata correttamente con tutti i consensi.
- **5.10** Controllare in `audit_log` la riga della firma consensi.

✅ **Done quando:** un dispositivo nuovo passa dall'URL all'hub in <30 secondi senza incidenti.

---

### FASE 6 — Hub & feed live

⏱ **4 giorni** · ⛓ Fase 5

**Obiettivo:** Schermata ④ funzionante con feed real-time.

**Task:**

- **6.1** Hook `useWeddingFeed(weddingId)`:
  - Fetch iniziale paginato dei contributi `ready` non hidden.
  - Subscribe a `contributions:wedding_id=eq.{id}` via Supabase Realtime.
  - Merge `INSERT` come pillola "1 nuovo ricordo" in cima.
  - Merge `UPDATE` (es. nascondi) → rimuovi dalla lista visibile.
  - Merge `DELETE` → rimuovi.
- **6.2** Componente `<ContributionCard>`: foto, video, messaggio (variant per tipo).
- **6.3** Componente `<MomentChips>`: filter chips dai `wedding_moments`, "Tutti" di default.
- **6.4** Componente `<HubCTA>`: tre pulsanti grandi con counter rimanenti.
  - Counter calcolati con query: `SELECT type, COUNT(*) FROM contributions WHERE guest_id = auth.uid()`.
  - Disabilitati quando esauriti (5 foto, 1 video, 1 messaggio).
- **6.5** Componente `<TabBar>` sticky in fondo: Book / Aggiungi / Tu.
- **6.6** Pillola animata "X nuovo ricordo" con Framer Motion + scroll-to-top al click.
- **6.7** Empty state ("sii il primo").
- **6.8** Stati di errore (rete down → banner "stiamo riconnettendo").
- **6.9** Test: subscribe + insert mock → verifica pillola appare.

**Verifica:**

- **6.10** Aprire 2 device, contribuire da uno, verificare che l'altro veda il contributo entro 2 secondi.

✅ **Done quando:** il feed è fluido con 100 contributi simulati e si aggiorna live.

---

### FASE 7 — Aggiungi foto / video / messaggio

⏱ **5 giorni** · ⛓ Fase 6

**Obiettivo:** schermate ⑤a ⑤b ⑤c funzionanti, con compressione client-side e queue offline.

**Task:**

- **7.1** Pagina `/w/:slug/add/photo` (⑤a):
  - File picker mobile-friendly (+ accept camera).
  - Compressione con `browser-image-compression`: max 2400px, 80% qualità.
  - Estrazione thumbnail 400px (seconda compressione separata).
  - Anteprima.
  - Caption opzionale, dropdown momento (auto-suggerito da orario corrente vs scaletta).
  - Submit:
    1. Upload `media` bucket: `{weddingId}/{contributionId}.webp`.
    2. Upload thumb: `{weddingId}/{contributionId}_thumb.webp`.
    3. INSERT in `contributions` con tutti i campi e `consent_snapshot`.
    4. Redirect a ⑥ "conferma".
- **7.2** Pagina `/w/:slug/add/video` (⑤b):
  - Lazy-load di `@ffmpeg/ffmpeg` solo qui.
  - Registrazione native con `MediaRecorder API`, auto-stop a 10s.
  - Ricompressione: 720p, H.264, ~3MB target.
  - Estrazione frame 1 come thumbnail.
  - Anteprima player + trim (semplice, due maniglie).
  - Submit identico a 7.1 ma con `.mp4` e `_thumb.webp`.
- **7.3** Pagina `/w/:slug/add/message` (⑤c):
  - Textarea con counter live (max 500).
  - Submit: INSERT in `contributions` con `type='message'` e `message_text`.
- **7.4** Schermata di conferma (⑥) condivisa: animazione + 2 bottoni.
- **7.5** Aggiornamento ottimistico del feed in HubCTA dopo upload (counter scende subito).
- **7.6** Queue offline:
  - Wrapper `useUploadQueue` che usa IndexedDB tramite `idb-keyval`.
  - Se `navigator.onLine === false` o l'upload fallisce con timeout, salva il blob.
  - Service Worker registra "background sync" per ritentare quando la rete torna.
  - Indicatore in HUB "1 in attesa di sincronizzazione".
- **7.7** Edge Function `circuit_breaker_upload`: prima di INSERT, chiamata HTTP che verifica:
  - Quota residua wedding (count + bytes).
  - Quota ospite (count per tipo).
  - Se KO → rifiuto strutturato.
- **7.8** Stati di errore in tutte le 3 schermate.

**Verifica:**

- **7.9** Caricare 5 foto, 1 video da 10s, 1 messaggio. Tutti visibili nel feed entro 5 secondi.
- **7.10** Disabilitare WiFi a metà upload → verifica che il contributo venga messo in coda e poi riconciliato.

✅ **Done quando:** tutti e 3 i tipi funzionano su iPhone + Android + desktop, sotto 3G simulata.

> 💡 **Miglioramento:** aggiungi un widget "test della rete" nascosto (solo dev mode) che simula 3G e packet loss per testare la resilienza. Vale 1 ora di setup, evita debug in location reali.

---

### FASE 8 — Viewer fullscreen, cuori, tab "Tu"

⏱ **3 giorni** · ⛓ Fase 6, Fase 7

**Obiettivo:** schermate ⑦ e ⑧.

**Task:**

- **8.1** Componente `<ContributionViewer>`:
  - Fullscreen modal, swipe orizzontale via Framer Motion.
  - Foto/video/messaggio in layout dedicati.
  - Footer con autore (color-coded da hash del nome), momento, caption, hearts count.
  - Bottone cuore: tap → INSERT/DELETE in `hearts`. Counter sincronizzato dal trigger DB.
  - Per i propri contributi: bottone "Elimina" + conferma.
- **8.2** Pagina `/w/:slug/me` (⑦):
  - Lista dei contributi propri, ordinati per data desc.
  - Tap → viewer.
  - Sezione "I miei consensi" → riapre form ③ in modalità modifica.
  - Bottone "Esci dal libro" → cancella localStorage + signOut anon.
- **8.3** Color-coding nomi: funzione `colorFromName(displayName)` deterministica (hash → palette di 8 colori).
- **8.4** Eliminazione contributo:
  - DELETE dalla tabella `contributions` (RLS verifica autore).
  - Cancellazione storage al client (con RLS sui buckets) → meno latenza.
- **8.5** Test: cuori sync count + delete proprio.

✅ **Done quando:** un ospite può vedere, eliminare, modificare consensi senza problemi.

---

### FASE 9 — Stato post-evento (book chiuso)

⏱ **1 giorno** · ⛓ Fase 8

**Obiettivo:** Schermata ⑩.

**Task:**

- **9.1** Quando `wedding.status in ('closed','archived')`, l'hub mostra:
  - Banner "il libro è chiuso".
  - HubCTA nascosto.
  - Indicatore live → totale fisso.
  - Bottone "Sfoglia il libro impaginato" se `weddings.book_pdf_url` esiste.
  - Link soft "Vorresti un libro così? → Nicola".
- **9.2** Verificare RLS: tentare upload su wedding `closed` → DEVE fallire (verificato già in Fase 2 ma riconferma).

✅ **Done quando:** un wedding chiuso si comporta correttamente in tutti i flussi ospite.

---

### FASE 10 — Admin shell & dashboard

⏱ **3 giorni** · ⛓ Fase 4

**Obiettivo:** Schermate ① ② ③ Nicola.

**Task:**

- **10.1** Pagina `/admin/login` (① Nicola):
  - Form email + password.
  - `signInWithPassword` Supabase.
  - Redirect a `/admin` se admin, errore se non admin.
- **10.2** Wrapper `<AdminLayout>`: header con avatar Nicola + dropdown logout/settings.
- **10.3** Setup wizard ② Nicola: solo al primo login (salva flag in `app_metadata.onboarded=true`).
- **10.4** Pagina `/admin` (③ Nicola):
  - Storage gauge in cima (calcolato via Edge Function `get_storage_usage` o stored procedure).
  - Banner archiviazione se `archive_due_at < now()`.
  - CTA "Nuovo matrimonio".
  - 3 sezioni: in corso / in arrivo / archiviati.
  - Card singola wedding: cover thumb + stats + link.
- **10.5** Edge Function `get_storage_usage(wedding_id)`: restituisce bytes + count per wedding.
- **10.6** Stati alternativi: nessun matrimonio, storage > 90%.

✅ **Done quando:** Nicola entra, vede la dashboard pulita.

---

### FASE 11 — Wizard creazione matrimonio

⏱ **4 giorni** · ⛓ Fase 10

**Obiettivo:** Schermata ④ Nicola completa (5 step).

**Task:**

- **11.1** Pagina `/admin/w/new` con stepper.
- **11.2** Step 1 — Le basi: form completo, generazione automatica slug + validazione unicità live.
- **11.3** Step 2 — Copertina: drop zone + crop + compressione + upload bucket `covers`.
- **11.4** Step 3 — Scaletta: editor moments + template chooser ("Classico", "Civile", "Simbolico" hard-coded inizialmente; "I miei template" da `scaletta_templates` se presenti).
- **11.5** Step 4 — Apertura/chiusura: 3 radio gruppi, default sensati.
- **11.6** Step 5 — Riepilogo + 2 bottoni ("Salva bozza" / "Crea e prepara").
- **11.7** Salvataggio "interrompibile": ad ogni `next` step, INSERT/UPDATE in `weddings` con status `draft`. Può chiudere e riprendere.
- **11.8** Stessa pagina riusabile come **edit** (`/admin/w/:id/edit`).

✅ **Done quando:** Nicola crea un wedding da zero in 5 minuti.

---

### FASE 12 — Vista singolo matrimonio + event mode

⏱ **5 giorni** · ⛓ Fase 11

**Obiettivo:** Schermate ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ Nicola.

**Task:**

- **12.1** Pagina `/admin/w/:id` (⑤): layout 3 colonne desktop, single column mobile.
- **12.2** Sidebar sinistra: stats live, scaletta con momento corrente highlighted.
- **12.3** Main: feed admin (riusa `<ContributionCard>` ma variant `admin` con bottoni hide/pin).
- **12.4** Sidebar destra: azioni rapide.
- **12.5** Pagina `/admin/w/:id/qr` (⑥): generatore PDF con `react-pdf` o `jsPDF` + libreria QR (`qrcode` npm). 4 layout selezionabili.
- **12.6** Modalità test (⑦):
  - Bottone "Genera dati di test".
  - Edge Function `seed_test_data(wedding_id)` che inserisce N guest + N contributi con `is_test=true`.
  - Bottone "Pulisci dati di test" → DELETE WHERE is_test=true.
  - Blocco di sicurezza: non si può andare `live` finché esistono righe `is_test=true`.
- **12.7** Anteprima per la coppia (⑧):
  - Edge Function `create_preview_token(wedding_id)` che inserisce in `preview_tokens`.
  - Modal con link copiabile + share intents WhatsApp/email.
- **12.8** Apertura book (⑨):
  - Bottone "Apri agli ospiti" con conferma + checkbox "ho fatto il dry-run".
  - Update status → `live`.
- **12.9** Chiusura manuale: status → `closed`.
- **12.10** Health check pre-go-live: checklist visibile, blocca apertura se rosso.
- **12.11** Event mode mobile: layout responsive automatico.

✅ **Done quando:** Nicola attiva un wedding di test, fa contribuire 5 finti dispositivi, nasconde uno, chiude il book.

---

### FASE 13 — Foto pro, editor libro, esportazione

⏱ **7 giorni** · ⛓ Fase 12

**Obiettivo:** Schermate ⑪ ⑫ ⑬ Nicola. **La fase più lunga.**

**Task:**

- **13.1** Pagina `/admin/w/:id/upload-pro` (⑪):
  - Drag-and-drop massivo (anche 200 file).
  - Per ogni file: estrazione EXIF (`exifr` npm) → auto-tag momento.
  - Compressione (max 3000px, qualità 90%).
  - Upload bucket `pro` parallelizzato (max 4 in parallelo).
  - Toggle "usa come copertina libro".
- **13.2** Pagina `/admin/w/:id/book-editor` (⑫):
  - Layout split: anteprima libro a sinistra, pannello a destra.
  - Generazione bozza iniziale automatica (algoritmo descritto sotto).
  - Riordino drag-and-drop dei contributi nella pagina.
  - Selezione layout di pagina (1 piena, 2x1, 2x2, foto+messaggio): 6 layout hard-coded.
  - Salva ogni modifica come nuova versione in `book_drafts` (versionamento).
  - Storico versioni navigabile (undo storico).
- **13.3** Algoritmo "best-of":
  - Fissa le foto pro (sempre incluse).
  - Per ogni momento: prendi top-N contributi guest per `hearts_count + recency`.
  - Bilancia foto/messaggi per pagina.
  - Output: `layout_json` strutturato.
- **13.4** Pagina `/admin/w/:id/export` (⑬):
  - Step 1 — checkbox di cosa esportare.
  - Step 2 — generazione client-side:
    - PDF da `layout_json` con `@react-pdf/renderer`.
    - Zip dei media (download da Storage + zip in memoria via `jszip`).
    - CSV audit + JSON metadata.
  - Step 3 — chiusura archiviazione:
    - Conferma forte.
    - Edge Function `archive_wedding_finalize`: copia thumb consentite su `public-thumbs`, DELETE bulk su `media` e `pro`, UPDATE wedding `status='archived'`.
- **13.5** Backup Drive opzionale: OAuth Google Drive, salva una copia del bundle. **Rinviato a fase 16** se diventa complesso.

> ⚠️ **Decisione tecnica importante**: la generazione PDF lato client è **fattibile** con `@react-pdf/renderer` ma per matrimoni con 80 pagine può occupare 500MB di RAM nel browser. Se diventa un problema → scoprire al test reale, non in anticipo. Fallback: generazione async lato GitHub Actions (workflow on-demand).

✅ **Done quando:** Nicola esporta un wedding con 100 contributi e ottiene il bundle in <5 minuti.

---

### FASE 14 — Galleria pubblica, settings, polish

⏱ **4 giorni** · ⛓ Fase 13

**Obiettivo:** Schermate ⑭ ⑮ Nicola + integrazione sito principale.

**Task:**

- **14.1** Pagina `/admin/w/:id/gallery-settings` (⑭): toggle pubblico, anonimizzazione, scelta cover.
- **14.2** Sito principale (REPO PORTFOLIO, separato): aggiungere pagina `/wedding-diaries` che fetcha via Supabase JS dei wedding `archived AND show_in_public_gallery=true` e mostra anteprime. Pagina **statica build-time** rebuilatta tramite webhook GitHub Actions (trigger da Edge Function quando un wedding viene pubblicato).
- **14.3** Pagina pubblica `/w/:slug` per archivi: stessa shell, read-only, link "Sfoglia il book impaginato" che apre PDF.
- **14.4** Pagina `/admin/settings` (⑮): tutte le sezioni (profilo, brand, template, audit log, export GDPR, danger zone).
- **14.5** Edge Function `cleanup_orphan_anon_users` schedulata mensile.
- **14.6** Edge Function `keep_alive` schedulata settimanale.
- **14.7** Notifiche dashboard: banner non-dismissabili per archive_due_at, storage > 90%, export pronto.
- **14.8** Email transazionali via **Resend** free (3000/mese):
  - "Esportazione pronta."
  - "Storage al 90%."
  - **NO** push notifications nella v1.

✅ **Done quando:** flusso end-to-end girato 1 volta, dalla creazione all'archiviazione, senza glitch.

---

### FASE 15 — Quality gates & GDPR fineries

⏱ **3 giorni** · ⛓ Fase 14

**Obiettivo:** rendere il sistema legalmente e tecnicamente solido.

**Task:**

- **15.1** Pagina pubblica `/privacy-wedding-book` con testo legale firmato (B4).
- **15.2** Implementare flusso minore (sotto 14): pagina genitore via link condivisibile + token.
- **15.3** Endpoint admin "richiesta GDPR di cancellazione di X": Edge Function `forget_guest(guest_id)` che elimina guest + tutti i contributi + media (con audit_log).
- **15.4** Endpoint admin "esporta dati di X": Edge Function `export_guest_data(guest_id)` che restituisce zip.
- **15.5** Cookie banner / nessun cookie? Verificare se servono cookie di terze parti — probabilmente NO (solo localStorage, che non richiede consent banner se solo "tecnico"). Conferma legale.
- **15.6** Lighthouse CI gate stretto: a11y AA, performance > 85.
- **15.7** Test E2E Playwright per il flusso ospite completo.
- **15.8** Test di carico con `k6`: 150 ospiti simultanei in 10 minuti, monitor latenze.
- **15.9** Verifica RLS con audit completo: provare ogni operazione da un guest non autorizzato e verificare che fallisca.

✅ **Done quando:** GDPR check-list completa + Lighthouse > 85 + 150 utenti simultanei reggono.

---

### FASE 16 — Soft launch & primo matrimonio reale

⏱ **2 settimane** · ⛓ Fase 15

**Obiettivo:** primo matrimonio con cliente vero, in modalità "amico/sconto".

**Task:**

- **16.1** Identificare un matrimonio amico (gennaio-marzo 2026, fuori stagione alta) o usare quello successivo di Nicola con sconto 50%.
- **16.2** Setup completo come da flusso Nicola: creazione, scaletta, cartoline, dry-run.
- **16.3** **Dry-run obbligatorio con almeno 5 amici** una settimana prima.
- **16.4** Standby telefonico durante il giorno X.
- **16.5** Post-mortem dopo 3 giorni: cosa è andato bene, cosa no, lista bug.
- **16.6** Patch della lista bug.
- **16.7** Esportazione e archiviazione completa.
- **16.8** Decisione go/no-go per vendita commerciale.

✅ **Done quando:** primo libro stampato consegnato agli sposi.

---

## Sezione D — Milestone gates

| Gate | Cosa ottieni                                                  | Quando             | Vendibile?         |
| ---- | ------------------------------------------------------------- | ------------------ | ------------------ |
| G1   | Bootstrap — App live su sottodominio, vuota                   | Fine fase 2        | No                 |
| G2   | MVP ospite — Un ospite può contribuire end-to-end             | Fine fase 9        | No                 |
| G3   | MVP completo — Nicola autonomo dalla creazione all'archivio   | Fine fase 14       | Sì, internamente   |
| G4   | Production-ready — GDPR + carico + audit                      | Fine fase 15       | Sì, ad amici       |
| G5   | Validato sul campo — Primo matrimonio reale archiviato        | Fine fase 16       | Sì, commerciale    |

---

## Sezione E — Timeline & risorse

**Stima totale: ~8 settimane part-time** (assumendo 15-20h/settimana di sviluppo).

```
Settimana 1:    [Fase 0][Fase 1]
Settimana 2:    [Fase 2][Fase 3 inizio]
Settimana 3:    [Fase 3 fine][Fase 4][Fase 5]
Settimana 4:    [Fase 6]
Settimana 5:    [Fase 7]
Settimana 6:    [Fase 8][Fase 9][Fase 10 inizio]
Settimana 7:    [Fase 10 fine][Fase 11]
Settimana 8:    [Fase 12]
Settimana 9:    [Fase 13]
Settimana 10:   [Fase 14]
Settimana 11:   [Fase 15]
Settimana 12+:  [Fase 16 — soft launch]
```

In termini calendari: **~3 mesi al primo matrimonio reale**, con margine.

---

## Sezione F — Rischi da monitorare

| Rischio                                                          | Probabilità | Impatto | Mitigazione                                                       |
| ---------------------------------------------------------------- | ----------- | ------- | ----------------------------------------------------------------- |
| Generazione PDF client-side esplode con libri grandi             | media       | alto    | Test in fase 13; fallback su workflow async lato CI               |
| ffmpeg.wasm non funziona su Safari iOS vecchio                   | bassa       | medio   | Fallback "carica originale + Nicola ricomprime offline"           |
| Free tier Supabase modificato unilateralmente                    | bassa       | alto    | Schema portabile a Postgres self-hosted                           |
| Upload massivo da 150 ospiti satura il free tier in un'ora       | bassa       | alto    | Circuit breaker già previsto + monitoraggio storage gauge         |
| GDPR ambiguità con minori al matrimonio                          | media       | medio   | Validazione legale (B3, B4) + flusso minore in Fase 15            |
| Network sala matrimoni catastrofico                              | alta        | medio   | Queue offline + service worker (Fase 7)                           |
| Nicola non si ricorda di archiviare → storage saturo             | media       | medio   | Banner di pressione + rifiuto creazione nuovi matrimoni se >90%   |

---

## Sezione G — Dipendenze umane

| Quando                  | Cosa                                                                | Da chi          |
| ----------------------- | ------------------------------------------------------------------- | --------------- |
| Prima della Fase 0      | Approvazione decisioni Sezione A                                    | Owner           |
| Prima della Fase 0      | Accesso DNS Cloudflare                                              | Owner           |
| Prima della Fase 4      | Materiali B1, B2, B5, B6                                            | Nicola          |
| Prima della Fase 4      | Conversazione di validazione concept (B9)                           | Nicola + Owner  |
| Prima della Fase 5      | Testo consensi rivisto da legale (B3)                               | Avvocato        |
| Prima della Fase 14     | Privacy policy validata (B4)                                        | Avvocato        |
| Prima della Fase 14     | Decisione galleria pubblica day-one o no (B7)                       | Nicola          |
| Prima della Fase 16     | Identificazione matrimonio amico/sconto                             | Nicola          |

---

## Sezione H — Note finali

1. **Le 14 fasi NON sono parallelizzabili** in modo significativo (un solo dev). L'unica parallelizzazione sensata è: durante la Fase 5 (onboarding) iniziare a scrivere i testi legali B3+B4 con l'avvocato.
2. **Ogni fase deve restare in scope.** Se a metà Fase 7 viene voglia di aggiungere "audio messages", l'idea va in un backlog e si prosegue. Lo scope creep è il principale killer di progetti come questo.
3. **Test su device reali** dalla Fase 5 in poi: 1 iPhone vero, 1 Android vero, 1 desktop. Il simulatore mente.
4. **Commit piccoli, PR piccole.** Anche da soli. Ogni PR = una task atomica del piano.
5. **CHANGELOG.md** versionato dalla Fase 1: ogni release un'entry. Aiuta a ricordare cosa è stato fatto e a comunicarlo a Nicola.

---

## Riassunto miglioramenti proposti in questo piano

1. **Cloudflare DNS davanti a tutto** (A2): rende le future migrazioni d'host istantanee.
2. **Lighthouse CI gate** anche su questo repo (vedi Fase 1).
3. **Seed migration `9999_seed_dev.sql`** per dati di sviluppo coerenti.
4. **Demo page `/dev/components`** per UI review veloce.
5. **Setup wizard al primo login** (idempotente) invece di un ALTER manuale.
6. **Anteprima al volo** sulle card della dashboard.
7. **CHANGELOG.md** versionato dalla Fase 1.
8. **Test simulato di rete** in dev mode (3G + packet loss).
9. **Storico versioni del libro** già nello schema, pieno utilizzo nell'editor.
10. **Email Resend** in alternativa al limite SMTP Supabase.
11. **Health check pre-go-live** come gate bloccante.
12. **Workflow GitHub Actions per migrazioni DB** (no apply manuale).
13. **Backlog separato** per idee fuori scope (rispetta i confini delle fasi).
