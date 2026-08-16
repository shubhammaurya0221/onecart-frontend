import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowForwardOutline, IoArrowBackOutline, IoSparklesOutline } from 'react-icons/io5'

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate()

  return (
    <div className='relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-center py-20 lg:py-32'>
      
      {/* Top Badge */}
      <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-[#00d2fc] w-max shadow-lg mb-4 animate-in fade-in slide-in-from-bottom-2'>
        <IoSparklesOutline className='w-4 h-4' />
        <span>New Season Collection 2026</span>
      </div>

      {/* Main Headline */}
      <div key={heroCount} className='flex flex-col gap-2 max-w-2xl animate-in fade-in slide-in-from-left-6 duration-700 ease-out'>
        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md'>
          {heroData?.text1 || "Choose Your Perfect"}
        </h1>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#00d2fc] via-cyan-200 to-[#6060f5] tracking-tight leading-tight'>
          {heroData?.text2 || "Fashion Fit Today"}
        </h2>
      </div>

      <p className='text-gray-300 text-sm sm:text-base max-w-lg mt-4 leading-relaxed'>
        Discover hand-curated styles, premium fabrics, and exclusive discounts with 24/7 AI-guided fashion recommendations.
      </p>

      {/* CTA Action Buttons */}
      <div className='flex items-center gap-4 mt-8'>
        <button
          onClick={() => navigate('/collection')}
          className='px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,210,252,0.4)] hover:shadow-[0_0_35px_rgba(0,210,252,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer'
        >
          Explore Collection <IoArrowForwardOutline className='w-4 h-4' />
        </button>
      </div>

      {/* Hero Slide Controls & Indicators */}
      <div className='flex items-center gap-6 mt-12 z-20'>
        <div className='flex items-center gap-2'>
          
        </div>

        <div className='flex items-center gap-3'>
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setHeroCount(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                heroCount === index
                  ? 'w-10 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] shadow-[0_0_10px_rgba(0,210,252,0.5)]'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Hero
