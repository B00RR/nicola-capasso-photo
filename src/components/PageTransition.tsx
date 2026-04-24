import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramNC } from "./MonogramNC";

const PageTransition = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first render — the splash intro / initial paint already
    // covers that. Only animate on subsequent route changes.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setShow(true);
    const timer = setTimeout(() => setShow(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background pointer-events-none flex items-center justify-center"
        >
          <MonogramNC className="w-14 h-14 opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
