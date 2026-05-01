"use client";
import { motion } from "framer-motion";
import variants from "../utils/variants";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { useData } from "@/hooks/useData";
import type { Profile } from "@/types";
import { MagneticButton } from "@/components/MagneticButton";

export const ContactSection = () => {
  const { data: profile } = useData<Profile>("/data/profile.json");

  const handleEmailClick = () => {
    const email = profile?.email || "mukuljoshi6312@gmail.com";
    window.location.href = `mailto:${email}?subject=Let's Connect&body=Hi, I would like to connect with you!`;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }}
      variants={variants("top", 0.1)}
      className="py-16 pt-12 lg:py-24 lg:pt-20"
      id="contact"
    >
      <div className="container">
        <div className="bg-gradient-accent text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
          <div className="absolute inset-0 opacity-10 -z-10" style={{ backgroundImage: `url(${grainImage.src})` }} />

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">Let&apos;s create something amazing together</h2>
              <p className="text-sm md:text-base mt-2">
                Ready to bring your next project to life? Let&apos;s connect and discuss how I can help you achieve your goals.
              </p>
            </div>
            <div>
              <MagneticButton
                onClick={handleEmailClick}
                data-cursor="hover"
                className="text-white bg-gray-900 px-6 h-12 rounded-xl gap-2 w-max border border-gray-950 group"
              >
                <span className="font-semibold">Contact Me</span>
                <ArrowUpRightIcon className="size-4 group-hover:rotate-45 transition" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
