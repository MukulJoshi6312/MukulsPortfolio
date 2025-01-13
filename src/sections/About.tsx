"use client"
import variants from '../utils/variants'
import { motion } from 'framer-motion'

import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import bookImage from '@/assets/images/book-cover.png'
import Image from "next/image";
import JavaScriptIcon from '@/assets/icons/square-js.svg'
import HTMLIcon from '@/assets/icons/html5.svg'
import CssIcon from '@/assets/icons/css3.svg'
import ReactIcon from '@/assets/icons/react.svg'
import ChromeIcon from '@/assets/icons/chrome.svg'
import GithubIcon from '@/assets/icons/github.svg'
import mapImage from '@/assets/images/map.png'
import smileEmogi from '@/assets/images/memoji-smile.png'
import CardHeader from "@/components/CardHeader";
import ToolboxItem from "@/components/ToolboxItem";
import { useRef } from "react";
const toolboxItems = [
  {
    title: "JavaScript",
    iconType: JavaScriptIcon
  },
  {
    title: "React JS",
    iconType: ReactIcon
  },
  {
    title: "Node Js",
    iconType: HTMLIcon
  },
  {
    title: "Java",
    iconType: JavaScriptIcon
  },
  {
    title: "CSS",
    iconType: CssIcon
  },
  {
    title: "Next JS",
    iconType: JavaScriptIcon
  },
  {
    title: "Chrome",
    iconType: ChromeIcon
  },
  {
    title: "Github",
    iconType: GithubIcon
  },
  {
    title: "Android",
    iconType: HTMLIcon
  }
]

const hobbies = [
  {
    title: "Painting",
    emoji: '🎨',
    top: "5%",
    left: "5%",
  },
  {
    title: "Photography",
    emoji: '📷',
    top: "5%",
    left: "50%",
  },
  {
    title: "Gaming",
    emoji: '🎮',
    top: "35%",
    left: "10%",
  },
  {
    title: "Hiking",
    emoji: '🥾',
    top: "45%",
    left: "35%",
  },
  {
    title: "Music",
    emoji: '🎵',
    top: "45%",
    left: "70%",
  },
  {
    title: "Fitness",
    emoji: '🏋️‍♀️',
    top: "65%",
    left: "5%",
  },
  {
    title: "Reading",
    emoji: '📚',
    top: "70%",
    left: "45%",
  },

]

export const AboutSection = () => {

  const constrainRef = useRef(null)

  return (

    <div className="py-20 lg:py-28" id="about">
      <div className="container">
        <motion.div
           initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={variants("bottom", 0.1)}
        >
        <SectionHeader
          title="About Me"
          eyebrow="A Glimpse Into My World"
          description="Learn more about who I am, what I Do, and what inspired me."
        />
        </motion.div>

        <div className="mt-20 flex flex-col gap-8">

          <motion.div 
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ amount: 0.1 }}
          // variants={variants("left", 0.1)}
          className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">

            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspective"
              />
              <div className="w-40 mx-auto mt-2 ">
                <Image src={bookImage} alt="Book cover image" />
              </div>
            </Card>

            <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2">
              <CardHeader
                className=""
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
              />
              <ToolboxItem items={toolboxItems} className="" itemsWrapperdClassName="animate-move-left  [animation-duration:30s]" />
              <ToolboxItem
                items={toolboxItems}
                className="mt-6"
                itemsWrapperdClassName="animate-move-right  [animation-duration:15s]"
              />
            </Card>

          </motion.div>

          <motion.div 
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ amount: 0.1 }}
          // variants={variants("right", 0.1)}
          className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">

            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6" />
              <div className="relative flex-1 " ref={constrainRef}>
                {
                  hobbies.map(hobby => (
                    <motion.div 
                     drag
                     dragConstraints={constrainRef}
                     key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                      style={{
                        left: hobby.left,
                        top: hobby.top
                      }}>
                      <span className="font-medium text-gray-950">{hobby.title}</span>
                      <span>{hobby.emoji}</span>
                    </motion.div>
                  ))
                }
              </div>
            </Card>

            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image src={mapImage} alt="map image" className="h-full
            w-full object-cover object-left-top " />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:outline after:inset-0 after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>

                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image src={smileEmogi} alt="smilememogi" className="size-20" />
              </div>
            </Card>

          </motion.div>

        </div>
      </div>
    </div>

  )
};
