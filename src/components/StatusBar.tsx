"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeProvider";

const SECTIONS: { id: string; label: string }[] = [
  { id: "home", label: "home.tsx" },
  { id: "about", label: "about.tsx" },
  { id: "projects", label: "projects.tsx" },
  { id: "playground", label: "playground.tsx" },
  { id: "contact", label: "contact.tsx" },
];

export const StatusBar = () => {
  const { theme, cycleTheme } = useTheme();
  const [section, setSection] = useState("home");
  const [time, setTime] = useState("");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOnline(navigator.onLine);
    const u = () => setOnline(true);
    const d = () => setOnline(false);
    window.addEventListener("online", u);
    window.addEventListener("offline", d);
    return () => {
      window.removeEventListener("online", u);
      window.removeEventListener("offline", d);
    };
  }, []);

  const file = SECTIONS.find((s) => s.id === section)?.label ?? "home.tsx";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] h-7 bg-[var(--bg-soft)]/85 backdrop-blur border-t border-subtle text-[10px] font-mono text-[var(--fg-muted)] flex items-center px-3 gap-4 select-none">
      <div className="flex items-center gap-1.5">
        <span className={`size-2 rounded-full ${online ? "bg-[var(--accent-1)] shadow-[0_0_6px_var(--accent-1)]" : "bg-red-500"}`} />
        <span>{online ? "online" : "offline"}</span>
      </div>
      <span className="opacity-50">|</span>
      <span className="truncate">~/portfolio/<span className="text-[var(--accent-2)]">{file}</span></span>
      <span className="opacity-50 hidden sm:inline">|</span>
      <span className="hidden sm:inline">main</span>
      <span className="opacity-50 hidden md:inline">|</span>
      <span className="hidden md:inline">UTF-8</span>
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={cycleTheme}
          data-cursor="hover"
          className="hover:text-[var(--accent-1)] transition-colors"
          aria-label="cycle theme"
        >
          theme:<span className="text-[var(--accent-1)]"> {theme}</span>
        </button>
        <span className="opacity-50 hidden sm:inline">|</span>
        <span className="hidden sm:inline tabular-nums">{time}</span>
        <span className="opacity-50 hidden md:inline">|</span>
        <span className="hidden md:inline">⌘K palette</span>
      </div>
    </div>
  );
};
