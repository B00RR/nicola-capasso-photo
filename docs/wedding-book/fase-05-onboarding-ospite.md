# Fase 5 — Onboarding ospite

⏱ **3 giorni** · ⛓ Fase 4 · ⚪ **stato: todo**

## Obiettivo

Schermate ① ② ③ funzionanti end-to-end.

## Task

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

## Verifica

- **5.8** Da DevTools mobile, fare l'onboarding completo per un wedding di test.
- **5.9** Controllare in Supabase Studio che la riga `guests` sia stata creata correttamente con tutti i consensi.
- **5.10** Controllare in `audit_log` la riga della firma consensi.

## ✅ Definition of Done

Un dispositivo nuovo passa dall'URL all'hub in <30 secondi senza incidenti.
