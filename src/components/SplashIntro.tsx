import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramNC } from "./MonogramNC";
import { LogoText } from "./LogoText";
import { safeGet, safeSet } from "@/lib/safeStorage";

const SplashIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0); // 0=enter, 1=text-fade, 2=move, 3=curtain, 4=mono-fade
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const SPLASH_KEY = "nicola-splash-seen-v1";
    const url = new URL(window.location.href);
    const force = url.searchParams.get("splash") === "reset";
    const seen = safeGet(SPLASH_KEY);
    if (force || !seen) {
      if (force) url.searchParams.delete("splash"); window.history.replaceState({}, "", url.toString());
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
      setShow(true);
      safeSet(SPLASH_KEY, "1");

      setTimeout(() => setPhase(1), 700);
      setTimeout(() => setPhase(2), 1200);
      setTimeout(() => setPhase(3), 2100);
      setTimeout(() => setPhase(4), 3100);
      setTimeout(() => setShow(false), 3300);
    }
  }, []);

  if (!show || winSize.w === 0) return null;

  const isDesktop = winSize.w >= 768;

  const LOGO_W = 1270;
  const LOGO_H = 816;
  const MONO_X = 355;
  const MONO_W = 525;
  const MONO_H = 515;
  const TEXT_Y = 560;
  const TEXT_H = 260;

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

  /* deterministic fallback */
  const HEADER_MAX_W = 1500;
  const PAD_X = isDesktop ? 40 : 24;
  const HEADER_H = isDesktop ? 80 : 64;
  const LOGO_TARGET_H = isDesktop ? 40 : 36;

  const fallbackEndX = winSize.w > HEADER_MAX_W
    ? (winSize.w - HEADER_MAX_W) / 2 + PAD_X
    : PAD_X;
  const fallbackEndY = (HEADER_H - LOGO_TARGET_H) / 2;
  const fallbackEndW = LOGO_TARGET_H * (MONO_W / MONO_H);
  const fallbackEndH = LOGO_TARGET_H;

  return (
    <InnerSplash
      show={show}
      phase={phase}
      startX={startX}
      startY={startY}
      startW={startW}
      startH={startH}
      textX={textX}
      textY={textY}
      textW={textW}
      textH={textH}
      fallbackEndX={fallbackEndX}
      fallbackEndY={fallbackEndY}
      fallbackEndW={fallbackEndW}
      fallbackEndH={fallbackEndH}
    />
  );
};

const InnerSplash = ({
  show,
  phase,
  startX, startY, startW, startH,
  textX, textY, textW, textH,
  fallbackEndX, fallbackEndY, fallbackEndW, fallbackEndH,
}: {
  show: boolean;
  phase: number;
  startX: number; startY: number; startW: number; startH: number;
  textX: number; textY: number; textW: number; textH: number;
  fallbackEndX: number; fallbackEndY: number; fallbackEndW: number; fallbackEndH: number;
}) => {
  const [endPos, setEndPos] = useState({
    x: fallbackEndX,
    y: fallbackEndY,
    w: fallbackEndW,
    h: fallbackEndH,
  });

  useLayoutEffect(() => {
    if (!show) return;
    const measure = () => {
      const img = document.querySelector(
        'header img[aria-hidden="true"]'
      ) as HTMLElement | null;
      if (img) {
        const rect = img.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setEndPos({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
          return true;
        }
      }
      return false;
    };
    // try immediately — Header is already in the DOM because it mounts before SplashIntro
    if (!measure()) {
      // if not ready, retry on next frame once
      const id = requestAnimationFrame(() => measure());
      return () => cancelAnimationFrame(id);
    }
  }, [show]);

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

          {/* Monogram */}
          <motion.div
            initial={{
              left: startX,
              top: startY,
              width: startW,
              height: startH,
              opacity: 1,
            }}
            animate={{
              left: phase >= 2 ? endPos.x : startX,
              top: phase >= 2 ? endPos.y : startY,
              width: phase >= 2 ? endPos.w : startW,
              height: phase >= 2 ? endPos.h : startH,
              opacity: phase >= 4 ? 0 : 1,
            }}
            transition={{
              duration: phase === 2 ? 0.9 : phase === 4 ? 0.15 : 0.3,
              ease: [0.77, 0, 0.18, 1],
            }}
            className="fixed"
            style={{ zIndex: 201 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: phase >= 3 ? [1, 1.08, 0.97, 1.02, 1] : 1 }}
              transition={{ duration: 0.55, times: [0, 0.35, 0.65, 0.85, 1], ease: [0.2, 0.7, 0.2, 1] }}
              className="w-full h-full origin-center"
            >
              <MonogramNC className="w-full h-full" />
            </motion.div>
          </motion.div>

          {/* Logo text */}
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
