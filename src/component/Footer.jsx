import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, IoLogoGithub, IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className='w-full bg-[#070b0d] text-gray-400 border-t border-white/10 pt-12 pb-24 md:pb-12 px-6 sm:px-12 md:px-20 mt-16 relative overflow-hidden'>
      {/* Background Glow */}
      <div className='absolute top-0 right-1/4 w-96 h-96 bg-[#00d2fc]/5 rounded-full blur-[140px] pointer-events-none'></div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10'>
        
        {/* Brand Bio */}
        <div className='flex flex-col gap-4 md:col-span-1.5'>
          <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
            <img src={logo} alt="OneCart" className='w-9 h-9 drop-shadow-[0_0_10px_rgba(0,210,252,0.4)]' />
            <span className='text-2xl font-bold text-white tracking-wide'>OneCart</span>
          </div>
          <p className='text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm'>
            Your premier online shopping destination. Delivering curated fashion, top-tier quality, and 24/7 AI-powered assistance right to your doorstep.
          </p>
          <div className='flex items-center gap-3 mt-2 text-gray-300'>
            <a href="#instagram" className='p-2 bg-white/5 hover:bg-[#00d2fc]/20 hover:text-[#00d2fc] rounded-xl border border-white/5 transition-all'>
              <IoLogoInstagram className='w-4 h-4' />
            </a>
            <a href="#facebook" className='p-2 bg-white/5 hover:bg-[#6060f5]/20 hover:text-[#6060f5] rounded-xl border border-white/5 transition-all'>
              <IoLogoFacebook className='w-4 h-4' />
            </a>
            <a href="#twitter" className='p-2 bg-white/5 hover:bg-[#00d2fc]/20 hover:text-[#00d2fc] rounded-xl border border-white/5 transition-all'>
              <IoLogoTwitter className='w-4 h-4' />
            </a>
            <a href="#github" className='p-2 bg-white/5 hover:bg-white/20 hover:text-white rounded-xl border border-white/5 transition-all'>
              <IoLogoGithub className='w-4 h-4' />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-sm font-bold text-white uppercase tracking-wider'>Quick Links</h4>
          <ul className='flex flex-col gap-2 text-xs sm:text-sm'>
            <li onClick={() => navigate("/")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Home</li>
            <li onClick={() => navigate("/collection")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Collections</li>
            <li onClick={() => navigate("/about")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>About Us</li>
            <li onClick={() => navigate("/contact")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Contact</li>
            <li onClick={() => navigate("/cart")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Shopping Cart</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-sm font-bold text-white uppercase tracking-wider'>Support & Policy</h4>
          <ul className='flex flex-col gap-2 text-xs sm:text-sm'>
            <li onClick={() => navigate("/order")} className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Track Orders</li>
            <li className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Shipping Rates</li>
            <li className='hover:text-[#00d2fc] cursor-pointer transition-colors'>7-Day Return Policy</li>
            <li className='hover:text-[#00d2fc] cursor-pointer transition-colors'>Terms & Privacy</li>
          </ul>
        </div>

        {/* Contact info */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-sm font-bold text-white uppercase tracking-wider'>Get In Touch</h4>
          <ul className='flex flex-col gap-2.5 text-xs sm:text-sm'>
            <li className='flex items-center gap-2 text-gray-300'>
              <IoMailOutline className='w-4 h-4 text-[#00d2fc]' /> contact@onecart.com
            </li>
            <li className='flex items-center gap-2 text-gray-300'>
              <IoCallOutline className='w-4 h-4 text-[#00d2fc]' /> +91-9876543210
            </li>
            <li className='flex items-center gap-2 text-gray-300'>
              <IoLocationOutline className='w-4 h-4 text-[#00d2fc]' /> New Delhi, India
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Footer */}
      <div className='max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3'>
        <p>© {new Date().getFullYear()} OneCart Inc. All Rights Reserved.</p>
        <div className='flex items-center gap-4 text-[11px]'>
          <span>Secured Payments by Razorpay</span>
          <span>•</span>
          <span>Cash on Delivery Supported</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
