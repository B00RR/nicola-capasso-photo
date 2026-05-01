# Fase 12 — Vista singolo matrimonio + event mode

⏱ **5 giorni** · ⛓ Fase 11 · ⚪ **stato: todo**

## Obiettivo

Schermate ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ Nicola.

## Task

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

## ✅ Definition of Done

Nicola attiva un wedding di test, fa contribuire 5 finti dispositivi, nasconde uno, chiude il book.
