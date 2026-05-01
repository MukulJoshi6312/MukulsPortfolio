import type { Metadata } from "next";
import { Inter, Calistoga, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";
import { StatusBar } from "@/components/StatusBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const SITE_URL = "https://mukul-portfolio.vercel.app";
const SITE_TITLE = "Mukul Joshi — Software Developer";
const SITE_DESC =
  "Mukul Joshi — Software Developer building performant, accessible, and beautiful digital experiences with React, Next.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: ["Mukul Joshi", "Frontend", "Software Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Mukul Joshi" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: "@MukulJoshi1998",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={twMerge(inter.variable, calistoga.variable, mono.variable, "antialiased font-sans")}>
        <ThemeProvider>
          <ScrollProgress />
          <CustomCursor />
          <ThemeToggle />
          <CommandPalette />
          {children}
          <StatusBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
