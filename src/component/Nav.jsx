import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchOutline, IoBagHandleOutline, IoPersonOutline, IoLogOutOutline, IoReceiptOutline, IoHomeOutline, IoGridOutline, IoCallOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

function Nav() {
  const { userData, setUserData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { setShowSearch, getCartCount, setCartItem } = useContext(shopDataContext) || {}
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      setUserData(null)
      if (setCartItem) setCartItem({})
      setShowProfile(false)
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setShowProfile(false)
    }
  }

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collection' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className='w-full h-[75px] bg-[#0b1315]/90 backdrop-blur-xl border-b border-white/10 text-white fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 md:px-12 transition-all shadow-xl'>
      
      {/* Brand Logo */}
      <div 
        className='flex items-center gap-3 cursor-pointer group'
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="OneCart Logo" className='w-9 h-9 drop-shadow-[0_0_10px_rgba(0,210,252,0.5)] group-hover:scale-105 transition-transform' />
        <h1 className='text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-[#00d2fc]'>
          OneCart
        </h1>
      </div>

      {/* Desktop Navigation Links */}
      <nav className='hidden md:flex items-center gap-2'>
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer ${
              isActive(link.path)
                ? 'bg-gradient-to-r from-[#00d2fc]/20 to-[#6060f5]/30 text-[#00d2fc] border border-[#00d2fc]/40 shadow-[0_0_15px_rgba(0,210,252,0.2)]'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Action Icons */}
      <div className='flex items-center gap-4 relative'>
        
        {/* Search Icon */}
        <button
          onClick={() => {
            if (setShowSearch) setShowSearch(prev => !prev);
            navigate("/collection");
          }}
          className='p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/5'
          title="Search Products"
        >
          <IoSearchOutline className='w-5 h-5' />
        </button>

        {/* Profile Avatar & Dropdown / Log In Button */}
        {userData ? (
          <div className='relative'>
            <button
              onClick={() => setShowProfile(prev => !prev)}
              className='w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6060f5] to-[#00d2fc] p-[1.5px] cursor-pointer shadow-md hover:scale-105 transition-transform'
            >
              <div className='w-full h-full bg-[#0c2025] rounded-[10px] flex items-center justify-center font-bold text-sm text-[#00d2fc]'>
                {userData.name ? userData.name.slice(0, 1).toUpperCase() : <IoPersonOutline className='w-5 h-5 text-white' />}
              </div>
            </button>

            {showProfile && (
              <div className='absolute right-0 top-[125%] w-56 bg-[#0c2025]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                <div className='px-3 py-2 border-b border-white/10 mb-1'>
                  <p className='text-xs font-semibold text-white truncate'>{userData.name || 'User Profile'}</p>
                  <p className='text-[10px] text-gray-400 truncate'>{userData.email}</p>
                </div>
                <ul className='flex flex-col text-xs font-medium space-y-0.5'>
                  <li>
                    <button
                      onClick={() => { navigate("/order"); setShowProfile(false); }}
                      className='w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer'
                    >
                      <IoReceiptOutline className='w-4 h-4 text-[#00d2fc]' /> My Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { navigate("/about"); setShowProfile(false); }}
                      className='w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer'
                    >
                      <IoPersonOutline className='w-4 h-4 text-[#6060f5]' /> About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { handleLogout(); setShowProfile(false); }}
                      className='w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer mt-1 border-t border-white/5'
                    >
                      <IoLogOutOutline className='w-4 h-4' /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2fc] to-[#6060f5] text-black font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer'
          >
            Log In
          </button>
        )}

        {/* Cart Icon (Desktop) */}
        <button
          onClick={() => navigate("/cart")}
          className='relative p-2.5 rounded-xl bg-gradient-to-r from-[#00d2fc]/10 to-[#6060f5]/20 hover:from-[#00d2fc]/20 hover:to-[#6060f5]/30 text-white transition-all cursor-pointer border border-[#00d2fc]/30 hidden md:flex items-center justify-center'
        >
          <IoBagHandleOutline className='w-5 h-5 text-[#00d2fc]' />
          {getCartCount && getCartCount() > 0 && (
            <span className='absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse'>
              {getCartCount()}
            </span>
          )}
        </button>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-[#0c2025]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around z-40 px-2'>
        <button 
          onClick={() => navigate("/")} 
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${isActive("/") ? "text-[#00d2fc]" : "text-gray-400"}`}
        >
          <IoHomeOutline className='w-5 h-5' /> Home
        </button>
        <button 
          onClick={() => navigate("/collection")} 
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${isActive("/collection") ? "text-[#00d2fc]" : "text-gray-400"}`}
        >
          <IoGridOutline className='w-5 h-5' /> Collections
        </button>
        <button 
          onClick={() => navigate("/contact")} 
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${isActive("/contact") ? "text-[#00d2fc]" : "text-gray-400"}`}
        >
          <IoCallOutline className='w-5 h-5' /> Contact
        </button>
        <button 
          onClick={() => navigate("/cart")} 
          className={`relative flex flex-col items-center gap-1 text-[10px] font-semibold ${isActive("/cart") ? "text-[#00d2fc]" : "text-gray-400"}`}
        >
          <IoBagHandleOutline className='w-5 h-5' /> Cart
          {getCartCount && getCartCount() > 0 && (
            <span className='absolute -top-1 right-2 min-w-[16px] h-[16px] px-1 bg-[#00d2fc] text-black text-[9px] font-bold rounded-full flex items-center justify-center'>
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

    </header>
  )
}

export default Nav
