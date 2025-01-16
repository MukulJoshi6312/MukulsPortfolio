"use client";
import React, { useState } from "react";
import Image from "next/image";
import team1 from '@/assets/images/team1.avif'
import team2 from '@/assets/images/team2.avif'
import team3 from '@/assets/images/team3.avif'
import team4 from '@/assets/images/team4.avif'
import team5 from '@/assets/images/team5.avif'

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      id: 1,
      src: team1,
      alt: "Avatar 1",
    },
    { id: 2, src: team2, alt: "Avatar 2" },
    { id: 3, src: team3, alt: "Avatar 3" },
    { id: 4, src: team4, alt: "Avatar 4" },
    { id: 5, src: team5, alt: "Avatar 5" },
  ];

  return (
    <div className="flex items-center justify-center relative py-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute  rounded-full border-black transition-transform duration-300 ${
            hoveredIndex === index ? "z-10 -translate-y-2" : `z-${index}`
          }`}
          style={{
            left: `${index * 35}px`, // Controls overlap (adjust the spacing)
            transform: hoveredIndex === index ? "translateY(-10px)" : "none",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={46} // Image width
            height={46} // Image height
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  );
};
export default Team;
