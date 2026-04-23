import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center pointer-events-none"
        >
          <motion.img
            src="/logo.svg"
            alt="Nicola Capasso Photo"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="h-14 md:h-16 w-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
