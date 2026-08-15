import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown, FaFilter } from "react-icons/fa"
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch } = useContext(shopDataContext) || {}
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevant")

  const toggleCategory = (e) => {
    const val = e.target.value
    if (category.includes(val)) {
      setCategory(prev => prev.filter(item => item !== val))
    } else {
      setCategory(prev => [...prev, val])
    }
  }

  const toggleSubCategory = (e) => {
    const val = e.target.value
    if (subCategory.includes(val)) {
      setSubCategory(prev => prev.filter(item => item !== val))
    } else {
      setSubCategory(prev => [...prev, val])
    }
  }

  const applyFilter = () => {
    if (!products) return
    let productCopy = products.slice()

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  const sortProducts = () => {
    let fbCopy = filterProduct.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    sortProducts()
  }, [sortType])

  useEffect(() => {
    if (products) setFilterProduct(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[90px] pb-20 px-4 sm:px-8 md:px-12'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8'>
        
        {/* Sidebar Filters */}
        <div className='w-full md:w-64 flex flex-col gap-6 shrink-0'>
          <button 
            onClick={() => setShowFilter(prev => !prev)}
            className='flex items-center justify-between w-full p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:pointer-events-none'
          >
            <div className='flex items-center gap-2 text-lg font-bold text-[#00d2fc]'>
              <FaFilter className='w-4 h-4' /> FILTERS
            </div>
            <div className='md:hidden text-gray-400'>
              {showFilter ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </button>

          {/* Category Filter */}
          <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col gap-3 ${showFilter ? "block" : "hidden"} md:block`}>
            <h4 className='text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2'>CATEGORIES</h4>
            <div className='flex flex-col gap-2.5 text-sm text-gray-300 mt-1'>
              {['Men', 'Women', 'Kids'].map((cat) => (
                <label key={cat} className='flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors'>
                  <input 
                    type="checkbox" 
                    value={cat} 
                    onChange={toggleCategory}
                    className='w-4 h-4 accent-[#00d2fc] rounded cursor-pointer'
                  /> 
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Category Filter */}
          <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col gap-3 ${showFilter ? "block" : "hidden"} md:block`}>
            <h4 className='text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2'>SUB-CATEGORIES</h4>
            <div className='flex flex-col gap-2.5 text-sm text-gray-300 mt-1'>
              {['TopWear', 'BottomWear', 'WinterWear'].map((sub) => (
                <label key={sub} className='flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors'>
                  <input 
                    type="checkbox" 
                    value={sub} 
                    onChange={toggleSubCategory}
                    className='w-4 h-4 accent-[#00d2fc] rounded cursor-pointer'
                  /> 
                  {sub}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className='flex-1 flex flex-col gap-6'>
          
          {/* Top Bar (Title & Sort Dropdown) */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:px-6 rounded-2xl'>
            <div>
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
              <p className='text-xs text-gray-400 -mt-4'>
                Showing {filterProduct.length} results
              </p>
            </div>

            <select 
              className='bg-[#0c2025] border border-white/15 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#00d2fc] cursor-pointer' 
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* Product Cards Grid */}
          {filterProduct.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filterProduct.map((item, index) => (
                <Card 
                  key={index} 
                  id={item._id} 
                  name={item.name} 
                  price={item.price} 
                  image={item.image1}
                  bestseller={item.bestseller}
                />
              ))}
            </div>
          ) : (
            <div className='w-full py-20 flex flex-col items-center justify-center text-center gap-3 bg-white/5 rounded-2xl border border-white/10'>
              <p className='text-gray-400 text-base font-semibold'>No products match your selected filters.</p>
              <button 
                onClick={() => { setCategory([]); setSubCategory([]); }}
                className='px-4 py-2 bg-[#00d2fc]/20 text-[#00d2fc] border border-[#00d2fc]/40 text-xs font-bold rounded-xl hover:bg-[#00d2fc]/30 transition-all'
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Collections