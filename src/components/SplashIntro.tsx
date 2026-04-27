import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramNC } from "./MonogramNC";
import { LogoText } from "./LogoText";

const SplashIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0); // 0=enter, 1=text-fade, 2=move, 3=curtain, 4=mono-fade
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // Bump the version when you want every existing visitor to see the splash again.
    const SPLASH_KEY = "nicola-splash-seen-v1";
    const url = new URL(window.location.href);
    const force = url.searchParams.get("splash") === "reset";
    const seen = localStorage.getItem(SPLASH_KEY);
    if (force || !seen) {
      if (force) url.searchParams.delete("splash"); window.history.replaceState({}, "", url.toString());
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

  /* End position: deterministic based on known header layout
     Header: fixed, h-16 (64px) mobile / h-20 (80px) desktop
     Inner container: max-w-[1500px] mx-auto px-6 (24px) / px-10 (40px)
     Logo img: h-9 (36px) / h-10 (40px)
  */
  const HEADER_MAX_W = 1500;
  const PAD_X = isDesktop ? 40 : 24;
  const HEADER_H = isDesktop ? 80 : 64;
  const LOGO_TARGET_H = isDesktop ? 40 : 36;

  const endX = winSize.w > HEADER_MAX_W
    ? (winSize.w - HEADER_MAX_W) / 2 + PAD_X
    : PAD_X;
  const endY = (HEADER_H - LOGO_TARGET_H) / 2;
  const endW = LOGO_TARGET_H * (MONO_W / MONO_H);
  const endH = LOGO_TARGET_H;

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
            {/* Micro-spring overshoot when the monogram lands on the header */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: phase >= 3 ? [1, 1.08, 0.97, 1.02, 1] : 1 }}
              transition={{ duration: 0.55, times: [0, 0.35, 0.65, 0.85, 1], ease: [0.2, 0.7, 0.2, 1] }}
              className="w-full h-full origin-center"
            >
              <MonogramNC className="w-full h-full" />
            </motion.div>
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
