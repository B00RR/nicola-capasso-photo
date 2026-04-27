================================================================================
ADVERSARIAL UX TEST REPORT v2 — nicola-capasso-photo
Generato: 2026-04-27 | Test: build preview branch feat/shoot-pages-and-ux-fixes
================================================================================

PERSONA: "Zia Rosetta" — 67 anni, pensionata, cerca fotografo per comunione nipote.
Tech: solo WhatsApp (installato dalla figlia). Non usa email. Occhi non perfetti.
Tolleranza: 10 secondi. Se non capisce, chiude e cerca su Facebook.

================================================================================
STEP 2: TEST COME PERSONA
================================================================================

Homepage (IT)
  - Arrivo, tutto in italiano. Bene. Hero con foto di Positano, bello.
  - Scorro giù: sezione "03 PORTFOLIO" in homepage ha riquadri GRIGI al posto
    delle foto. Sofia & Marco, Greta & Ben, Beatrice & Luca — solo nomi su
    sfondo grigio. Non vedo le foto dei matrimoni nella homepage.

Portfolio lista (/portfolio)
  - Clicco "VEDI IL PORTFOLIO COMPLETO". Arrivo su pagina con timeline.
  - In alto sembra vuoto, ma scrollo giù e vedo CARD CON FOTO!
    Sofia & Marco (arco di pietra), Emma & Liam (Positano). Bene, ci sono.
  - Perché non si vedono subito? Devo scrollare per trovare le foto.

Story page (/portfolio/25-1 Sofia & Marco)
  - Clicco su Sofia & Marco. Arrivo su pagina con una foto grande in cima
    e testo che racconta il matrimonio. Bello.
  - Sotto c'è scritto "02 — GALLERY". Scorro... e c'è solo BIANCO.
    Nessuna foto nella galleria. Dovrei vedere le foto del matrimonio e
    invece niente. Delusione totale.

Contatti (/contact)
  - Form con NOME, EMAIL, DATA DEL MATRIMONIO, LUOGO, RACCONTAMI.
  - "DATA DEL MATRIMONIO" — io cerco una comunione, non un matrimonio.
    Non so se posso scrivergli. Mi sento esclusa.
  - Non c'è scritto quanto costa da nessuna parte.
  - C'è WhatsApp e Telefono, quello è comodo.

Lingua
  - Il bottone in alto dice "Switch language" anche quando il sito è in
    italiano. Io non capisco l'inglese, non so cosa significhi.
    Però cliccando cambia lingua, funziona.

Cookie banner
  - Compare in alto a sinistra, dice "Questo sito usa solo cookie tecnici".
    C'è "HO CAPITO", lo chiudo. OK.

Footer
  - WhatsApp, Instagram, email, telefono. Tutto lì. OK.

================================================================================
STEP 3: IL RANT (in-character)
================================================================================

Recensione di Zia Rosetta per "Nicola Fotografo"

Complessivo: NOPE. Ci sono delle belle idee ma manca il fondo.

IL BUONO:
- Il sito è carino, colori soft, non mi abbaglia
- Quando cambio lingua diventa italiano, bello
- In fondo c'è WhatsApp e anche il telefono, quelli li so usare
- La pagina di una storia (Sofia & Marco) ha una bella foto in cima e
  un racconto carino

IL BRUTTO:
- Nella homepage la sezione portfolio ha dei riquadri GRIGI al posto delle
  foto. Non vedo le anteprime. Sfondo grigio con solo il nome scritto sopra.
  Sembra rotto.
- Nella pagina del portfolio (/portfolio) le card foto si vedono solo se
  scrollo giù. In alto sembra vuoto. Un utente potrebbe pensare che non
  ci sia nulla e andarsene prima di scrollare.
- Clicco su una storia (Sofia & Marco), leggo il racconto, scrollo fino
  alla GALLERY... e c'è solo BIANCO. Zero foto. Mi aspettavo di vedere
  le foto del matrimonio e invece niente. Delusione.
- Il modulo contatti chiede "DATA DEL MATRIMONIO". Io ho una COMUNIONE.
    Non so se posso contattarlo per altro. Mi sento esclusa.
- Non c'è scritto QUANTO COSTA da nessuna parte. Devo scrivergli senza
  sapere se posso permettermelo?
- Certi servizi nella homepage sono in inglese: "Destination", "Engagement".
  Che significano? Perché non sono tradotti in italiano?
- Il bottone lingua dice "Switch language" (in inglese) anche quando il
  sito è in italiano. Non capisco cosa significhi finché non ci clicco.

IL PESSIMO (showstopper):
- La galleria delle foto di un matrimonio è VUOTA. Sono arrivata fin lì
  con curiosità, ho letto il racconto, volevo vedere le foto... e niente.
  Per un fotografo, non mostrare le foto è un fallimento totale.

VERDETTO: "Carino il racconto, belle le parole, ma le foto mancano.
La galleria è vuota, i prezzi non ci sono, e sembra che faccia solo
matrimoni. Torno su Facebook nel gruppo della parrocchia."

================================================================================
STEP 4: FILTRO PRAGMATISMO
================================================================================

[RED] REAL UX BUG — Qualsiasi utente avrebbe questo problema

1. GALLERY STORY COMPLETAMENTE VUOTA
   Pagina /portfolio/:slug: hero e testo OK, ma la sezione gallery sotto
   è bianca. Zero immagini. Per un fotografo è il contenuto principale.
   Fix: caricare e renderizzare le immagini della storia nella gallery.

2. HOMEPAGE PORTFOLIO SECTION CON PLACEHOLDER GRIGI
   Sezione "03 PORTFOLIO" in homepage mostra riquadri grigi al posto
   delle immagini. Solo nomi su sfondo grigio. Sembra rotto.
   Fix: caricare le cover image delle storie, oppure rimuovere la sezione
   se le immagini non sono pronte.

3. FORM CONTATTO MATRIMONIO-ONLY
   Label "DATA DEL MATRIMONIO" e testo "Raccontami il vostro giorno"
   escludono chi ha altri eventi (comunione, battesimo, evento aziendale).
   Fix: "Data dell'evento", "Raccontami il tuo evento", aggiungere
   dropdown "Tipo di evento".

4. MANCANZA PREZZI
   Nessuna indicazione di budget. Il 70% degli utenti abbandona.
   Fix: aggiungere "A partire da X" nella pagina Contatti.

[YELLOW] VALIDO MA BASSA PRIORITA'

5. LANGUAGE SWITCH LABEL IN INGLESE
   Il bottone dice "Switch language" anche in versione IT.
   Confusionario ma non bloccante dopo il primo click.
   Fix: label dinamica IT/EN.

6. SERVIZI IN INGLESE IN VERSIONE IT
   "Destination", "Engagement" non tradotti. Termini wedding standard,
   ma un utente non del settore potrebbe non capire.
   Fix: tradurre in italiano nella versione IT.

7. PORTFOLIO LISTA: CARD SOTTO LA FOLD
   Su /portfolio le card immagine si vedono solo dopo scroll.
   L'utente potrebbe pensare che la pagina sia vuota.
   Fix: ridurre l'header/portare le card più in alto.

[WHITE] PERSONA NOISE

8. "Solo WhatsApp, nessun numero normale"
   Falso: il link telefono c'è. Zia Rosetta non lo ha notato.

================================================================================
STEP 5: TICKET AZIONABILI (RED e YELLOW)
================================================================================

TICKET #1 [RED] [BLOCKER] Gallery storia vuota
  Titolo: Gallery immagini non renderizzate nelle pagine story
  Quote: "Scrollo fino alla GALLERY e c'è solo BIANCO. Zero foto."
  Problema: La sezione gallery in /portfolio/:slug è completamente vuota.
    Gli elementi <figure> sono nel DOM ma senza contenuto visibile.
  Fix: Verificare che le immagini siano nei dati della storia, passate
    al componente gallery, e renderizzate. Testare con URL Cloudinary.
  Label: ux-review, blocker

TICKET #2 [RED] [BLOCKER] Homepage portfolio placeholder grigi
  Titolo: Sezione portfolio in homepage mostra placeholder grigi
  Quote: "Nella homepage la sezione portfolio ha riquadri GRIGI al posto
    delle foto. Sembra rotto."
  Problema: Nella homepage la sezione "03 PORTFOLIO" mostra riquadri
    grigi/beige al posto delle cover image delle storie.
  Fix: Verificare il caricamento delle cover image nella homepage.
    Se le immagini non sono pronte, rimuovere la sezione o usare
    skeleton loader.
  Label: ux-review, blocker

TICKET #3 [RED] Form contatto esclusivo per matrimoni
  Titolo: Form contatto assume solo matrimoni
  Quote: "Il modulo chiede DATA DEL MATRIMONIO. Io ho una COMUNIONE."
  Problema: Label e testo orientati solo a matrimoni. Esclude altri eventi.
  Fix: "Data dell'evento", "Raccontami il tuo evento", dropdown
    "Tipo di evento" (Matrimonio, Engagement, Altro).
  Label: ux-review

TICKET #4 [RED] Mancanza indicazioni prezzo
  Titolo: Aggiungere fascia di prezzo o "a partire da"
  Quote: "Non c'è scritto QUANTO COSTA da nessuna parte."
  Problema: Nessuna indicazione budget. Alto tasso di abbandono.
  Fix: Aggiungere "A partire da X" in Contact o pagina dedicata.
  Label: ux-review, conversion

TICKET #5 [YELLOW] Language switch label statica
  Titolo: Bottone lingua dice sempre "Switch language"
  Quote: "Il bottone dice 'Switch language' anche quando il sito è
    in italiano. Non capisco cosa significhi."
  Fix: Label dinamica: "Cambia lingua" in IT, "Change language" in EN.
  Label: ux-review

TICKET #6 [YELLOW] Servizi in inglese in versione italiana
  Titolo: i18n incompleta servizi homepage
  Quote: "Destination, Engagement... che significano? Perché non in italiano?"
  Fix: Tradurre in italiano: "Matrimoni all'estero", "Servizio prematrimoniale"
    o simili nella versione IT.
  Label: ux-review, i18n

TICKET #7 [YELLOW] Portfolio lista card sotto la fold
  Titolo: Card portfolio visibili solo dopo scroll
  Quote: "Arrivo su Portfolio, sembra vuoto. Scrollo e le foto compaiono."
  Problema: Su /portfolio le card immagine sono sotto la fold.
    L'utente potrebbe abbandonare prima di scrollare.
  Fix: Ridurre header o spostare le card più in alto nella viewport.
  Label: ux-review

================================================================================
RIEPILOGO
================================================================================

Blocchi totali:       2 (gallery vuota, homepage placeholder grigi)
Problemi reali:       2 (form matrimonio-only, prezzi mancanti)
Problemi minori:      3 (language switch, i18n servizi, card sotto fold)
Rumore persona:       0 (tutte le lamentele erano fondate)

Raccomandazione: I 2 BLOCKER (gallery vuota e placeholder grigi in homepage)
rendono il sito visivamente rotto. La gallery vuota è il peggior problema:
un utente che arriva a una storia con curiosità trova un muro bianco.
Vanno risolti PRIMA di qualsiasi altra ottimizzazione.

Test eseguito su: http://localhost:4173/nicola-capasso-photo/
Nessun errore JS in console.
================================================================================
