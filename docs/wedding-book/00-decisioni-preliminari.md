# Sezione A — Decisioni preliminari

Prima di iniziare, vanno congelate queste scelte. Per ognuna è proposto un **default** ragionevole. Il piano parte solo dopo l'approvazione esplicita di tutte le decisioni A1–A15.

| #   | Decisione                                | Default proposto                                                                | Approvato |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------- | :-------: |
| A1  | Nome del prodotto e dominio              | `book.nicolacapassophoto.com` (working name "Il Libro del Matrimonio")          | ☐ |
| A2  | Provider DNS                             | Cloudflare DNS gratuito (anche se il dominio è registrato altrove)              | ☐ |
| A3  | Repo: account                            | stesso account `b00rr` (coerente con il portfolio)                              | ☐ |
| A4  | Repo: nome                               | `nicola-capasso-wedding-book`                                                   | ☐ |
| A5  | Repo: visibilità                         | privata fino al go-live, poi pubblica                                           | ☐ |
| A6  | Lingua app v1                            | solo italiano                                                                   | ☐ |
| A7  | Tono e brand                             | stessa tipografia (Cormorant Garamond + Inter) e palette del sito principale, accento `#c9a96e` | ☐ |
| A8  | Account Supabase                         | nuovo progetto dedicato `nc-wedding-book`                                       | ☐ |
| A9  | Region Supabase                          | EU Central (Francoforte) — vicinanza fisica + GDPR                              | ☐ |
| A10 | Versione del testo dei consensi          | `v1.0-2026-04` (mai modificare retroattivamente)                                | ☐ |
| A11 | Retention default                        | book navigabile 12 mesi post-evento, poi solo metadata                          | ☐ |
| A12 | Numero massimo foto/ospite               | 5 (proposta — solo "1 video" è esplicitamente fissato)                          | ☐ |
| A13 | Limite hard contributi/matrimonio        | 800 (circuit breaker)                                                           | ☐ |
| A14 | Apertura book a chi non ha consensi minimi | accesso read-only                                                             | ☐ |
| A15 | Modalità "test/dry-run"                  | sì da subito                                                                    | ☐ |

## Come usare questa pagina

- Spunta ogni casella man mano che approvi la scelta.
- Se vuoi cambiare un default, lascia la casella vuota e scrivi sotto la modifica desiderata.
- Quando tutte le caselle sono spuntate, la **Fase 0** può partire.

## Modifiche rispetto ai default

> _(scrivi qui eventuali modifiche, es. "A12: voglio limitare a 3 foto per ospite")_
