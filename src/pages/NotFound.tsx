import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/i18n/useLang";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/photo-37.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-sans-tight text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
          — 404
        </p>
        <h1 className="font-display italic text-[22vw] md:text-[14rem] leading-[0.85] text-foreground">
          404
        </h1>
        <p className="mt-8 max-w-sm font-display text-xl md:text-2xl text-muted-foreground">
          {t.notFound.title}
        </p>
        <Link
          to="/"
          className="mt-10 font-sans-tight text-[11px] uppercase border-b border-foreground pb-2 hover:opacity-70 transition-opacity"
        >
          {t.notFound.back} →
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
