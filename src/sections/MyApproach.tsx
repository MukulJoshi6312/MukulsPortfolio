"use client";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { useData } from "@/hooks/useData";
import type { ApproachItem } from "@/types";

const MyApproach = () => {
  const { data: approachList } = useData<ApproachItem[]>("/data/approach.json", []);
  const list = approachList ?? [];

  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader title="My Approach" eyebrow="Crafting seamless experiences with purpose and precision." description="" />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-3">
            {list.map((approach, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="col-span-1 md:col-span-2 lg:col-span-1"
                key={approach.id}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-[320px] overflow-hidden rounded-3xl p-[1px]">
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--accent-1)_0%,var(--accent-3)_50%,var(--accent-2)_100%)]" />
                  <div className="relative inline-flex flex-col h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-[var(--surface-0)] px-6 py-8 text-sm font-medium text-[var(--fg)] backdrop-blur-3xl transition-all duration-700 hover:bg-gradient-accent hover:text-gray-900 group">
                    <span className="text-4xl">{approach.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-serif py-3 text-center">{approach.title}</h3>
                    <p className="text-sm text-center text-[var(--fg-muted)] group-hover:text-gray-900">{approach.description}</p>
                    <div className="absolute top-4 left-4 text-xs uppercase tracking-widest text-[var(--fg-muted)] group-hover:text-gray-900/70">
                      {approach.phase}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApproach;
