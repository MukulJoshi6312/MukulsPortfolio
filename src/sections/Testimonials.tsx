"use client"
import { motion } from 'framer-motion'
import variants from '../utils/variants'
import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Card from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Amit Grover",
    position: "Project Manager @ Bitwise",
    text: "Mukul was instrumental in transforming our code into a powerful business tool. His attention to detail and ability to understand our brand is exceptional. We're thrilled with the results!",
    avatar: memojiAvatar1,
  },
  {
    name: "Radhika Vaisravanath",
    position: "Head of Team @ Bitwise",
    text: "Working with Mukul was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.",
    avatar: memojiAvatar2,
  },
  {
    name: "Naveen Patnaik",
    position: "CEO @ PayNav",
    text: "I would like to thank you and extend my appreciation wishes as you bid farewell. You have been a treasured employee of the company. Thank you for bringing your best to work every single day. Farewell to one great employee. Your hard work and dedication were an important part of our team.",
    avatar: memojiAvatar3,
  },
  {
    name: "Emily Carter",
    position: "Product Manager @ GlobalTech",
    text: "Mukul is a true frontend wizard. He took our complex product and transformed it into an intuitive and engaging user interface. We're already seeing positive feedback from our customers.",
    avatar: memojiAvatar4,
  },
  {
    name: "Michael Brown",
    position: "Director of IT @ MegaCorp",
    text: "Mukul's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <motion.div 
         initial="hidden"
         whileInView="visible"
         viewport={{once:true, amount: 0.3 }}
         variants={variants("bottom", 0.2)}
        >
        <SectionHeader title="Happy Clients"
          eyebrow="What Client Say about me"
          description="Don't just take my word for it. See what my clients have to say about my work."
        />
        </motion.div>
        <div className="mt-12 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:60s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {
                  testimonials.map(testimonial => (
                    <Card key={testimonial.name} className="max-w-xs p-6 md:p-8 md:max-w-md hover:-rotate-3 transition duration-300">
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-gray-700 inline-flex rounded-full items-center justify-center shrink-0">
                          <Image src={testimonial.avatar} alt={testimonial.name} className="max-h-full" />
                        </div>
                        <div>
                          <div className="font-semibold ">{testimonial.name}</div>
                          <div className="text-sm text-white/40">{testimonial.position}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm md:text-base md:mt-6">{testimonial.text}</p>
                    </Card>
                  ))
                }
              </Fragment>
            ))}

          </div>
        </div>
      </div>
    </div>

  )
};
