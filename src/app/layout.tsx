import type { Metadata } from "next";
import {Inter,Calistoga} from 'next/font/google'
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})
const calistoga  = Calistoga({subsets:['latin'],
  variable:'--font-serif',
  weight:["400"]
})

export const metadata: Metadata = {
  title: "Mukul's Portfolio",
  description: "Mukul Joshi developer protfolio show case the skills and experties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{"scrollBehavior": "smooth"}}>
      <body className={twMerge(inter.variable,calistoga.variable, 
        "bg-gray-900 text-white antialiased font-sans")}
        >{children}</body>
    </html>
  );
}
