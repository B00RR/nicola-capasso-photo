import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
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
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
