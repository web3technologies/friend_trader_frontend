import React from 'react';
import { useTheme } from '../context/ThemeContext';
import logo from "../images/friend_trader_logo.jpg"

function Login() {

    const { setShowLogin, handleSignIn, errorMsg } = useTheme()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center" onClick={() => setShowLogin(false)}>
            <div className="rounded-lg shadow-2xl bg-white max-w-md w-full p-6 space-y-6 relative">
                
                <button 
                    onClick={() => setShowLogin(false)} 
                    className="absolute top-2 right-2 text-red-500 font-bold text-3xl hover:text-red-600"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                
                <img src={logo} alt="Friend Trader Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />

                <h1 className="text-3xl font-bold mb-4 text-center">Friend Trader</h1>
                
                {errorMsg ? 
                    <div className="text-center space-y-4">
                        <p className='text-red-600 text-lg'>
                            Oops! It seems you don't have MetaMask installed.
                        </p>
                        <p className='text-blue-600 text-lg'>
                            No worries! You can <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer" className="underline font-bold">download it here</a> and come right back.
                        </p>
                    </div>
                    : 
                    <>
                        <p className="mb-4 text-center text-gray-700 text-lg">
                            Connect with MetaMask to access this feature.
                        </p>
                        <button 
                            onClick={handleSignIn}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white text-center font-bold hover:bg-blue-700 transition-colors duration-300 shadow-md"
                        >
                            Connect with MetaMask
                        </button>
                    </>
                }
            </div>
        </div>
    );
}

export default Login;
