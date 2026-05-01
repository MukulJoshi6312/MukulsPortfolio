"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Action" | "Theme" | "External";
  icon: string;
  run: () => void;
};

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cmds: Cmd[] = useMemo(
    () => [
      { id: "n-home", group: "Navigate", icon: "🏠", label: "Go to Home", run: () => go("home") },
      { id: "n-about", group: "Navigate", icon: "👤", label: "Go to About", run: () => go("about") },
      { id: "n-projects", group: "Navigate", icon: "🧩", label: "Go to Projects", run: () => go("projects") },
      { id: "n-play", group: "Navigate", icon: "🎮", label: "Open Playground (terminal & snake)", run: () => go("playground") },
      { id: "n-contact", group: "Navigate", icon: "✉️", label: "Go to Contact", run: () => go("contact") },
      {
        id: "a-email",
        group: "Action",
        icon: "📋",
        label: "Copy email to clipboard",
        run: async () => {
          try {
            await navigator.clipboard.writeText("mukuljoshi6312@gmail.com");
          } catch {}
          setOpen(false);
        },
      },
      {
        id: "a-mail",
        group: "Action",
        icon: "📨",
        label: "Send me an email",
        run: () => {
          window.location.href = "mailto:mukuljoshi6312@gmail.com";
          setOpen(false);
        },
      },
      { id: "t-dark", group: "Theme", icon: "🌑", label: "Switch to Dark theme", run: () => { setTheme("dark"); setOpen(false); } },
      { id: "t-light", group: "Theme", icon: "☀️", label: "Switch to Light theme", run: () => { setTheme("light"); setOpen(false); } },
      { id: "t-cyber", group: "Theme", icon: "⚡️", label: "Switch to Cyberpunk theme", run: () => { setTheme("cyberpunk"); setOpen(false); } },
      { id: "x-gh", group: "External", icon: "🐙", label: "Open GitHub", hint: "github.com/MukulJoshi6312", run: () => { window.open("https://github.com/MukulJoshi6312", "_blank"); setOpen(false); } },
      { id: "x-li", group: "External", icon: "💼", label: "Open LinkedIn", hint: "linkedin.com/in/mukul-joshi-661234193", run: () => { window.open("https://www.linkedin.com/in/mukul-joshi-661234193/", "_blank"); setOpen(false); } },
      { id: "x-tw", group: "External", icon: "🐦", label: "Open X / Twitter", hint: "@MukulJoshi1998", run: () => { window.open("https://x.com/MukulJoshi1998", "_blank"); setOpen(false); } },
    ],
    [setTheme]
  );

  // open / close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isOpen = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isOpen) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // focus when opened
  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return cmds;
    return cmds.filter((c) => `${c.label} ${c.hint ?? ""}`.toLowerCase().includes(needle));
  }, [cmds, q]);

  // arrow-key + enter
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  // group filtered list while preserving original order
  const grouped = useMemo(() => {
    const g: Record<Cmd["group"], Cmd[]> = { Navigate: [], Action: [], Theme: [], External: [] };
    filtered.forEach((c) => g[c.group].push(c));
    return g;
  }, [filtered]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh] px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -20, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-[var(--bg-soft)] border border-subtle shadow-glow overflow-hidden font-sans"
          >
            <div className="flex items-center gap-3 px-4 h-12 border-b border-subtle">
              <span className="text-[var(--accent-1)] font-mono">›_</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder="Type a command, page, or theme…"
                className="flex-1 bg-transparent outline-none text-[var(--fg)] placeholder:text-[var(--fg-muted)]"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-subtle text-[var(--fg-muted)]">esc</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="text-center py-10 text-sm text-[var(--fg-muted)]">No matches. Try “theme”, “projects”, “snake”…</div>
              )}
              {(Object.keys(grouped) as Cmd["group"][]).map((g) => {
                const items = grouped[g];
                if (items.length === 0) return null;
                return (
                  <div key={g} className="mb-2">
                    <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-[var(--fg-muted)] font-mono">{g}</div>
                    {items.map((c) => {
                      const idx = filtered.indexOf(c);
                      const isActive = idx === active;
                      return (
                        <button
                          key={c.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={c.run}
                          data-cursor="hover"
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                            isActive ? "bg-[var(--accent-1)]/15 text-[var(--fg)]" : "text-[var(--fg-muted)]"
                          }`}
                        >
                          <span className="text-base shrink-0" aria-hidden>{c.icon}</span>
                          <span className="flex-1 truncate">{c.label}</span>
                          {c.hint && <span className="text-[10px] font-mono text-[var(--fg-muted)] truncate max-w-[180px]">{c.hint}</span>}
                          {isActive && <span className="text-[var(--accent-1)] font-mono text-xs">↵</span>}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between px-4 h-9 border-t border-subtle text-[10px] font-mono text-[var(--fg-muted)]">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 border border-subtle rounded">↑</kbd>/<kbd className="px-1 border border-subtle rounded">↓</kbd> navigate</span>
                <span><kbd className="px-1 border border-subtle rounded">↵</kbd> run</span>
              </div>
              <span className="text-gradient">⌘K palette · v1</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
