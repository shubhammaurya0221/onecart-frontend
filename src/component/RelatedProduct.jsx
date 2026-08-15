import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext) || {}
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = products.filter(
        item => item.category === category && item._id !== currentProductId
      )
      if (filtered.length < 4) {
        filtered = products.filter(item => item._id !== currentProductId)
      }
      setRelated(filtered.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId])

  if (related.length === 0) return null

  return (
    <section className='my-12'>
      <div className='text-center mb-8'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {related.map((item, index) => (
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
    </section>
  )
}

export default RelatedProduct
