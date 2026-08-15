import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      const filterProduct = products.filter((item) => item.bestseller)
      setBestSeller(filterProduct.length > 0 ? filterProduct.slice(0, 4) : products.slice(0, 4))
    }
  }, [products])

  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-12 my-16'>
      <div className='text-center flex flex-col items-center gap-2'>
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className='text-gray-400 text-sm sm:text-base max-w-xl'>
          Tried, tested, and loved by thousands. Discover our top trending products this month.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10'>
        {bestSeller.map((item, index) => (
          <Card 
            key={index} 
            name={item.name} 
            id={item._id} 
            price={item.price} 
            image={item.image1}
            bestseller={true}
          />
        ))}
      </div>
    </section>
  )
}

export default BestSeller
