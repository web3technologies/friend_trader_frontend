import useTradeList from "../hooks/usetrades"
import { useNavigate } from 'react-router-dom';


const TradeList = (address)=>{
    
    const { trades } = useTradeList(address.address)
    const navigate = useNavigate();
    const handleNavigate = (navLink)=>{
        navigate(navLink)
    }

    return (
        <div className="max-w-md w-full mt-8 bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl text-gray-800 dark:text-light-foreground font-semibold mb-2 px-4 py-2 border-b border-gray-300 dark:border-gray-600">Recent Trades</h2>
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                { trades.length > 0 ? trades.map((trade, index) => (
                    <div key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-tertiary cursor-pointer" onClick={()=>handleNavigate(`/user/${trade.trader.twitter_username}`)}>
                        {/* Profile Pic */}
                        <img src={trade.trader.twitter_profile_pic} alt={`${trade.trader.twitter_username}'s profile pic`} className="w-12 h-12 rounded-full mr-4" />

                        {/* Twitter Username, Price, and Time */}
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-light-foreground font-medium">@{trade.trader.twitter_username}</p>
                            <p className={`text-sm ${trade.is_buy ? 'text-green-500' : 'text-red-500'}`}>
                                {trade.is_buy ? 'Bought' : 'Sold'} at Ξ{parseFloat(trade.price).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">{new Date(trade.block.block_timestamp * 1000).toLocaleString()}</p>
                        </div>

                        {/* Block Number Link */}
                        <p 
                            className="text-xs text-blue-500 hover:text-blue-700 ml-4 cursor-pointer transition duration-300"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                handleNavigate(`/block/${trade.block.block_number}`)
                            }}
                            >
                            Block #{trade.block.block_number}
                        </p>

                    </div>
                    )):null}
            </div>
        </div>

    )

}

export default TradeList