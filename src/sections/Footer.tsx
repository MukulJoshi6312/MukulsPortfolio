"use client";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { useData } from "@/hooks/useData";
import type { Profile } from "@/types";

export const Footer = () => {
  const { data: profile } = useData<Profile>("/data/profile.json");
  const links = profile?.socials ?? [];

  return (
    <footer className="relative overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-[var(--accent-1)]/20 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10" />

      <div className="container">
        <div className="border-t border-subtle py-6 text-sm flex flex-col md:flex-row md:justify-between gap-8 items-center">
          <div className="text-[var(--fg-muted)]">© {new Date().getFullYear()} {profile?.name ?? "Mukul Joshi"}. All rights reserved.</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 cursor-pointer group hover:text-[var(--fg)]"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4 group-hover:rotate-45 transition duration-300" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
