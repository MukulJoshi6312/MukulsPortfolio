"use client";
import SectionHeader from "@/components/SectionHeader";
import { DevTerminal } from "@/components/DevTerminal";
import { CodeContraGame } from "@/components/CodeContraGame";
import Card from "@/components/Card";
import { motion } from "framer-motion";

export const Playground = () => {
  return (
    <div className="py-20 lg:py-28" id="playground">
      <div className="container">
        <SectionHeader
          title="Stay a while"
          eyebrow="Dev Playground"
          description="Type a command in the terminal — or load up the run-and-gun and shoot some bugs."
        />

        <div className="mt-16 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            <DevTerminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 md:p-8">
              <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[var(--fg-muted)] font-mono">Run &amp; gun</span>
                  <h3 className="font-serif text-2xl md:text-3xl mt-1">🔫 Code Contra</h3>
                  <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-md">
                    5 waves of incoming bugs. Grab power-ups. Beat the P0-Outage boss.
                  </p>
                </div>
              </div>
              <CodeContraGame />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
