import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { IoReceiptOutline, IoRefreshOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import Loading from '../component/Loading'

function Order() {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const { currency } = useContext(shopDataContext) || {}
  const { serverUrl } = useContext(authDataContext) || {}
  const navigate = useNavigate()

  const loadOrderData = async () => {
    try {
      setLoading(true)
      const result = await axios.post(`${serverUrl}/api/order/userorder`, {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach((order) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
              allOrdersItem.push({
                ...item,
                status: order.status || 'Order Placed',
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.date
              })
            })
          }
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log("Load order error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] pb-24 px-4 sm:px-8 md:px-12'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Header */}
        <div className='text-center mb-8 flex flex-col items-center gap-1'>
          <Title text1={'MY'} text2={'ORDERS'} />
          <p className='text-xs sm:text-sm text-gray-400 -mt-3'>
            Track and view the delivery status of your recent purchases.
          </p>
        </div>

        {loading ? (
          <div className='w-full py-20 flex justify-center'>
            <Loading />
          </div>
        ) : orderData.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {orderData.map((item, index) => (
              <div 
                key={index}
                className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl hover:border-[#00d2fc]/30 transition-all'
              >
                {/* Left Product Details */}
                <div className='flex items-center gap-4 flex-1 min-w-0'>
                  <img 
                    src={item.image1} 
                    alt={item.name} 
                    className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-black/30 border border-white/10 shrink-0'
                  />
                  <div className='flex flex-col gap-1 min-w-0'>
                    <h3 className='text-sm sm:text-base font-bold text-white truncate'>
                      {item.name}
                    </h3>
                    <div className='flex flex-wrap items-center gap-3 text-xs text-gray-400'>
                      <span className='text-[#00d2fc] font-bold text-sm sm:text-base'>
                        {currency}{item.price}
                      </span>
                      <span>Qty: {item.quantity}</span>
                      <span className='bg-white/10 px-2 py-0.5 rounded text-gray-300 font-mono'>Size: {item.size}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <p className='text-[11px] text-gray-400 mt-0.5'>
                      Payment: <span className='text-gray-200 font-medium'>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Right Status & Track Button */}
                <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0'>
                  {/* Status Badge */}
                  <div className='flex items-center gap-2'>
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                      item.status === 'Delivered' ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]' : 'bg-[#00d2fc] shadow-[0_0_10px_rgba(0,210,252,0.6)]'
                    }`} />
                    <span className='text-xs font-bold text-gray-200 uppercase tracking-wider'>
                      {item.status || 'Order Placed'}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={loadOrderData}
                    className='px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 transition-all cursor-pointer'
                  >
                    <IoRefreshOutline className='w-4 h-4 text-[#00d2fc]' /> Track Status
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Orders State */
          <div className='w-full py-20 flex flex-col items-center justify-center text-center gap-4 bg-white/5 rounded-3xl border border-white/10 p-8'>
            <div className='w-20 h-20 rounded-full bg-[#00d2fc]/10 border border-[#00d2fc]/30 flex items-center justify-center text-[#00d2fc] mb-2'>
              <IoReceiptOutline className='w-10 h-10' />
            </div>
            <h3 className='text-xl sm:text-2xl font-bold text-white'>No Orders Placed Yet</h3>
            <p className='text-gray-400 text-xs sm:text-sm max-w-sm'>
              When you place an order, it will appear here with live tracking updates.
            </p>
            <button 
              onClick={() => navigate('/collection')}
              className='mt-2 px-8 py-3.5 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer'
            >
              Start Shopping Now
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Order
