import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpayLogo from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { IoCheckmarkCircle, IoWalletOutline, IoCashOutline } from 'react-icons/io5'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext) || {}
  const { serverUrl } = useContext(authDataContext) || {}
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'OneCart Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${serverUrl}/api/order/verifyrazorpay`, response, { withCredentials: true })
          if (data) {
            toast.success("Order Placed Successfully!")
            if (setCartItem) setCartItem({})
            navigate("/order")
          }
        } catch (error) {
          console.log(error)
          toast.error("Payment Verification Failed")
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty!")
        setLoading(false)
        return
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(`${serverUrl}/api/order/placeorder`, orderData, { withCredentials: true })
          if (result.data) {
            if (setCartItem) setCartItem({})
            toast.success("Order Placed Successfully!")
            navigate("/order")
          } else {
            toast.error("Order Placement Failed")
          }
          setLoading(false)
          break

        case 'razorpay':
          const resultRazorpay = await axios.post(`${serverUrl}/api/order/razorpay`, orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
          }
          setLoading(false)
          break

        default:
          setLoading(false)
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Order placement failed")
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] pb-24 px-4 sm:px-8 md:px-12'>
      <div className='max-w-7xl mx-auto'>
        
        <form onSubmit={onSubmitHandler} className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          
          {/* Left Column: Delivery Address Form */}
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input 
                type="text" 
                placeholder='First Name' 
                required 
                name='firstName' 
                value={formData.firstName} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
              <input 
                type="text" 
                placeholder='Last Name' 
                required 
                name='lastName' 
                value={formData.lastName} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
            </div>

            <input 
              type="email" 
              placeholder='Email Address' 
              required 
              name='email' 
              value={formData.email} 
              onChange={onChangeHandler}
              className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
            />

            <input 
              type="text" 
              placeholder='Street / House Number' 
              required 
              name='street' 
              value={formData.street} 
              onChange={onChangeHandler}
              className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input 
                type="text" 
                placeholder='City' 
                required 
                name='city' 
                value={formData.city} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
              <input 
                type="text" 
                placeholder='State' 
                required 
                name='state' 
                value={formData.state} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input 
                type="text" 
                placeholder='Pin Code' 
                required 
                name='pinCode' 
                value={formData.pinCode} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
              <input 
                type="text" 
                placeholder='Country' 
                required 
                name='country' 
                value={formData.country} 
                onChange={onChangeHandler}
                className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
              />
            </div>

            <input 
              type="text" 
              placeholder='Mobile Phone Number' 
              required 
              name='phone' 
              value={formData.phone} 
              onChange={onChangeHandler}
              className='h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d2fc] focus:ring-1 focus:ring-[#00d2fc] transition-all'
            />
          </div>

          {/* Right Column: Order Summary & Payment Selection */}
          <div className='flex flex-col gap-8'>
            <CartTotal />

            {/* Payment Method Selector */}
            <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl'>
              <Title text1={'PAYMENT'} text2={'METHOD'} />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1'>
                
                {/* Razorpay Option */}
                <div 
                  onClick={() => setMethod('razorpay')}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    method === 'razorpay' 
                      ? 'border-[#00d2fc] bg-[#00d2fc]/10 shadow-[0_0_20px_rgba(0,210,252,0.2)]' 
                      : 'border-white/10 bg-black/30 hover:border-white/30'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <IoWalletOutline className='w-5 h-5 text-[#00d2fc]' />
                    <div>
                      <p className='text-sm font-bold text-white'>Online Payment</p>
                      <p className='text-[10px] text-gray-400'>Razorpay (Cards/UPI)</p>
                    </div>
                  </div>
                  {method === 'razorpay' && <IoCheckmarkCircle className='w-5 h-5 text-[#00d2fc]' />}
                </div>

                {/* Cash on Delivery Option */}
                <div 
                  onClick={() => setMethod('cod')}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    method === 'cod' 
                      ? 'border-[#00d2fc] bg-[#00d2fc]/10 shadow-[0_0_20px_rgba(0,210,252,0.2)]' 
                      : 'border-white/10 bg-black/30 hover:border-white/30'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <IoCashOutline className='w-5 h-5 text-green-400' />
                    <div>
                      <p className='text-sm font-bold text-white'>Cash on Delivery</p>
                      <p className='text-[10px] text-gray-400'>Pay when delivered</p>
                    </div>
                  </div>
                  {method === 'cod' && <IoCheckmarkCircle className='w-5 h-5 text-[#00d2fc]' />}
                </div>

              </div>

              {/* Submit CTA Button */}
              <button 
                type='submit' 
                disabled={loading}
                className='w-full h-14 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-extrabold text-base tracking-wide rounded-2xl shadow-[0_0_25px_rgba(0,210,252,0.4)] hover:shadow-[0_0_35px_rgba(0,210,252,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50'
              >
                {loading ? <Loading /> : "CONFIRM ORDER"}
              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  )
}

export default PlaceOrder
