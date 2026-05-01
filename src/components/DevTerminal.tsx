"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line = { type: "in" | "out" | "ascii"; text: string };

const ASCII = `
 __  __ _   _ _  ___   _ _
|  \\/  | | | | |/ / | | | |
| |\\/| | | | | ' /| | | | |
| |  | | |_| | . \\| |_| | |___
|_|  |_|\\___/|_|\\_\\\\___/|_____|
`;

const HELP = [
  "Available commands:",
  "  about       — who am I",
  "  skills      — my tech stack",
  "  projects    — featured work",
  "  socials     — find me online",
  "  contact     — drop me a line",
  "  game        — play number-guess",
  "  clear       — clear the terminal",
  "  help        — show this menu",
];

const ABOUT = "Frontend engineer · React · Next.js · TypeScript · India.";
const SKILLS = "JavaScript, TypeScript, React, Next.js, Node, Tailwind, Three.js, Java, Android, SQL, GCP.";
const SOCIALS = "linkedin/mukul-joshi-661234193 · github/MukulJoshi6312 · x/MukulJoshi1998";
const CONTACT = "mukuljoshi.dev@gmail.com — happy to chat about your project.";

export const DevTerminal = () => {
  const [history, setHistory] = useState<Line[]>([
    { type: "ascii", text: ASCII },
    { type: "out", text: "Welcome to mukul.dev — type 'help' to see what I can do." },
  ]);
  const [input, setInput] = useState("");
  const [game, setGame] = useState<{ active: boolean; target: number; tries: number }>({ active: false, target: 0, tries: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const append = (lines: Line[]) => setHistory((h) => [...h, ...lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    append([{ type: "in", text: raw }]);

    if (game.active) {
      const guess = parseInt(cmd, 10);
      if (cmd === "exit" || cmd === "quit") {
        setGame({ active: false, target: 0, tries: 0 });
        append([{ type: "out", text: "Game exited." }]);
        return;
      }
      if (Number.isNaN(guess)) {
        append([{ type: "out", text: "Enter a number 1-100, or 'exit'." }]);
        return;
      }
      const tries = game.tries + 1;
      if (guess === game.target) {
        append([{ type: "out", text: `🎉 Correct! Found it in ${tries} tries. Type 'game' to play again.` }]);
        setGame({ active: false, target: 0, tries: 0 });
      } else if (guess < game.target) {
        append([{ type: "out", text: `↑ higher (try ${tries})` }]);
        setGame({ ...game, tries });
      } else {
        append([{ type: "out", text: `↓ lower (try ${tries})` }]);
        setGame({ ...game, tries });
      }
      return;
    }

    switch (cmd) {
      case "":
        return;
      case "help":
        append(HELP.map((t) => ({ type: "out" as const, text: t })));
        return;
      case "about":
        append([{ type: "out", text: ABOUT }]);
        return;
      case "skills":
        append([{ type: "out", text: SKILLS }]);
        return;
      case "projects":
        append([
          { type: "out", text: "→ Learnify (2025) — EdTech platform" },
          { type: "out", text: "→ CryptoBucks (2024) — real-time crypto tracker" },
          { type: "out", text: "→ MovieHub (2024) — TMDB browser" },
          { type: "out", text: "Scroll up to see them all in detail." },
        ]);
        return;
      case "socials":
        append([{ type: "out", text: SOCIALS }]);
        return;
      case "contact":
        append([{ type: "out", text: CONTACT }]);
        return;
      case "clear":
        setHistory([]);
        return;
      case "game": {
        const target = Math.floor(Math.random() * 100) + 1;
        setGame({ active: true, target, tries: 0 });
        append([
          { type: "out", text: "🎯 Number-guess: I picked a number 1-100. Guess it." },
          { type: "out", text: "Type a number, or 'exit' to quit." },
        ]);
        return;
      }
      default:
        append([{ type: "out", text: `command not found: ${cmd}. type 'help'.` }]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-0)]/90 backdrop-blur shadow-[0_30px_80px_-30px_var(--accent-1)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-[var(--border-subtle)]">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs font-mono text-[var(--fg-muted)]">~/mukul.dev — zsh</span>
      </div>
      <div ref={scrollRef} className="h-[420px] md:h-[480px] overflow-y-auto p-5 md:p-6 font-mono text-xs md:text-sm">
        {history.map((l, i) =>
          l.type === "ascii" ? (
            <pre key={i} className="text-[var(--accent-1)] whitespace-pre leading-tight">{l.text}</pre>
          ) : l.type === "in" ? (
            <div key={i} className="text-[var(--fg)]">
              <span className="text-[var(--accent-2)]">➜</span> <span className="text-[var(--accent-1)]">~</span> {l.text}
            </div>
          ) : (
            <div key={i} className="text-[var(--fg-muted)] whitespace-pre-wrap">{l.text}</div>
          )
        )}
        <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
          <span className="text-[var(--accent-2)]">➜</span>
          <span className="text-[var(--accent-1)]">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-[var(--fg)] caret-[var(--accent-1)]"
            placeholder={game.active ? "your guess..." : "type 'help'"}
          />
        </form>
      </div>
    </motion.div>
  );
};
