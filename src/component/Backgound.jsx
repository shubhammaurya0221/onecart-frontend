import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Backgound({ heroCount }) {
  const images = [back2, back1, back3, back4]
  const currentImg = images[heroCount] || back2

  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden z-0'>
      <img 
        src={currentImg} 
        alt="Hero banner" 
        className='w-full h-full object-cover object-center filter brightness-[0.4] transition-all duration-700 scale-105'
      />
      {/* Dark Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#0b1315]/95 via-[#0b1315]/80 to-transparent'></div>
    </div>
  )
}

export default Backgound
