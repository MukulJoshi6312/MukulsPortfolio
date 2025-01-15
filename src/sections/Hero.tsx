"use client"
import { motion } from 'framer-motion'
import variants from '../utils/variants'

import memojiImage from '@/assets/images/memoji-computer.png'
import Image from 'next/image';
import ArrowDown from '@/assets/icons/arrow-down.svg'
import grainImage from '@/assets/images/grain.jpg'
import StartIcon from '@/assets/icons/star.svg'
import SparkleIcon from '@/assets/icons/sparkle.svg'

import { HeroOrbit } from '@/components/HeroOrbit';
export const HeroSection = () => {

  const handleEmailClick = () => {
    window.location.href = 'mailto:mukuljoshi6312@gmail.com?subject=Let\'s Connect&body=Hi, I would like to connect with you!';
  };

  const handleProjectClick = () =>{
    window.location.href = "#projects";
  }


  return <div id='home' className='py-32 md:py-48 lg:py-50 relative z-0 overflow-x-clip'>
    <div className='absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]'>
      <div className='absolute inset-0 -z-30 opacity-5' style={{ backgroundImage: `url(${grainImage.src})` }}></div>
      <div className='size-[620px] hero-ring'></div>
      <div className='size-[820px] hero-ring'></div>
      <div className='size-[1020px] hero-ring'></div>
      <div className='size-[1220px] hero-ring'></div>

      {/* <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className=' border border-red-500 size-[800px]'>
        <div className='border border-red-500 inline-flex '>
          <StartIcon className="size-28 text-emerald-300" />
        </div>
      </div>
      </div> */}

      <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration='30s' shouldSpin spinDuration="3s">
        <SparkleIcon className="size-8 text-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={440} rotation={80} shouldOrbit orbitDuration='32s' shouldSpin spinDuration="10s">
        <SparkleIcon className="size-5 text-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration='34s'>
        <div className="size-3 rounded-full bg-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration='36s' shouldSpin spinDuration="3s">
        <SparkleIcon className="size-10 text-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration='38s' shouldSpin spinDuration="10s">
        <StartIcon className="size-12 text-emerald-300" />
      </HeroOrbit>

      <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration='40s' shouldSpin spinDuration="6s">
        <StartIcon className="size-8 text-emerald-300" />
      </HeroOrbit>

      <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration='42s'>
        <div className="size-3 rounded-full bg-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration='44s' shouldSpin spinDuration="3s">
        <SparkleIcon className="size-14 text-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration='46s'>
        <div className="size-3 rounded-full bg-emerald-300/20" />
      </HeroOrbit>

      <HeroOrbit size={800} rotation={72} shouldOrbit orbitDuration='48s' shouldSpin spinDuration="6s">
        <StartIcon className="size-24 text-emerald-300/50"/>
      </HeroOrbit>

      <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration='48s' shouldSpin spinDuration="6s">
        <StartIcon className="size-28 text-emerald-300"/>
      </HeroOrbit>

    </div>


    <div className="container">
      <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
      }}
      className='flex flex-col items-center'>
        <Image src={memojiImage} alt='person peeking from behind laotop' className='size-[100px]' />
        <div className='bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg'>
          <div className='bg-green-500 size-2.5 rounded-full relative'>
            <div className='bg-green-500 absolute inset-0 rounded-full animate-ping-large'> </div>
          </div>
          <div className='text-sm font-medium'>Available for opportunities</div>
        </div>
      </motion.div>
      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once:true, amount: 0.3 }}
      variants={variants("bottom", 0.1)}
      className='max-w-lg mx-auto'>
        <h1 className='font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide'>Innovative solutions for a connected world.</h1>
        <p className='text-center text-lg font-semibold my-4 tracking-wider'>Hey there! I&apos;m <span className='bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text'>Mukul</span> a <span className='bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text'>Software Developer</span>  based in India</p>
        <p className='mt-4 text-center text-white/60 md:text-lg'>Turning ideas into powerful, efficient, and user-focused software <span className='bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text'>solutions.</span> Let&apos;s bring your project to life!</p>
      </motion.div>

      <div 
      className='flex flex-col md:flex-row justify-center items-center mt-8 gap-4'>
        
    
        <motion.button 
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={variants("left", 0.1)}
        className='cursor-pointer inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl z-30'
        onClick={handleProjectClick}>
          <span className='font-semibold'>Explore my work</span>
          <ArrowDown className="size-4 animate-arrow-down" />
        </motion.button>
   

        <motion.button 
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={variants("right", 0.1)}
        className='cursor-pointer inline-flex items-center gap-2 border-white bg-white text-gray-900 h-12 px-6 rounded-xl z-30'
        onClick={handleEmailClick}
        >
          <span className='animate-hand-move'>👋</span>
          <span className='font-semibold'>Let&apos;s Connect</span>
        </motion.button>

      </div>
    </div>
  </div>
};
