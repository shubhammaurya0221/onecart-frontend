import React, { useState } from 'react'
import Title from '../component/Title'
import contactImg from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoSend, IoBriefcaseOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      toast.success("Thank you! Your message has been sent to OneCart Support.")
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] overflow-x-hidden'>
      
      <section className='max-w-7xl mx-auto px-6 sm:px-12 my-8'>
        
        {/* Header */}
        <div className='text-center mb-12'>
          <Title text1={'CONTACT'} text2={'OUR TEAM'} />
          <p className='text-gray-400 text-sm sm:text-base max-w-xl mx-auto -mt-3'>
            Have questions or feedback? We are here to assist you 24/7.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          
          {/* Store Info & Image */}
          <div className='flex flex-col gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl'>
            <div className='rounded-2xl overflow-hidden shadow-lg border border-white/10 h-56 sm:h-72'>
              <img src={contactImg} alt="Contact OneCart" className='w-full h-full object-cover' />
            </div>

            <div className='space-y-4 text-sm text-gray-300'>
              <h3 className='text-xl font-bold text-white'>OneCart Corporate Headquarters</h3>

              <div className='flex items-start gap-3'>
                <IoLocationOutline className='w-5 h-5 text-[#00d2fc] shrink-0 mt-0.5' />
                <p>1234 Fashion Plaza, Cyber Hub, New Delhi, India 110001</p>
              </div>

              <div className='flex items-center gap-3'>
                <IoCallOutline className='w-5 h-5 text-[#00d2fc] shrink-0' />
                <p>+91-9876543210 (Toll-Free Support)</p>
              </div>

              <div className='flex items-center gap-3'>
                <IoMailOutline className='w-5 h-5 text-[#00d2fc] shrink-0' />
                <p>support@onecart.com</p>
              </div>
            </div>

            <div className='border-t border-white/10 pt-4 flex items-center justify-between'>
              <div>
                <p className='text-xs font-bold text-white uppercase'>Careers at OneCart</p>
                <p className='text-xs text-gray-400'>Join our growing design & engineering teams.</p>
              </div>
              <button 
                onClick={() => toast.info("Check back soon! Career portal opening next quarter.")}
                className='px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 transition-all cursor-pointer'
              >
                <IoBriefcaseOutline className='w-4 h-4 text-[#00d2fc]' /> Careers
              </button>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5'>
            <h3 className='text-xl sm:text-2xl font-bold text-white'>Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input 
                  type="text" 
                  placeholder='Your Name' 
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
                />
                <input 
                  type="email" 
                  placeholder='Your Email' 
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
                />
              </div>

              <input 
                type="text" 
                placeholder='Subject / Order ID (Optional)' 
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />

              <textarea 
                placeholder='How can we help you today?' 
                rows={4} 
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className='bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all resize-none'
              ></textarea>

              <button 
                type='submit'
                className='h-12 px-8 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(0,210,252,0.4)] hover:shadow-[0_0_30px_rgba(0,210,252,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2'
              >
                Send Message <IoSend className='w-4 h-4' />
              </button>
            </form>
          </div>

        </div>

      </section>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Contact
