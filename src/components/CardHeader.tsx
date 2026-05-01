import React from 'react'
import StarIcon from '@/assets/icons/star.svg'
import { twMerge } from 'tailwind-merge'

const CardHeader = ({title,description,className}:{
    title:string,
    description:string,
    className?:string,
}) => {
    return (
        <>
            <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10",className)}>
                <div className="inline-flex items-center gap-2">
                    <StarIcon className="size-9 text-[var(--accent-1)]" />
                    <h3 className="font-serif text-3xl">{title}</h3>
                </div>
                <p className="text-sm lg:text-base max-w-xs text-[var(--fg-muted)] mt-2">{description}</p>
            </div>
        </>
    )
}

export default CardHeader
