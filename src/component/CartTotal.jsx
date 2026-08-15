import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext) || {}
  const subtotal = getCartAmount ? getCartAmount() : 0
  const finalFee = subtotal === 0 ? 0 : delivery_fee
  const grandTotal = subtotal === 0 ? 0 : subtotal + finalFee

  return (
    <div className='w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4'>
      <div className='border-b border-white/10 pb-2'>
        <Title text1={'CART'} text2={'SUMMARY'} />
      </div>

      <div className='flex flex-col gap-3 text-sm text-gray-300'>
        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span className='font-semibold text-white'>{currency}{subtotal}.00</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Estimated Shipping</span>
          <span className='font-semibold text-white'>{finalFee === 0 ? 'FREE' : `${currency}${finalFee}`}</span>
        </div>
        <div className='border-t border-white/10 pt-3 flex justify-between items-baseline'>
          <span className='text-base font-bold text-white'>Total Amount</span>
          <span className='text-xl sm:text-2xl font-extrabold text-[#00d2fc]'>
            {currency}{grandTotal}.00
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
