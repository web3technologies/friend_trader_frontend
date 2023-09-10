import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import useCandleStickData from "../hooks/usecandlestickdata"


function FriendTechUserDetail(){

    const { theme } = useTheme()
    const { twitterUsername } = useParams()
    
    const {
        chartContainerRef,
        rsiContainerRef,
        userData,
        candleStickInterval,
        setCandleStickInterval
    } = useCandleStickData(twitterUsername)

    const buttonClass = (interval) => {
        const isSelected = interval === candleStickInterval;
        const baseClasses = `
            px-3 py-1 
            text-sm 
            border border-gray-400 dark:border-gray-600 
            rounded 
            transition-transform transform hover:scale-105 
            cursor-pointer
        `;
    
        const hoverOrSelectedClasses = isSelected 
            ? `${theme === 'light' ? 'bg-gradient-to-r from-blue-300 to-pink-400 text-gray-800' : 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white'}`
            : `${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400 text-gray-800' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 text-white'}`;
    
        return `${baseClasses} ${hoverOrSelectedClasses}`;
    };

    return (
        <div className={`flex items-start justify-between h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>
            <div className="flex-1 flex flex-col space-y-6 pr-6">
                <div className={`${theme === 'light' ? 'bg-white' : 'bg-dark-secondary'} p-4 rounded shadow overflow-hidden relative`}>
                        {/* Time Interval Select Menu */}
                        <div className="flex justify-end space-x-4 mb-4">
                            <button className={buttonClass("300")} onClick={() => setCandleStickInterval("300")}>5 minutes</button>
                            <button className={buttonClass("3600")} onClick={() => setCandleStickInterval("3600")}>1 hour</button>
                            <button className={buttonClass("14400")} onClick={() => setCandleStickInterval("14400")}>4 hours</button>
                            <button className={buttonClass("86400")} onClick={() => setCandleStickInterval("86400")}>1 day</button>
                        </div>
                        <div ref={chartContainerRef}>
                            {/* Chart will be rendered here */}
                        </div>
                    </div>
                    <div ref={rsiContainerRef} className={`${theme === 'light' ? 'bg-white' : 'bg-dark-secondary'} p-4 rounded shadow h-1/5 overflow-hidden`}>
                        {/* RSI will be rendered here */}
                    </div>
                </div>

                {userData && (
                    <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden">
                        {userData.twitter_profile_banner && (
                            <div 
                                className="w-full h-24 bg-cover bg-center" 
                                style={{ backgroundImage: `url(${userData.twitter_profile_banner})` }}
                            ></div>
                        )}
                        <div className="p-4 space-y-6">
                            <div className="flex items-center justify-between">
                                <img 
                                    src={userData.twitter_profile_pic} 
                                    alt="User Profile" 
                                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                                />
                                <div className="flex-1 ml-4">
                                    <h1 className="text-2xl text-gray-800 dark:text-light-foreground font-semibold mb-2">{userData.twitter_username}</h1>
                                    {
                                        userData.address && (
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Address: {`${userData.address.slice(0, 6)}...${userData.address.slice(-4)}`}
                                            </p>
                                        )
                                    }
                                    
                                    <p className="text-gray-500 dark:text-gray-400">ShareSupply: {userData.shares_supply}</p>
                                    <p className="text-gray-500 dark:text-gray-400">Followers: {userData.twitter_followers ? userData.twitter_followers.toLocaleString() : null}</p>
                                </div>
                                {userData.verified && 
                                    <div className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 self-start">Verified</div>
                                }
                            </div>

                            <div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">
                                    Current price: Ξ{userData.candle_stick_data?.length > 0 ? userData.candle_stick_data[userData.candle_stick_data.length-1].low : null}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Holders: {userData.holder_count ? userData.holder_count.toLocaleString() : 0}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Holdings: {userData.holding_count ? userData.holding_count.toLocaleString() : 0}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Last Online: {new Date(userData.last_online).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}


        </div>
    )
}

export default FriendTechUserDetail