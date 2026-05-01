"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GRID = 16;
const TICK_MS = 130;

type Vec = { x: number; y: number };
const eq = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y;
const randCell = (): Vec => ({ x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) });

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Vec[]>([{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }]);
  const [dir, setDir] = useState<Vec>({ x: 1, y: 0 });
  const [food, setFood] = useState<Vec>({ x: 12, y: 8 });
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    const saved = typeof window !== "undefined" ? Number(localStorage.getItem("mj-snake-best") || 0) : 0;
    setBest(saved);
  }, []);

  const reset = useCallback(() => {
    setSnake([{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }]);
    setDir({ x: 1, y: 0 });
    setFood(randCell());
    setScore(0);
    setOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const d = dirRef.current;
      if ((k === "ArrowUp" || k === "w") && d.y !== 1) setDir({ x: 0, y: -1 });
      else if ((k === "ArrowDown" || k === "s") && d.y !== -1) setDir({ x: 0, y: 1 });
      else if ((k === "ArrowLeft" || k === "a") && d.x !== 1) setDir({ x: -1, y: 0 });
      else if ((k === "ArrowRight" || k === "d") && d.x !== -1) setDir({ x: 1, y: 0 });
      else if (k === " ") {
        e.preventDefault();
        if (over) reset();
        else setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over, reset]);

  useEffect(() => {
    if (!running || over) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
        if (next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID || prev.some((p) => eq(p, next))) {
          setOver(true);
          setRunning(false);
          setBest((b) => {
            const nb = Math.max(b, score);
            try { localStorage.setItem("mj-snake-best", String(nb)); } catch {}
            return nb;
          });
          return prev;
        }
        const ate = eq(next, food);
        const body = ate ? [next, ...prev] : [next, ...prev.slice(0, -1)];
        if (ate) {
          setScore((s) => s + 1);
          let f = randCell();
          while (body.some((p) => eq(p, f))) f = randCell();
          setFood(f);
        }
        return body;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, over, food, score]);

  const press = (nd: Vec) => {
    const d = dirRef.current;
    if (nd.x === -d.x && nd.y === -d.y) return;
    setDir(nd);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-mono">
          <span className="text-[var(--fg-muted)]">score:</span>{" "}
          <span className="text-[var(--accent-1)] font-bold">{score}</span>
          <span className="text-[var(--fg-muted)] ml-4">best:</span>{" "}
          <span className="text-[var(--accent-2)] font-bold">{best}</span>
        </div>
        <button
          onClick={() => (over ? reset() : running ? setRunning(false) : reset())}
          className="text-xs px-3 py-1 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-1)] transition-colors"
        >
          {over ? "Restart" : running ? "Pause" : "Play"}
        </button>
      </div>

      <div
        className="relative grid bg-[var(--surface-0)]/70 rounded-xl overflow-hidden border border-[var(--border-subtle)]"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, width: "min(100%, 360px)", aspectRatio: "1 / 1" }}
      >
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const isHead = eq(snake[0], { x, y });
          const isBody = !isHead && snake.some((p) => eq(p, { x, y }));
          const isFood = eq(food, { x, y });
          return (
            <div
              key={i}
              className={
                isHead
                  ? "bg-[var(--accent-1)]"
                  : isBody
                  ? "bg-[var(--accent-1)]/60"
                  : isFood
                  ? "bg-[var(--accent-3)] rounded-full scale-75"
                  : "bg-transparent"
              }
              style={{ aspectRatio: "1 / 1" }}
            />
          );
        })}

        {!running && !over && (
          <button
            onClick={reset}
            className="absolute inset-0 flex items-center justify-center bg-black/60 text-[var(--fg)] font-mono text-sm hover:bg-black/40 transition"
          >
            ▶ Press play (or space)
          </button>
        )}
        {over && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-2"
          >
            <div className="font-serif text-2xl text-[var(--accent-1)]">Game Over</div>
            <div className="text-sm text-[var(--fg-muted)]">final score · {score}</div>
            <button onClick={reset} className="mt-2 px-4 py-1.5 rounded-full bg-[var(--accent-1)] text-black font-semibold text-sm">
              Play Again
            </button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1 md:hidden">
        <div></div>
        <button onClick={() => press({ x: 0, y: -1 })} className="size-12 rounded-lg bg-[var(--surface-0)] border border-[var(--border-subtle)]">↑</button>
        <div></div>
        <button onClick={() => press({ x: -1, y: 0 })} className="size-12 rounded-lg bg-[var(--surface-0)] border border-[var(--border-subtle)]">←</button>
        <button onClick={() => press({ x: 0, y: 1 })} className="size-12 rounded-lg bg-[var(--surface-0)] border border-[var(--border-subtle)]">↓</button>
        <button onClick={() => press({ x: 1, y: 0 })} className="size-12 rounded-lg bg-[var(--surface-0)] border border-[var(--border-subtle)]">→</button>
      </div>
      <p className="text-xs text-[var(--fg-muted)] hidden md:block">arrows / wasd to move · space to pause</p>
    </div>
  );
};
