import { useEffect, useState } from "react";
import { useLang } from "@/i18n/useLang";
import { CONTACTS } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

const Contact = () => {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  const formRef = useReveal<HTMLDivElement>();
  const directRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = lang === "it" ? "Contatti — Nicola" : "Contact — Nicola";
  }, [lang]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => params.append(key, String(value)));

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      setSent(true);
      toast.success(t.contact.form.sent);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error(t.contact.form.error);
    }
  };

  return (
    <main className="pt-28 md:pt-36 pb-10">
      <section className="px-6 md:px-10 max-w-[1500px] mx-auto">
        <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-6">— {t.contact.kicker}</p>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.95] whitespace-pre-line max-w-4xl">
          {t.contact.title}
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">{t.contact.body}</p>
      </section>

      <section className="px-6 md:px-10 max-w-[1500px] mx-auto mt-20 md:mt-28 grid md:grid-cols-12 gap-12 md:gap-20">
        {/* Form */}
        <div ref={formRef} className="reveal md:col-span-7">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Non compilare questo campo: <input name="bot-field" />
              </label>
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Field name="name" label={t.contact.form.name} required />
              <Field name="email" label={t.contact.form.email} type="email" required />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Field name="date" label={t.contact.form.date} type="date" />
              <Field name="location" label={t.contact.form.location} />
            </div>
            <div>
              <label htmlFor="message" className="block font-sans-tight text-[10px] uppercase text-muted-foreground mb-3">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-secondary/40 md:bg-transparent border-b border-border hover:border-foreground/60 focus:border-foreground focus:bg-secondary/60 outline-none transition-[background-color,border-color] py-3 px-3 md:px-2 resize-none font-display text-lg md:text-xl"
              />
            </div>
            <button
              type="submit"
              disabled={sent}
              className="group inline-flex items-center gap-3 mt-4 font-sans-tight text-[11px] uppercase border-b border-foreground pb-2 hover:gap-5 transition-all disabled:opacity-50"
            >
              {sent ? t.contact.form.sent : t.contact.form.send}
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>

        {/* Direct contacts */}
        <aside ref={directRef} className="reveal md:col-span-5">
          <p className="font-sans-tight text-[10px] uppercase text-muted-foreground mb-8">— {t.contact.direct}</p>
          <div className="space-y-1 border-t border-border">
            <DirectLink
              label={t.contact.whatsapp}
              value={CONTACTS.whatsapp}
              href={CONTACTS.whatsappLink}
            />
            <DirectLink
              label={t.contact.instagram}
              value={CONTACTS.instagramHandle}
              href={CONTACTS.instagram}
            />
            <DirectLink
              label={t.contact.email}
              value={CONTACTS.email}
              href={`mailto:${CONTACTS.email}`}
            />
          </div>

          <blockquote className="mt-14 border-l-2 border-accent pl-6 font-display italic text-2xl md:text-3xl text-muted-foreground leading-snug">
            {t.contact.quote}
          </blockquote>
          <p className="mt-3 pl-6 font-sans-tight text-[10px] uppercase text-muted-foreground">— Nicola</p>
        </aside>
      </section>
    </main>
  );
};

const Field = ({ name, label, type = "text", required = false }: {
  name: string; label: string; type?: string; required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block font-sans-tight text-[10px] uppercase text-muted-foreground mb-3">
      {label}{required && <span className="text-accent ml-1">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      required={required}
      className="w-full bg-secondary/40 md:bg-transparent border-b border-border hover:border-foreground/60 focus:border-foreground focus:bg-secondary/60 outline-none transition-[background-color,border-color] py-3 px-3 md:px-2 font-display text-lg md:text-xl"
    />
  </div>
);

const DirectLink = ({ label, value, href }: { label: string; value: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center justify-between gap-4 border-b border-border py-5 md:hover:pl-2 transition-all"
  >
    <span className="font-sans-tight text-[10px] uppercase text-muted-foreground">{label}</span>
    <span className="flex items-center gap-3 min-w-0">
      <span className="font-display text-xl md:text-2xl group-hover:italic transition-all truncate">{value}</span>
      <span
        aria-hidden
        className="font-sans-tight text-base text-muted-foreground/70 group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0"
      >
        →
      </span>
    </span>
  </a>
);

export default Contact;
