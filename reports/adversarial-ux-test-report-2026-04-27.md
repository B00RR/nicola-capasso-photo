================================================================================
ADVERSARIAL UX TEST REPORT — nicola-capasso-photo
Generato: 2026-04-27
================================================================================

PERSONA: "Zia Rosetta" — 67 anni, pensionata, cerca fotografo per comunione nipote.
Tech: solo WhatsApp (installato dalla figlia), Facebook per foto nipoti.
Tolleranza: 10 secondi. Se non capisce, chiude e dice "trova tu un altro".

================================================================================
STEP 3: IL RANT (in-character)
================================================================================

Recensione di Zia Rosetta per "Nicola Fotografo"

Complessivo: NO. Non ci capisco niente e non trovo quello che cerco.

IL BUONO (a malincuore):
- Il sito e' carino, colori soft, non mi abbaglia
- In fondo c'e' scritto WhatsApp, lo so usare
- La privacy sembra scritta bene, mia figlia dice che e' importante

IL BRUTTO (problemi veri):
- Arrivo sul sito: TUTTO IN INGLESE. "Stories that linger" che vuol dire? Io cerco
  un fotografo per la COMUNIONE di mia nipote, non capisco se questo fa anche
  comunioni o solo matrimoni. Mio nipote si sposa tra 15 anni, non ora.
- Cerco un bottone per mettere in italiano. Trovo "Switch language". Clicco.
  INVECE di cambiare lingua mi porta in un'altra pagina "Portfolio". Ma io volevo
  l'italiano! Riprovo, ora funziona. Ma perche' la prima volta no?
- Vado su Portfolio per vedere le foto. Clicco su "Sofia & Marco" per vedere le
  foto del matrimonio... e NON SUCCEDE NIENTE. Clicco, clicco, niente. Ma sono
  link o no? Non si apre nulla. Resto li' a guardare i nomi come un cretino.
- NELLA PAGINA PORTFOLIO non vedo NESSUNA FOTO. C'e' scritto "2025, 4 STORIES"
  ma sotto e' BIANCO. Vuoto. Dov'e' il portfolio? Non vedo neanche le
  anteprime. E' un sito di foto senza foto??
- Vado su Contatti. Il modulo mi chiede "DATA DEL MATRIMONIO". Ma io non ho un
  matrimonio, ho una COMUNIONE. Non posso scrivergli per una comunione? Devo
  inventare una data di matrimonio? Questo e' assurdo.
- NON C'E' SCRITTO DA NESSUNA PARTE QUANTO COSTA. Devo scrivergli per sapere
  se posso permettermelo? E se costa 5000 euro ho sprecato il suo tempo e il mio.
- C'e' solo WhatsApp, non c'e' un numero di telefono normale. Mio marito non ha
  WhatsApp, come fa a chiamare?
- Certe parole sono in inglese anche in italiano: "Destination", "Engagement".
  Ma che significano? Engagement e' fidanzamento? Perche' non scrivono
  "Fidanzamento" allora?
- I campi del modulo sono strani, solo una riga sottile. Sembra che manchi il
  bordo. Non so bene dove cliccare per scrivere.

IL PESSIMO (showstopper):
- Non vedo una SOLA FOTO nel portfolio. E' un sito di un fotografo senza foto.
  Se non posso vedere le sue foto, come faccio a sapere se mi piace il suo stile?
  Chiudo e cerco su Google "fotografo comunione [mia citta]".

VERDETTO: "Carino ma inutile. Non ci sono le foto, non so quanto costa, e
sembra che faccia solo matrimoni. Torno su Facebook a chiedere in gruppo."

================================================================================
STEP 4: FILTRO PRAGMATISMO
================================================================================

[RED] REAL UX BUG — Qualsiasi utente avrebbe questo problema

1. PORTFOLIO VISIBILMENTE VUOTO — La pagina /portfolio mostra la timeline
   (2025, 2024, etc.) ma ZERO contenuto sotto. Nessuna foto, nessuna card,
   nessun link funzionante. Un sito fotografo senza foto visibili e'
   inutile. NON e' un problema della persona, e' un bug reale.

2. LINK PORTFOLIO SULLA HOMEPAGE NON NAVIGANO — Cliccare su "Sofia & Marco"
   non fa nulla. L'utente si aspetta di vedere le foto del matrimonio.
   Nessuna pagina di dettaglio, nessun lightbox, nessun feedback.

3. MANCANZA TOTALE DI PREZZI — Nessuna indicazione di budget/fascia di
   prezzo. Questo e' un problema per QUALSIASI utente, non solo per Zia
   Rosetta. Il 70% degli utenti abbandona se non trova prezzi.

4. CONTACT FORM ASSUME SEMPRE MATRIMONIO — Il campo "DATA DEL MATRIMONIO"
   e il testo "Raccontami il vostro giorno" assumono che l'utente voglia
   un servizio matrimoniale. Nicola fa anche altri eventi (engagement,
   destination). Un utente con una comunione, un battesimo, o un evento
   aziendale non sa come contattarlo.

[YELLOW] VALIDO MA BASSA PRIORITA'

5. SWITCH LANGUAGE SENZA INDICATORE — Il bottone dice "Switch language" in
   inglese anche quando il sito e' in italiano. Un utente italiano non
   capisce cosa significhi. Il primo click naviga a portfolio invece di
   cambiare lingua. Comportamento confuso ma non bloccante dopo il primo
   tentativo.

6. CAMPI FORM CON SOLO BORDO INFERIORE — Stile minimalista trendy ma meno
   intuitivo per utenti anziani. Il campo e' comunque cliccabile.

7. DATE PICKER FORMATO AMERICANO mm/dd/yyyy — Su un sito italiano in
   italiano, la data mostra il formato americano. Leggermente confusionario.

[WHITE] PERSONA NOISE — "Odio i computer", non un problema del prodotto

8. "Destination" e "Engagement" in inglese — Zia Rosetta non li capisce,
   ma sono termini standard del settore wedding. Un utente 35enne che sta
   organizzando un matrimonio li capisce. Non serve tradurre in "Matrimoni
   all'estero" e "Servizio prematrimoniale".

9. Solo WhatsApp, nessun numero telefono normale — Zia Rosetta si lamenta,
   ma il link WhatsApp e' piu' efficace di un numero da copiare. Il
   target reale (coppie 25-40enne) preferisce WhatsApp.

[GREEN] FEATURE REQUEST — Buona idea nascosta nella lamentela

10. AGGIUNGERE SEZIONE "ALTRO DA MATRIMONIO" — Zia Rosetta cerca una
    comunione. Il sito parla solo di matrimoni. Se Nicola fa anche altri
    eventi, servirebbe una riga che dice "Matrimoni, engagement, e altri
    eventi su richiesta" per chiarire.

================================================================================
STEP 5: TICKET AZIONABILI (RED e GREEN solo)
================================================================================

TICKET #1 [RED] [BLOCKER] Portfolio page vuoto: nessuna foto visibile
  Titolo: Portfolio /portfolio mostra timeline vuota senza contenuto
  Quote: "NELLA PAGINA PORTFOLIO non vedo NESSUNA FOTO. E' un sito di foto senza foto?"
  Problema: La pagina portfolio renderizza la sidebar timeline ma il contenuto
    principale e' completamente vuoto. Nessuna card, nessuna anteprima, nessuna galleria.
  Fix: Verificare il rendering condizionale dei portfolio items. Possibile che il
    componente non riceva i dati o che ci sia un errore silenzioso nel caricamento.
  Label: ux-review, blocker

TICKET #2 [RED] [BLOCKER] Link portfolio sulla homepage non navigano
  Titolo: Click su nomi coppie in homepage non apre pagina dettaglio
  Quote: "Clicco su 'Sofia & Marco' e NON SUCCEDE NIENTE."
  Problema: I link alle storie portfolio (es. "Sofia & Marco") sembrano cliccabili
    ma non navigano da nessuna parte. URL non cambia, nessun contenuto si apre.
  Fix: Verificare i route handler per /portfolio/:slug o implementare lightbox/modale
    per visualizzare le gallery foto. Aggiungere cursor: pointer e feedback visivo.
  Label: ux-review, blocker

TICKET #3 [RED] Mancanza indicazioni prezzo
  Titolo: Aggiungere fascia di prezzo o "a partire da" nel sito
  Quote: "NON C'E' SCRITTO DA NESSUNA PARTE QUANTO COSTA."
  Problema: L'assenza totale di informazioni sui costi costringe ogni utente a
    contattare il fotografo senza sapere se rientra nel budget. Alto tasso di
    abbandono.
  Fix: Aggiungere una sezione "Investimento" o "A partire da X" nella pagina
    Contatti o in una pagina dedicata. Non serve listino completo, basta una
    fascia indicativa.
  Label: ux-review, conversion

TICKET #4 [RED] Form contatto esclusivo per matrimoni
  Titolo: Form contatto assume solo matrimoni, esclude altri eventi
  Quote: "Il modulo mi chiede DATA DEL MATRIMONIO. Ma io ho una COMUNIONE."
  Problema: Il form contatto ha campo "Data del matrimonio" e testo orientato
    solo a matrimoni. Utenti con altri eventi (comunioni, battesimi, eventi
    aziendali) non sanno se possono contattare Nicola.
  Fix: Cambiare label in "Data dell'evento" e testo in "Raccontami il tuo evento".
    Aggiungere un campo dropdown "Tipo di evento" con opzioni: Matrimonio,
    Engagement, Altro.
  Label: ux-review

TICKET #5 [GREEN] Chiarire servizi oltre al matrimonio
  Titolo: Aggiungere riga "Altri eventi su richiesta" nella sezione servizi
  Quote: "Io cerco un fotografo per la COMUNIONE... sembra che faccia solo matrimoni."
  Problema: La homepage elenca solo Weddings/Destination/Engagement/Team. Non e'
    chiaro se Nicola accetti altri tipi di evento.
  Fix: Aggiungere una riga nella sezione servizi: "Altre occasioni su richiesta"
    o simile, con link alla pagina contatti.
  Label: ux-review, feature-request

================================================================================
RIEPILOGO
================================================================================

Blocchi totali:       2 (portfolio vuoto, link non navigano)
Problemi reali:     2 (prezzi mancanti, form matrimonio-only)
Feature request:      1 (altri eventi)
Problemi minori:    3 (language switch, form stile, date picker)
Rumore persona:     2 (termini inglesi, solo WhatsApp)

Raccomandazione: I 2 BLOCKER (portfolio vuoto e link morti) rendono il sito
attualmente NON FUNZIONALE per lo scopo principale (mostrare foto). Vanno
risolti PRIMA di qualsiasi altra ottimizzazione.

Test eseguito su: https://b00rr.github.io/nicola-capasso-photo/ (deploy corrente)
Nessun errore JS in console. Nessuna immagine visibile nel portfolio.
