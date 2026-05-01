"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { useData } from "@/hooks/useData";
import type { Company } from "@/types";

const CompanyLogos = () => {
  const { data: logos } = useData<Company[]>("/data/companies.json", []);
  const list = logos ?? [];
  if (list.length === 0) return null;
  return (
    <div className="overflow-x-clip container">
      <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex flex-none items-center gap-12 mb-24 md:gap-24 pr-4 animate-move-left [animation-duration:30s]">
          {[...new Array(3)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {list.map((logo, i) => (
                <div key={`${idx}-${i}`} className="flex items-center gap-4 grayscale hover:grayscale-0 transition duration-500 opacity-70 hover:opacity-100">
                  <Image src={logo.logo} alt={`${logo.name} logo`} width={160} height={48} className="w-40 h-auto object-contain" />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
