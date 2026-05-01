# Fase 9 — Stato post-evento (book chiuso)

⏱ **1 giorno** · ⛓ Fase 8 · ⚪ **stato: todo**

## Obiettivo

Schermata ⑩.

## Task

- **9.1** Quando `wedding.status in ('closed','archived')`, l'hub mostra:
  - Banner "il libro è chiuso".
  - HubCTA nascosto.
  - Indicatore live → totale fisso.
  - Bottone "Sfoglia il libro impaginato" se `weddings.book_pdf_url` esiste.
  - Link soft "Vorresti un libro così? → Nicola".
- **9.2** Verificare RLS: tentare upload su wedding `closed` → DEVE fallire (verificato già in Fase 2 ma riconferma).

## ✅ Definition of Done

Un wedding chiuso si comporta correttamente in tutti i flussi ospite.
