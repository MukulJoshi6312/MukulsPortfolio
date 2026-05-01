"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "Software Developer",
  "Frontend Engineer",
  "React Specialist",
  "UI Craftsman",
  "Problem Solver",
];

export const Typewriter = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const target = ROLES[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text === target) {
        timer = setTimeout(() => setPhase("holding"), 30);
      } else {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 65);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 1700);
    } else {
      if (text.length === 0) {
        setIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
        return;
      }
      timer = setTimeout(() => setText(text.slice(0, -1)), 32);
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-gradient font-semibold">{text}</span>
      <span className="ml-0.5 inline-block w-[2px] h-[0.9em] bg-[var(--accent-1)] animate-pulse" aria-hidden />
    </span>
  );
};
