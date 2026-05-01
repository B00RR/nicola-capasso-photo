# Fase 14 — Galleria pubblica, settings, polish

⏱ **4 giorni** · ⛓ Fase 13 · ⚪ **stato: todo**

## Obiettivo

Schermate ⑭ ⑮ Nicola + integrazione sito principale.

## Task

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

## ✅ Definition of Done

Flusso end-to-end girato 1 volta, dalla creazione all'archiviazione, senza glitch.
