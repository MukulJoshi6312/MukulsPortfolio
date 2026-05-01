"use client";
import React from "react";

type Props = { children: React.ReactNode; fallback: React.ReactNode };
type State = { failed: boolean };

export class ThreeDErrorBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[Scene3D] disabled — fallback rendered:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ---------- Pure-CSS orb. No library. Multi-layer 3D-ish look. ---------- */
export const Orb2DFallback = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    {/* halo glow */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent-1) 35%, transparent), transparent 55%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 55%)",
      }}
    />

    {/* outer ring */}
    <div
      className="absolute size-72 md:size-80 rounded-full border-2 animate-spin"
      style={{
        borderColor: "color-mix(in srgb, var(--accent-2) 30%, transparent)",
        borderRightColor: "transparent",
        borderTopColor: "transparent",
        animationDuration: "14s",
        animationDirection: "reverse",
      }}
    />

    {/* mid ring */}
    <div
      className="absolute size-56 md:size-64 rounded-full border-2 animate-spin"
      style={{
        borderColor: "color-mix(in srgb, var(--accent-1) 40%, transparent)",
        borderBottomColor: "transparent",
        animationDuration: "8s",
      }}
    />

    {/* core orb with conic shimmer */}
    <div className="relative size-36 md:size-44 rounded-full animate-float shadow-glow overflow-hidden">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--accent-1), var(--accent-2), var(--accent-3), var(--accent-1))",
          animation: "border-spin 6s linear infinite",
        }}
      />
      <div
        className="absolute inset-1 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 65% 70%, color-mix(in srgb, var(--accent-3) 60%, transparent), transparent 60%), var(--surface-0)",
        }}
      />
    </div>

    {/* orbiting dots */}
    {[0, 120, 240].map((deg, i) => (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 size-0 animate-spin"
        style={{
          animationDuration: `${10 + i * 3}s`,
          animationDirection: i % 2 ? "reverse" : "normal",
          transform: `translate(-50%,-50%) rotate(${deg}deg)`,
        }}
      >
        <span
          className="absolute size-2 rounded-full"
          style={{
            background: ["var(--accent-1)", "var(--accent-2)", "var(--accent-3)"][i],
            top: `${100 + i * 15}px`,
            left: 0,
            boxShadow: `0 0 12px ${["var(--accent-1)", "var(--accent-2)", "var(--accent-3)"][i]}`,
          }}
        />
      </div>
    ))}
  </div>
);

/* ---------- Pure-CSS animated background scene for the Hero ---------- */
export const Scene2DFallback = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div
      className="absolute top-1/4 left-1/4 size-96 rounded-full blur-3xl animate-pulse-slow"
      style={{ background: "color-mix(in srgb, var(--accent-1) 18%, transparent)" }}
    />
    <div
      className="absolute bottom-1/4 right-1/4 size-96 rounded-full blur-3xl animate-pulse-slow"
      style={{
        background: "color-mix(in srgb, var(--accent-2) 18%, transparent)",
        animationDelay: "1s",
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 size-72 rounded-full blur-3xl animate-pulse-slow"
      style={{
        background: "color-mix(in srgb, var(--accent-3) 16%, transparent)",
        animationDelay: "2s",
      }}
    />
    {/* drifting particles */}
    {Array.from({ length: 18 }).map((_, i) => (
      <span
        key={i}
        className="absolute size-1 rounded-full animate-float"
        style={{
          background: ["var(--accent-1)", "var(--accent-2)", "var(--accent-3)"][i % 3],
          left: `${(i * 53) % 100}%`,
          top: `${(i * 37) % 100}%`,
          animationDuration: `${4 + (i % 5)}s`,
          animationDelay: `${(i % 7) * 0.3}s`,
          opacity: 0.5,
        }}
      />
    ))}
  </div>
);
