"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { tag: "building", text: "scalable UMANG/BRICS frontends @ NeGD", icon: "🛠️" },
  { tag: "shipped", text: "Learnify — EdTech platform", icon: "🚀" },
  { tag: "exploring", text: "WebGL shaders & spring physics", icon: "🔬" },
  { tag: "reading", text: "Atomic Habits — James Clear", icon: "📚" },
  { tag: "listening", text: "lo-fi beats for deep work", icon: "🎧" },
];

export const NowWidget = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ITEMS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const item = ITEMS[i];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-6 mx-auto max-w-md rounded-xl border border-subtle bg-[var(--surface-glass)] backdrop-blur px-4 py-3 flex items-center gap-3"
      data-cursor="hover"
    >
      <div className="relative">
        <span className="size-2 rounded-full bg-[var(--accent-1)] block" />
        <span className="absolute inset-0 size-2 rounded-full bg-[var(--accent-1)] animate-ping" />
      </div>
      <div className="text-[10px] uppercase tracking-widest font-mono text-[var(--fg-muted)] shrink-0">now</div>
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 min-w-0"
          >
            <span aria-hidden>{item.icon}</span>
            <span className="text-xs uppercase tracking-widest text-gradient font-semibold shrink-0">{item.tag}</span>
            <span className="text-sm text-[var(--fg)] truncate">{item.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
