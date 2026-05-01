"use client";
import variants from "../utils/variants";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import Java from "@/assets/icons/java.svg";
import Sql from "@/assets/icons/sql.svg";
import googleCloud from "@/assets/icons/gcd.svg";
import Androidsvg from "@/assets/icons/svgAndroid.svg";
import NextJs from "@/assets/icons/svgNextJs.svg";
import mapImage from "@/assets/images/map.png";
import smileEmogi from "@/assets/images/memoji-smile.png";
import heroImage from "@/assets/images/heroImage.png";
import CardHeader from "@/components/CardHeader";
import ToolboxItem from "@/components/ToolboxItem";
import { useRef, useState } from "react";
import { IoCopyOutline, IoCheckmarkCircle } from "react-icons/io5";
import { useData } from "@/hooks/useData";
import type { Profile, Skills } from "@/types";
import { StatCounter } from "@/components/StatCounter";
import { Orb2DFallback } from "@/components/ThreeDErrorBoundary";

const ICON_MAP: Record<string, React.ElementType> = {
  js: JavaScriptIcon,
  ts: JavaScriptIcon,
  react: ReactIcon,
  next: NextJs,
  java: Java,
  android: Androidsvg,
  sql: Sql,
  html: HTMLIcon,
  css: CssIcon,
  chrome: ChromeIcon,
  gcd: googleCloud,
  github: GithubIcon,
};

export const AboutSection = () => {
  const { data: profile } = useData<Profile>("/data/profile.json");
  const { data: skills } = useData<Skills>("/data/skills.json");

  const constrainRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleLocation = () => {
    if (!profile?.geo) return;
    const { latitude, longitude } = profile.geo;
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  };

  const copyEmailHandler = () => {
    if (!profile?.email) return;
    navigator.clipboard
      .writeText(profile.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => console.log("failed to copy email", err));
  };

  const toolboxItems = (skills?.tools ?? []).map((s) => ({
    title: s.title,
    iconType: ICON_MAP[s.icon] ?? JavaScriptIcon,
  }));

  const hobbies = skills?.hobbies ?? [];

  return (
    <div className="py-20 lg:py-28" id="about">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={variants("bottom", 0.1)}>
          <SectionHeader
            title="About Me"
            eyebrow="A Glimpse Into My World"
            description="Learn more about who I am, what I do, and what inspires me."
          />
        </motion.div>

        {/* Stats row */}
        {profile?.stats && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {profile.stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col gap-8">
          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader title="My Reads" description="Delve into the pages shaping my journey." />
              <motion.div whileHover={{ y: -8, rotate: -3 }} className="w-40 mx-auto mt-2">
                <Image src={bookImage} alt="Book cover" />
              </motion.div>
            </Card>

            <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
              />
              {toolboxItems.length > 0 && (
                <>
                  <ToolboxItem items={toolboxItems} className="" itemsWrapperdClassName="animate-move-left  [animation-duration:30s]" />
                  <ToolboxItem
                    items={toolboxItems}
                    className="mt-6"
                    itemsWrapperdClassName="animate-move-right  [animation-duration:15s]"
                  />
                </>
              )}
            </Card>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constrainRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    drag
                    dragConstraints={constrainRef}
                    whileHover={{ scale: 1.1 }}
                    whileDrag={{ scale: 1.15 }}
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-accent rounded-full py-1.5 absolute cursor-grab active:cursor-grabbing"
                    style={{ left: hobby.left, top: hobby.top }}
                    data-cursor="hover"
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card onClick={handleLocation} className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1 cursor-pointer" data-cursor="hover">
              <Image src={mapImage} alt="Map of India" className="h-full w-full object-cover object-left-top" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:outline after:inset-0 after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-accent -z-20 animate-ping [animation-duration:2s]" />
                <div className="absolute inset-0 rounded-full bg-gradient-accent -z-10" />
                <Image src={smileEmogi} alt="memoji" className="size-20" />
              </div>
              <div className="absolute text-xs bottom-2 left-2 font-bold bg-gray-900/70 px-4 py-1.5 rounded-full text-white">
                📍 {profile?.geo?.label ?? "INDIA"}
              </div>
            </Card>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3 md:mt-8">
            <div className="h-[420px] md:col-span-2 lg:col-span-1 relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-accent animate-gradient [animation-duration:5s] bg-[length:200%_200%]" />
              <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <Orb2DFallback />
              </div>
              <motion.div
                whileHover={{ scale: 1.04, rotate: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0"
              >
                <Image src={heroImage} alt="Mukul Joshi" className="w-[300px] drop-shadow-2xl" priority />
              </motion.div>
            </div>

            <div className="h-[420px] p-0 md:col-span-3 lg:col-span-2 py-4 relative">
              <h3 className="font-serif text-3xl md:text-3xl lg:text-6xl tracking-wider">Know who I am</h3>
              <h4 className="py-3 md:text-2xl text-lg">My journey in a few words</h4>
              <p className="text-[var(--fg-muted)] tracking-normal leading-7 text-sm md:text-lg">{profile?.bio}</p>

              <Card className="inline-flex mt-6">
                <button
                  onClick={copyEmailHandler}
                  data-cursor="hover"
                  className="bottom-2 inline-flex py-1.5 px-4 cursor-pointer items-center gap-3 transition duration-500"
                >
                  <p>{copied ? "Email copied!" : "Copy my email address"}</p>
                  {copied ? <IoCheckmarkCircle className="text-[var(--accent-1)]" /> : <IoCopyOutline />}
                </button>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
