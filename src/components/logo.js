import React from 'react'
import logo from "../images/friend_trader_logo.jpg"
import { useTheme } from '../context/ThemeContext';


function Logo() {

    const { theme } = useTheme();
    return (
        <div className="flex items-center space-x-2 mx-4 md:mx-6">
            <img src={logo} alt="Your Brand Logo" className="h-10 w-auto" />
            <p className={`hidden md:block text-lg font-semibold leading-tight text-gray-800 ${theme==='dark'?'text-white':''}`}>Friend Trader</p>
        </div>
    )
}

export default Logo