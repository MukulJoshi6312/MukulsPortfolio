"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

import memojiImage from "@/assets/images/memoji-computer.png";
import grainImage from "@/assets/images/grain.jpg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

import { MagneticButton } from "@/components/MagneticButton";
import { useData } from "@/hooks/useData";
import type { Profile } from "@/types";
import { NowWidget } from "@/components/NowWidget";
import { Typewriter } from "@/components/Typewriter";

const Scene3DPlain = dynamic(
  () =>
    import("@/components/Scene3DPlain")
      .then((m) => ({ default: m.Scene3DPlain }))
      .catch(() => ({ default: () => null })),
  { ssr: false, loading: () => null }
);

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const HeroSection = () => {
  const { data: profile } = useData<Profile>("/data/profile.json");

  const handleEmail = () => {
    const email = profile?.email || "mukuljoshi.dev@gmail.com";
    window.location.href = `mailto:${email}?subject=Let's Connect&body=Hi, I would like to connect with you!`;
  };
  const handleProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* layered backdrop: 3D scene + grain + soft radial spotlight + dot grid */}
      <Scene3DPlain />
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{ backgroundImage: `url(${grainImage.src})`, opacity: "var(--grain-opacity)" }}
      />
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in srgb, var(--accent-1) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 -z-20 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--fg) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto flex flex-col items-center text-center"
        >
          {/* terminal-style breadcrumb */}
          <motion.div
            variants={item}
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg-muted)] mb-4"
          >
            <span className="text-[var(--accent-2)]">~</span>/portfolio/
            <span className="text-[var(--accent-1)]">whoami</span>
          </motion.div>

          {/* avatar + availability */}
          <motion.div variants={item} className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="absolute -inset-3 rounded-full blur-2xl opacity-60"
                style={{ background: "radial-gradient(circle, var(--accent-1), transparent 70%)" }}
              />
              <Image
                src={memojiImage}
                alt="Mukul peeking from behind a laptop"
                className="relative size-24 md:size-28"
                priority
              />
            </motion.div>
            <div className="surface-card border border-subtle px-4 py-1.5 inline-flex items-center gap-3 rounded-full text-xs">
              <span className="relative flex">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-2 bg-green-500" />
              </span>
              <span className="font-medium">{profile?.availabilityText ?? "Available for opportunities"}</span>
            </div>
          </motion.div>

          {/* big display name */}
          <motion.h1
            variants={item}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-6 leading-[1] tracking-tight"
          >
            <span className="bg-gradient-accent-tri bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent">
              {profile?.name ?? "Mukul Joshi"}
            </span>
          </motion.h1>

          {/* typewriter role */}
          <motion.p
            variants={item}
            className="text-base md:text-xl mt-4 text-[var(--fg)] font-mono flex flex-wrap items-baseline justify-center gap-x-1"
          >
            <span className="text-[var(--fg-muted)]">{`>`}</span>
            <span>I&apos;m a</span>
            <Typewriter />
            <span className="text-[var(--fg-muted)]">· based in {profile?.location ?? "India"}</span>
          </motion.p>

          {/* tagline */}
          <motion.p
            variants={item}
            className="font-serif text-2xl md:text-3xl mt-8 max-w-2xl text-balance text-[var(--fg)]"
          >
            {profile?.tagline ?? "Innovative solutions for a connected world."}
          </motion.p>

          {/* description */}
          <motion.p
            variants={item}
            className="text-[var(--fg-muted)] mt-4 max-w-xl text-balance md:text-lg"
          >
            {profile?.subIntro ??
              "Turning ideas into powerful, efficient, and user-focused software solutions. Let's bring your project to life!"}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-10">
            <MagneticButton
              onClick={handleProjects}
              data-cursor="hover"
              className="cursor-pointer gap-2 border border-subtle px-6 h-12 rounded-xl surface-card text-[var(--fg)] hover:border-[var(--accent-1)] transition-colors"
            >
              <span className="font-semibold">Explore my work</span>
              <ArrowDown className="size-4 animate-arrow-down text-[var(--accent-1)]" />
            </MagneticButton>

            <MagneticButton
              onClick={handleEmail}
              data-cursor="hover"
              className="cursor-pointer gap-2 h-12 px-6 rounded-xl bg-gradient-accent text-black shadow-glow"
            >
              <span className="animate-hand-move">👋</span>
              <span className="font-semibold">Let&apos;s Connect</span>
              <ArrowUpRight className="size-4 -ml-1" />
            </MagneticButton>
          </motion.div>

          {/* now widget */}
          <motion.div variants={item} className="w-full">
            <NowWidget />
          </motion.div>

          {/* keyboard hint */}
          <motion.div
            variants={item}
            className="mt-6 text-center text-[10px] uppercase tracking-widest font-mono text-[var(--fg-muted)]"
          >
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-subtle text-[var(--fg)] mx-0.5">⌘K</kbd>{" "}
            for the command palette
          </motion.div>
        </motion.div>
      </div>

      {/* scroll-down indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="scroll to about"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-14 z-10 flex flex-col items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--accent-1)] transition-colors"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">scroll</span>
        <span className="relative flex flex-col items-center">
          <span className="block w-[1px] h-8 bg-current opacity-40" />
          <motion.span
            animate={{ y: [0, 24, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 size-1.5 rounded-full bg-[var(--accent-1)]"
          />
        </span>
      </motion.button>
    </section>
  );
};
