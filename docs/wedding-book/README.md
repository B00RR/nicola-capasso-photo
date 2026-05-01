# Wedding Book — Piano di implementazione

Indice navigabile del piano per la nuova funzione "Wedding Book": un libro digitale collaborativo dove gli invitati di un matrimonio lasciano foto, brevi video e messaggi per gli sposi, intrecciati con le foto professionali di Nicola.

## Documenti preliminari

- [Decisioni preliminari (Sezione A)](./00-decisioni-preliminari.md)
- [Materiali da raccogliere (Sezione B)](./00-materiali-da-raccogliere.md)

## Le 17 fasi tecniche

| Fase | Titolo | Stima | Stato |
|------|--------|-------|-------|
| [Fase 0](./fase-00-setup-infrastrutture.md) | Setup infrastrutture (no codice) | 1g | 🟡 in corso |
| [Fase 1](./fase-01-bootstrap-repo.md) | Bootstrap repo | 2g | ⚪ todo |
| [Fase 2](./fase-02-database-rls.md) | Database & RLS | 3g | ⚪ todo |
| [Fase 3](./fase-03-design-system.md) | Design system & client Supabase | 2g | ⚪ todo |
| [Fase 4](./fase-04-routing-shell.md) | Routing & shell pubblica | 2g | ⚪ todo |
| [Fase 5](./fase-05-onboarding-ospite.md) | Onboarding ospite | 3g | ⚪ todo |
| [Fase 6](./fase-06-hub-feed-live.md) | Hub & feed live | 4g | ⚪ todo |
| [Fase 7](./fase-07-aggiungi-contributi.md) | Aggiungi foto/video/messaggio | 5g | ⚪ todo |
| [Fase 8](./fase-08-viewer-cuori-tu.md) | Viewer fullscreen, cuori, tab "Tu" | 3g | ⚪ todo |
| [Fase 9](./fase-09-stato-post-evento.md) | Stato post-evento (book chiuso) | 1g | ⚪ todo |
| [Fase 10](./fase-10-admin-dashboard.md) | Admin shell & dashboard | 3g | ⚪ todo |
| [Fase 11](./fase-11-wizard-creazione.md) | Wizard creazione matrimonio | 4g | ⚪ todo |
| [Fase 12](./fase-12-vista-matrimonio-event-mode.md) | Vista singolo matrimonio + event mode | 5g | ⚪ todo |
| [Fase 13](./fase-13-foto-pro-editor-export.md) | Foto pro, editor libro, esportazione | 7g | ⚪ todo |
| [Fase 14](./fase-14-galleria-settings-polish.md) | Galleria pubblica, settings, polish | 4g | ⚪ todo |
| [Fase 15](./fase-15-quality-gdpr.md) | Quality gates & GDPR fineries | 3g | ⚪ todo |
| [Fase 16](./fase-16-soft-launch.md) | Soft launch & primo matrimonio reale | 2 sett | ⚪ todo |

## Riferimenti trasversali

- [Milestone gates, timeline, rischi e dipendenze](./99-milestones-rischi-timeline.md)

## Stato corrente

- **Fase attiva:** Fase 0 — Setup infrastrutture
- **Prossimo blocker:** approvazione delle [decisioni preliminari](./00-decisioni-preliminari.md)
- **Prossima fase a tornare in pista:** Fase 1 — Bootstrap repo (dipende da 0.5 = creazione repo GitHub e secrets)

## Convenzioni

- ⏱ stima tempo part-time (pessimistic, ~15-20h/settimana)
- ⛓ pre-requisiti = fase/i da completare prima
- ✅ definition of done = condizione per chiudere la fase
- 💡 miglioramento opzionale (non critico, ma consigliato)
- ⚠️ decisione tecnica con tradeoff esplicito

## Stati

- ⚪ **todo** — non iniziata
- 🟡 **in corso** — fase attiva
- 🟢 **done** — chiusa con definition of done verificata
- 🔴 **blocked** — bloccata da dipendenza esterna
