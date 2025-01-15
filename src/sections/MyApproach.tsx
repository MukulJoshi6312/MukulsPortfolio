import Card from '@/components/Card'
import SectionHeader from '@/components/SectionHeader'
import React from 'react'

const MyApproach = () => {


  const myApproachList  = [

    {
      id:1,
      phase:"Phase 1",
      title:"Planning & Strategy",
      desciption:"We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements."
    },
    {
      id:2,
      phase:"Phase 2",
      title:"Development & Progress Update",
      desciption:"Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way."
    },
    {
      id:3,
      phase:"Phase 3",
      title:"Development & Launch",
      desciption:"This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up."
    }

  ]


  return (
    <div className='py-20 lg:py-28'>
      <div className="container">
        <SectionHeader
          title="My Approach"
          eyebrow="A Glimpse Into My World"
          description="Learn more about who I am, what I Do, and what inspired me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className='grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3'>

        {
          myApproachList.map((approach)=>(

          
          <div className='col-span-1' key={approach.id}>
            <div className="relative h-[320px] overflow-hidden rounded-3xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex flex-col h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-slate-900 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-gradient-to-r from-emerald-400 to-sky-300 hover:text-gray-900 transition-all duration-700">
                  <h3 className='text-3xl font-serif py-4 text-center'>{approach.title}</h3>
                  <p className='text-sm text-center'>{approach.desciption}</p>
                  <div 
                  className='absolute top-5 left-5'>
                    {approach.phase}
                </div>
                </div>
                
              </div>
            </div>
            ))
            }


{/* 
            <div className='col-span-1'>
            <div className="relative h-[320px]  overflow-hidden rounded-3xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-slate-900 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Border Magic
                </div>
              </div>
            </div> */}

            {/* <div className='col-span-1'>
            <div className="relative h-[320px] overflow-hidden rounded-3xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-slate-900 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Border Magic
                </div>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApproach
