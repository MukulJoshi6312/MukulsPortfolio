"use client";
import { motion } from "framer-motion";
import variants from "../utils/variants";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Card from "@/components/Card";
import { Fragment } from "react";
import { useData } from "@/hooks/useData";
import type { Testimonial } from "@/types";

export const TestimonialsSection = () => {
  const { data: testimonials } = useData<Testimonial[]>("/data/testimonials.json", []);
  const list = testimonials ?? [];

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={variants("bottom", 0.2)}>
          <SectionHeader
            title="Happy Clients"
            eyebrow="What Clients Say About Me"
            description="Don't just take my word for it. See what my clients have to say about my work."
          />
        </motion.div>
        <div className="mt-12 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:60s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {list.map((t) => (
                  <Card key={`${idx}-${t.id}`} className="max-w-xs p-6 md:p-8 md:max-w-md hover:-rotate-3 transition duration-300">
                    <div className="flex gap-4 items-center">
                      <div className="size-14 surface-card inline-flex rounded-full items-center justify-center shrink-0 border border-subtle overflow-hidden">
                        <Image src={t.avatar} alt={t.name} width={56} height={56} className="max-h-full" />
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-[var(--fg-muted)]">{t.position}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-1 text-[var(--accent-3)]">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm md:text-base">{t.text}</p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
