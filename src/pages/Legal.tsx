import { Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";
import { usePageMeta } from "@/hooks/usePageMeta";
import legalData from "@/content/legal.json";

type PageKey = "privacy" | "cookies" | "terms";

interface Section {
  h: string;
  p: string;
}

const LegalPage = ({ page }: { page: PageKey }) => {
  const { lang, t } = useLang();
  const s = lang === "it" ? "_it" : "_en";

  const data = legalData[page];
  const title = data[`title${s}` as keyof typeof data] as string;
  const intro = data[`intro${s}` as keyof typeof data] as string;
  const sections = data[`sections${s}` as keyof typeof data] as Section[];

  usePageMeta({ title: `${title} \u2014 Nicola`, description: intro, path: `/${page}` });

  return (
    <main className="pt-28 md:pt-36 pb-10">
      <section className="px-6 md:px-10 max-w-3xl mx-auto">
        <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-6">
          — {t.legal.kicker}
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">
          {title}
        </h1>
        <p className="mt-6 font-sans-tight text-[11px] uppercase text-muted-foreground">
          {t.legal.lastUpdated}: {legalData.lastUpdated}
        </p>

        <p className="mt-10 text-muted-foreground leading-relaxed">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((sec) => (
            <div key={sec.h}>
              <h2 className="font-display text-2xl md:text-3xl mb-3">{sec.h}</h2>
              <p className="text-muted-foreground leading-relaxed">{sec.p}</p>
            </div>
          ))}
        </div>

        <nav className="mt-20 pt-10 border-t border-border/60 flex flex-wrap gap-6 font-sans-tight text-[11px] uppercase text-muted-foreground">
          <Link to="/privacy" className="underline-grow hover:text-foreground transition-colors">
            {t.legal.nav.privacy}
          </Link>
          <Link to="/cookies" className="underline-grow hover:text-foreground transition-colors">
            {t.legal.nav.cookies}
          </Link>
          <Link to="/terms" className="underline-grow hover:text-foreground transition-colors">
            {t.legal.nav.terms}
          </Link>
          <Link to="/" className="underline-grow hover:text-foreground ml-auto transition-colors">
            ← {t.notFound.back}
          </Link>
        </nav>
      </section>
    </main>
  );
};

export const Privacy = () => <LegalPage page="privacy" />;
export const Cookies = () => <LegalPage page="cookies" />;
export const Terms = () => <LegalPage page="terms" />;
