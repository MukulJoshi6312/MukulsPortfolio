"use client"
import SectionHeader from '@/components/SectionHeader'
import Team from '@/components/Team'
import { div } from 'framer-motion/client'
import { title } from 'process'
import React, { Fragment } from 'react'

const Experience = () => {
    const expList = [
        {
            id: 1,
            title: "Software Engineer,",
            company: "Bitwise solution",
            duration: "Mar-2022 to Apr-2024 / Pune, India",
            description: "Designed key features for embedding in-platform data widgets, charts, and objects to generate technical reports. Designed interactions for users to "
        },
        {
            id: 2,
            title: "Product Designer,",
            company: "PayNav",
            duration: "May - Aug 2022 / Bangalore, India",
            description: "Designed key features for embedding in-platform data widgets, charts, and objects to generate technical reports. Designed interactions for users to "
        },
        {
            id: 3,
            title: "Product Design Intern,",
            company: "Toppr",
            duration: "May - Aug 2022 / Bangalore, India",
            description: "Designed key features for embedding in-platform data widgets, charts, and objects to generate technical reports. Designed interactions for users to"
        },
    ]
    return (
        <div className='py-20 lg:py-28'>
            <div className="container lg:px-40">

                <SectionHeader
                    title="My Work Experiences"
                    eyebrow="Where I've Been Employed"
                    description=""
                />

                <div className='mt-20'>

                    {
                        expList.map((exp) => (

                            <div key={exp.id} className={`grid md:gap-8 grid-cols-1 md:grid-cols-4 mt-8 border-white/20 pb-4 ${expList.length !== exp.id && "border-b-2"}`}>
                                <Fragment >
                                    <div className="md:col-span-2 ">
                                        <div>
                                            <h3 className='text-white text-lg font-semibold'>{exp.title}
                                                <span className='bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text tracking-wider'> {exp.company}</span></h3>
                                            <p className='text-sm text-white/70 py-2'>{exp.duration}</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 mt-2 md:mt-2">
                                        <p className='text-sm text-white/70 tracking-wide'>{exp.description}</p>
                                        {
                                            expList.length -1 === exp.id &&(
                                                <div className='mt-3'>
                                                    <span className='text-white/40 text-xs'>~ collaborated with</span>
                                                    <div>
                                                        <Team/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Fragment>

                            </div>
                        ))

                    }

                </div>

            </div>

        </div>
    )
}

export default Experience
