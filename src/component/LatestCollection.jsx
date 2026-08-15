import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8))
    }
  }, [products])

  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-12 my-16'>
      <div className='text-center flex flex-col items-center gap-2'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='text-gray-400 text-sm sm:text-base max-w-xl'>
          Explore the newest additions to our catalog. Fresh styles designed for maximum comfort and elegance.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10'>
        {latestProducts.map((item, index) => (
          <Card 
            key={index} 
            name={item.name} 
            image={item.image1} 
            id={item._id} 
            price={item.price}
            bestseller={item.bestseller}
          />
        ))}
      </div>
    </section>
  )
}

export default LatestCollection
