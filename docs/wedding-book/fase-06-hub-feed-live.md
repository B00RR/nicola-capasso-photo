# Fase 6 — Hub & feed live

⏱ **4 giorni** · ⛓ Fase 5 · ⚪ **stato: todo**

## Obiettivo

Schermata ④ funzionante con feed real-time.

## Task

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

## Verifica

- **6.10** Aprire 2 device, contribuire da uno, verificare che l'altro veda il contributo entro 2 secondi.

## ✅ Definition of Done

Il feed è fluido con 100 contributi simulati e si aggiorna live.
