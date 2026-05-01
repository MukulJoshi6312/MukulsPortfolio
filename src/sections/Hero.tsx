"use client";
import { motion } from "framer-motion";
import variants from "../utils/variants";

import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StartIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";

import { HeroOrbit } from "@/components/HeroOrbit";
import { MagneticButton } from "@/components/MagneticButton";
import { useData } from "@/hooks/useData";
import type { Profile } from "@/types";
import { Scene2DFallback } from "@/components/ThreeDErrorBoundary";
import { NowWidget } from "@/components/NowWidget";

export const HeroSection = () => {
  const { data: profile } = useData<Profile>("/data/profile.json");

  const handleEmailClick = () => {
    const email = profile?.email || "mukuljoshi6312@gmail.com";
    window.location.href = `mailto:${email}?subject=Let's Connect&body=Hi, I would like to connect with you!`;
  };
  const handleProjectClick = () => {
    window.location.href = "#projects";
  };

  return (
    <div id="home" className="py-32 md:py-48 lg:py-50 relative z-0 overflow-x-clip min-h-screen flex items-center">
      <Scene2DFallback />

      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div className="absolute inset-0 -z-30" style={{ opacity: "var(--grain-opacity)", backgroundImage: `url(${grainImage.src})` }} />
        <div className="size-[620px] hero-ring" />
        <div className="size-[820px] hero-ring" />
        <div className="size-[1020px] hero-ring" />
        <div className="size-[1220px] hero-ring" />

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-8 text-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={80} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="10s">
          <SparkleIcon className="size-5 text-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-3 rounded-full bg-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-10 text-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="10s">
          <StartIcon className="size-12 text-[var(--accent-1)]" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <StartIcon className="size-8 text-[var(--accent-1)]" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-3 rounded-full bg-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-14 text-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-[var(--accent-1)]/20" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
          <StartIcon className="size-24 text-[var(--accent-1)]/50" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
          <StartIcon className="size-28 text-[var(--accent-1)]" />
        </HeroOrbit>
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, scale: { type: "spring", bounce: 0.3 } }}
          className="flex flex-col items-center"
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Image src={memojiImage} alt="Mukul peeking from behind a laptop" className="size-[100px]" />
          </motion.div>
          <div className="surface-card border border-subtle px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large" />
            </div>
            <div className="text-sm font-medium">{profile?.availabilityText ?? "Available for opportunities"}</div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants("bottom", 0.1)}
          className="max-w-lg mx-auto"
        >
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide">
            {profile?.tagline ?? "Innovative solutions for a connected world."}
          </h1>
          <p className="text-center text-lg font-semibold my-4 tracking-wider">
            Hey there! I&apos;m <span className="text-gradient">{profile?.shortName ?? "Mukul"}</span> a{" "}
            <span className="text-gradient">{profile?.role ?? "Software Developer"}</span> based in {profile?.location ?? "India"}
          </p>
          <p className="mt-4 text-center text-[var(--fg-muted)] md:text-lg">
            {profile?.subIntro ??
              "Turning ideas into powerful, efficient, and user-focused software solutions. Let's bring your project to life!"}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <MagneticButton
            onClick={handleProjectClick}
            data-cursor="hover"
            className="cursor-pointer gap-2 border border-subtle px-6 h-12 rounded-xl z-30 surface-card"
          >
            <span className="font-semibold">Explore my work</span>
            <ArrowDown className="size-4 animate-arrow-down" />
          </MagneticButton>

          <MagneticButton
            onClick={handleEmailClick}
            data-cursor="hover"
            className="cursor-pointer gap-2 h-12 px-6 rounded-xl z-30 bg-gradient-accent text-black"
          >
            <span className="animate-hand-move">👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </MagneticButton>
        </div>

        <NowWidget />

        <div className="mt-6 text-center text-[10px] uppercase tracking-widest font-mono text-[var(--fg-muted)]">
          Press <kbd className="px-1.5 py-0.5 rounded border border-subtle text-[var(--fg)]">⌘K</kbd> for the command palette
        </div>
      </div>
    </div>
  );
};
