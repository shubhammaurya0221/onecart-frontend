import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  const heroData = [
    { text1: "Choose Your Perfect", text2: "Fashion Fit Today" },
    { text1: "Discover Bold Styles", text2: "Up to 40% OFF" },
    { text1: "Curated Luxury Wear", text2: "New Arrivals 2026" },
    { text1: "Trending Best Sellers", text2: "Fast & Free Shipping" }
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white pt-[75px] overflow-x-hidden'>
      {/* Hero Section */}
      <section className='relative w-full min-h-[85vh] flex items-center overflow-hidden border-b border-white/10'>
        <Backgound heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </section>

      {/* Main Content Sections */}
      <main className='w-full'>
        <Product />
        <OurPolicy />
        <NewLetterBox />
      </main>

      <Footer />
    </div>
  )
}

export default Home
