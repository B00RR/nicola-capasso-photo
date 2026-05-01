# Fase 13 — Foto pro, editor libro, esportazione

⏱ **7 giorni** · ⛓ Fase 12 · ⚪ **stato: todo**

## Obiettivo

Schermate ⑪ ⑫ ⑬ Nicola. **La fase più lunga.**

## Task

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

## ⚠️ Decisione tecnica importante

La generazione PDF lato client è **fattibile** con `@react-pdf/renderer` ma per matrimoni con 80 pagine può occupare 500MB di RAM nel browser. Se diventa un problema → scoprire al test reale, non in anticipo. Fallback: generazione async lato GitHub Actions (workflow on-demand).

## ✅ Definition of Done

Nicola esporta un wedding con 100 contributi e ottiene il bundle in <5 minuti.
