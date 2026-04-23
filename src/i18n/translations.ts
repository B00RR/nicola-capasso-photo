import homeData from "@/content/home.json";
import contactData from "@/content/contact.json";
import siteData from "@/content/site.json";
import legalData from "@/content/legal.json";

export type Lang = "it" | "en";

const buildLang = (lang: "it" | "en") => {
  const s = lang === "it" ? "_it" : "_en";
  return {
    nav: {
      home: siteData.nav[`home${s}` as keyof typeof siteData.nav],
      portfolio: siteData.nav[`portfolio${s}` as keyof typeof siteData.nav],
      contact: siteData.nav[`contact${s}` as keyof typeof siteData.nav],
    },
    hero: {
      eyebrow: homeData.hero[`eyebrow${s}` as keyof typeof homeData.hero],
      title: homeData.hero[`title${s}` as keyof typeof homeData.hero] as string[],
      subtitle: homeData.hero[`subtitle${s}` as keyof typeof homeData.hero],
      cta: homeData.hero[`cta${s}` as keyof typeof homeData.hero],
      scroll: homeData.hero[`scroll${s}` as keyof typeof homeData.hero],
    },
    about: {
      kicker: homeData.about[`kicker${s}` as keyof typeof homeData.about],
      title: homeData.about[`title${s}` as keyof typeof homeData.about],
      body: homeData.about[`body${s}` as keyof typeof homeData.about] as string[],
      stats: homeData.about.stats.map((st) => ({
        n: st.n,
        l: st[`l${s}` as keyof typeof st] as string,
      })),
    },
    services: {
      kicker: homeData.services[`kicker${s}` as keyof typeof homeData.services],
      items: homeData.services.items.map((it) => ({
        t: it[`t${s}` as keyof typeof it] as string,
        d: it[`d${s}` as keyof typeof it] as string,
      })),
    },
    portfolio: {
      kicker: homeData.portfolio[`kicker${s}` as keyof typeof homeData.portfolio],
      title: homeData.portfolio[`title${s}` as keyof typeof homeData.portfolio],
      intro: homeData.portfolio[`intro${s}` as keyof typeof homeData.portfolio],
      viewAll: homeData.portfolio[`viewAll${s}` as keyof typeof homeData.portfolio],
    },
    contact: {
      kicker: contactData[`kicker${s}` as keyof typeof contactData],
      title: contactData[`title${s}` as keyof typeof contactData],
      body: contactData[`body${s}` as keyof typeof contactData],
      quote: contactData[`quote${s}` as keyof typeof contactData],
      form: {
        name: contactData.form[`name${s}` as keyof typeof contactData.form],
        email: contactData.form[`email${s}` as keyof typeof contactData.form],
        date: contactData.form[`date${s}` as keyof typeof contactData.form],
        location: contactData.form[`location${s}` as keyof typeof contactData.form],
        message: contactData.form[`message${s}` as keyof typeof contactData.form],
        send: contactData.form[`send${s}` as keyof typeof contactData.form],
        sent: contactData.form[`sent${s}` as keyof typeof contactData.form],
        error: contactData.form[`error${s}` as keyof typeof contactData.form],
      },
      direct: contactData[`direct${s}` as keyof typeof contactData],
      whatsapp: contactData[`whatsapp${s}` as keyof typeof contactData],
      instagram: contactData[`instagram${s}` as keyof typeof contactData],
      email: contactData[`email${s}` as keyof typeof contactData],
    },
    footer: {
      tagline: siteData.footer[`tagline${s}` as keyof typeof siteData.footer],
      rights: siteData.footer[`rights${s}` as keyof typeof siteData.footer],
      craftedWith: siteData.footer[`craftedWith${s}` as keyof typeof siteData.footer],
    },
    notFound: {
      title: siteData.notFound[`title${s}` as keyof typeof siteData.notFound],
      back: siteData.notFound[`back${s}` as keyof typeof siteData.notFound],
    },
    legal: {
      kicker: legalData.nav[`legal${s}` as keyof typeof legalData.nav],
      lastUpdated: lang === "it" ? "Ultimo aggiornamento" : "Last updated",
      nav: {
        privacy: legalData.nav[`privacy${s}` as keyof typeof legalData.nav],
        cookies: legalData.nav[`cookies${s}` as keyof typeof legalData.nav],
        terms: legalData.nav[`terms${s}` as keyof typeof legalData.nav],
      },
      cookieBanner: {
        title: lang === "it"
          ? "Questo sito usa solo cookie tecnici."
          : "This site uses only technical cookies.",
        body: lang === "it"
          ? "Nessun tracciamento, nessuna profilazione. Memorizziamo solo la lingua scelta."
          : "No tracking, no profiling. We only store your chosen language.",
        accept: lang === "it" ? "Ho capito" : "Got it",
        more: lang === "it" ? "Maggiori informazioni" : "Learn more",
      },
    },
  };
};

export const translations = {
  it: buildLang("it"),
  en: buildLang("en"),
} as const;

export type Translations = (typeof translations)[Lang];
