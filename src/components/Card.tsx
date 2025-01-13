import React, { ComponentPropsWithoutRef } from 'react'

import grainImage from '@/assets/images/grain.jpg'
import { twMerge } from 'tailwind-merge'
import {PropsWithChildren} from 'react'

const Card = ({className,children,...other}:
    ComponentPropsWithoutRef<"div">) => {
    return (
            <div className={twMerge("bg-gray-800 rounded-3xl relative z-0 after:z-10 overflow-hidden after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:pointer-events-none after:outline-white/20 ",className)}{...other}>
                <div className="absolute inset-0 -z-10 opacity-5"
                    style={{
                        backgroundImage: `url(${grainImage.src})`
                    }}></div>
                    {children}
            </div>
    )
}

// px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 

export default Card
