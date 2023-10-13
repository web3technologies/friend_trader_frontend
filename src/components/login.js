import React from 'react'
import { useTheme } from '../context/ThemeContext';


function LoginComponent({extraStyles}) {

    const { theme, handleSignIn, user} = useTheme();
    if (!user){
        return (
            <button className={`flex items-center space-x-2 px-3 py-1 rounded-md ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} hover:bg-opacity-90 transition ${extraStyles}`} onClick={handleSignIn}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" alt="Metamask" className="w-6 h-6" />
                <span>Login</span>
            </button>
        )
    } else {
        return null
    }

}

export default LoginComponent