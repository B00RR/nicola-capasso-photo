# Fase 0 — Setup infrastrutture (no codice)

⏱ **1 giorno** · ⛓ [Sezione A approvata](./00-decisioni-preliminari.md) · 🟡 **stato: in corso**

## Obiettivo

Avere tutti gli account, gli accessi e gli endpoint pronti **prima** di scrivere una sola riga di codice. Tutto in questa fase è azione manuale lato te / Nicola.

---

## Checklist eseguibile

Spunta ogni voce man mano. Le voci ⚠️ richiedono attenzione su credenziali / billing.

### 0.1 — DNS su Cloudflare

- [ ] Crea un account su <https://dash.cloudflare.com> se non ce l'hai
- [ ] Aggiungi il sito `nicolacapassophoto.com` come "site" su Cloudflare (piano Free)
- [ ] Cloudflare ti darà 2 nameservers (es. `arya.ns.cloudflare.com` + `dale.ns.cloudflare.com`)
- [ ] Vai sul registrar dove hai comprato il dominio e **cambia i nameservers** con quelli di Cloudflare
- [ ] Attendi propagazione DNS (di solito < 1h, max 24h)
- [ ] Su Cloudflare, sezione DNS, aggiungi un record:
  - Type: `CNAME`
  - Name: `book`
  - Target: `b00rr.github.io`
  - Proxy: 🟠 attivo (arancione)
- [ ] Su Cloudflare → SSL/TLS → imposta su `Full`
- [ ] Su Cloudflare → Page Rules: aggiungi regola `book.nicolacapassophoto.com/*` → "Always Use HTTPS"

> ⚠️ Quando cambi nameservers, **tutti i record DNS attuali** del dominio vanno reinseriti su Cloudflare (record A del sito principale, MX dell'email, eventuali TXT). Prima di switchare, esporta lo zone file dal vecchio DNS e importalo su Cloudflare. Cloudflare ha un wizard automatico che lo fa.

### 0.2 — Progetto Supabase

- [ ] Vai su <https://supabase.com> e accedi (può essere lo stesso account GitHub `b00rr`)
- [ ] "New project":
  - Name: `nc-wedding-book`
  - Database password: genera password forte e **salvala in password manager**
  - Region: `Europe (Frankfurt)` ⚠️ scelta importante per GDPR
  - Pricing plan: `Free`
- [ ] Attendi 2-3 minuti che il progetto venga provisioning
- [ ] Settings → API → copia e salva:
  - `Project URL` (es. `https://abcd1234.supabase.co`)
  - `anon public key` (sicura da mettere in repo .env)
  - `service_role key` ⚠️ **MAI** committare. Solo password manager.

### 0.3 — Auth providers Supabase

- [ ] Authentication → Providers
- [ ] **Email**: abilitato (per Nicola)
- [ ] **Anonymous Sign-Ins**: abilitato (per ospiti) ⚠️ feature recente, controllare che sia ON
- [ ] Disabilita tutti gli altri provider (Google, GitHub, ecc.) per ora

### 0.4 — Crea utente admin di Nicola

- [ ] Authentication → Users → "Add user" → "Create new user"
  - Email: `nicola@...` (l'email reale di Nicola)
  - Password: genera temporanea, condividila a Nicola via canale sicuro
  - "Auto confirm user": ✅ ON (così non serve verifica email)
- [ ] Apri SQL Editor e lancia:

  ```sql
  update auth.users
  set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
  where email = 'nicola@...';
  ```

- [ ] Verifica:

  ```sql
  select id, email, raw_app_meta_data->>'role' as role
  from auth.users
  where email = 'nicola@...';
  ```

  Deve restituire `role = admin`.

### 0.5 — Repo GitHub `nicola-capasso-wedding-book`

- [ ] Vai su <https://github.com/new> (loggato come `b00rr`)
- [ ] Repository name: `nicola-capasso-wedding-book`
- [ ] Description: "Collaborative wedding book — companion app to nicolacapassophoto.com"
- [ ] Visibility: **Private** (per ora)
- [ ] Initialize: niente README, niente .gitignore, niente license (li metterà la Fase 1)
- [ ] Create repository
- [ ] Settings → Pages: lascia su "Deploy from a branch", branch sarà `gh-pages` (verrà creato dalla CI in Fase 1)
- [ ] Settings → Secrets and variables → Actions → "New repository secret":
  - `VITE_SUPABASE_URL` = il Project URL della 0.2
  - `VITE_SUPABASE_ANON_KEY` = la anon key della 0.2
  - `SUPABASE_ACCESS_TOKEN` = generato da <https://supabase.com/dashboard/account/tokens> (per migrazioni CI)

### 0.6 — Supabase CLI in locale

- [ ] Sulla tua macchina di sviluppo, installa Supabase CLI:
  - macOS: `brew install supabase/tap/supabase`
  - Linux: `curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar xz`
  - Windows: `scoop install supabase`
- [ ] Verifica: `supabase --version` deve restituire una versione
- [ ] `supabase login` — autenticati con il browser

### 0.7 — Verifica finale Cloudflare

- [ ] Apri `https://book.nicolacapassophoto.com` da un browser in incognito
- [ ] Deve mostrare un 404 di GitHub Pages (perché il repo è ancora vuoto)
- [ ] Se vedi errore SSL: aspetta 30 minuti per propagazione cert Cloudflare
- [ ] Se vedi errore "DNS_PROBE_FINISHED_NXDOMAIN": aspetta propagazione DNS

---

## Output finale

Un documento privato (Notion, Bitwarden, password manager) con:

- URL Cloudflare account
- URL Supabase project
- `Project URL` + `anon key` + `service_role key`
- Email + password Nicola admin
- URL repo GitHub
- `SUPABASE_ACCESS_TOKEN` per CI

---

## ✅ Definition of Done

- `book.nicolacapassophoto.com` risponde con un 404 di GitHub Pages (DNS funziona, HTTPS funziona)
- Nicola può loggarsi su Supabase Studio con la sua email
- Esiste il repo GitHub vuoto con i 3 secrets configurati
- Supabase CLI funziona in locale

---

## Cosa posso fare io qui

**Quasi nulla.** Tutta la fase è azione manuale tua / di Nicola, perché richiede:

- accesso al pannello Cloudflare (mio = nessuno)
- accesso a Supabase con email reale (mio = nessuno)
- creazione di un repo GitHub fuori dal mio scope (mio scope = `nicola-capasso-photo` solo)
- installazione di un CLI su macchina locale (non posso)

**Quando hai completato 0.1–0.7, dimmelo e parto subito con la Fase 1** preparando lo scaffolding del repo (che ti consegnerò come bundle pronto da pushare).

---

## Note di sicurezza

- ⚠️ `service_role key` di Supabase = bypass totale RLS. **Mai** in repo, mai in browser, mai in env vars del client. Solo backend / Edge Functions / password manager personale.
- ⚠️ La password DB di Supabase ti serve solo per `psql` di emergenza. La connessione normale dell'app passa per la anon key + JWT.
- ⚠️ Cambia subito la password temporanea di Nicola dopo il primo login.
