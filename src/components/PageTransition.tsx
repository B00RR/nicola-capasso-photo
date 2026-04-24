import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    const timer = setTimeout(() => setShow(false), 220);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
