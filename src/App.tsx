import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContacts from "@/components/FloatingContacts";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
};

const LangRoute = () => {
  const { lang } = useParams<{ lang: string }>();
  const { setLang } = useLang();

  useEffect(() => {
    if (lang === "it" || lang === "en") setLang(lang);
  }, [lang, setLang]);

  if (lang !== "it" && lang !== "en") return <Navigate to="/it" replace />;
  return <Outlet />;
};

const LangRedirect = () => {
  const { lang } = useLang();
  return <Navigate to={`/${lang}`} replace />;
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
    <FloatingContacts />
  </>
);

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense>
          <Routes>
            <Route path="/" element={<LangRedirect />} />
            <Route path="/:lang" element={<LangRoute />}>
              <Route index element={<Index />} />
              <Route path="portfolio" element={<Layout><Portfolio /></Layout>} />
              <Route path="contact" element={<Layout><Contact /></Layout>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
