import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoText } from "./LogoText";
import { safeGet, safeSet } from "@/lib/safeStorage";

const SplashIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0); // 0=enter, 1=move, 2=curtain, 3=done
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });
  const duration = useRef(1.1);

  useEffect(() => {
    const SPLASH_KEY = "nicola-splash-seen-v2";
    const url = new URL(window.location.href);
    const force = url.searchParams.get("splash") === "reset";
    const seen = safeGet(SPLASH_KEY);
    if (force || !seen) {
      if (force) {
        url.searchParams.delete("splash");
        window.history.replaceState({}, "", url.toString());
      }
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
      setShow(true);
      safeSet(SPLASH_KEY, "1");

      setTimeout(() => setPhase(1), 900);
      setTimeout(() => setPhase(2), 1600);
      setTimeout(() => setPhase(3), 2500);
      setTimeout(() => setShow(false), 2700);
    }
  }, []);

  if (!show || winSize.w === 0) return null;

  const isDesktop = winSize.w >= 768;
  const PAD_X = isDesktop ? 40 : 24;
  const HEADER_H = isDesktop ? 80 : 64;
  const FALLBACK_X = PAD_X;
  const FALLBACK_Y = (HEADER_H - 36) / 2;

  const startScale = isDesktop ? 2.5 : 1.8;
  const startX = winSize.w / 2;
  const startY = winSize.h / 2;

  return (
    <InnerSplash
      show={show}
      phase={phase}
      duration={duration.current}
      startX={startX}
      startY={startY}
      startScale={startScale}
      fallbackEndX={FALLBACK_X}
      fallbackEndY={FALLBACK_Y}
    />
  );
};

const InnerSplash = ({
  show,
  phase,
  duration,
  startX,
  startY,
  startScale,
  fallbackEndX,
  fallbackEndY,
}: {
  show: boolean;
  phase: number;
  duration: number;
  startX: number;
  startY: number;
  startScale: number;
  fallbackEndX: number;
  fallbackEndY: number;
}) => {
  const [endPos, setEndPos] = useState({ x: fallbackEndX, y: fallbackEndY });

  useLayoutEffect(() => {
    if (!show) return;
    const el = document.querySelector(
      '[data-splash-target="logo"]'
    ) as HTMLElement | null;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setEndPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
        return;
      }
    }
    const id = requestAnimationFrame(() => {
      const el2 = document.querySelector(
        '[data-splash-target="logo"]'
      ) as HTMLElement | null;
      if (el2) {
        const rect = el2.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setEndPos({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, [show]);

  const scale = phase >= 1 ? 1 : startScale;
  const x = phase >= 1 ? endPos.x : startX;
  const y = phase >= 1 ? endPos.y : startY;
  const opacity = phase >= 3 ? 0 : 1;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 200 }}>
          {/* Curtain panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase >= 2 ? "-100%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
            className="absolute inset-0 bg-background"
          />

          {/* Floating logo */}
          <motion.div
            className="fixed left-0 top-0"
            style={{ zIndex: 201 }}
            initial={{
              x: startX,
              y: startY,
              scale: startScale,
              opacity: 1,
            }}
            animate={{
              x,
              y,
              scale,
              opacity,
            }}
            transition={{
              duration: phase === 1 ? duration : phase === 3 ? 0.15 : 0.3,
              ease: [0.77, 0, 0.18, 1],
            }}
          >
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              <LogoText size="sm" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
