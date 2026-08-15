import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify'; // Ensure this is imported if you're using react-toastify or react-hot-toast

// Assets & Icons
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";

// Context & Utils
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import { auth, provider } from '../../utils/Firebase';

// Components
import Loading from '../component/Loading';

function Login() {
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);

    let { serverUrl } = useContext(authDataContext);
    let { getCurrentUser } = useContext(userDataContext);
    
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let result = await axios.post(serverUrl + '/api/auth/login', {
                email, password
            }, { withCredentials: true });
            
            console.log(result.data);
            setLoading(false);
            getCurrentUser();
            toast.success("User Login Successful");
            navigate("/");
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("User Login Failed");
        }
    }

    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;

            const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true });
            console.log(result.data);
            getCurrentUser();
            toast.success("Google Login Successful");
            navigate("/");

        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    }

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-[#0b1315] via-[#111a1f] to-[#070b0d] text-white flex flex-col relative overflow-hidden'>
            
            {/* Ambient Background Glows */}
            <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#42656cae] rounded-full blur-[120px] opacity-30 pointer-events-none'></div>
            <div className='absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#6060f5] rounded-full blur-[120px] opacity-20 pointer-events-none'></div>

            {/* Header Navbar */}
            <header 
                className='w-full h-[80px] flex items-center justify-start px-6 md:px-12 gap-3 cursor-pointer relative z-10' 
                onClick={() => navigate("/")}
            >
                <img className='w-[40px] drop-shadow-lg' src={Logo} alt="OneCart Logo" />
                <h1 className='text-[24px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
                    OneCart
                </h1>
            </header>

            {/* Main Form Container */}
            <main className='flex-1 flex flex-col items-center justify-center px-4 relative z-10 w-full'>
                
                {/* Titles */}
                <div className='text-center mb-8 flex flex-col gap-2'>
                    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>Welcome Back</h2>
                    <p className='text-gray-400 text-md'>Sign in to OneCart to place your orders</p>
                </div>

                {/* Glassmorphism Card */}
                <div className='w-full max-w-[480px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10'>
                    
                    {/* Google Login Button */}
                    <button 
                        onClick={googlelogin}
                        type="button"
                        className='w-full h-[50px] bg-white text-gray-900 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]'
                    >
                        <img src={google} alt="Google" className='w-[22px]'/> 
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className='w-full flex items-center justify-center gap-4 my-8 opacity-60'>
                        <div className='flex-1 h-[1px] bg-gradient-to-r from-transparent to-gray-400'></div>
                        <span className='text-sm text-gray-300 font-medium tracking-widest uppercase'>OR</span>
                        <div className='flex-1 h-[1px] bg-gradient-to-l from-transparent to-gray-400'></div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                        
                        {/* Email Input */}
                        <div className='w-full'>
                            <input 
                                type="email" 
                                className='w-full h-[54px] bg-black/20 border border-white/10 rounded-xl px-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#6060f5] focus:ring-1 focus:ring-[#6060f5] transition-all duration-300' 
                                placeholder='Email Address' 
                                required  
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />
                        </div>
                        
                        {/* Password Input */}
                        <div className='w-full relative'>
                            <input 
                                type={show ? "text" : "password"} 
                                className='w-full h-[54px] bg-black/20 border border-white/10 rounded-xl pl-5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#6060f5] focus:ring-1 focus:ring-[#6060f5] transition-all duration-300' 
                                placeholder='Password' 
                                required 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
                            />
                            {/* Eye Icon Button */}
                            <button 
                                type="button"
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1'
                                onClick={() => setShow(prev => !prev)}
                            >
                                {show ? <IoEye className='w-[22px] h-[22px]' /> : <IoEyeOutline className='w-[22px] h-[22px]' />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className='w-full h-[54px] bg-[#6060f5] hover:bg-[#4d4df0] text-white rounded-xl flex items-center justify-center mt-2 text-[17px] font-bold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(96,96,245,0.4)] hover:shadow-[0_0_25px_rgba(96,96,245,0.6)] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]'
                        >
                            {loading ? <Loading/> : "Log In"}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className='mt-8 text-center text-gray-400'>
                        Don't have an account?{' '}
                        <span 
                            className='text-[#6060f5] font-semibold cursor-pointer hover:text-white hover:underline underline-offset-4 transition-all duration-300' 
                            onClick={() => navigate("/signup")}
                        >
                            Create New Account
                        </span>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Login;