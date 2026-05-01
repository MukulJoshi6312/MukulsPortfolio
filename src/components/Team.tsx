"use client";
import { useState } from "react";
import Image from "next/image";
import { useData } from "@/hooks/useData";
import type { TeamMember } from "@/types";

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: images } = useData<TeamMember[]>("/data/team.json", []);
  const list = images ?? [];

  return (
    <div className="flex items-center justify-center relative py-8">
      {list.map((image, index) => (
        <div
          key={image.id}
          className={`absolute rounded-full border-black transition-transform duration-300 ${
            hoveredIndex === index ? "z-10 -translate-y-2" : `z-${index}`
          }`}
          style={{
            left: `${index * 35}px`,
            transform: hoveredIndex === index ? "translateY(-10px)" : "none",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image src={image.src} alt={image.alt} width={46} height={46} className="rounded-full" />
        </div>
      ))}
    </div>
  );
};
export default Team;
