import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashIntro = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splash-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("splash-seen", "1");
      const timer = setTimeout(() => setShow(false), 2600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.77, 0, 0.18, 1], delay: 1.4 }}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
        >
          <motion.img
            src="/logo.svg"
            alt="Nicola Capasso Photo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="h-24 md:h-28 w-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
