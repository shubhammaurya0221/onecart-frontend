import React from 'react'
import Title from '../component/Title'
import aboutImg from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { IoShieldCheckmarkOutline, IoRocketOutline, IoHeartOutline } from 'react-icons/io5'

function About() {
  const values = [
    {
      icon: <IoShieldCheckmarkOutline className='w-8 h-8 text-[#00d2fc]' />,
      title: "Quality Assurance",
      desc: "Every product undergoes strict inspection and quality testing before arriving at your door."
    },
    {
      icon: <IoRocketOutline className='w-8 h-8 text-[#6060f5]' />,
      title: "Ultimate Convenience",
      desc: "Seamless browsing, 24/7 AI assistance, fast nationwide delivery, and simple 7-day returns."
    },
    {
      icon: <IoHeartOutline className='w-8 h-8 text-pink-400' />,
      title: "Customer First Priority",
      desc: "Dedicated support team committed to resolving questions and ensuring complete satisfaction."
    }
  ]

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] overflow-x-hidden'>
      
      {/* Hero Header */}
      <section className='max-w-7xl mx-auto px-6 sm:px-12 my-8'>
        <div className='text-center mb-12'>
          <Title text1={'ABOUT'} text2={'ONECART'} />
          <p className='text-gray-400 text-sm sm:text-base max-w-xl mx-auto -mt-3'>
            Redefining online shopping through quality, speed, and AI innovation.
          </p>
        </div>

        {/* Content Showcase Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl'>
          
          <div className='relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group'>
            <img 
              src={aboutImg} 
              alt="About OneCart" 
              className='w-full h-[350px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6'>
              <span className='text-xs font-bold text-[#00d2fc] uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10'>
                Est. 2026 • Premium E-Commerce
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-5 text-gray-300 text-sm sm:text-base leading-relaxed'>
            <h3 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
              Empowering Modern Shoppers Everywhere
            </h3>

            <p>
              OneCart was founded with a singular vision: to create a seamless, high-performance shopping destination that combines top-tier fashion, uncompromised quality, and cutting-edge technology.
            </p>

            <p>
              Whether you are discovering trending seasonal wear or purchasing daily essentials, we eliminate friction with instant AI recommendations, transparent pricing, and rapid delivery.
            </p>

            <div className='border-l-2 border-[#00d2fc] pl-4 py-1 text-white font-medium italic bg-[#00d2fc]/5 rounded-r-xl'>
              "Our mission is to make online shopping effortless, empowering, and delightful for every customer."
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className='mt-20'>
          <div className='text-center mb-10'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {values.map((val, idx) => (
              <div 
                key={idx}
                className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4 hover:border-[#00d2fc]/40 hover:shadow-[0_0_25px_rgba(0,210,252,0.15)] transition-all group'
              >
                <div className='p-3.5 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform'>
                  {val.icon}
                </div>
                <h4 className='text-lg font-bold text-white group-hover:text-[#00d2fc] transition-colors'>
                  {val.title}
                </h4>
                <p className='text-xs sm:text-sm text-gray-400 leading-relaxed'>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default About
