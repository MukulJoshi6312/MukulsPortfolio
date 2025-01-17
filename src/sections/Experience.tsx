"use client"
import SectionHeader from '@/components/SectionHeader'
import Team from '@/components/Team'
import React, { Fragment, useState } from 'react'

const Experience = () => {
    const expList = [
        {
            id: 1,
            title: "Software Engineer,",
            company: "Bitwise solution",
            duration: "Mar-2022 to Apr-2024 / Pune, India",
            description: "At Bitwise, I've been part of a dynamic team focused on delivering innovative software solutions. My role involves designing and developing intuitive features that enhance user experience while maintaining high-quality standards. I’ve contributed to projects that require seamless functionality, performance optimization, and collaboration with cross-functional teams to create impactful solutions for clients."
        },
        {
            id: 2,
            title: "Android App Developer,",
            company: "PayNav",
            duration: "Jul 2021 - Feb 2022 / Bangalore, India",
            description: "Designed key features for a fintech application that allows UPI updates and splits bills with friends. Enhanced the UI by 30% for smooth animations and developed the code to ensure seamless user interactions."
        },
        {
            id: 3,
            title: "Programmer Intern,",
            company: "SoftPro India.",
            duration: "Aug - 2020 - Noc 2020 / Bangalore, India",
            description: "During my internship at SoftPro, I worked with Java, JDBC, and JSP to develop an Employee Management System. I collaborated closely with my team and senior developers to design and implement various modules, ensuring the system met organizational requirements. This experience enhanced my understanding of backend development, teamwork, and the software development lifecycle."
        },
    ]

    const[showLess,setShowLess] = useState<{ [key: number]: boolean }>({});
    

    const handlwShowMore = (id:number) =>{
        setShowLess((prev)=>({...prev,[id]:!prev[id]}))
    }
    console.log(showLess)
    return (
        <div className='py-20 lg:py-28'>
            <div className="container lg:px-40">

                <SectionHeader
                    title="My Work Experiences"
                    eyebrow="Where I've Been Employed"
                    description="My work experience so far."
                />

                <div className='mt-20'>

                    {
                        expList.map((exp,idx) => (

                            <div key={exp.id} className={`grid md:gap-8 grid-cols-1 md:grid-cols-4 mt-8 border-white/20 pb-4 ${expList.length !== exp.id && "border-b-2"}`}>
                                <Fragment >
                                    <div className="md:col-span-2">
                                        <div>
                                            <h3 className='text-white text-lg font-semibold'>{exp.title}
                                                <span className='bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text tracking-wider'> {exp.company}</span></h3>
                                            <p className='text-sm text-white/70 py-2'>{exp.duration}</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 mt-2 md:mt-0 " >
                                        <p onClick={()=>handlwShowMore(exp.id)}
                                        className='text-sm text-white/70 tracking-wide'>{showLess[exp.id] ?  exp.description : exp.description.slice(0,120) }<span className='text-white/30 cursor-pointer'> {showLess[exp.id]?"See Less..." : "See More..."}</span></p>
                                        {
                                            (expList.length - 2 === exp.id ) &&(
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
