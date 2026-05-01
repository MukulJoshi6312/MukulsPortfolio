"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export const StatCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div className="font-serif text-3xl md:text-5xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] bg-clip-text text-transparent">
        {n}
        <span>{suffix}</span>
      </div>
      <div className="text-xs md:text-sm uppercase tracking-widest text-[var(--fg-muted)] mt-2">{label}</div>
    </motion.div>
  );
};
