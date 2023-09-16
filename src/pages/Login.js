import React from 'react';

function Login({ handleSignIn }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
            <div className="p-8 rounded-lg shadow-md bg-white max-w-xs w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Friend Trader</h1>
                <button 
                    onClick={handleSignIn}
                    className="w-full py-3 rounded-lg bg-blue-600 text-white text-center font-bold hover:bg-blue-700 transition-colors duration-300"
                >
                    Login with MetaMask
                </button>
            </div>
        </div>
    );
}

export default Login;
