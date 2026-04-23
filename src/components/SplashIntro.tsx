import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramNC } from "./MonogramNC";
import { LogoText } from "./LogoText";

const SplashIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0); // 0=enter, 1=text-fade, 2=move, 3=curtain, 4=mono-fade
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const seen = sessionStorage.getItem("splash-seen");
    if (!seen) {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
      setShow(true);
      sessionStorage.setItem("splash-seen", "1");

      setTimeout(() => setPhase(1), 700);
      setTimeout(() => setPhase(2), 1200);
      setTimeout(() => setPhase(3), 2100);
      setTimeout(() => setPhase(4), 3100);
      setTimeout(() => setShow(false), 3300);
    }
  }, []);

  if (!show || winSize.w === 0) return null;

  const isDesktop = winSize.w >= 768;
  const monoRatio = 525 / 515;

  const startH = 120;
  const startW = startH * monoRatio;
  const endH = isDesktop ? 40 : 36;
  const endW = endH * monoRatio;

  const startX = winSize.w / 2 - startW / 2;
  const startY = winSize.h / 2 - startH / 2 - 24;
  const endX = isDesktop ? 40 : 24;
  const endY = isDesktop ? 20 : 14;

  const textTop = startY + startH + 32;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 200 }}>
          {/* Curtain panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase >= 3 ? "-100%" : "0%" }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.18, 1] }}
            className="absolute inset-0 bg-background"
          />

          {/* Monogram — animates from center to header position */}
          <motion.div
            initial={{
              left: startX,
              top: startY,
              width: startW,
              height: startH,
              opacity: 1,
            }}
            animate={{
              left: phase >= 2 ? endX : startX,
              top: phase >= 2 ? endY : startY,
              width: phase >= 2 ? endW : startW,
              height: phase >= 2 ? endH : startH,
              opacity: phase >= 4 ? 0 : 1,
            }}
            transition={{
              duration:
                phase === 2
                  ? 0.9
                  : phase === 4
                  ? 0.15
                  : 0.3,
              ease: [0.77, 0, 0.18, 1],
            }}
            className="fixed"
            style={{ zIndex: 201 }}
          >
            <MonogramNC className="w-full h-full" />
          </motion.div>

          {/* Logo text — centered below monogram, fades out */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: phase >= 1 ? 0 : 1,
              y: phase >= 1 ? -8 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed left-1/2 -translate-x-1/2"
            style={{ zIndex: 201, top: textTop }}
          >
            <LogoText className="h-14 md:h-16 w-auto" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
