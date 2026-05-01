"use client";
import { useTheme } from "@/context/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiZap } from "react-icons/fi";

const ICONS = {
  dark: <FiMoon className="size-4" />,
  light: <FiSun className="size-4" />,
  cyberpunk: <FiZap className="size-4" />,
};

const LABELS = { dark: "Dark", light: "Light", cyberpunk: "Cyber" };

export const ThemeToggle = () => {
  const { theme, cycleTheme } = useTheme();
  return (
    <button
      onClick={cycleTheme}
      aria-label={`Switch theme (current: ${theme})`}
      className="fixed top-3 right-3 md:top-4 md:right-4 z-50 inline-flex items-center gap-2 px-3 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur text-[var(--fg)] hover:border-[var(--accent-1)] transition-colors group"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--accent-1)]"
        >
          {ICONS[theme]}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs font-semibold hidden sm:inline">{LABELS[theme]}</span>
    </button>
  );
};
