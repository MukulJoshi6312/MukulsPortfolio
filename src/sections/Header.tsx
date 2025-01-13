"use client"

import { motion } from 'framer-motion'
import variants from '../utils/variants'
export const Header = () => {
  return <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ amount: 0.1 }}
  variants={variants("bottom", 0.2)}
  className="flex justify-center items-center fixed w-full top-3 z-10">
    <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop:blur ">
      <a href="#home" className="nav-item">Home</a>
      <a href="#projects" className="nav-item">Projects</a>
      <a href="#about" className="nav-item">About</a>
      <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">Contact</a>
    </nav>
  </motion.div>;
};
