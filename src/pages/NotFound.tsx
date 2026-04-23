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
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 font-display text-8xl">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">{t.notFound.title}</p>
        <Link to="/" className="font-sans-tight text-[11px] uppercase border-b border-foreground pb-2 hover:opacity-70 transition-opacity">
          {t.notFound.back}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
