"use client";
import { motion, AnimatePresence } from "framer-motion";
import variants from "../utils/variants";
import Image from "next/image";
import CheckIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import SectionHeader from "@/components/SectionHeader";
import Github from "@/assets/images/github.png";
import { useData } from "@/hooks/useData";
import type { Project } from "@/types";
import { MagneticButton } from "@/components/MagneticButton";
import { useEffect, useState } from "react";

export const ProjectsSection = () => {
  const { data: projects, loading } = useData<Project[]>("/data/projects.json", []);
  const list = projects ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const active = list[activeIdx];

  // Arrow-key navigation when section in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.getElementById("projects");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % Math.max(1, list.length));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + list.length) % Math.max(1, list.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list.length]);

  return (
    <section className="pb-16 lg:py-24" id="projects">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={variants("bottom", 0.2)}>
          <SectionHeader
            title="Featured Work"
            eyebrow="Case Study Browser"
            description="Pick a project. Use ↑/↓ or click the tabs."
          />
        </motion.div>

        {loading && list.length === 0 && (
          <div className="mt-16 h-[520px] rounded-3xl shimmer surface-card border border-subtle" />
        )}

        {active && (
          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
            {/* sidebar tab list */}
            <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 lg:sticky lg:top-24 lg:self-start">
              {list.map((p, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={p.id} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => setActiveIdx(i)}
                      data-cursor="hover"
                      className={`group relative w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-[var(--accent-1)] bg-[var(--surface-0)]"
                          : "border-subtle bg-transparent hover:bg-[var(--surface-0)]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="project-tab-bar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] rounded-r bg-gradient-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <div className="flex items-center justify-between gap-3 whitespace-nowrap lg:whitespace-normal">
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">
                            {String(i + 1).padStart(2, "0")} · {p.year}
                          </div>
                          <div className={`font-semibold truncate ${isActive ? "text-gradient" : "text-[var(--fg)]"}`}>
                            {p.company}
                          </div>
                        </div>
                        <span
                          className={`size-2 rounded-full shrink-0 ${
                            isActive ? "bg-[var(--accent-1)] shadow-[0_0_8px_var(--accent-1)]" : "bg-[var(--fg-muted)]/40"
                          }`}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* detail panel */}
            <div className="relative rounded-3xl border border-subtle bg-[var(--surface-0)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* left: copy */}
                  <div className="flex flex-col">
                    <div className="text-gradient inline-flex gap-2 font-bold uppercase tracking-widest text-xs">
                      <span>{active.company}</span>
                      <span>•</span>
                      <span>{active.year}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl mt-2">{active.title}</h3>
                    <hr className="border-t-2 border-subtle mt-4" />
                    <ul className="flex flex-col gap-3 mt-4">
                      {active.results.map((r) => (
                        <li key={r} className="flex gap-2 text-sm md:text-base text-[var(--fg-muted)]">
                          <CheckIcon className="size-5 shrink-0 text-[var(--accent-1)] mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    {active.stack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {active.stack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-subtle text-[var(--fg-muted)] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-auto pt-6">
                      <a href={active.link} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="flex-1 md:flex-none">
                        <MagneticButton className="group bg-gradient-accent text-gray-950 h-12 w-full md:w-auto md:px-6 rounded-xl font-semibold gap-2">
                          <span>Visit Live</span>
                          <ArrowUpRightIcon className="size-4 group-hover:rotate-45 transition" />
                        </MagneticButton>
                      </a>
                      <a
                        href={active.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        aria-label={`${active.company} GitHub`}
                      >
                        <div className="size-12 bg-white p-2 rounded-full transition-transform duration-500 hover:rotate-[360deg]">
                          <Image src={Github} alt={`${active.company} GitHub`} />
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* right: full image — contained, not cropped */}
                  <div className="relative">
                    {/* fake browser chrome to frame the screenshot */}
                    <div className="rounded-xl overflow-hidden border border-subtle bg-[var(--bg-soft)]">
                      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-subtle bg-black/20">
                        <span className="size-2.5 rounded-full bg-red-500" />
                        <span className="size-2.5 rounded-full bg-yellow-500" />
                        <span className="size-2.5 rounded-full bg-green-500" />
                        <span className="ml-3 text-[10px] font-mono text-[var(--fg-muted)] truncate">
                          {active.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] md:aspect-[16/10] bg-black/10">
                        <Image
                          src={active.image}
                          alt={`${active.company} screenshot`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-contain transition-transform duration-700 ease-out hover:scale-[1.03]"
                          priority={activeIdx === 0}
                        />
                      </div>
                    </div>

                    {/* counter pill */}
                    <div className="absolute -bottom-3 right-4 px-3 py-1 rounded-full bg-[var(--surface-0)] border border-subtle text-[10px] font-mono uppercase tracking-widest text-[var(--fg-muted)]">
                      {String(activeIdx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
