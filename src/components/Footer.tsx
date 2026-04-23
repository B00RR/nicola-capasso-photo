import { useLang } from "@/i18n/LanguageContext";
import { CONTACTS } from "@/data/portfolio";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Nicola<span className="text-accent">.</span></p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 font-sans-tight text-[11px] uppercase">
          <Link to="/" className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">{t.nav.home}</Link>
          <Link to="/portfolio" className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">{t.nav.portfolio}</Link>
          <Link to="/contact" className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">{t.nav.contact}</Link>
        </div>

        <div className="flex flex-col gap-2 font-sans-tight text-[11px] uppercase">
          <a href={CONTACTS.whatsappLink} target="_blank" rel="noreferrer" className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">WhatsApp</a>
          <a href={CONTACTS.instagram} target="_blank" rel="noreferrer" className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">Instagram</a>
          <a href={`mailto:${CONTACTS.email}`} className="underline-grow w-fit text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm">{CONTACTS.email}</a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] font-sans-tight uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} Nicola — {t.footer.rights}</p>
          <p>{t.footer.craftedWith}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
