"use client"
import { motion } from 'framer-motion'
import variants from '../utils/variants'
import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckIcon from '@/assets/icons/check-circle.svg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import grainImage from '@/assets/images/grain.jpg'
import SectionHeader from "@/components/SectionHeader";
import cryptoImage from '@/assets/images/crypto1.png'
import Card from "@/components/Card";
import Github from '@/assets/images/github.png'
import positivus from '@/assets/images/positivus.png'
import usabilityHub from '@/assets/images/usabilityHub.png'

const portfolioProjects = [
  {
    company: "CryptoBucks.",
    year: "2024",
    title: "Track Crypto Real Time.",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://crypto-bucks-theta.vercel.app/",
    githubLink: "https://github.com/MukulJoshi6312/DoscApp",
    image: cryptoImage,
  },
  {
    company: "Positivus",
    year: "2023",
    title: "Digital Agency Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://makes-brands.vercel.app/",
    githubLink: "https://github.com/MukulJoshi6312/MakesBrands",
    image: positivus,
  },
  {
    company: "UsabilityHub",
    year: "2022",
    title: "We have a new name, fresh look!",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://usabilityhub-clone-one.vercel.app/",
    githubLink: "https://github.com/MukulJoshi6312/usabilityhub-clone",
    image: usabilityHub,
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://crypto-bucks-theta.vercel.app/",
    githubLink: "https://github.com/MukulJoshi6312/DoscApp",
    image: aiStartupLandingPage,
  },
];

export const ProjectsSection = () => {
  return <section className="pb-16 lg:py-24" id="projects">
    <div className="container">

      <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variants("bottom", 0.2)}>
        <SectionHeader
          title="Real-world Results"
          eyebrow="Featured Projects"
          description="See how i transformed concepts into engaging digital experience"
        />
      </motion.div>

      {/* <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text text-center">Real-world Results</p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Featured Projects</h2>
      <p className="text-center md:text-lg text-white/60 mt-4 max-w-md mx-auto lg:text-xl">See how i transformed concepts into engaging digital experience</p> */}

      <div className="flex flex-col mt-10 gap-20 md:mt-20">
        {
          portfolioProjects.map((project, index) => (
            <Card key={project.title}
              className=" px-8 pb-0 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${index * 40}px)`
              }}>

              <div className="lg:grid lg:grid-cols-2 lg:gap-16">

                <div className="lg:pb-16">

                  <div className="bg-gradient-to-r from-emerald-300
                    to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-5 ">{project.title}</h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map(result => (
                      <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
                        <CheckIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='flex items-center gap-2 '>
                    <a href={project.link} target="_blank" className='w-full md:w-max'>
                      <button className="group bg-white text-gray-950 h-12 w-full md:w-auto md:px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                        <span>Visit Live Site</span>
                        <ArrowUpRightIcon className="size-4 group-hover:rotate-45 transition" />
                      </button>
                    </a>

                    <a href={project.githubLink}>
                      <div className='size-12 bg-white p-2 rounded-full mt-8'>
                        <Image src={Github} alt={project.title} />
                      </div>
                    </a>
                  </div>


                </div>
                <div className="relative">
                  <Image src={project.image} alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  </section>;
};

// className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" />

