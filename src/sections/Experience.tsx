"use client";
import SectionHeader from "@/components/SectionHeader";
import Team from "@/components/Team";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { useData } from "@/hooks/useData";
import type { Experience as Exp } from "@/types";

const Experience = () => {
  const { data: expList } = useData<Exp[]>("/data/experience.json", []);
  const [showLess, setShowLess] = useState<{ [key: number]: boolean }>({});
  const handleShowMore = (id: number) => setShowLess((prev) => ({ ...prev, [id]: !prev[id] }));
  const list = expList ?? [];

  return (
    <div className="py-20 lg:py-28">
      <div className="container lg:px-40">
        <SectionHeader title="My Work Experiences" eyebrow="Where I've Been Employed" description="My work experience so far." />

        <div className="mt-20 relative">
          {/* timeline line */}
          <div className="absolute left-0 md:left-[calc(50%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-1)] via-[var(--accent-2)] to-transparent opacity-30 hidden md:block" />

          {list.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative grid md:gap-8 grid-cols-1 md:grid-cols-4 mt-8 pb-8 group"
            >
              {/* dot */}
              <span className="hidden md:block absolute left-[calc(50%-6px)] top-2 size-3 rounded-full bg-[var(--accent-1)] ring-4 ring-[var(--bg)] group-hover:scale-150 transition-transform" />

              <Fragment>
                <div className="md:col-span-2">
                  <h3 className="text-[var(--fg)] text-lg font-semibold">
                    {exp.title}
                    <span className="text-gradient tracking-wider"> {exp.company}</span>
                  </h3>
                  <p className="text-sm text-[var(--fg-muted)] py-2">
                    {exp.duration} {exp.location && `· ${exp.location}`}
                  </p>
                  {exp.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-subtle text-[var(--fg-muted)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 mt-2 md:mt-0">
                  <p className="text-sm text-[var(--fg-muted)] tracking-wide">
                    {showLess[exp.id] ? exp.description : exp.description.slice(0, 120) + "..."}
                    <button
                      onClick={() => handleShowMore(exp.id)}
                      data-cursor="hover"
                      className="text-[var(--accent-1)] cursor-pointer ml-1 hover:underline"
                    >
                      {showLess[exp.id] ? "See less" : "See more"}
                    </button>
                  </p>
                  {exp.showTeam && (
                    <div className="mt-3">
                      <span className="text-[var(--fg-muted)] text-xs">~ collaborated with</span>
                      <Team />
                    </div>
                  )}
                </div>
              </Fragment>
              {idx < list.length - 1 && <div className="md:hidden border-b border-subtle mt-6" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
