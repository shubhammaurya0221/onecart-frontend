import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { userDataContext } from '../context/UserContext'
import { FaStar, FaStarHalfAlt, FaTruck, FaShieldAlt, FaSync } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'
import { toast } from 'react-toastify'

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { userData } = useContext(userDataContext) || {}
  const { products, currency, addtoCart, loading } = useContext(shopDataContext) || {}
  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (products && products.length > 0) {
      const match = products.find(item => item._id === productId)
      if (match) {
        setProductData(match)
        setSelectedImage(match.image1)
      }
    }
  }, [productId, products])

  const handleAddToCart = () => {
    if (!userData) {
      toast.info("Please log in to add items to cart")
      navigate("/login")
      return
    }
    if (!size) {
      toast.error("Please select a size first!")
      return
    }
    if (addtoCart) {
      addtoCart(productData._id, size)
    }
  }

  if (!productData) {
    return (
      <div className='min-h-screen w-full bg-[#0b1315] flex items-center justify-center text-white pt-20'>
        <Loading />
      </div>
    )
  }

  const galleryImages = [
    productData.image1,
    productData.image2,
    productData.image3,
    productData.image4
  ].filter(Boolean)

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] pb-20 px-4 sm:px-8 md:px-12'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start'>
          
          {/* Product Gallery Left */}
          <div className='flex flex-col-reverse sm:flex-row gap-4'>
            {/* Thumbnails */}
            <div className='flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar'>
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/30 border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl ? 'border-[#00d2fc] shadow-[0_0_15px_rgba(0,210,252,0.4)]' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className='w-full h-full object-cover' />
                </button>
              ))}
            </div>

            {/* Main Preview Image */}
            <div className='flex-1 h-[380px] sm:h-[480px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-4 flex items-center justify-center relative shadow-2xl'>
              <img 
                src={selectedImage} 
                alt={productData.name} 
                className='w-full h-full object-contain hover:scale-105 transition-transform duration-500'
              />
              {productData.bestseller && (
                <span className='absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                  BESTSELLER
                </span>
              )}
            </div>
          </div>

          {/* Product Details Right */}
          <div className='flex flex-col gap-6'>
            
            <div>
              <div className='text-xs font-bold text-[#00d2fc] tracking-wider uppercase mb-1'>
                {productData.category} • {productData.subCategory}
              </div>
              <h1 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
                {productData.name}
              </h1>

              {/* Rating */}
              <div className='flex items-center gap-2 mt-2'>
                <div className='flex text-amber-400 text-sm'>
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                </div>
                <span className='text-xs text-gray-400 font-medium'>(124 customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-3 border-y border-white/10 py-4'>
              <span className='text-3xl font-extrabold text-[#00d2fc]'>
                {currency}{productData.price}
              </span>
              <span className='text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full font-bold'>
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Description */}
            <p className='text-gray-300 text-sm leading-relaxed'>
              {productData.description || "Crafted from premium quality breathable materials. Designed for high performance, modern aesthetic fit, and all-day comfort."}
            </p>

            {/* Size Selector */}
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center text-xs'>
                <span className='font-bold text-gray-200 uppercase tracking-wider'>Select Size</span>
                <span className='text-[#00d2fc] cursor-pointer hover:underline'>Size Guide</span>
              </div>
              <div className='flex flex-wrap gap-2.5'>
                {productData.sizes && productData.sizes.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSize(item)}
                    className={`min-w-[48px] h-12 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      size === item
                        ? 'bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black shadow-[0_0_20px_rgba(0,210,252,0.4)] scale-105'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className='w-full sm:w-auto h-14 px-10 bg-gradient-to-r from-[#00d2fc] to-[#6060f5] hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-base tracking-wide rounded-2xl shadow-[0_0_30px_rgba(0,210,252,0.4)] hover:shadow-[0_0_40px_rgba(0,210,252,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2'
            >
              {loading ? <Loading /> : "Add to Shopping Cart"}
            </button>

            {/* Features Guarantee Box */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 mt-2 text-xs text-gray-300'>
              <div className='flex items-center gap-2.5'>
                <FaTruck className='w-5 h-5 text-[#00d2fc] shrink-0' />
                <span>Fast Delivery 3-5 Days</span>
              </div>
              <div className='flex items-center gap-2.5'>
                <FaSync className='w-5 h-5 text-[#6060f5] shrink-0' />
                <span>7 Days Easy Return</span>
              </div>
              <div className='flex items-center gap-2.5'>
                <FaShieldAlt className='w-5 h-5 text-[#00d2fc] shrink-0' />
                <span>100% Original Product</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specifications / Reviews */}
        <div className='mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden'>
          <div className='flex border-b border-white/10 bg-black/20'>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#00d2fc] border-b-2 border-[#00d2fc] bg-white/5'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#00d2fc] border-b-2 border-[#00d2fc] bg-white/5'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Customer Reviews (124)
            </button>
          </div>

          <div className='p-6 sm:p-8 text-sm text-gray-300 leading-relaxed'>
            {activeTab === 'description' ? (
              <p>
                Upgrade your wardrobe with this stylish slim-fit item, available exclusively on OneCart. Crafted from breathable, high-grade materials, it guarantees maximum durability, comfortable fit, and easy maintenance. Perfect for casual outings or formal gatherings.
              </p>
            ) : (
              <div className='space-y-4'>
                <div className='border-b border-white/10 pb-3'>
                  <div className='flex items-center gap-2 text-amber-400 text-xs mb-1'>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className='text-gray-400 font-bold ml-1'>Alex M.</span>
                  </div>
                  <p className='text-xs text-gray-300'>Fantastic quality! The fit is perfect and shipping was super fast.</p>
                </div>
                <div>
                  <div className='flex items-center gap-2 text-amber-400 text-xs mb-1'>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className='text-gray-400 font-bold ml-1'>Priya S.</span>
                  </div>
                  <p className='text-xs text-gray-300'>Exactly as shown in pictures. Very soft fabric and great color.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-12'>
          <RelatedProduct 
            category={productData.category} 
            subCategory={productData.subCategory} 
            currentProductId={productData._id} 
          />
        </div>

      </div>
    </div>
  )
}

export default ProductDetail
