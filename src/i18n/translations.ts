import homeData from "@/content/home.json";
import contactData from "@/content/contact.json";
import siteData from "@/content/site.json";
import legalData from "@/content/legal.json";

export type Lang = "it" | "en";

const buildLang = (lang: "it" | "en") => {
  const s = lang === "it" ? "_it" : "_en";
  return {
    nav: {
      home: siteData.nav[`home${s}` as keyof typeof siteData.nav] as string,
      portfolio: siteData.nav[`portfolio${s}` as keyof typeof siteData.nav] as string,
      contact: siteData.nav[`contact${s}` as keyof typeof siteData.nav] as string,
    },
    hero: {
      eyebrow: homeData.hero[`eyebrow${s}` as keyof typeof homeData.hero] as string,
      title: homeData.hero[`title${s}` as keyof typeof homeData.hero] as unknown as string[],
      subtitle: homeData.hero[`subtitle${s}` as keyof typeof homeData.hero] as string,
      cta: homeData.hero[`cta${s}` as keyof typeof homeData.hero] as string,
      scroll: homeData.hero[`scroll${s}` as keyof typeof homeData.hero] as string,
    },
    about: {
      kicker: homeData.about[`kicker${s}` as keyof typeof homeData.about] as string,
      title: homeData.about[`title${s}` as keyof typeof homeData.about] as string,
      body: homeData.about[`body${s}` as keyof typeof homeData.about] as unknown as string[],
      stats: homeData.about.stats.map((st) => ({
        n: st.n,
        l: st[`l${s}` as keyof typeof st] as string,
      })),
    },
    services: {
      kicker: homeData.services[`kicker${s}` as keyof typeof homeData.services] as string,
      items: homeData.services.items.map((it) => ({
        t: it[`t${s}` as keyof typeof it] as string,
        d: it[`d${s}` as keyof typeof it] as string,
      })),
    },
    portfolio: {
      kicker: homeData.portfolio[`kicker${s}` as keyof typeof homeData.portfolio] as string,
      title: homeData.portfolio[`title${s}` as keyof typeof homeData.portfolio] as string,
      intro: homeData.portfolio[`intro${s}` as keyof typeof homeData.portfolio] as string,
      viewAll: homeData.portfolio[`viewAll${s}` as keyof typeof homeData.portfolio] as string,
    },
    contact: {
      kicker: contactData[`kicker${s}` as keyof typeof contactData] as string,
      title: contactData[`title${s}` as keyof typeof contactData] as string,
      body: contactData[`body${s}` as keyof typeof contactData] as string,
      quote: contactData[`quote${s}` as keyof typeof contactData] as string,
      form: {
        name: contactData.form[`name${s}` as keyof typeof contactData.form] as string,
        email: contactData.form[`email${s}` as keyof typeof contactData.form] as string,
        date: contactData.form[`date${s}` as keyof typeof contactData.form] as string,
        location: contactData.form[`location${s}` as keyof typeof contactData.form] as string,
        message: contactData.form[`message${s}` as keyof typeof contactData.form] as string,
        send: contactData.form[`send${s}` as keyof typeof contactData.form] as string,
        sent: contactData.form[`sent${s}` as keyof typeof contactData.form] as string,
        error: contactData.form[`error${s}` as keyof typeof contactData.form] as string,
      },
      direct: contactData[`direct${s}` as keyof typeof contactData] as string,
      whatsapp: contactData[`whatsapp${s}` as keyof typeof contactData] as string,
      instagram: contactData[`instagram${s}` as keyof typeof contactData] as string,
      email: contactData[`email${s}` as keyof typeof contactData] as string,
      phone: contactData[`phone${s}` as keyof typeof contactData] as string,
    },
    footer: {
      tagline: siteData.footer[`tagline${s}` as keyof typeof siteData.footer] as string,
      rights: siteData.footer[`rights${s}` as keyof typeof siteData.footer] as string,
      craftedWith: siteData.footer[`craftedWith${s}` as keyof typeof siteData.footer] as string,
    },
    notFound: {
      title: siteData.notFound[`title${s}` as keyof typeof siteData.notFound] as string,
      back: siteData.notFound[`back${s}` as keyof typeof siteData.notFound] as string,
    },
    a11y: {
      skipToContent: siteData.a11y[`skipToContent${s}` as keyof typeof siteData.a11y] as string,
      openMenu: siteData.a11y[`openMenu${s}` as keyof typeof siteData.a11y] as string,
      closeMenu: siteData.a11y[`closeMenu${s}` as keyof typeof siteData.a11y] as string,
      switchLanguage: siteData.a11y[`switchLanguage${s}` as keyof typeof siteData.a11y] as string,
      lightboxClose: siteData.a11y[`lightboxClose${s}` as keyof typeof siteData.a11y] as string,
      lightboxPrev: siteData.a11y[`lightboxPrev${s}` as keyof typeof siteData.a11y] as string,
      lightboxNext: siteData.a11y[`lightboxNext${s}` as keyof typeof siteData.a11y] as string,
      lightboxLabel: siteData.a11y[`lightboxLabel${s}` as keyof typeof siteData.a11y] as string,
      lightboxHint: siteData.a11y[`lightboxHint${s}` as keyof typeof siteData.a11y] as string,
    },
    legal: {
      kicker: legalData.nav[`legal${s}` as keyof typeof legalData.nav] as string,
      lastUpdated: lang === "it" ? "Ultimo aggiornamento" : "Last updated",
      nav: {
        privacy: legalData.nav[`privacy${s}` as keyof typeof legalData.nav] as string,
        cookies: legalData.nav[`cookies${s}` as keyof typeof legalData.nav] as string,
        terms: legalData.nav[`terms${s}` as keyof typeof legalData.nav] as string,
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
