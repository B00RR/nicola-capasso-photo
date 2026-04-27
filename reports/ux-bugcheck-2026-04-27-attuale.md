================================================================================
UX BUGCHECK — nicola-capasso-photo
Branch: feat/shoot-pages-and-ux-fixes | Build preview: localhost:4173
Generato: 2026-04-27 | Test: persona Zia Rosetta + vision inspect
================================================================================

Questo report elenca SOLO i problemi confermati nel test di oggi.
I problemi già risolti nel branch corrente sono esclusi.

================================================================================
BUG TECNICI CONFERMATI OGGI
================================================================================

[BLOCKER] #1 — Portfolio lista senza card immagine
  Pagina: /portfolio
  Stato: 16 storie renderizzate come link testuali (nome + location).
         ZERO immagini, card, thumbnail o preview.
         Per un fotografo, la pagina principale è testo su sfondo bianco.
  Fix:   Aggiungere componente card con coverImage per ogni storia.
         Griglia responsive. Fallback placeholder se immagine mancante.

[BLOCKER] #2 — Gallery story vuota
  Pagina: /portfolio/:slug (es. /portfolio/25-1 Sofia & Marco)
  Stato:  Hero image visibile, testo visibile.
         Sezione "GALLERY" sotto il testo è COMPLETAMENTE BIANCA.
         Gli elementi <figure> sono nel DOM ma non hanno contenuto visibile.
  Fix:   Verificare che le immagini della storia siano nei dati,
         passate al componente gallery, e renderizzate correttamente.
         Testare con URL Cloudinary reali.

[BUG] #3 — i18n servizi incompleta
  Pagina: / (homepage)
  Stato:  In versione italiana, i 4 service cards dicono:
         "Destination", "Engagement", "Team on request" (in inglese).
         Solo "Matrimoni" è tradotto.
  Fix:   Aggiungere chiavi i18n per i servizi.

[BUG] #4 — Language switch label statica
  Pagina: tutte
  Stato:  Il bottone lingua dice sempre "Switch language" (inglese)
         anche quando il sito è in italiano.
  Fix:   Label dinamica: "Cambia lingua" in IT, "Change language" in EN.

[BUG] #5 — Date picker formato americano in italiano
  Pagina: /contact
  Stato:  Il campo data mostra spinbutton in ordine mm/dd/yyyy
         anche con il sito in italiano.
  Fix:   Forzare formato dd/mm/yyyy per locale it-IT
         o usare <input type="date"> nativo con lang="it".

================================================================================
COPY / CONTENUTO (non bug tecnici, da decidere)
================================================================================

[COPY] #6 — Form label matrimonio-specifica
  Pagina: /contact
  Stato:  Label: "DATA DEL MATRIMONIO" (esclude chi ha altri eventi).
         Testo intro è già generico: "Raccontami il vostro giorno."
  Fix:   Cambiare label in "DATA DELL'EVENTO".
         Aggiungere campo "Tipo di evento" (opzionale).

[COPY] #7 — Prezzi assenti
  Pagina: tutte
  Stato:  Nessuna indicazione budget ovunque nel sito.
  Fix:   Decidere se aggiungere "A partire da X" in Contact.
         Non è bug, è contenuto da fornire.

================================================================================
COSA E' STATO FIXATO RISPETTO AL REPORT PRECEDENTE (2026-04-27)
================================================================================

✓ Link portfolio homepage: navigano correttamente a /portfolio/:slug
✓ Pagine story esistono: hero + testo renderizzati
✓ Link telefono presente: "TELEFONO +393398563098" in Contact
✓ Cookie banner funziona: si chiude con "GOT IT" / "HO CAPITO"
✓ Language switch funziona: cambia correttamente IT ↔ EN

================================================================================
RIEPILOGO AZIONABILE
================================================================================

Priorità 1 (bloccanti):
  1. Aggiungere card immagine nella lista portfolio
  2. Fixare gallery vuota nelle pagine story

Priorità 2 (bug):
  3. Completare i18n servizi
  4. Fixare label language switch
  5. Fixare formato date picker

Priorità 3 (copy, decisione utente):
  6. Label form "Data dell'evento"
  7. Sezione prezzi (se Nicola vuole)

================================================================================
