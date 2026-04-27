================================================================================
ADVERSARIAL UX TEST REPORT — nicola-capasso-photo
Generato: 2026-04-27
================================================================================

PERSONA: "Zia Rosetta" — 67 anni, pensionata, cerca fotografo per comunione nipote.
Tech: solo WhatsApp (installato dalla figlia). Non usa email.
Tolleranza: 10 secondi. Se non capisce, chiude.

================================================================================
STEP 3: IL RANT (in-character)
================================================================================

Recensione di Zia Rosetta per "Nicola Fotografo"

Complessivo: NO. Sito bellino ma senza foto. A che serve?

IL BUONO (a malincuore):
- Colori soft, non mi abbaglia
- In fondo c'e' WhatsApp, quello lo so usare
- C'e' anche il numero di telefono, mio marito puo' chiamare
- Quando cambio lingua diventa tutto italiano, bello

IL BRUTTO (problemi veri):
- Arrivo sul sito: TUTTO IN INGLESE. "Stories that linger" che vuol dire?
  Io cerco un fotografo per la COMUNIONE di mia nipote, non so se questo fa
  anche comunioni. Sembra che faccia solo matrimoni.
- Cerco Portfolio per vedere le foto. Clicco. Vedo una colonna a sinistra con
  2025, 2024, 2023, 2022. A destra? BIANCO. Niente. Solo nomi di coppie
  scritti uno sotto l'altro come una lista della spesa. Ma le foto?
  Dov'e' il portfolio?? Clicco su "Sofia & Marco" perche' voglio vedere le
  foto... e arrivo su una pagina con UNA foto in alto e del testo. Sotto c'e'
  scritto "GALLERY" ma e' TUTTO BIANCO. Nessuna foto nella galleria.
- Quindi il fotografo ha un sito con zero foto visibili. Come faccio a sapere
  se mi piace il suo stile? Non posso.
- Vado su Contatti. Il modulo mi chiede "DATA DEL MATRIMONIO". Ma io non ho
  un matrimonio, ho una COMUNIONE. Non posso scrivergli? Devo inventare una
  data di matrimonio finta? Questo e' assurdo.
- NON C'E' SCRITTO DA NESSUNA PARTE QUANTO COSTA. Devo scrivergli senza sapere
  se posso permettermelo? E se costa 5000 euro?
- Certe parole restano in inglese anche in italiano: "Destination", "Engagement".
  Ma che significano? Perche' non scrivono tutto in italiano?
- I campi del modulo sono strani, solo una riga sottile in basso. Sembra che
  manchi il bordo. Non so bene dove cliccare.

IL PESSIMO (showstopper):
- Non vedo una SOLA FOTO nel portfolio. E' un sito di un fotografo senza foto.
  Nella lista portfolio ci sono solo nomi. Nella pagina dettaglio c'e' una
  foto in cima ma la galleria e' vuota. Se non posso vedere le sue foto,
  chiudo e cerco su Facebook nel gruppo della parrocchia.

VERDETTO: "Carino ma inutile. Non ci sono foto, non so quanto costa, e
sembra che faccia solo matrimoni. Torno su Facebook."

================================================================================
STEP 4: FILTRO PRAGMATISMO
================================================================================

[RED] REAL UX BUG — Qualsiasi utente avrebbe questo problema

1. PORTFOLIO LISTA SENZA ANTEPRIME — La pagina /portfolio mostra la timeline
   ma le storie sono solo link testuali senza alcuna preview, thumbnail o
   card visiva. Per un fotografo, il portfolio visivo e' fondamentale.
   NON e' un problema della persona, e' un bug di design/contenuto.
   Fix: aggiungere card con immagine di copertina per ogni storia.

2. GALLERY STORY COMPLETAMENTE VUOTA — La pagina /portfolio/:slug ha un
   hero image e testo, ma la sezione "GALLERY" sotto e' vuota. Zero foto.
   L'utente si aspetta di vedere una galleria del matrimonio.
   Fix: caricare e visualizzare le immagini della galleria per ogni storia.

3. MANCANZA TOTALE DI PREZZI — Nessuna indicazione di budget/fascia di
   prezzo. Questo e' un problema per QUALSIASI utente. Alto tasso di abbandono.
   Fix: aggiungere "Investimento" o "A partire da X" nella pagina Contatti.

4. CONTACT FORM ASSUME SEMPRE MATRIMONIO — Campo "DATA DEL MATRIMONIO" e
   testo "Raccontami il vostro giorno" escludono chi cerca altri eventi.
   Fix: "Data dell'evento", "Raccontami il tuo evento", dropdown "Tipo di evento".

[YELLOW] VALIDO MA BASSA PRIORITA'

5. SWITCH LANGUAGE SENZA INDICATORE — Il bottone dice "Switch language" in
   inglese anche quando il sito e' in italiano. Un utente italiano non
   capisce cosa significhi. Comportamento OK, solo label confusionaria.
   Fix: cambiare label in base alla lingua attiva ("Cambia lingua" / "Change language").

6. CAMPI FORM CON SOLO BORDO INFERIORE — Stile minimalista trendy ma meno
   intuitivo per utenti anziani. Il campo e' comunque cliccabile.
   Fix: aggiungere focus ring piu' evidente oppure bordo completo su focus.

7. TERMINI INGLESI IN VERSIONE ITALIANA — "Destination", "Engagement",
   "Team on request" restano in inglese. Leggermente confusionario per non
   del settore, ma sono termini wedding standard.
   Fix: tradurre in italiano nella versione IT.

[WHITE] PERSONA NOISE — "Odio i computer", non un problema del prodotto

8. "Solo WhatsApp, nessun numero normale" — Zia Rosetta si lamenta, ma il
   link telefonico e' presente. Il target reale (25-40) preferisce WhatsApp.
   Il numero c'e', e' un link cliccabile.

[GREEN] FEATURE REQUEST — Buona idea nascosta nella lamentela

9. AGGIUNGERE SEZIONE "ALTRO DA MATRIMONIO" — Nella homepage i servizi
   elencano solo Matrimoni/Destination/Engagement/Team. Non e' chiaro se
   Nicola accetti comunioni, battesimi, eventi aziendali.
   Fix: aggiungere riga "Altre occasioni su richiesta" nella sezione servizi.

================================================================================
STEP 5: TICKET AZIONABILI (RED e GREEN solo)
================================================================================

TICKET #1 [RED] [BLOCKER] Portfolio lista senza anteprime immagine
  Titolo: Aggiungere card con cover image a ogni storia nella lista portfolio
  Quote: "Vedo nomi di coppie scritti uno sotto l'altro ma LE FOTO DOV'E?"
  Problema: La pagina /portfolio mostra solo testo link per ogni storia,
    senza alcuna preview visiva. Per un fotografo, questa e' la pagina
    principale e deve mostrare il lavoro.
  Fix: Aggiungere componente card con immagine di copertina (coverImage),
    titolo coppia, location. Griglia responsive 1 col mobile, 2-3 col desktop.
  Label: ux-review, blocker

TICKET #2 [RED] [BLOCKER] Gallery storia vuota — nessuna immagine visibile
  Titolo: Gallery immagini non visualizzate nelle pagine story
  Quote: "Clicco su Sofia & Marco, c'e' scritto GALLERY ma e' TUTTO BIANCO."
  Problema: La sezione gallery nelle pagine /portfolio/:slug e' vuota.
    Nonostante gli elementi <figure> siano presenti nel DOM, le immagini
    mancano. Probabilmente non sono state caricate o il componente gallery
    non riceve i dati.
  Fix: Verificare che le immagini della storia siano presenti nei dati,
    passate al componente gallery, e renderizzate correttamente. Testare
    con immagini Cloudinary.
  Label: ux-review, blocker

TICKET #3 [RED] Mancanza indicazioni prezzo
  Titolo: Aggiungere fascia di prezzo o "a partire da" nel sito
  Quote: "NON C'E' SCRITTO DA NESSUNA PARTE QUANTO COSTA."
  Problema: L'assenza di informazioni sui costi costringe ogni utente a
    contattare senza sapere se rientra nel budget. Alto tasso di abbandono.
  Fix: Aggiungere sezione "Investimento" in Contact o pagina dedicata.
    Non serve listino completo, basta una fascia indicativa.
  Label: ux-review, conversion

TICKET #4 [RED] Form contatto esclusivo per matrimoni
  Titolo: Form contatto assume solo matrimoni, esclude altri eventi
  Quote: "Il modulo mi chiede DATA DEL MATRIMONIO. Ma io ho una COMUNIONE."
  Problema: Il form contatto ha campo "Data del matrimonio" e testo orientato
    solo a matrimoni. Utenti con altri eventi non sanno se possono contattare.
  Fix: Cambiare label in "Data dell'evento" e testo in "Raccontami il tuo evento".
    Aggiungere campo dropdown "Tipo di evento": Matrimonio, Engagement, Altro.
  Label: ux-review

TICKET #5 [GREEN] Chiarire servizi oltre al matrimonio
  Titolo: Aggiungere "Altre occasioni su richiesta" nella sezione servizi
  Quote: "Io cerco un fotografo per la COMUNIONE... sembra che faccia solo matrimoni."
  Problema: L'homepage elenca solo Matrimoni/Destination/Engagement/Team.
    Non e' chiaro se Nicola accetti altri tipi di evento.
  Fix: Aggiungere riga nella sezione servizi: "Altre occasioni su richiesta —
    battesimi, comunioni, eventi aziendali" con link alla pagina contatti.
  Label: ux-review, feature-request

================================================================================
RIEPILOGO
================================================================================

Blocchi totali:       2 (portfolio senza anteprime, gallery vuota)
Problemi reali:       2 (prezzi mancanti, form matrimonio-only)
Feature request:      1 (altri eventi)
Problemi minori:      3 (language switch label, form stile, termini inglesi)
Rumore persona:       1 (solo WhatsApp — mitigato da presenza link telefono)

Raccomandazione: I 2 BLOCKER (portfolio senza anteprime e gallery vuota)
rendono il sito NON FUNZIONALE per lo scopo principale (mostrare foto).
Vanno risolti PRIMA di qualsiasi altra ottimizzazione.

Test eseguito su: http://localhost:4173 (build preview branch feat/shoot-pages-and-ux-fixes)
Nessun errore JS in console.
Splash intro non visibile: gia' visto in sessioni precedenti, localStorage settato.
================================================================================
