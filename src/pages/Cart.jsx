import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoBagOutline, IoArrowForwardOutline } from "react-icons/io5"
import CartTotal from '../component/CartTotal'
import { toast } from 'react-toastify'

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext) || {}
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] pb-24 px-4 sm:px-8 md:px-12'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Header */}
        <div className='text-center mb-8'>
          <Title text1={'YOUR'} text2={'SHOPPING CART'} />
          <p className='text-xs sm:text-sm text-gray-400 -mt-3'>
            Review your selected items before proceeding to secure checkout.
          </p>
        </div>

        {cartData.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
            
            {/* Cart Items List */}
            <div className='lg:col-span-2 flex flex-col gap-4'>
              {cartData.map((item, index) => {
                const productData = products ? products.find(product => product._id === item._id) : null
                if (!productData) return null

                return (
                  <div 
                    key={index}
                    className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#00d2fc]/30 transition-all shadow-lg'
                  >
                    {/* Thumbnail & Info */}
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                      <img 
                        src={productData.image1} 
                        alt={productData.name} 
                        className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-black/30 border border-white/10 shrink-0'
                      />
                      <div className='flex flex-col gap-1 min-w-0'>
                        <h3 className='text-sm sm:text-base font-bold text-white truncate hover:text-[#00d2fc] cursor-pointer' onClick={() => navigate(`/productdetail/${productData._id}`)}>
                          {productData.name}
                        </h3>
                        <div className='flex items-center gap-3 text-xs'>
                          <span className='text-[#00d2fc] font-extrabold text-sm sm:text-base'>
                            {currency}{productData.price}
                          </span>
                          <span className='bg-[#00d2fc]/10 text-[#00d2fc] border border-[#00d2fc]/30 px-2 py-0.5 rounded-md font-mono font-bold'>
                            Size: {item.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className='flex items-center gap-3 shrink-0'>
                      <input 
                        type="number" 
                        min={1} 
                        value={item.quantity} 
                        className='w-14 sm:w-16 h-10 bg-black/40 border border-white/15 rounded-xl text-center text-sm font-bold text-white outline-none focus:border-[#00d2fc]'
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val > 0) updateQuantity(item._id, item.size, val)
                        }}
                      />

                      {/* Remove Icon */}
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        title="Remove item"
                        className='p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer'
                      >
                        <RiDeleteBin6Line className='w-4 h-4' />
                      </button>
                    </div>

                  </div>
                )
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className='flex flex-col gap-4'>
              <CartTotal />

              <button 
                onClick={() => {
                  if (cartData.length > 0) {
                    navigate("/placeorder")
                  } else {
                    toast.error("Your cart is empty!")
                  }
                }}
                className='w-full h-14 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-extrabold text-sm sm:text-base tracking-wide rounded-2xl shadow-[0_0_25px_rgba(0,210,252,0.4)] hover:shadow-[0_0_35px_rgba(0,210,252,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer'
              >
                PROCEED TO CHECKOUT <IoArrowForwardOutline className='w-5 h-5' />
              </button>
            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className='w-full py-20 flex flex-col items-center justify-center text-center gap-4 bg-white/5 rounded-3xl border border-white/10 p-8'>
            <div className='w-20 h-20 rounded-full bg-[#00d2fc]/10 border border-[#00d2fc]/30 flex items-center justify-center text-[#00d2fc] mb-2'>
              <IoBagOutline className='w-10 h-10' />
            </div>
            <h3 className='text-xl sm:text-2xl font-bold text-white'>Your Cart is Empty</h3>
            <p className='text-gray-400 text-xs sm:text-sm max-w-sm'>
              Looks like you haven't added any fashion items to your shopping cart yet.
            </p>
            <button 
              onClick={() => navigate('/collection')}
              className='mt-2 px-8 py-3.5 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer'
            >
              Explore Collections Now
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart
