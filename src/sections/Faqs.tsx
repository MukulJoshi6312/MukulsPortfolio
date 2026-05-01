"use client";
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { useState } from "react";
import faqsImg from "@/assets/images/faqs.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { useData } from "@/hooks/useData";
import type { Faq, Profile } from "@/types";

const Faqs = () => {
  const { data: faqsList } = useData<Faq[]>("/data/faqs.json", []);
  const { data: profile } = useData<Profile>("/data/profile.json");
  const list = faqsList ?? [];
  const [openId, setOpenId] = useState<number | null>(null);

  const handleEmailClick = () => {
    const email = profile?.email || "mukuljoshi6312@gmail.com";
    window.location.href = `mailto:${email}?subject=Let's Connect&body=Hi, I would like to connect with you!`;
  };

  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader title="SOME DOUBTS" eyebrow="Frequently Asked Questions" description="Your answers await right here" />

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Card className="relative flex flex-col justify-center items-center overflow-hidden px-10 min-h-[420px]">
              <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-[var(--accent-1)]/15 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]" />
              <h3 className="text-center py-8 text-xl font-serif tracking-wider relative z-10">
                Have any more questions or want to start collaborating?
              </h3>
              <div className="rounded-tr-3xl rounded-t-3xl bg-gradient-accent overflow-hidden relative">
                <Image src={faqsImg.src} alt="FAQs avatar" width={320} height={320} className="object-fit -mb-20" />
                <button
                  onClick={handleEmailClick}
                  data-cursor="hover"
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer inline-flex items-center gap-2 bg-white text-gray-900 h-12 px-6 rounded-xl z-30"
                >
                  <span className="animate-hand-move">👋</span>
                  <span className="font-semibold">Let&apos;s talk</span>
                </button>
                <p className="text-xs absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center text-white/70">
                  * Response time is typically around 12 hours
                </p>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-4">
              {list.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <Card
                    key={item.id}
                    className="hover:bg-emerald-900/10 bg-transparent transition duration-500 cursor-pointer"
                    onClick={() => setOpenId((id) => (id === item.id ? null : item.id))}
                    data-cursor="hover"
                  >
                    <div className="py-4 px-6 transition duration-500">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base text-[var(--fg)] w-3/4">{item.title}</h3>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <FaAngleDown />
                        </motion.span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden mt-2 text-sm text-[var(--fg-muted)]"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
