# Fase 15 — Quality gates & GDPR fineries

⏱ **3 giorni** · ⛓ Fase 14 · ⚪ **stato: todo**

## Obiettivo

Rendere il sistema legalmente e tecnicamente solido.

## Task

- **15.1** Pagina pubblica `/privacy-wedding-book` con testo legale firmato (B4).
- **15.2** Implementare flusso minore (sotto 14): pagina genitore via link condivisibile + token.
- **15.3** Endpoint admin "richiesta GDPR di cancellazione di X": Edge Function `forget_guest(guest_id)` che elimina guest + tutti i contributi + media (con audit_log).
- **15.4** Endpoint admin "esporta dati di X": Edge Function `export_guest_data(guest_id)` che restituisce zip.
- **15.5** Cookie banner / nessun cookie? Verificare se servono cookie di terze parti — probabilmente NO (solo localStorage, che non richiede consent banner se solo "tecnico"). Conferma legale.
- **15.6** Lighthouse CI gate stretto: a11y AA, performance > 85.
- **15.7** Test E2E Playwright per il flusso ospite completo.
- **15.8** Test di carico con `k6`: 150 ospiti simultanei in 10 minuti, monitor latenze.
- **15.9** Verifica RLS con audit completo: provare ogni operazione da un guest non autorizzato e verificare che fallisca.

## ✅ Definition of Done

GDPR check-list completa + Lighthouse > 85 + 150 utenti simultanei reggono.
