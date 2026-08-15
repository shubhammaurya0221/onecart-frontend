import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { IoMailOutline, IoSparklesOutline } from 'react-icons/io5'

function NewLetterBox() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      toast.success("Thank you for subscribing! Check your inbox for your 20% discount code.")
      setEmail('')
    }
  }

  return (
    <section className='max-w-5xl mx-auto px-6 sm:px-12 my-20'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c2025] via-[#111a1f] to-[#070b0d] border border-[#00d2fc]/30 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(0,210,252,0.15)] flex flex-col items-center gap-4'>
        
        {/* Glow Orb */}
        <div className='absolute -top-24 -left-24 w-48 h-48 bg-[#00d2fc]/20 rounded-full blur-3xl pointer-events-none'></div>

        <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00d2fc]/10 text-[#00d2fc] border border-[#00d2fc]/30 text-xs font-bold tracking-wide uppercase'>
          <IoSparklesOutline className='w-4 h-4' /> Exclusive Member Perks
        </div>

        <h2 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
          Subscribe Now & Get <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#00d2fc] to-[#6060f5]'>20% OFF</span>
        </h2>

        <p className='text-gray-400 text-xs sm:text-sm max-w-lg leading-relaxed'>
          Join our VIP club for early access to sales, new arrivals, and special promo codes directly to your inbox.
        </p>

        <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col sm:flex-row gap-3 mt-4'>
          <div className='relative flex-1'>
            <IoMailOutline className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input 
              type="email" 
              placeholder='Enter your email address' 
              className='w-full h-12 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button 
            type='submit' 
            className='h-12 px-6 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-bold text-sm rounded-2xl shadow-[0_0_20px_rgba(0,210,252,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer'
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewLetterBox
