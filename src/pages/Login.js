import React from 'react';
import { useTheme } from '../context/ThemeContext';


function Login() {

    const { setShowLogin, handleSignIn } = useTheme()

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={()=>setShowLogin(false)}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="p-8 rounded-lg shadow-md bg-white max-w-xs w-full mx-4 relative">
                        <button 
                            onClick={()=>setShowLogin(false)} 
                            className="absolute top-2 right-2 text-red-500 font-bold text-2xl hover:text-red-600"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <h1 className="text-2xl font-bold mb-6 text-center">Friend Trader</h1>
                        <button 
                            onClick={handleSignIn}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white text-center font-bold hover:bg-blue-700 transition-colors duration-300"
                        >
                            Login with MetaMask
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Login;
