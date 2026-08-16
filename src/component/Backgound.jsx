import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Backgound({ heroCount }) {
  const images = [back2, back1, back3, back4]

  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden z-0'>
      {/* Horizontal Sliding Image Carousel Track */}
      <div 
        className='flex w-full h-full transition-transform duration-1000 ease-in-out'
        style={{ transform: `translateX(-${heroCount * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className='w-full h-full shrink-0 relative overflow-hidden'>
            <img 
              src={img} 
              alt={`Hero banner ${idx + 1}`} 
              className='w-full h-full object-cover object-center filter brightness-[0.4] scale-105'
            />
          </div>
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#0b1315]/95 via-[#0b1315]/80 to-transparent pointer-events-none z-10'></div>
    </div>
  )
}

export default Backgound
