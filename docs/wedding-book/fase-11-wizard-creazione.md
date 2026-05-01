# Fase 11 — Wizard creazione matrimonio

⏱ **4 giorni** · ⛓ Fase 10 · ⚪ **stato: todo**

## Obiettivo

Schermata ④ Nicola completa (5 step).

## Task

- **11.1** Pagina `/admin/w/new` con stepper.
- **11.2** Step 1 — Le basi: form completo, generazione automatica slug + validazione unicità live.
- **11.3** Step 2 — Copertina: drop zone + crop + compressione + upload bucket `covers`.
- **11.4** Step 3 — Scaletta: editor moments + template chooser ("Classico", "Civile", "Simbolico" hard-coded inizialmente; "I miei template" da `scaletta_templates` se presenti).
- **11.5** Step 4 — Apertura/chiusura: 3 radio gruppi, default sensati.
- **11.6** Step 5 — Riepilogo + 2 bottoni ("Salva bozza" / "Crea e prepara").
- **11.7** Salvataggio "interrompibile": ad ogni `next` step, INSERT/UPDATE in `weddings` con status `draft`. Può chiudere e riprendere.
- **11.8** Stessa pagina riusabile come **edit** (`/admin/w/:id/edit`).

## ✅ Definition of Done

Nicola crea un wedding da zero in 5 minuti.
