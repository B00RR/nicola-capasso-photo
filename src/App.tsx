import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useLang } from "@/i18n/useLang";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SplashIntro from "@/components/SplashIntro";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const Story = lazy(() => import("./pages/Story.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Privacy = lazy(() => import("./pages/Legal.tsx").then((m) => ({ default: m.Privacy })));
const Cookies = lazy(() => import("./pages/Legal.tsx").then((m) => ({ default: m.Cookies })));
const Terms = lazy(() => import("./pages/Legal.tsx").then((m) => ({ default: m.Terms })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
};

const Fallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-px w-24 bg-foreground/60 animate-pulse" aria-label="Loading" role="status" />
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLang();
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded text-sm font-sans-tight uppercase tracking-wider">
        {t.a11y.skipToContent}
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
};

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename="/nicola-capasso-photo">
        <SplashIntro />
        <ScrollToTop />
        <PageTransition />
        <CookieBanner />
        <Suspense fallback={<Fallback />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
              <Route path="/portfolio/:id" element={<Layout><Story /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
              <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
