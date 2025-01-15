"use client"
import React, { Fragment } from 'react'
import amazon from '@/assets/images/amazon.png'
import hubspot from '@/assets/images/hubspot.png'
import microsoft from '@/assets/images/microsoft.png'
import netflix from '@/assets/images/netflix.png'
import notion from '@/assets/images/notion.png'
import zoom from '@/assets/images/zoom.png'
import dribble from '@/assets/images/dribble.png'
import google from '@/assets/images/google.png'
import Image from 'next/image'
import ToolboxItem from '@/components/ToolboxItem'
import TechIcon from '@/components/TechIcon'

const logoList=[amazon,hubspot,microsoft,google,netflix,notion,zoom,dribble];

const CompanyLogos = () => {
  return (
    <div className=' overflow-x-clip container'>
      <div className='flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
        <div className='flex flex-none items-center gap-12 mb-24 md:gap-24 pr-4 animate-move-left [animation-duration:30s]'>
          {[...new Array(3)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {
                logoList.map((logo,index) => (
                    <div key={index} className='flex items-center gap-4'>
                    <Image src={logo} alt='logo' className='w-40 h-1/3'/>
                    </div>
                ))
              }
            </Fragment>

          ))}
        

        </div>
      </div>
  </div>
  )
}

export default CompanyLogos
