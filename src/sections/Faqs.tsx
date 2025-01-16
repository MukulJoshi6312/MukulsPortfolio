"use client"
import Card from '@/components/Card'
import SectionHeader from '@/components/SectionHeader'
import Image from 'next/image'
import React, { useState } from 'react'
import faqs from '@/assets/images/faqs.jpg'
import variants from '../utils/variants'

import { motion } from 'framer-motion'

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";


const Faqs = () => {

    const faqsList = [
        {
            id:1,
            title:"Are you available to hire full time?",
            description:`At the moment, I'm pretty happy where I am. Currently I am not looking for any full-time opportunities. But that being said, I am always open to discuss interesting opportunities, collaborations and other fun stuff. If you’re interested in discussing a project, making something great together,please fill the form above. Simply want to get get in touch? 
            
            Happy to connect on socials.`
        },
        {
            id:2,
            title:"How do your quote pricing works and when can we get on call?",
            description:"Our hiring process typically involves an initial phone screen with a recruiter, followed by a technical assessment and interviews with the hiring manager and team members."
        },
        {
            id:3,
            title:"Can you facelift my design?",
            description:"Our hiring process typically involves an initial phone screen with a recruiter, followed by a technical assessment and interviews with the hiring manager and team members."
        },
    ]

    const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});

    const handleShowAnswer = (id: number) => {
        setShowAnswer((prev) => ({
            ...prev,
            [id]: !prev[id],
          }));
    }

    const handleEmailClick = () => {
        window.location.href = 'mailto:mukuljoshi6312@gmail.com?subject=Let\'s Connect&body=Hi, I would like to connect with you!';
      };
    

    return (
        <div className='py-20 lg:py-28'>
            <div className="container">
                <SectionHeader
                    title="SOME DOUBTS"
                    eyebrow="Frequently Asked Questions"
                    description="Your answers await right here"
                />

                <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mt-20'>
                    <div className='col-span-1 md:col-span-2'>
                        <Card className='relative flex flex-col justify-center items-center overflow-hidden px-10'>
                        <div className='absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-black [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]'></div>

                            <h3 className='text-center py-8 text-xl font-serif tracking-wider'>
                                Have any more questions or want to start collaborating?</h3>
                            <div className=' rounded-tr-3xl rounded-t-3xl bg-red-400 overflow-hidden'>
                                <Image src={faqs.src} alt='faqs image' width={320} height={320} className='object-fit -mb-20 ' />
                                <div 
                            className=' absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer inline-flex items-center gap-2 border-white bg-white text-gray-900 h-12 px-6 rounded-xl z-30'
                            onClick={handleEmailClick}
                            >
                            <span className='animate-hand-move'>👋</span>
                            <span className='font-semibold'>Let&apos;s talk</span>
                            </div>
                            <p className='text-xs absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center text-white/50'>* Response time is typically around 12 hours</p>

                            </div>
                        </Card>
                    </div>
                    <div className='col-span-1 md:col-span-3'>
                        <div className='flex flex-col gap-4'>
                        {faqsList.map((item,index)=>(
                            <Card  key={item.id} className='hover:bg-emerald-900/10 bg-transparent transition duration-500 cursor-pointer'
                            onClick={()=>handleShowAnswer(item.id)}
                                >
                                <div className='py-4 px-6 transition duration-500'>
                                    <div className='flex justify-between items-center transition duration-500'>
                                        <h3 className='text-base text-white w-3/4'>{item.title}</h3>
                                        {showAnswer[item.id] ? <FaAngleUp /> : <FaAngleDown />}
                                       
                                    </div>
                                    {showAnswer[item.id] &&
                                        <motion.p
                                            className="overflow-hidden mt-2 text-sm text-white/50"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}>
                                                {item.description}
                                            </motion.p>
                                        }
                                        </div>
                                

                            </Card>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Faqs
