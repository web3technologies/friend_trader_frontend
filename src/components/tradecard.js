import React, { useState } from 'react';

import useTrade from '../hooks/usetrade';


const ComingSoonModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white  p-6 rounded-lg shadow-lg transform transition-transform duration-300 scale-95" style={{ maxWidth: '90%' }}>
                {/* Close Icon */}
                <div className="absolute top-2 right-2">
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="text-center">
                    <h3 className="mb-4 text-2xl font-semibold">Coming Soon!</h3>
                    <p className="mb-4 text-gray-600">We're actively working on this feature. Stay tuned!</p>
                </div>
            </div>
        </div>
    );
}


const TradeCard = ({address}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [ shareCount, setShareCount ] = useState(0)

    const handleButtonClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const { buyShares, sellShares } = useTrade()

    return (
        <div className="max-w-md w-full mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 space-y-4">
                <h2 className="text-2xl text-gray-800 dark:text-light-foreground font-semibold mb-2 text-center">Trade Shares</h2>
                
                <div className="flex items-center justify-between space-x-4">
                    {/* Input for Amount */}
                    <input 
                        type="number"
                        placeholder="Enter amount"
                        className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700 w-2/3 transition-all"
                        onChange={(e)=>setShareCount(e.target.value)}
                    />

                    {/* Buy Button */}
                    <button 
                        onClick={handleButtonClick}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow hover:shadow-lg transition-all"
                    >
                        Buy
                    </button>

                    {/* Sell Button */}
                    <button 
                        onClick={handleButtonClick}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md shadow hover:shadow-lg transition-all"
                    >
                        Sell
                    </button>
                </div>
            </div>

            <ComingSoonModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default TradeCard;
