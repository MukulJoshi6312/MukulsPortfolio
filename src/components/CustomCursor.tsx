"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const sy = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });
  const [isPointer, setIsPointer] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = !!el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      setIsPointer(interactive);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        ref={ref}
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: isPointer ? 2 : 1, opacity: isPointer ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
          className="-translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-[var(--accent-1)]"
        />
      </motion.div>
      <motion.div
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed top-0 left-0 z-[99]"
      >
        <motion.div
          animate={{ scale: isPointer ? 1.6 : 1 }}
          transition={{ duration: 0.15 }}
          className="-translate-x-1/2 -translate-y-1/2 size-8 rounded-full border border-[var(--accent-1)]/40"
        />
      </motion.div>
    </>
  );
};
