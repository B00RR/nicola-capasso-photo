# Fase 8 — Viewer fullscreen, cuori, tab "Tu"

⏱ **3 giorni** · ⛓ Fase 6, Fase 7 · ⚪ **stato: todo**

## Obiettivo

Schermate ⑦ e ⑧.

## Task

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

## ✅ Definition of Done

Un ospite può vedere, eliminare, modificare consensi senza problemi.
