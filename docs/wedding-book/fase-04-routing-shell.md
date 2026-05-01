# Fase 4 — Routing & shell pubblica

⏱ **2 giorni** · ⛓ Fase 3 · ⚪ **stato: todo**

## Obiettivo

Struttura di navigazione completa, anche se le pagine sono vuote.

## Task

- **4.1** Definire le rotte in `App.tsx`:
  - `/` → landing pubblica del prodotto (vendita)
  - `/w/:slug` → atterraggio matrimonio (Schermata ①)
  - `/w/:slug/onboarding` → schermate ② e ③
  - `/w/:slug/book` → hub principale (Schermata ④)
  - `/w/:slug/add/photo` → ⑤a
  - `/w/:slug/add/video` → ⑤b
  - `/w/:slug/add/message` → ⑤c
  - `/w/:slug/me` → tab "Tu" (⑦)
  - `/admin/login` → ① Nicola
  - `/admin` → dashboard (③ Nicola)
  - `/admin/w/:id` → vista singolo matrimonio (⑤ Nicola)
  - `/admin/w/:id/edit` → wizard (④ Nicola)
  - `/admin/w/:id/qr` → ⑥ Nicola
  - `/admin/w/:id/book-editor` → ⑫ Nicola
  - `/admin/w/:id/export` → ⑬ Nicola
  - `/admin/settings` → ⑮ Nicola
- **4.2** Creare wrapper `<RequireAdmin>` che reindirizza a `/admin/login` se `role !== 'admin'`.
- **4.3** Creare wrapper `<RequireGuest>` che, se non c'è una sessione anonima per il wedding corrente, manda a `/w/:slug/onboarding`.
- **4.4** Creare `<WeddingProvider>` che, dato `:slug`, fa fetch del `wedding` e dei `wedding_moments` e li espone via context. Errori → 404.
- **4.5** Implementare `<NotFound />` e `<ErrorBoundary />` (clone dal portfolio).
- **4.6** Implementare `ScrollToTop` e `PageTransition` (clone dal portfolio).
- **4.7** Stub di tutte le pagine con un titolo placeholder e un link alla precedente. Tutta l'app navigabile.

## Output

Scheletro completo navigabile, ogni pagina ha un titolo, niente funzionalità.

## ✅ Definition of Done

Puoi cliccare da `/admin` fino a `/admin/w/:id/export` senza errori, e le rotte protette reindirizzano correttamente.
