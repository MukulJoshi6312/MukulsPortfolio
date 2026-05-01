"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import variants from "../utils/variants";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Play" },
  { id: "contact", label: "Contact" },
];

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollDownDistance = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        scrollDownDistance += currentScrollY - lastScrollY;
        if (scrollDownDistance >= 200) setIsVisible(false);
      } else {
        scrollDownDistance = 0;
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      animate={{ translateY: isVisible ? 0 : -80, opacity: isVisible ? 1 : 0 }}
      viewport={{ amount: 0.1 }}
      variants={variants("top", 0.1)}
      className="flex justify-center items-center fixed w-full top-3 z-40 pointer-events-none"
    >
      <nav className="flex gap-1 p-0.5 rounded-full glass pointer-events-auto">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-cursor="hover"
            className={`nav-item relative ${active === item.id ? "text-[var(--fg)]" : ""}`}
          >
            {active === item.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-accent -z-10 opacity-90"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={active === item.id ? "text-black" : ""}>{item.label}</span>
          </a>
        ))}
      </nav>
    </motion.div>
  );
};
