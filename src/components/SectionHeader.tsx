import React from 'react'

const SectionHeader = ({
    title,
    eyebrow,
    description,
}:{
    title:string,
    eyebrow:string,
    description:string
}) => {
  return (
    <div className='overflow-x-clip'>
      <div className="flex justify-center" >
        <p className="uppercase font-semibold tracking-widest text-gradient text-center">{title}</p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6 text-[var(--fg)]">{eyebrow}</h2>
      {description && (
        <p className="text-center md:text-lg text-[var(--fg-muted)] mt-4 max-w-md mx-auto lg:text-xl">{description}</p>
      )}
    </div>
  )
}

export default SectionHeader
