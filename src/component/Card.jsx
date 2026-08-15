import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'

function Card({ name, image, id, price, bestseller }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  return (
    <div 
      className='group relative w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d2fc]/50 hover:shadow-[0_0_25px_rgba(0,210,252,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between'
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Product Image Container */}
      <div className='relative w-full h-[240px] sm:h-[280px] bg-black/20 overflow-hidden flex items-center justify-center p-3'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500'
        />
        {bestseller && (
          <span className='absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md'>
            BESTSELLER
          </span>
        )}
        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <span className='bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30 flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform'>
            <IoEyeOutline className='w-4 h-4' /> Quick View
          </span>
        </div>
      </div>

      {/* Details Footer */}
      <div className='p-4 flex flex-col gap-1.5 bg-gradient-to-b from-transparent to-black/30'>
        <h3 className='text-gray-100 font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-[#00d2fc] transition-colors'>
          {name}
        </h3>
        <div className='flex items-center justify-between mt-1'>
          <p className='text-[#00d2fc] font-bold text-lg'>
            {currency}{price}
          </p>
          <span className='text-[11px] text-gray-400 font-medium px-2 py-0.5 bg-white/5 rounded border border-white/5'>
            In Stock
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
