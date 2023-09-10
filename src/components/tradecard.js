
const TradeCard= ()=>{

    return (
        <div className="max-w-md w-full mt-8 bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden">
            <div className="p-4 space-y-4">
                <h2 className="text-2xl text-gray-800 dark:text-light-foreground font-semibold mb-2 text-center">Trade Shares</h2>
                
                <div className="flex items-center justify-between space-x-4">
                    {/* Input for Amount */}
                    <input 
                        type="number"
                        placeholder="Enter amount"
                        className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700 w-2/3 transition-all"
                    />

                    {/* Buy Button */}
                    <button 
                        onClick={() => {} /* Handle Buy Action */}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow hover:shadow-lg transition-all"
                    >
                        Buy
                    </button>

                    {/* Sell Button */}
                    <button 
                        onClick={() => {} /* Handle Sell Action */}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md shadow hover:shadow-lg transition-all"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TradeCard;