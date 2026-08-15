import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-2.5 items-center justify-center mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'>
      <p className='text-gray-300'>
        {text1} <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#00d2fc] to-[#6060f5]'>{text2}</span>
      </p>
      <div className='w-8 sm:w-12 h-[3px] rounded-full bg-gradient-to-r from-[#00d2fc] to-[#6060f5]'></div>
    </div>
  )
}

export default Title
