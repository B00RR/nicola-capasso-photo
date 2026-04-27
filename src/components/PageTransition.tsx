import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setShow(true);
    const timer = setTimeout(() => setShow(false), 450);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-background pointer-events-none flex items-center justify-center"
      style={{
        opacity: show ? 1 : 0,
        transition: show ? "none" : "opacity 0.5s cubic-bezier(0.2,0.7,0.2,1)",
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt=""
        className="w-20 h-20"
      />
    </div>
  );
};

export default PageTransition;
