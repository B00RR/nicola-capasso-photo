export type Lang = "it" | "en";

export const translations = {
  it: {
    nav: { home: "Home", portfolio: "Portfolio", contact: "Contatti" },
    hero: {
      eyebrow: "Fotografo di matrimoni — Italia & oltre",
      title: ["Storie", "che restano,", "luce che dura."],
      subtitle:
        "Nicola racconta matrimoni con sguardo discreto e cinematografico. Niente pose forzate — solo gli istanti veri di una giornata che non tornerà.",
      cta: "Scopri il portfolio",
      scroll: "Scorri",
    },
    about: {
      kicker: "Chi sono",
      title: "Un fotografo, una squadra,\nun racconto su misura.",
      body: [
        "Sono Nicola, fotografo freelance specializzato in matrimoni. Lavoro principalmente con coppie internazionali che cercano un racconto autentico, lontano dai cliché.",
        "Quando l'occasione lo richiede, mi affianca un team selezionato di professionisti — secondo fotografo, video, assistente — per garantire che ogni momento sia custodito.",
      ],
      stats: [
        { n: "120+", l: "Matrimoni raccontati" },
        { n: "18", l: "Paesi visitati" },
        { n: "7", l: "Anni di esperienza" },
      ],
    },
    services: {
      kicker: "Servizi",
      items: [
        { t: "Matrimoni", d: "Reportage completo della giornata, dalla preparazione al ricevimento." },
        { t: "Destination", d: "Disponibile a viaggiare ovunque per matrimoni internazionali." },
        { t: "Engagement", d: "Sessioni intime per raccontare la coppia prima del giorno più importante." },
        { t: "Team su richiesta", d: "Secondo fotografo, video e assistenti quando serve copertura completa." },
      ],
    },
    portfolio: {
      kicker: "Portfolio",
      title: "Gli ultimi anni,\nuno scroll alla volta.",
      intro: "Ogni anno porta con sé volti, luoghi e emozioni nuove. Scorri lungo la timeline o salta direttamente all'anno che preferisci.",
      viewAll: "Vedi il portfolio completo",
    },
    contact: {
      kicker: "Contatti",
      title: "Raccontami\nil vostro giorno.",
      body: "Scrivimi due righe sul vostro matrimonio: data, luogo, atmosfera. Ti rispondo entro 48 ore con disponibilità e dettagli.",
      form: {
        name: "Nome",
        email: "Email",
        date: "Data del matrimonio",
        location: "Luogo",
        message: "Raccontami qualcosa di voi",
        send: "Invia richiesta",
        sent: "Messaggio inviato. Ti risponderò presto.",
      },
      direct: "O contattami direttamente",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Email",
    },
    footer: {
      tagline: "Fotografia di matrimonio — disponibile in tutto il mondo",
      rights: "Tutti i diritti riservati",
    },
  },
  en: {
    nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
    hero: {
      eyebrow: "Wedding photographer — Italy & beyond",
      title: ["Stories", "that linger,", "light that lasts."],
      subtitle:
        "Nicola captures weddings with a quiet, cinematic eye. No forced poses — only the real moments of a day that will never come back.",
      cta: "Explore the portfolio",
      scroll: "Scroll",
    },
    about: {
      kicker: "About",
      title: "One photographer, a team,\na story made for you.",
      body: [
        "I'm Nicola, a freelance photographer specialised in weddings. I mostly work with international couples who are looking for an honest story, far from clichés.",
        "When the day calls for it, a hand-picked team works alongside me — second shooter, video, assistant — to make sure every moment is held.",
      ],
      stats: [
        { n: "120+", l: "Weddings told" },
        { n: "18", l: "Countries visited" },
        { n: "7", l: "Years of practice" },
      ],
    },
    services: {
      kicker: "Services",
      items: [
        { t: "Weddings", d: "Full-day reportage, from getting ready to the last dance." },
        { t: "Destination", d: "Available to travel anywhere for international weddings." },
        { t: "Engagement", d: "Intimate sessions to tell your story before the big day." },
        { t: "Team on request", d: "Second shooter, video and assistants whenever full coverage is needed." },
      ],
    },
    portfolio: {
      kicker: "Portfolio",
      title: "The last few years,\none scroll at a time.",
      intro: "Every year brings new faces, places and feelings. Scroll along the timeline or jump straight to a year.",
      viewAll: "View the full portfolio",
    },
    contact: {
      kicker: "Contact",
      title: "Tell me\nabout your day.",
      body: "Drop me a few lines about your wedding: date, place, mood. I'll reply within 48 hours with availability and details.",
      form: {
        name: "Name",
        email: "Email",
        date: "Wedding date",
        location: "Location",
        message: "Tell me a bit about you",
        send: "Send enquiry",
        sent: "Message sent. I'll be in touch soon.",
      },
      direct: "Or reach me directly",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Email",
    },
    footer: {
      tagline: "Wedding photography — available worldwide",
      rights: "All rights reserved",
    },
  },
} as const;

export type Translations = typeof translations.it;
