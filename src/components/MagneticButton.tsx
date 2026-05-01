"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ComponentPropsWithoutRef, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithoutRef<"button"> & {
  strength?: number;
};

export const MagneticButton = ({ children, className, strength = 0.35, ...rest }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ translateX: sx, translateY: sy }}
      whileTap={{ scale: 0.95 }}
      className={twMerge("relative inline-flex items-center justify-center", className)}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};
