"use client"

import { motion, px } from 'framer-motion';
import { useEffect, useState } from 'react';
import variants from '../utils/variants';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY; // Initialize with the current scroll position
    let scrollDownDistance = 0; // Tracks how far user has scrolled down
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        scrollDownDistance += currentScrollY - lastScrollY; // Accumulate scroll down distance
        if (scrollDownDistance >= 200) {
          setIsVisible(false); // Hide the header after 100px
        }
      } else {
        // Scrolling up
        scrollDownDistance = 0; // Reset on upward scroll
        setIsVisible(true); // Show the header immediately
      }
  
      lastScrollY = currentScrollY; // Update the last scroll position
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  

  return (
    <motion.div
      // initial={{ opacity: 0, scale: 0 }}
      // animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      // transition={{
      //   duration: 0.4,
      //   scale: { type: "top", stiffness: 300, damping: 30 },
      // }}
     
      initial="hidden"
     whileInView="visible"
     animate={{ translateY: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
     viewport={{ amount: 0.1 }}
     variants={variants("top", 0.1)}
      className="flex justify-center items-center fixed w-full top-3 z-10"
    >
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/15 backdrop:blur ">
        <a href="#home" className="nav-item">Home</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#projects" className="nav-item">Projects</a>
        <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">Contact</a>
      </nav>
    </motion.div>
  );
};
