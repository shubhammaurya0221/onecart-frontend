import React from 'react'
import Title from './Title'
import { RiExchangeLine } from "react-icons/ri"
import { TbRosetteDiscountCheck } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"
import { IoShieldCheckmarkOutline } from "react-icons/io5"

function OurPolicy() {
  const policies = [
    {
      icon: <RiExchangeLine className='w-8 h-8 text-[#00d2fc]' />,
      title: "Easy Exchange Policy",
      desc: "Hassle-free product exchange within 7 days of delivery."
    },
    {
      icon: <TbRosetteDiscountCheck className='w-8 h-8 text-[#6060f5]' />,
      title: "7 Days Return Policy",
      desc: "Full money-back guarantee if you are not satisfied."
    },
    {
      icon: <BiSupport className='w-8 h-8 text-[#00d2fc]' />,
      title: "24/7 AI Customer Support",
      desc: "Instant answers to product & delivery queries anytime."
    },
    {
      icon: <IoShieldCheckmarkOutline className='w-8 h-8 text-[#6060f5]' />,
      title: "Secure Payments",
      desc: "100% encrypted online payments & Cash on Delivery."
    }
  ]

  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-12 my-20'>
      <div className='text-center flex flex-col items-center gap-2 mb-12'>
        <Title text1={"WHY CHOOSE"} text2={"ONECART"} />
        <p className='text-gray-400 text-sm sm:text-base max-w-xl'>
          We prioritize quality, speed, and customer satisfaction at every step.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {policies.map((p, idx) => (
          <div 
            key={idx}
            className='bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-[#00d2fc]/40 hover:shadow-[0_0_20px_rgba(0,210,252,0.15)] transition-all duration-300 group'
          >
            <div className='p-3.5 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform'>
              {p.icon}
            </div>
            <h3 className='text-white font-bold text-base mt-1 group-hover:text-[#00d2fc] transition-colors'>
              {p.title}
            </h3>
            <p className='text-gray-400 text-xs sm:text-sm leading-relaxed'>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
