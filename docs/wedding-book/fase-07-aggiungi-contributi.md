# Fase 7 — Aggiungi foto / video / messaggio

⏱ **5 giorni** · ⛓ Fase 6 · ⚪ **stato: todo**

## Obiettivo

Schermate ⑤a ⑤b ⑤c funzionanti, con compressione client-side e queue offline.

## Task

- **7.1** Pagina `/w/:slug/add/photo` (⑤a):
  - File picker mobile-friendly (+ accept camera).
  - Compressione con `browser-image-compression`: max 2400px, 80% qualità.
  - Estrazione thumbnail 400px (seconda compressione separata).
  - Anteprima.
  - Caption opzionale, dropdown momento (auto-suggerito da orario corrente vs scaletta).
  - Submit:
    1. Upload `media` bucket: `{weddingId}/{contributionId}.webp`.
    2. Upload thumb: `{weddingId}/{contributionId}_thumb.webp`.
    3. INSERT in `contributions` con tutti i campi e `consent_snapshot`.
    4. Redirect a ⑥ "conferma".
- **7.2** Pagina `/w/:slug/add/video` (⑤b):
  - Lazy-load di `@ffmpeg/ffmpeg` solo qui.
  - Registrazione native con `MediaRecorder API`, auto-stop a 10s.
  - Ricompressione: 720p, H.264, ~3MB target.
  - Estrazione frame 1 come thumbnail.
  - Anteprima player + trim (semplice, due maniglie).
  - Submit identico a 7.1 ma con `.mp4` e `_thumb.webp`.
- **7.3** Pagina `/w/:slug/add/message` (⑤c):
  - Textarea con counter live (max 500).
  - Submit: INSERT in `contributions` con `type='message'` e `message_text`.
- **7.4** Schermata di conferma (⑥) condivisa: animazione + 2 bottoni.
- **7.5** Aggiornamento ottimistico del feed in HubCTA dopo upload (counter scende subito).
- **7.6** Queue offline:
  - Wrapper `useUploadQueue` che usa IndexedDB tramite `idb-keyval`.
  - Se `navigator.onLine === false` o l'upload fallisce con timeout, salva il blob.
  - Service Worker registra "background sync" per ritentare quando la rete torna.
  - Indicatore in HUB "1 in attesa di sincronizzazione".
- **7.7** Edge Function `circuit_breaker_upload`: prima di INSERT, chiamata HTTP che verifica:
  - Quota residua wedding (count + bytes).
  - Quota ospite (count per tipo).
  - Se KO → rifiuto strutturato.
- **7.8** Stati di errore in tutte le 3 schermate.

## Verifica

- **7.9** Caricare 5 foto, 1 video da 10s, 1 messaggio. Tutti visibili nel feed entro 5 secondi.
- **7.10** Disabilitare WiFi a metà upload → verifica che il contributo venga messo in coda e poi riconciliato.

## ✅ Definition of Done

Tutti e 3 i tipi funzionano su iPhone + Android + desktop, sotto 3G simulata.

## 💡 Miglioramenti suggeriti

Aggiungi un widget "test della rete" nascosto (solo dev mode) che simula 3G e packet loss per testare la resilienza. Vale 1 ora di setup, evita debug in location reali.
