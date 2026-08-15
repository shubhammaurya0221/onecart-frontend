import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoArrowBackOutline, IoArrowForwardOutline, IoHomeOutline } from 'react-icons/io5'

function PageNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  // Hide on login/signup if desired, or show everywhere
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  if (isAuthPage) return null

  return (
    <div className='fixed bottom-[25px] left-[20px] z-40 flex items-center gap-1.5 p-1.5 bg-[#0c2025]/85 backdrop-blur-xl border border-[#00d2fc]/30 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] text-white transition-all hover:border-[#00d2fc]/60'>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        title="Go Back"
        className='p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-[#00d2fc]/20 hover:text-[#00d2fc] text-gray-300 transition-all cursor-pointer active:scale-90 border border-white/5'
        aria-label="Go Back"
      >
        <IoArrowBackOutline className='w-4 h-4 sm:w-5 sm:h-5' />
      </button>

      {/* Home Quick Jump */}
      <button
        onClick={() => navigate('/')}
        title="Go Home"
        className='p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-[#6060f5]/20 hover:text-[#6060f5] text-gray-300 transition-all cursor-pointer active:scale-90 border border-white/5'
        aria-label="Go Home"
      >
        <IoHomeOutline className='w-4 h-4 sm:w-5 sm:h-5' />
      </button>

      {/* Forward Button */}
      <button
        onClick={() => navigate(1)}
        title="Go Forward"
        className='p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-[#00d2fc]/20 hover:text-[#00d2fc] text-gray-300 transition-all cursor-pointer active:scale-90 border border-white/5'
        aria-label="Go Forward"
      >
        <IoArrowForwardOutline className='w-4 h-4 sm:w-5 sm:h-5' />
      </button>

    </div>
  )
}

export default PageNavigation
