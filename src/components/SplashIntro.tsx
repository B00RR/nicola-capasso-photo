import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramNC } from "./MonogramNC";
import { LogoText } from "./LogoText";

const SplashIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0); // 0=enter, 1=text-fade, 2=move, 3=curtain, 4=mono-fade
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    // Bump the version when you want every existing visitor to see the splash again.
    const SPLASH_KEY = "nicola-splash-seen-v1";
    const seen = localStorage.getItem(SPLASH_KEY);
    if (!seen) {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
      setShow(true);
      localStorage.setItem(SPLASH_KEY, "1");

      setTimeout(() => setPhase(1), 700);
      setTimeout(() => setPhase(2), 1200);
      setTimeout(() => setPhase(3), 2100);
      setTimeout(() => setPhase(4), 3100);
      setTimeout(() => setShow(false), 3300);
    }
  }, []);

  /* Measure the actual header favicon position so the monogram lands exactly on it */
  useEffect(() => {
    if (!show) return;
    const measure = () => {
      const logo = document.querySelector(
        'header img[aria-hidden="true"]'
      ) as HTMLElement | null;
      if (logo) {
        const rect = logo.getBoundingClientRect();
        setEndPos({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
      }
    };
    const id = requestAnimationFrame(() => requestAnimationFrame(measure));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [show]);

  if (!show || winSize.w === 0) return null;

  const isDesktop = winSize.w >= 768;

  /* ------------------------------------------------------------------ */
  /*  Match the original SVG logo proportions so monogram + text align  */
  /*  exactly like the source file.                                     */
  /*  logo-source viewBox: 0 0 1270 816                                 */
  /*  monogram viewBox  : 355 0 525 515                                 */
  /*  text viewBox      : 0 560 1270 260                                */
  /* ------------------------------------------------------------------ */
  const LOGO_W = 1270;
  const LOGO_H = 816;
  const MONO_X = 355;
  const MONO_W = 525;
  const MONO_H = 515;
  const TEXT_Y = 560;
  const TEXT_H = 260;

  /* Monogram target height in the splash — keep it the same as before (~120px) */
  const startMonoH = 120;
  const startLogoH = startMonoH * (LOGO_H / MONO_H);
  const startLogoW = startLogoH * (LOGO_W / LOGO_H);

  const containerLeft = winSize.w / 2 - startLogoW / 2;
  const containerTop = winSize.h / 2 - startLogoH / 2;

  const startW = startLogoW * (MONO_W / LOGO_W);
  const startH = startLogoH * (MONO_H / LOGO_H);
  const startX = containerLeft + startLogoW * (MONO_X / LOGO_W);
  const startY = containerTop;

  const textW = startLogoW;
  const textH = startLogoH * (TEXT_H / LOGO_H);
  const textX = containerLeft;
  const textY = containerTop + startLogoH * (TEXT_Y / LOGO_H);

  /* Fallback end position (header padding) until DOM measurement kicks in */
  const fallbackEndH = isDesktop ? 40 : 36;
  const fallbackEndW = fallbackEndH * (MONO_W / MONO_H);
  const fallbackEndX = isDesktop ? 40 : 24;
  const fallbackEndY = isDesktop ? 20 : 14;

  const endX = endPos.w > 0 ? endPos.x : fallbackEndX;
  const endY = endPos.h > 0 ? endPos.y : fallbackEndY;
  const endW = endPos.w > 0 ? endPos.w : fallbackEndW;
  const endH = endPos.h > 0 ? endPos.h : fallbackEndH;

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

          {/* Monogram — animates from centre to header position */}
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
                phase === 2 ? 0.9 : phase === 4 ? 0.15 : 0.3,
              ease: [0.77, 0, 0.18, 1],
            }}
            className="fixed"
            style={{ zIndex: 201 }}
          >
            <MonogramNC className="w-full h-full" />
          </motion.div>

          {/* Logo text — positioned with original-logo proportions, fades out */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: phase >= 1 ? 0 : 1,
              y: phase >= 1 ? -8 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed"
            style={{ zIndex: 201, left: textX, top: textY, width: textW, height: textH }}
          >
            <LogoText className="w-full h-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
