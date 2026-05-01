"use client";
import SectionHeader from "@/components/SectionHeader";
import { DevTerminal } from "@/components/DevTerminal";
import { SnakeGame } from "@/components/SnakeGame";
import Card from "@/components/Card";
import { motion } from "framer-motion";

export const Playground = () => {
  return (
    <div className="py-20 lg:py-28" id="playground">
      <div className="container">
        <SectionHeader
          title="Stay a while"
          eyebrow="Dev Playground"
          description="A little corner where you can poke around. Type a command, or play a quick round of snake."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <DevTerminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 md:p-8 h-full">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-[var(--fg-muted)]">Coffee break</span>
                <h3 className="font-serif text-2xl md:text-3xl mt-1">🐍 Snake</h3>
              </div>
              <SnakeGame />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
