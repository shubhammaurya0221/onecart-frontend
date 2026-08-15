import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full flex flex-col gap-12 py-10'>
      <LatestCollection />
      <BestSeller />
    </div>
  )
}

export default Product
