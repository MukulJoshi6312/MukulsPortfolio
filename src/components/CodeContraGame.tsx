"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* =====================================================================
 *  CODE CONTRA — a tiny run-and-gun for the portfolio playground
 *  Theme: you're a developer shooting incoming bugs. Survive waves,
 *  pick up power-ups, beat the Outage boss every 12 kills.
 * ===================================================================== */

const W = 820;
const H = 320;
const GROUND = H - 40;
const GRAVITY = 0.85;
const JUMP_VEL = -14;
const PLAYER_W = 26;
const PLAYER_H = 34;

type Vec = { x: number; y: number };

type Bullet = Vec & { vx: number; vy: number; from: "player" | "enemy"; alive: boolean; spread?: boolean };
type Particle = Vec & { vx: number; vy: number; life: number; max: number; color: string; size: number };
type Enemy = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  kind: "drone" | "shooter" | "tank" | "boss";
  emoji: string;
  label: string;
  shootCooldown: number;
  alive: boolean;
  width: number;
  height: number;
  baseY: number;
  t: number;
  scoreValue: number;
};
type Powerup = {
  x: number;
  y: number;
  vy: number;
  kind: "rapid" | "spread" | "shield" | "heal";
  emoji: string;
  alive: boolean;
};
type FloatText = { x: number; y: number; text: string; color: string; life: number; max: number };

type Player = {
  x: number;
  y: number;
  vy: number;
  onGround: boolean;
  facing: 1 | -1;
  shootCooldown: number;
  invuln: number;
  shield: boolean;
  power: "normal" | "rapid" | "spread";
  powerLeft: number;
};

const cssVar = (name: string, fb: string) => {
  if (typeof window === "undefined") return fb;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fb;
};

const initPlayer = (): Player => ({
  x: 80,
  y: GROUND - PLAYER_H,
  vy: 0,
  onGround: true,
  facing: 1,
  shootCooldown: 0,
  invuln: 0,
  shield: false,
  power: "normal",
  powerLeft: 0,
});

export const CodeContraGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- mutable game state in refs (not React state) ---
  const playerRef = useRef<Player>(initPlayer());
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const powerupsRef = useRef<Powerup[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatTextRef = useRef<FloatText[]>([]);
  const keysRef = useRef<Record<string, boolean>>({});
  const spawnAtRef = useRef(0);
  const tRef = useRef(0);
  const killsToBossRef = useRef(0);
  const bossActiveRef = useRef(false);
  const wave = useRef(1);
  const screenShake = useRef(0);

  // --- React state for HUD only ---
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState<null | "win" | "lose">(null);
  const [bossHp, setBossHp] = useState<{ hp: number; max: number } | null>(null);
  const [power, setPower] = useState<{ kind: "normal" | "rapid" | "spread"; ms: number }>({ kind: "normal", ms: 0 });
  const [shield, setShield] = useState(false);
  const [waveLabel, setWaveLabel] = useState(1);
  const [best, setBest] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState<string | null>(null);

  useEffect(() => {
    const v = typeof window !== "undefined" ? Number(localStorage.getItem("mj-contra-best") || 0) : 0;
    setBest(v);
  }, []);

  const reset = useCallback(() => {
    playerRef.current = initPlayer();
    bulletsRef.current = [];
    enemiesRef.current = [];
    powerupsRef.current = [];
    particlesRef.current = [];
    floatTextRef.current = [];
    spawnAtRef.current = 0;
    tRef.current = 0;
    killsToBossRef.current = 0;
    bossActiveRef.current = false;
    wave.current = 1;
    screenShake.current = 0;
    setScore(0);
    setLives(3);
    setBossHp(null);
    setPower({ kind: "normal", ms: 0 });
    setShield(false);
    setWaveLabel(1);
    setOver(null);
    setRunning(true);
  }, []);

  const finish = useCallback(
    (result: "win" | "lose") => {
      setRunning(false);
      setOver(result);
      setBest((b) => {
        const nb = Math.max(b, scoreRef.current);
        try {
          localStorage.setItem("mj-contra-best", String(nb));
        } catch {}
        return nb;
      });
    },
    []
  );

  const scoreRef = useRef(score);
  scoreRef.current = score;

  // ---------- key listeners ----------
  useEffect(() => {
    const isGameKey = (k: string) =>
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "A", "d", "D", "w", "W", "s", "S", " ", "j", "J", "k", "K"].includes(
        k
      );
    const isTypingTarget = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    };
    const down = (e: KeyboardEvent) => {
      // Don't intercept keys when the user is typing in an input.
      if (isTypingTarget(e.target)) return;
      // Only block default scroll/etc. while the game is actually running.
      if (running && isGameKey(e.key)) e.preventDefault();
      if (e.key === "Enter") {
        if (over) reset();
        else if (!running) setRunning(true);
        return;
      }
      keysRef.current[e.key] = true;
    };
    const up = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      keysRef.current[e.key] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [running, over, reset]);

  // ---------- spawning ----------
  const spawnEnemy = useCallback(() => {
    const t = tRef.current;
    const w = wave.current;
    const pick = Math.random();
    let kind: Enemy["kind"] = "drone";
    if (pick > 0.7 && w >= 2) kind = "shooter";
    if (pick > 0.92 && w >= 3) kind = "tank";

    const baseY = 60 + Math.random() * (GROUND - PLAYER_H - 100);
    const speedBase = 1.6 + w * 0.25;
    let e: Enemy;
    if (kind === "drone") {
      e = {
        x: W + 30,
        y: baseY,
        vx: -(speedBase + Math.random()),
        vy: 0,
        hp: 1,
        kind,
        emoji: "🐛",
        label: "TypeError",
        shootCooldown: 0,
        alive: true,
        width: 28,
        height: 28,
        baseY,
        t: 0,
        scoreValue: 25,
      };
    } else if (kind === "shooter") {
      e = {
        x: W + 30,
        y: baseY,
        vx: -(speedBase * 0.7),
        vy: 0,
        hp: 2,
        kind,
        emoji: "🦟",
        label: "RaceCondition",
        shootCooldown: 60 + Math.random() * 60,
        alive: true,
        width: 30,
        height: 30,
        baseY,
        t: 0,
        scoreValue: 50,
      };
    } else {
      e = {
        x: W + 30,
        y: GROUND - 38,
        vx: -(speedBase * 0.55),
        vy: 0,
        hp: 4,
        kind,
        emoji: "🕷️",
        label: "MemoryLeak",
        shootCooldown: 100,
        alive: true,
        width: 38,
        height: 38,
        baseY: GROUND - 38,
        t: 0,
        scoreValue: 80,
      };
    }
    enemiesRef.current.push(e);
    void t;
  }, []);

  const spawnBoss = useCallback(() => {
    bossActiveRef.current = true;
    const maxHp = 30 + wave.current * 8;
    enemiesRef.current.push({
      x: W - 80,
      y: 60,
      vx: 0,
      vy: 0,
      hp: maxHp,
      kind: "boss",
      emoji: "🔥",
      label: "P0 Outage",
      shootCooldown: 30,
      alive: true,
      width: 64,
      height: 64,
      baseY: 60,
      t: 0,
      scoreValue: 500,
    });
    setBossHp({ hp: maxHp, max: maxHp });
    setShowLevelUp(`⚠ INCOMING: P0 Outage`);
    setTimeout(() => setShowLevelUp(null), 1800);
  }, []);

  const dropPowerup = useCallback((x: number, y: number) => {
    if (Math.random() > 0.18) return;
    const kinds: Powerup["kind"][] = ["rapid", "spread", "shield", "heal"];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const emoji = kind === "rapid" ? "⚡" : kind === "spread" ? "💥" : kind === "shield" ? "🛡️" : "❤️";
    powerupsRef.current.push({ x, y, vy: 1.4, kind, emoji, alive: true });
  }, []);

  const explode = (x: number, y: number, color: string, count = 14) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1,
        life: 0,
        max: 22 + Math.random() * 14,
        color,
        size: 2 + Math.random() * 2,
      });
    }
  };

  const floater = (x: number, y: number, text: string, color: string) => {
    floatTextRef.current.push({ x, y, text, color, life: 0, max: 50 });
  };

  // ---------- main loop ----------
  useEffect(() => {
    if (!running || over) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const accent1 = cssVar("--accent-1", "#34d399");
    const accent2 = cssVar("--accent-2", "#38bdf8");
    const accent3 = cssVar("--accent-3", "#a78bfa");
    const fgMuted = cssVar("--fg-muted", "rgba(255,255,255,0.6)");

    let raf = 0;
    let last = performance.now();
    let starOffset = 0;

    const step = (now: number) => {
      const dt = Math.min(33, now - last) / 16.67; // ~normalized to 60fps
      last = now;
      tRef.current += 1;

      const p = playerRef.current;
      const keys = keysRef.current;

      // ---- input
      let move = 0;
      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) move -= 1;
      if (keys["ArrowRight"] || keys["d"] || keys["D"]) move += 1;
      if (move !== 0) p.facing = move > 0 ? 1 : -1;
      p.x += move * 4 * dt;
      p.x = Math.max(8, Math.min(W - PLAYER_W - 8, p.x));

      const wantJump = keys["ArrowUp"] || keys["w"] || keys["W"] || keys[" "];
      if (wantJump && p.onGround) {
        p.vy = JUMP_VEL;
        p.onGround = false;
      }

      const wantShoot = keys["j"] || keys["J"] || keys["k"] || keys["K"];
      if (wantShoot && p.shootCooldown <= 0) {
        const cd = p.power === "rapid" ? 6 : 14;
        p.shootCooldown = cd;
        const bx = p.x + (p.facing === 1 ? PLAYER_W : 0);
        const by = p.y + PLAYER_H / 2 - 2;
        const bv = 9 * p.facing;
        bulletsRef.current.push({ x: bx, y: by, vx: bv, vy: 0, from: "player", alive: true });
        if (p.power === "spread") {
          bulletsRef.current.push({ x: bx, y: by, vx: bv, vy: -1.5, from: "player", alive: true, spread: true });
          bulletsRef.current.push({ x: bx, y: by, vx: bv, vy: 1.5, from: "player", alive: true, spread: true });
        }
      }
      if (p.shootCooldown > 0) p.shootCooldown -= dt;

      // ---- player physics
      p.vy += GRAVITY * dt;
      p.y += p.vy * dt;
      if (p.y >= GROUND - PLAYER_H) {
        p.y = GROUND - PLAYER_H;
        p.vy = 0;
        p.onGround = true;
      }

      // ---- spawn enemies (until boss)
      if (!bossActiveRef.current) {
        spawnAtRef.current -= dt;
        if (spawnAtRef.current <= 0) {
          spawnEnemy();
          const base = Math.max(28, 70 - wave.current * 6);
          spawnAtRef.current = base + Math.random() * 30;
        }
      }

      // ---- update enemies
      for (const e of enemiesRef.current) {
        if (!e.alive) continue;
        e.t += dt;
        if (e.kind === "drone") {
          e.x += e.vx * dt;
          e.y = e.baseY + Math.sin(e.t * 0.06) * 22;
        } else if (e.kind === "shooter") {
          e.x += e.vx * dt;
          e.y = e.baseY + Math.sin(e.t * 0.04) * 14;
          e.shootCooldown -= dt;
          if (e.shootCooldown <= 0 && e.x < W - 40) {
            const dx = p.x + PLAYER_W / 2 - (e.x + e.width / 2);
            const dy = p.y + PLAYER_H / 2 - (e.y + e.height / 2);
            const len = Math.hypot(dx, dy) || 1;
            bulletsRef.current.push({
              x: e.x + e.width / 2,
              y: e.y + e.height / 2,
              vx: (dx / len) * 5,
              vy: (dy / len) * 5,
              from: "enemy",
              alive: true,
            });
            e.shootCooldown = 90 + Math.random() * 50;
          }
        } else if (e.kind === "tank") {
          e.x += e.vx * dt;
          e.shootCooldown -= dt;
          if (e.shootCooldown <= 0 && e.x < W - 40) {
            for (let i = -1; i <= 1; i++) {
              bulletsRef.current.push({
                x: e.x,
                y: e.y + e.height / 2,
                vx: -4,
                vy: i * 1.5,
                from: "enemy",
                alive: true,
              });
            }
            e.shootCooldown = 100;
          }
        } else {
          // boss
          e.t += dt;
          e.y = 60 + Math.sin(e.t * 0.03) * 50;
          e.x = W - 100 + Math.sin(e.t * 0.02) * 30;
          e.shootCooldown -= dt;
          if (e.shootCooldown <= 0) {
            // shotgun spread toward player
            const dx = p.x + PLAYER_W / 2 - (e.x + e.width / 2);
            const dy = p.y + PLAYER_H / 2 - (e.y + e.height / 2);
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            for (let i = -2; i <= 2; i++) {
              const ang = i * 0.16;
              const c = Math.cos(ang);
              const s = Math.sin(ang);
              bulletsRef.current.push({
                x: e.x + e.width / 2,
                y: e.y + e.height / 2,
                vx: (ux * c - uy * s) * 5,
                vy: (ux * s + uy * c) * 5,
                from: "enemy",
                alive: true,
              });
            }
            e.shootCooldown = 70;
          }
        }
        if (e.x < -60) e.alive = false;
      }

      // ---- bullets
      for (const b of bulletsRef.current) {
        if (!b.alive) continue;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10) b.alive = false;
      }

      // ---- collisions: player bullets vs enemies
      for (const b of bulletsRef.current) {
        if (!b.alive || b.from !== "player") continue;
        for (const e of enemiesRef.current) {
          if (!e.alive) continue;
          if (b.x > e.x && b.x < e.x + e.width && b.y > e.y && b.y < e.y + e.height) {
            b.alive = false;
            e.hp -= 1;
            explode(b.x, b.y, accent2, 5);
            if (e.hp <= 0) {
              e.alive = false;
              explode(e.x + e.width / 2, e.y + e.height / 2, e.kind === "boss" ? "#ff6b6b" : accent1, 22);
              setScore((s) => s + e.scoreValue);
              floater(e.x + e.width / 2, e.y, `+${e.scoreValue}`, accent1);
              if (e.kind === "boss") {
                screenShake.current = 16;
                bossActiveRef.current = false;
                setBossHp(null);
                wave.current += 1;
                setWaveLabel(wave.current);
                setShowLevelUp(`✓ Wave ${wave.current} cleared`);
                setTimeout(() => setShowLevelUp(null), 1500);
                killsToBossRef.current = 0;
                if (wave.current > 5) {
                  finish("win");
                }
              } else {
                killsToBossRef.current += 1;
                if (killsToBossRef.current >= 12) spawnBoss();
                dropPowerup(e.x + e.width / 2, e.y + e.height / 2);
              }
            } else if (e.kind === "boss") {
              setBossHp((bh) => (bh ? { ...bh, hp: e.hp } : bh));
            }
            break;
          }
        }
      }

      // ---- collisions: enemy bullets vs player
      if (p.invuln <= 0) {
        for (const b of bulletsRef.current) {
          if (!b.alive || b.from !== "enemy") continue;
          if (b.x > p.x && b.x < p.x + PLAYER_W && b.y > p.y && b.y < p.y + PLAYER_H) {
            b.alive = false;
            hitPlayer(p);
            break;
          }
        }
      }
      // ---- collisions: enemy bodies vs player
      if (p.invuln <= 0) {
        for (const e of enemiesRef.current) {
          if (!e.alive) continue;
          if (e.x < p.x + PLAYER_W && e.x + e.width > p.x && e.y < p.y + PLAYER_H && e.y + e.height > p.y) {
            hitPlayer(p);
            break;
          }
        }
      }

      // ---- powerups
      for (const pw of powerupsRef.current) {
        if (!pw.alive) continue;
        pw.y += pw.vy * dt;
        if (pw.y > GROUND - 10) pw.y = GROUND - 10;
        if (pw.x < p.x + PLAYER_W && pw.x + 22 > p.x && pw.y < p.y + PLAYER_H && pw.y + 22 > p.y) {
          pw.alive = false;
          if (pw.kind === "heal") {
            setLives((l) => Math.min(5, l + 1));
            floater(pw.x, pw.y, "+1 LIFE", "#ff6b8a");
          } else if (pw.kind === "shield") {
            p.shield = true;
            setShield(true);
            floater(pw.x, pw.y, "SHIELD", accent2);
          } else {
            p.power = pw.kind;
            p.powerLeft = 360; // ~6s
            setPower({ kind: pw.kind, ms: p.powerLeft });
            floater(pw.x, pw.y, pw.kind === "rapid" ? "RAPID FIRE" : "SPREAD SHOT", accent3);
          }
        }
      }
      if (p.power !== "normal") {
        p.powerLeft -= dt;
        if (p.powerLeft <= 0) {
          p.power = "normal";
          setPower({ kind: "normal", ms: 0 });
        } else {
          setPower((cur) => (cur.ms === p.powerLeft ? cur : { kind: p.power, ms: p.powerLeft }));
        }
      }

      // ---- particles & floaters
      for (const part of particlesRef.current) {
        part.life += dt;
        part.vy += 0.15 * dt;
        part.x += part.vx * dt;
        part.y += part.vy * dt;
      }
      for (const f of floatTextRef.current) {
        f.life += dt;
        f.y -= 0.7 * dt;
      }

      // ---- prune
      if (tRef.current % 30 === 0) {
        bulletsRef.current = bulletsRef.current.filter((x) => x.alive);
        enemiesRef.current = enemiesRef.current.filter((x) => x.alive);
        powerupsRef.current = powerupsRef.current.filter((x) => x.alive && x.y < H);
        particlesRef.current = particlesRef.current.filter((x) => x.life < x.max);
        floatTextRef.current = floatTextRef.current.filter((x) => x.life < x.max);
      }

      // ---- invuln decay
      if (p.invuln > 0) p.invuln -= dt;

      // ---- screen shake decay
      if (screenShake.current > 0) screenShake.current = Math.max(0, screenShake.current - 0.6);

      // ---- DRAW
      ctx.save();
      const sx = (Math.random() - 0.5) * screenShake.current;
      const sy = (Math.random() - 0.5) * screenShake.current;
      ctx.translate(sx, sy);

      // sky / vignette
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(56,189,248,0.10)");
      grad.addColorStop(1, "rgba(167,139,250,0.04)");
      ctx.clearRect(-20, -20, W + 40, H + 40);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // stars (parallax dot grid)
      starOffset = (starOffset + 0.6 * dt) % 40;
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      for (let x = -starOffset; x < W; x += 40) {
        for (let y = 0; y < GROUND - 10; y += 36) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // ground
      ctx.fillStyle = accent1;
      ctx.fillRect(0, GROUND, W, 3);
      ctx.fillStyle = fgMuted;
      const dashOff = -((tRef.current * 4) % 24);
      for (let x = dashOff; x < W; x += 24) ctx.fillRect(x, GROUND + 9, 12, 2);

      // powerups
      for (const pw of powerupsRef.current) {
        if (!pw.alive) continue;
        ctx.font = "20px sans-serif";
        ctx.fillText(pw.emoji, pw.x - 10, pw.y + 7);
      }

      // enemies
      for (const e of enemiesRef.current) {
        if (!e.alive) continue;
        if (e.kind === "boss") {
          // boss aura
          ctx.fillStyle = "rgba(239,68,68,0.18)";
          ctx.beginPath();
          ctx.arc(e.x + e.width / 2, e.y + e.height / 2, 50 + Math.sin(tRef.current * 0.1) * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.font = `${e.kind === "boss" ? 56 : e.kind === "tank" ? 36 : 28}px sans-serif`;
        ctx.fillText(e.emoji, e.x, e.y + e.height - 6);
        if (e.kind !== "drone") {
          // hp bar
          const w = e.width;
          ctx.fillStyle = "rgba(0,0,0,0.4)";
          ctx.fillRect(e.x, e.y - 6, w, 3);
          ctx.fillStyle = e.kind === "boss" ? "#ef4444" : accent3;
          const hpRatio = e.hp / (e.kind === "boss" ? 30 + (wave.current - 1) * 8 : e.kind === "tank" ? 4 : 2);
          ctx.fillRect(e.x, e.y - 6, w * Math.max(0, hpRatio), 3);
        }
      }

      // bullets
      for (const b of bulletsRef.current) {
        if (!b.alive) continue;
        if (b.from === "player") {
          ctx.fillStyle = accent2;
          ctx.fillRect(b.x - 3, b.y - 1.5, 6, 3);
          ctx.fillStyle = "rgba(56,189,248,0.4)";
          ctx.fillRect(b.x - 8, b.y - 1, 6, 2);
        } else {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // particles
      for (const part of particlesRef.current) {
        const a = 1 - part.life / part.max;
        ctx.fillStyle = part.color;
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillRect(part.x, part.y, part.size, part.size);
      }
      ctx.globalAlpha = 1;

      // player (blink while invuln)
      const blink = p.invuln > 0 && Math.floor(tRef.current / 4) % 2 === 0;
      if (!blink) {
        // body
        ctx.fillStyle = accent1;
        ctx.fillRect(p.x, p.y + 8, PLAYER_W, PLAYER_H - 8);
        // hat band
        ctx.fillStyle = accent2;
        ctx.fillRect(p.x - 2, p.y + 2, PLAYER_W + 4, 8);
        ctx.fillRect(p.x + 6, p.y - 2, PLAYER_W - 12, 4);
        // eyes
        ctx.fillStyle = "#0a0014";
        const eyeOff = p.facing === 1 ? 1 : -1;
        ctx.fillRect(p.x + 6 + eyeOff, p.y + 14, 3, 4);
        ctx.fillRect(p.x + PLAYER_W - 9 + eyeOff, p.y + 14, 3, 4);
        // gun
        ctx.fillStyle = accent3;
        const gx = p.facing === 1 ? p.x + PLAYER_W : p.x - 8;
        ctx.fillRect(gx, p.y + 16, 8, 4);
      }
      // shield ring
      if (p.shield) {
        ctx.strokeStyle = accent2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x + PLAYER_W / 2, p.y + PLAYER_H / 2, PLAYER_W * 0.85, 0, Math.PI * 2);
        ctx.stroke();
      }

      // floaters
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (const f of floatTextRef.current) {
        const a = 1 - f.life / f.max;
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;
      ctx.textAlign = "start";

      ctx.restore();

      raf = requestAnimationFrame(step);
    };

    function hitPlayer(p: Player) {
      if (p.shield) {
        p.shield = false;
        setShield(false);
        p.invuln = 60;
        explode(p.x + PLAYER_W / 2, p.y + PLAYER_H / 2, accent2, 14);
        return;
      }
      explode(p.x + PLAYER_W / 2, p.y + PLAYER_H / 2, "#ef4444", 16);
      screenShake.current = 12;
      p.invuln = 90;
      setLives((l) => {
        const nl = l - 1;
        if (nl <= 0) {
          finish("lose");
        }
        return Math.max(0, nl);
      });
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running, over, dropPowerup, finish, spawnEnemy, spawnBoss]);

  // ---------- mobile button helper ----------
  const press = (key: string, val: boolean) => {
    keysRef.current[key] = val;
  };
  const tapShoot = () => {
    keysRef.current["j"] = true;
    setTimeout(() => (keysRef.current["j"] = false), 60);
  };
  const tapJump = () => {
    keysRef.current[" "] = true;
    setTimeout(() => (keysRef.current[" "] = false), 60);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* HUD */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 text-xs font-mono">
        <Stat label="Score" value={score} color="var(--accent-1)" />
        <Stat label="Wave" value={`${waveLabel}/5`} color="var(--accent-2)" />
        <div className="rounded-xl border border-subtle bg-[var(--surface-0)]/60 px-3 py-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">Lives</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-base ${i < lives ? "" : "opacity-20"}`}>
                {i < lives ? "❤️" : "🖤"}
              </span>
            ))}
          </span>
        </div>
        <Stat label="Best" value={best} color="var(--accent-3)" />
        <div className="rounded-xl border border-subtle bg-[var(--surface-0)]/60 px-3 py-2 flex items-center justify-between col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">Power</span>
          <span className="text-sm font-bold text-[var(--accent-3)] truncate">
            {shield && "🛡️ "}
            {power.kind === "rapid" ? "⚡ rapid" : power.kind === "spread" ? "💥 spread" : "—"}
          </span>
        </div>
      </div>

      {/* boss bar */}
      {bossHp && (
        <div className="rounded-full border border-subtle bg-[var(--surface-0)]/60 overflow-hidden h-3 relative">
          <div
            className="absolute inset-y-0 left-0 bg-red-500 transition-all duration-150"
            style={{ width: `${(bossHp.hp / bossHp.max) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white mix-blend-difference">
            🔥 P0 OUTAGE — {bossHp.hp} / {bossHp.max}
          </div>
        </div>
      )}

      {/* canvas */}
      <div className="relative w-full rounded-xl overflow-hidden border border-subtle bg-[var(--surface-0)]/80">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={() => {
            if (over) reset();
            else if (!running) setRunning(true);
          }}
          className="block w-full h-auto"
          style={{ aspectRatio: `${W} / ${H}`, imageRendering: "pixelated" }}
        />

        {/* level up banner */}
        {showLevelUp && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[var(--bg-soft)]/95 border border-[var(--accent-1)]/60 backdrop-blur shadow-glow text-xs font-mono text-[var(--fg)] uppercase tracking-widest">
            {showLevelUp}
          </div>
        )}

        {/* start overlay */}
        {!running && !over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm gap-3 text-center px-6">
            <div className="text-4xl">🔫🐛</div>
            <div className="font-serif text-2xl md:text-3xl text-gradient">Code Contra</div>
            <div className="text-sm text-white/85 max-w-md">
              Shoot the bugs before they reach you. Pick up power-ups. Survive 5 waves and beat the P0 Outage.
            </div>
            <button
              onClick={() => (score > 0 ? reset() : setRunning(true))}
              className="mt-2 px-5 py-2 rounded-full bg-gradient-accent text-black font-semibold text-sm hover:scale-105 transition-transform"
            >
              ▶ {score > 0 ? "Play again" : "Deploy to prod"}
            </button>
            <ControlsLegend />
          </div>
        )}

        {/* game over */}
        {over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 text-center px-6">
            <div className="text-5xl">{over === "win" ? "🏆" : "💥"}</div>
            <div className="font-serif text-2xl md:text-3xl text-gradient">
              {over === "win" ? "All waves cleared" : "Crashed in production"}
            </div>
            <div className="text-sm text-white/85 font-mono">
              final score · <span className="text-[var(--accent-1)] font-bold">{score}</span> · best <span className="text-[var(--accent-3)] font-bold">{best}</span>
            </div>
            <button
              onClick={reset}
              className="mt-2 px-5 py-2 rounded-full bg-gradient-accent text-black font-semibold text-sm hover:scale-105 transition-transform"
            >
              ↻ Run it back
            </button>
          </div>
        )}
      </div>

      {/* mobile / always-visible controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 md:hidden">
          <CtrlBtn onDown={() => press("ArrowLeft", true)} onUp={() => press("ArrowLeft", false)}>←</CtrlBtn>
          <CtrlBtn onDown={() => press("ArrowRight", true)} onUp={() => press("ArrowRight", false)}>→</CtrlBtn>
        </div>
        <p className="text-[11px] text-[var(--fg-muted)] font-mono hidden md:block">
          ←/→ or A/D move · Space/W jump · J or K shoot · Enter restart
        </p>
        <div className="flex gap-2 md:hidden ml-auto">
          <CtrlBtn onDown={tapJump}>jump</CtrlBtn>
          <CtrlBtn onDown={tapShoot} accent>fire</CtrlBtn>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="rounded-xl border border-subtle bg-[var(--surface-0)]/60 px-3 py-2 flex items-center justify-between">
    <span className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">{label}</span>
    <span className="text-base font-bold tabular-nums" style={{ color }}>{value}</span>
  </div>
);

const ControlsLegend = () => (
  <div className="text-[10px] uppercase tracking-widest font-mono text-white/60 mt-1 flex flex-wrap gap-2 justify-center">
    <kbd className="px-1.5 py-0.5 border border-white/20 rounded">←/→</kbd>
    <kbd className="px-1.5 py-0.5 border border-white/20 rounded">space</kbd>
    <span>jump</span>
    <kbd className="px-1.5 py-0.5 border border-white/20 rounded">J</kbd>
    <span>shoot</span>
  </div>
);

const CtrlBtn = ({
  children,
  onDown,
  onUp,
  accent,
}: {
  children: React.ReactNode;
  onDown: () => void;
  onUp?: () => void;
  accent?: boolean;
}) => (
  <button
    onPointerDown={(e) => {
      e.preventDefault();
      onDown();
    }}
    onPointerUp={(e) => {
      e.preventDefault();
      onUp?.();
    }}
    onPointerLeave={(e) => {
      e.preventDefault();
      onUp?.();
    }}
    className={`size-12 rounded-lg border border-subtle font-bold uppercase text-xs font-mono select-none active:scale-95 transition-transform ${
      accent ? "bg-gradient-accent text-black" : "bg-[var(--surface-0)] text-[var(--fg)]"
    }`}
  >
    {children}
  </button>
);
