---
title: "Guida definitiva — Deploy sito su Netlify"
subtitle: "Fotografo Nicola — CMS, Form e Hosting a costo zero"
author: "B00RR"
date: "2026-04-21"
lang: it
---

# Introduzione

Questa guida spiega nel dettaglio come caricare il sito di Nicola (fotografo wedding) su Netlify, collegare il CMS per la gestione autonoma dei contenuti da parte del cliente e configurare tutto a costo zero.

**Stack tecnologico:**
- **Hosting:** Netlify (gratuito fino a 100 GB/mese)
- **Form contatti:** Netlify Forms (100 invii/mese gratis)
- **CMS per il cliente:** Decap CMS (gratuito, integrato con Netlify Identity)
- **Immagini:** Cloudinary (25 GB di storage gratis)
- **Codice sorgente:** GitHub

**Costo totale:** 0 euro/mese.

---

# Prerequisiti

Prima di iniziare, assicurati di avere:

1. Un account **GitHub** attivo (https://github.com/signup).
2. Il codice del sito pushato su un repository GitHub pubblico.
3. Un browser web (Chrome, Firefox, Edge).

Se il repository non esiste ancora su GitHub, crea uno nuovo chiamato `nicola-captures-dreams` e pusha il codice del sito:

```bash
cd "/mnt/c/Users/loren/OneDrive/Desktop/sito nicola"
git remote add origin https://github.com/TUO_USERNAME/nicola-captures-dreams.git
git branch -M main
git push -u origin main
```

Ora sei pronto per iniziare.

---

# Passo 1 — Registrazione su Netlify

1. Apri il browser e vai su: **https://app.netlify.com/signup**
2. Clicca sul pulsante **"Sign up with GitHub"**.
3. Autorizza Netlify ad accedere al tuo account GitHub.
4. Nella schermata successiva, Netlify potrebbe chiederti quali repository vuoi autorizzare. Per semplicita, seleziona **"All repositories"** oppure scegli solo quello del sito.

> **Consiglio:** usare GitHub per l'accesso semplifica il collegamento tra Netlify e il tuo codice, eliminando configurazioni manuali.

5. Completata la registrazione, vedrai la dashboard di Netlify con la scritta **"Add new site"**.

---

# Passo 2 — Collegamento del repository

1. Dalla dashboard di Netlify, clicca su **"Add new site"**.
2. Seleziona **"Import an existing project"**.
3. Nella lista dei provider Git, clicca su **GitHub**.
4. Netlify mostrera una lista dei tuoi repository. Cerca e seleziona **"nicola-captures-dreams"** (o il nome che hai dato al tuo repository).
5. Nella pagina successiva **"Site settings, and deploy!"**, lascia le impostazioni cosi come sono o verifica che siano:
   - **Branch to deploy:** `main`
   - **Base directory:** (lascia vuoto)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clicca il pulsante **"Deploy site"**.

Netlify inizia immediatamente la prima build. Il processo dura circa **1 minuto**. In alto a destra vedrai:

- **Site overview** con l'URL temporaneo (es. `https://nicola-captures-dreams-abc123.netlify.app`)
- Lo stato del deploy che passa da "Building" a "Published"

7. Clicca sull'URL per verificare che il sito sia visibile online.

> **Nota:** l'URL temporaneo contenente numeri e lettere casuali e il dominio di default di Netlify. Piu avanti puoi collegare un dominio personalizzato (es. `nicola-wedding.it`).

---

# Passo 3 — Configurazione Netlify Forms

Il sito contiene un form contatti che invia i dati direttamente a Netlify, senza bisogno di backend proprio.

1. Una volta che il primo deploy e completato (sito gia online), vai su **Site configuration** (icona ingranaggio a sinistra).
2. Nel menu laterale, clicca su **"Forms"**.
3. Se il form e stato riconosciuto automaticamente, vedrai una voce chiamata **"contact"** nella lista.
   - Se NON appare: attendi qualche minuto, o fai un nuovo deploy (pusha qualsiasi modifica su `main`).
   - Oppure clicca su **"Enable form detection"** e verifica che sia attivo.
4. Ogni volta che un utente compila il form sul sito, Netlify salva l'invio in questa sezione. Puoi scaricare i dati in CSV o riceverli via email.

> **Limite gratuito:** 100 invii al mese. Per un fotografo wedding sono piu che sufficienti.

---

# Passo 4 — Attivazione Netlify Identity (login per il CMS)

Il CMS Decap (installato in `/admin`) richiede un sistema di autenticazione. Netlify Identity gestisce gli utenti gratuitamente.

1. Nel menu laterale del sito su Netlify, clicca su **"Identity"**.
2. Clicca il grande pulsante **"Enable Identity"**.
3. Una volta attivo, vai su **"Settings and usage"** (in alto a destra nella pagina Identity).
4. Sezione **Registration**:
   - Cambia da "Open" a **"Invite only"**. Questo impedisce che chiunque si registri autonomamente; solo tu potrai invitare il cliente.
5. Sezione **External providers**:
   - Scorri fino a trovare **Git Gateway**.
   - Clicca su **"Enable Git Gateway"**.
   - Questo passaggio e fondamentale: permette al CMS di fare commit direttamente sul repository GitHub quando il cliente salva le modifiche.

6. Torna su **"Identity"** e clicca su **"Invite users"**.
   - Inserisci l'indirizzo email del cliente (Nicola).
   - Lui ricevera una mail con un link per impostare la password.

---

# Passo 5 — Configurazione Cloudinary (immagini)

Il cliente potra caricare e cambiare foto del portfolio tramite il CMS. Le immagini non vengono salvate nel repository (che diventerebbe troppo pesante) ma su **Cloudinary**, un servizio CDN gratuito.

## 5.1 Registrazione Cloudinary

1. Vai su **https://cloudinary.com/users/register_free**.
2. Crea un account gratuito (puoi usare lo stesso email o uno diverso).
3. Una volta dentro la dashboard, trova in alto le informazioni:
   - **Cloud name** (es. `nicola-wedding`) — serve per il CMS
   - **API Key** (stringa numerica, es. `123456789`) — serve per il CMS
   - **API Secret** — NON serve, tienilo segreto.

## 5.2 Collegamento al CMS

1. Torna sul tuo repository GitHub.
2. Trova il file: `public/admin/config.yml`.
3. Modifica le righe segnaposto:

```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: nicola-wedding   # <-- sostituisci con il tuo cloud name
    api_key: 123456789           # <-- sostituisci con la tua API key
```

4. Salva il file e fai commit + push su `main`:

```bash
git add public/admin/config.yml
git commit -m "config: cloudinary media library"
git push origin main
```

5. Netlify ricostruira automaticamente il sito (vedrai un nuovo deploy iniziare nella dashboard).

---

# Passo 6 — Utilizzo del CMS da parte del cliente

Dopo aver attivato Identity e invitato il cliente, ecco cosa deve fare Nicola.

## 6.1 Primo accesso

1. Nicola riceve una email da Netlify con oggetto **"You've been invited to join..."**.
2. Clicca il link nell'email e imposta una password.
3. Va sul sito e aggiunge `/admin` alla fine dell'URL. Esempio:
   `https://nicola-captures-dreams-abc123.netlify.app/admin`
4. Clicca **"Login with Netlify Identity"** e inserisce email e password appena create.

## 6.2 Struttura del pannello

Nel CMS vedra 4 sezioni nella barra laterale sinistra:

| Sezione | Cosa contiene |
|---------|---------------|
| **Impostazioni Generali** | Contatti (WhatsApp, email, Instagram), testi menu e footer |
| **Home Page** | Testi della pagina iniziale (hero, about, servizi) |
| **Portfolio** | Anni e fotografie del portfolio |
| **Contatti** | Testi della pagina contatti |

## 6.3 Modificare i testi

1. Clicca su una sezione (es. "Home Page").
2. Clicca sul file da modificare (es. "Testi Home").
3. Modifica i campi. Per le immagini: clicca su un campo "Immagine", carica un file. Verra automaticamente caricato su Cloudinary.
4. Clicca **"Save"** (in alto a destra).
   - Questo crea una bozza nel repository GitHub (un commit sul branch `cms/main`).
5. Quando e pronto a pubblicare, clicca **"Publish"** (accanto a Save).
   - Questo fa il merge del branch e Netlify ricostruisce il sito in ~1 minuto.

> **Nota:** per i campi con doppia lingua (IT e EN), e importante compilare sempre entrambe le versioni per mantenere il sito coerente.

---

# Passo 7 — Dominio personalizzato (opzionale ma consigliato)

L'URL temporaneo di Netlify non e professionale per un fotografo. Ecco come collegare un dominio acquistato (es. da GoDaddy, Aruba, Register.it).

1. Compra un dominio (es. `nicola-wedding.it`) da un registrar a tua scelta.
2. Nella dashboard di Netlify, vai su **"Domain settings"**.
3. Clicca su **"Add custom domain"**.
4. Inserisci il dominio acquistato (es. `www.nicola-wedding.it`) e clicca **"Verify"**.
5. Netlify ti dara istruzioni su quali record DNS inserire nel pannello del tuo registrar. Tipicamente:
   - Un record **CNAME** che punta il dominio a `nicola-captures-dreams-abc123.netlify.app`
   - Oppure record **A** con IP di Netlify (fornito automaticamente)
6. Vai nel pannello del tuo registrar (GoDaddy/Aruba/etc.) e inserisci i DNS indicati da Netlify.
7. Attendi la propagazione DNS (da pochi minuti a 24 ore).
8. Netlify fornisce automaticamente il certificato SSL (HTTPS) con Let's Encrypt. Non devi fare nulla.

> **Costo:** il dominio costa circa 10-15 euro all'anno. L'hosting e il SSL rimangono gratuiti.

---

# Passo 8 — Gestione quotidiana

Dopo la consegna, il tuo intervento deve essere zero. Ecco cosa succede automaticamente e cosa no:

| Evento | Chi lo gestisce | Come |
|--------|-----------------|------|
| Cliente cambia testo nel CMS | Cliente | Via `/admin`, poi "Publish" |
| Cliente carica nuova foto | Cliente | Tramite CMS, foto salvate su Cloudinary |
| Arriva nuovo contatto dal form | Tu/Cliente | Notifica via email da Netlify Forms |
| Sito si ricostruisce | Automatico | Ogni volta che il CMS pubblica o fai push su `main` |
| Superamento limiti free | Tu/Cliente | Netlify ti avvisa via email, raramente necessario per un sito wedding |

---

# Risoluzione problemi comuni

## Sito non si aggiorna dopo modifica CMS
1. Verifica che il cliente abbia cliccato **"Publish"** (non solo "Save").
2. Nella dashboard Netlify, vai in **"Deploys"** — il nuovo deploy e iniziato?
3. Se e iniziato ma e rosso (fallito), clicca sul deploy per leggere l'errore.

## Il CMS non carica le immagini
1. Verifica che `cloud_name` e `api_key` in `public/admin/config.yml` siano corretti.
2. Assicurati che `config.yml` sia dentro la cartella `public/admin/` e venga incluso nel deploy.

## Il form contatti non invia email
1. Verifica in **Netlify → Forms** che il form "contact" sia riconosciuto.
2. Se non appare, fai un commit vuoto per forzare un nuovo deploy (`git commit --allow-empty -m "trigger" && git push`).
3. Verifica che i campi del form nel codice HTML abbiano l'attributo `name` (gia presente nel sito).

## Autenticazione CMS non funziona
1. Netlify Identity e abilitato? Controlla la sezione Identity nella dashboard.
2. Git Gateway e abilitato? Controlla in Identity → External providers.
3. L'utente (cliente) ha ricevuto l'email di invito e ha impostato la password?

---

# Riepilogo checklist pre-consegna

Prima di consegnare il sito al cliente, verifica questi punti:

- [ ] Sito online su Netlify (URL temporaneo funziona)
- [ ] Form contatti invia dati correttamente a Netlify Forms
- [ ] Netlify Identity abilitato e configurato su "Invite only"
- [ ] Git Gateway abilitato
- [ ] Cloudinary collegato (cloud_name e api_key inseriti in config.yml)
- [ ] Cliente invitato via email in Netlify Identity
- [ ] Cliente ha testato l'accesso a `/admin` e vede il CMS
- [ ] Cliente ha fatto almeno una modifica di prova e pubblicato
- [ ] Build e test locali passano (`npm run build`, `npm test`)

---

# Informazioni di contatto e supporto

| Servizio | URL supporto |
|----------|--------------|
| Netlify Docs | https://docs.netlify.com |
| Netlify Forums | https://answers.netlify.com |
| Decap CMS Docs | https://decapcms.org/docs |
| Cloudinary Docs | https://cloudinary.com/documentation |

---

# Appendice — Comandi utili

```bash
# Build locale (per verificare errori prima di pushare)
npm run build

# Test	npm test

# Dev server locale
npm run dev

# Push forzato su main (se non funziona il normale push)
git push origin main --force

# Stato del repo
git status

# Commit di un file specifico
git add <file>
git commit -m "descrizione"
git push origin main
```

---

*Guida generata automaticamente il 21 aprile 2026.*
