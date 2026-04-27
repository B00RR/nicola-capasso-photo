import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/useLang";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CONTACTS } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

const Contact = () => {
  const { t, lang } = useLang();
  const title = lang === "it" ? "Contatti \u2014 Nicola" : "Contact \u2014 Nicola";
  const description = lang === "it"
    ? "Scrivimi per raccontarmi il tuo matrimonio. Rispondo entro 48 ore con disponibilit\u00e0 e dettagli."
    : "Drop me a line about your wedding. I reply within 48 hours with availability and details.";
  usePageMeta({ title, description, path: "/contact" });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useReveal<HTMLDivElement>();
  const directRef = useReveal<HTMLDivElement>();

  // Time-trap: timestamp of mount; submit before 2s is treated as bot.
  const mountedAtRef = useRef<number>(0);
  // Track active retry timer + abort controller so we can cancel on unmount.
  const retryTimerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    mountedAtRef.current = Date.now();
    return () => {
      isMountedRef.current = false;
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
      abortRef.current?.abort();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;

    // Honeypot already in the form. Time-trap: if submitted < 2s after mount,
    // silently accept then drop. Real users take > 2s to fill anything.
    const elapsed = Date.now() - mountedAtRef.current;
    if (elapsed < 2000) {
      // Mimic success to avoid signaling the trap to bots.
      setSent(true);
      setTimeout(() => isMountedRef.current && setSent(false), 4000);
      return;
    }

    const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || (typeof process !== "undefined" && process.env.VITE_CONTACT_ENDPOINT);
    if (!endpoint) {
      toast.error(lang === "it" ? "Endpoint di contatto non configurato." : "Contact endpoint not configured.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = JSON.stringify(Object.fromEntries(data));

    const send = async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    };

    const finalizeSuccess = () => {
      if (!isMountedRef.current) return;
      setSending(false);
      setSent(true);
      toast.success(t.contact.form.sent);
      form.reset();
      setTimeout(() => isMountedRef.current && setSent(false), 4000);
    };

    setSending(true);
    try {
      await send();
      finalizeSuccess();
    } catch (err) {
      // If the fetch was aborted during unmount, bail silently.
      if (err instanceof DOMException && err.name === "AbortError") return;

      const msg = err instanceof Error && err.message.startsWith("HTTP")
        ? (lang === "it" ? "Errore del server. Riprova tra poco." : "Server error. Please try again shortly.")
        : (lang === "it" ? "Connessione assente. Verifica la rete e riprova." : "No connection. Check your network and retry.");
      toast.error(msg);

      // Single retry, scheduled via tracked timer so we can cancel on unmount.
      // `sending` stays true so the submit button stays disabled and the
      // user cannot kick off a parallel request.
      if (retryTimerRef.current !== null) window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = window.setTimeout(() => {
        retryTimerRef.current = null;
        if (!isMountedRef.current) return;
        send()
          .then(finalizeSuccess)
          .catch((retryErr) => {
            if (retryErr instanceof DOMException && retryErr.name === "AbortError") return;
            if (!isMountedRef.current) return;
            setSending(false);
            toast.error(lang === "it" ? "Invio fallito. Contattami direttamente via email." : "Sending failed. Please contact me directly via email.");
          });
      }, 3000);
    }
  };

  return (
    <main className="pt-28 md:pt-36 pb-10">
      <section className="px-6 md:px-10 max-w-[1500px] mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">01</span>
          <span className="h-px flex-1 max-w-[4rem] bg-border" />
          <p className="font-sans-tight text-[11px] uppercase text-muted-foreground">{t.contact.kicker}</p>
        </div>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.95] whitespace-pre-line max-w-4xl">
          {t.contact.title}
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">{t.contact.body}</p>
      </section>

      <section className="px-6 md:px-10 max-w-[1500px] mx-auto mt-20 md:mt-28 grid md:grid-cols-12 gap-12 md:gap-20">
        {/* Form */}
        <div ref={formRef} className="reveal md:col-span-7">
          <MessageForm
            t={t}
            lang={lang}
            sent={sent}
            sending={sending}
            onSubmit={onSubmit}
          />
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
              label={t.contact.phone}
              value={CONTACTS.phone}
              href={`tel:${CONTACTS.phone}`}
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

const MessageForm = ({
  t, lang, sent, sending, onSubmit,
}: {
  t: ReturnType<typeof import("@/i18n/useLang").useLang>["t"];
  lang: string;
  sent: boolean;
  sending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [msgInvalid, setMsgInvalid] = useState(false);
  return (
    <form name="contact" method="POST" onSubmit={onSubmit} className="space-y-8">
      <p aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          <input name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </label>
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <Field name="name" label={t.contact.form.name} invalidMsg={lang === "it" ? "Inserisci il tuo nome" : "Please enter your name"} required />
        <Field name="email" label={t.contact.form.email} invalidMsg={lang === "it" ? "Inserisci una email valida" : "Please enter a valid email"} type="email" required />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Field name="date" label={t.contact.form.date} type="date" lang={lang} />
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
          aria-invalid={msgInvalid}
          aria-describedby={msgInvalid ? "message-error" : undefined}
          onInvalid={(e) => { e.preventDefault(); setMsgInvalid(true); }}
          onInput={() => setMsgInvalid(false)}
          className={`w-full bg-secondary/40 md:bg-transparent border-b outline-none transition-[background-color,border-color] py-3 px-3 md:px-2 resize-none font-display text-lg md:text-xl ${msgInvalid ? "border-red-500 focus:border-red-600" : "border-border hover:border-foreground/60 focus:border-foreground focus:bg-secondary/60"}`}
        />
        {msgInvalid && (
          <p id="message-error" className="text-red-500 text-xs mt-2 font-sans-tight">
            {lang === "it" ? "Inserisci un messaggio" : "Please enter a message"}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={sent || sending}
        className="group inline-flex items-center gap-3 mt-4 font-sans-tight text-[11px] uppercase border-b border-foreground pb-2 hover:gap-5 transition-all disabled:opacity-50"
      >
        {sent ? t.contact.form.sent : sending ? (lang === "it" ? "Invio\u2026" : "Sending\u2026") : t.contact.form.send}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
};

const Field = ({ name, label, type = "text", required = false, invalidMsg, lang }: {
  name: string; label: string; type?: string; required?: boolean; invalidMsg?: string; lang?: string;
}) => {
  const [invalid, setInvalid] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="block font-sans-tight text-[10px] uppercase text-muted-foreground mb-3">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${name}-error` : undefined}
        onInvalid={(e) => { e.preventDefault(); setInvalid(true); }}
        onInput={() => setInvalid(false)}
        {...(lang ? { lang } : {})}
        className={`w-full bg-secondary/40 md:bg-transparent border-b outline-none transition-[background-color,border-color] py-3 px-3 md:px-2 font-display text-lg md:text-xl ${invalid ? "border-red-500 focus:border-red-600" : "border-border hover:border-foreground/60 focus:border-foreground focus:bg-secondary/60"}`}
      />
      {invalid && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-2 font-sans-tight">
          {invalidMsg || (required ? (label + " is required") : "")}
        </p>
      )}
    </div>
  );
};

const DirectLink = ({ label, value, href }: { label: string; value: string; href: string }) => {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
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
};

export default Contact;
