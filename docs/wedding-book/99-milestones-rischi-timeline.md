# Milestone gates, timeline, rischi e dipendenze

## Milestone gates

| Gate | Cosa ottieni                                                  | Quando             | Vendibile?         |
| ---- | ------------------------------------------------------------- | ------------------ | ------------------ |
| G1   | Bootstrap — App live su sottodominio, vuota                   | Fine fase 2        | No                 |
| G2   | MVP ospite — Un ospite può contribuire end-to-end             | Fine fase 9        | No                 |
| G3   | MVP completo — Nicola autonomo dalla creazione all'archivio   | Fine fase 14       | Sì, internamente   |
| G4   | Production-ready — GDPR + carico + audit                      | Fine fase 15       | Sì, ad amici       |
| G5   | Validato sul campo — Primo matrimonio reale archiviato        | Fine fase 16       | Sì, commerciale    |

## Timeline indicativa

**Stima totale: ~8 settimane part-time** (assumendo 15-20h/settimana di sviluppo).

```
Settimana 1:    [Fase 0][Fase 1]
Settimana 2:    [Fase 2][Fase 3 inizio]
Settimana 3:    [Fase 3 fine][Fase 4][Fase 5]
Settimana 4:    [Fase 6]
Settimana 5:    [Fase 7]
Settimana 6:    [Fase 8][Fase 9][Fase 10 inizio]
Settimana 7:    [Fase 10 fine][Fase 11]
Settimana 8:    [Fase 12]
Settimana 9:    [Fase 13]
Settimana 10:   [Fase 14]
Settimana 11:   [Fase 15]
Settimana 12+:  [Fase 16 — soft launch]
```

In termini calendari: **~3 mesi al primo matrimonio reale**, con margine.

## Rischi da monitorare

| Rischio                                                          | Probabilità | Impatto | Mitigazione                                                       |
| ---------------------------------------------------------------- | ----------- | ------- | ----------------------------------------------------------------- |
| Generazione PDF client-side esplode con libri grandi             | media       | alto    | Test in fase 13; fallback su workflow async lato CI               |
| ffmpeg.wasm non funziona su Safari iOS vecchio                   | bassa       | medio   | Fallback "carica originale + Nicola ricomprime offline"           |
| Free tier Supabase modificato unilateralmente                    | bassa       | alto    | Schema portabile a Postgres self-hosted                           |
| Upload massivo da 150 ospiti satura il free tier in un'ora       | bassa       | alto    | Circuit breaker già previsto + monitoraggio storage gauge         |
| GDPR ambiguità con minori al matrimonio                          | media       | medio   | Validazione legale (B3, B4) + flusso minore in Fase 15            |
| Network sala matrimoni catastrofico                              | alta        | medio   | Queue offline + service worker (Fase 7)                           |
| Nicola non si ricorda di archiviare → storage saturo             | media       | medio   | Banner di pressione + rifiuto creazione nuovi matrimoni se >90%   |

## Dipendenze umane

| Quando                  | Cosa                                                                | Da chi          |
| ----------------------- | ------------------------------------------------------------------- | --------------- |
| Prima della Fase 0      | Approvazione decisioni Sezione A                                    | Owner           |
| Prima della Fase 0      | Accesso DNS Cloudflare                                              | Owner           |
| Prima della Fase 4      | Materiali B1, B2, B5, B6                                            | Nicola          |
| Prima della Fase 4      | Conversazione di validazione concept (B9)                           | Nicola + Owner  |
| Prima della Fase 5      | Testo consensi rivisto da legale (B3)                               | Avvocato        |
| Prima della Fase 14     | Privacy policy validata (B4)                                        | Avvocato        |
| Prima della Fase 14     | Decisione galleria pubblica day-one o no (B7)                       | Nicola          |
| Prima della Fase 16     | Identificazione matrimonio amico/sconto                             | Nicola          |

## Note finali

1. **Le 17 fasi NON sono parallelizzabili** in modo significativo (un solo dev). L'unica parallelizzazione sensata: durante la Fase 5 (onboarding) iniziare i testi legali B3+B4 con l'avvocato.
2. **Ogni fase deve restare in scope.** Se a metà Fase 7 viene voglia di aggiungere "audio messages", l'idea va in un backlog e si prosegue.
3. **Test su device reali** dalla Fase 5 in poi: 1 iPhone vero, 1 Android vero, 1 desktop. Il simulatore mente.
4. **Commit piccoli, PR piccole.** Anche da soli. Ogni PR = una task atomica del piano.
5. **CHANGELOG.md** versionato dalla Fase 1: ogni release un'entry.
