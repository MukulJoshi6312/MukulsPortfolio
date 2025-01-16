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
import Java from '@/assets/icons/java.svg'
import Sql from '@/assets/icons/sql.svg'
import googleCloud from '@/assets/icons/gcd.svg'
import Androidsvg from '@/assets/icons/svgAndroid.svg'
import NextJs from '@/assets/icons/svgNextJs.svg'
import mapImage from '@/assets/images/map.png'
import smileEmogi from '@/assets/images/memoji-smile.png'
import CardHeader from "@/components/CardHeader";
import ToolboxItem from "@/components/ToolboxItem";
import heroImage from '@/assets/images/heroImage.png'
import { useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import celebrationGif from '@/assets/images/coprgif.gif'

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
    title: "Next JS",
    iconType: NextJs
  },
  {
    title: "Java",
    iconType: Java
  },
  {
    title: "Android",
    iconType: Androidsvg
  },
  {
    title: "SQL",
    iconType: Sql

  },
  {
    title: "HTML",
    iconType: HTMLIcon
  },
  {
    title: "CSS",
    iconType: CssIcon
  },
  {
    title: "Chrome",
    iconType: ChromeIcon
  },
  {
    title: "Google Cloud",
    iconType: googleCloud
  },
  {
    title: "Github",
    iconType: GithubIcon
  },
]

const hobbies = [
  {
    title: "Dancing",
    emoji: '🕺',
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

const myBio = `I craft seamless web and mobile experiences for multi-cross-platform devices. With experience working with agencies and medium-sized companies, including India's largest Ed-Tech startup, Toppr, I've now dedicated my efforts to designing elegant and functional solutions at Bitwise and PayNav. As a self-motivated and confident professional, I view coding as a passion, continuously enhancing my skills to create impactful solutions that improve financial accessibility for Indian users.`


export const AboutSection = () => {

  const constrainRef = useRef(null)

  const handleLocation = ()=>{
  const latitude = 29.291639;
  const longitude = 78.512694;
  // Construct the Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  // Open the URL in a new tab
  window.open(googleMapsUrl, "_blank");
  }

  const [emailText, setEmailText] = useState("Copy my email address");
  const [showGif, setShowGif] = useState(false);


  const copyEmailHandler = () =>{
    const email = "mukuljoshi6312@gmail.com";
    navigator.clipboard.writeText(email).then(()=>{
      setEmailText("Email is copied!"); // Change button text
      setShowGif(true); // Show the GIF

        setTimeout(() => {
          setEmailText("Copy my email address"); // Reset after 3 seconds
          setShowGif(false); // Show the GIF

        }, 3000);
    }).catch((error)=>{
        console.log("failed  to copy email",error);
    })
  }

  return (

    <div className="py-20 lg:py-28" id="about">
      <div className="container">
        <motion.div
           initial="hidden"
          whileInView="visible"
          viewport={{once:true, amount: 0.1 }}
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
                description="Delve into the pages shaping my journey."
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

            <Card
            onClick={handleLocation}
            className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image src={mapImage} alt="map image" className="h-full
            w-full object-cover object-left-top " />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:outline after:inset-0 after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>

                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image src={smileEmogi} alt="smilememogi" className="size-20" />
              </div>
                <div className='absolute text-xs bottom-2 left-2 font-bold bg-gray-900/70 px-4 py-1.5 rounded-full'>
                📍INDIA
                </div>
            </Card>

          </motion.div>


          <motion.div 
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ amount: 0.1 }}
          // variants={variants("left", 0.1)}
          className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3 md:mt-8">

            <div className='h-[420px] md:col-span-2 lg:col-span-1 relative '>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-300 
              animate-gradient [animation-duration:2s] bg-no-repeat  rounded-3xl"></div>
                <div className='absolute bottom-0 left-4 md:left-0'>
                <Image src={heroImage} alt='hero image' className='w-[300px]'/>
                </div>
            </div>
            <div className='h-[420px] p-0 md:col-span-3 lg:col-span-2 py-4 relative'>
             
              <h3 className='font-serif text-3xl md:text-3xl lg:text-6xl tracking-wider'>Know who am I</h3>
              <h4 className='py-3 md:text-2xl text-lg'>My journey in few words</h4>
              <p className='text-white/60 tracking-normal leading-7 text-sm md:text-lg'>{myBio}</p>
              

              <Card className='inline-flex mt-6 '>

              <div className=' bottom-2 inline-flex py-1.5 px-4 cursor-pointer items-center gap-3 transition duration-500 '
              onClick={copyEmailHandler}>
                <p>{emailText}</p>
                <IoCopyOutline/>
              </div>
              </Card>

              {showGif && (
        <div className="absolute -bottom-10 z-10 rounded-lg">
          <Image src={celebrationGif} alt="Celebration Animation" className="h-56 w-56 transition duration-500" />
        </div>
      )}

              
            </div>

          </motion.div> 

        </div>
      </div>
    </div>

  )
};