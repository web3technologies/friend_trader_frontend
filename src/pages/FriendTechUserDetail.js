import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import useCandleStickData from "../hooks/usecandlestickdata"
import UserDetailCard from '../components/userdetailcard';
import TradeCard from '../components/tradecard';
import TradeList from '../components/tradelist';


function FriendTechUserDetail(){

    const { theme } = useTheme()
    const { twitterUsername } = useParams()
    
    const {
        chartContainerRef,
        rsiContainerRef,
        userData,
        candleStickInterval,
        setCandleStickInterval,
        toggleFavorite
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
        <div className={`flex flex-col md:flex-row items-start justify-between min-h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>

        {/* Mobile: UserDetailCard */}
        <UserDetailCard userData={userData} extraStyles={`sm: mb-4 md:block lg:hidden xl:hidden`} toggleFavorite={toggleFavorite}/>

        <div className="flex-1 flex flex-col space-y-6 pr-6 ">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-dark-secondary'} p-4 rounded shadow overflow-hidden relative`}>
                {/* Time Interval Select Menu */}
                <div className="flex justify-end space-x-4 mb-4">
                    <button className={`${buttonClass("300")} transition duration-300 ease-in-out transform hover:scale-105`} onClick={() => setCandleStickInterval("300")}>5 minutes</button>
                    <button className={`${buttonClass("3600")} transition duration-300 ease-in-out transform hover:scale-105`} onClick={() => setCandleStickInterval("3600")}>1 hour</button>
                    <button className={`${buttonClass("14400")} transition duration-300 ease-in-out transform hover:scale-105`} onClick={() => setCandleStickInterval("14400")}>4 hours</button>
                    <button className={`${buttonClass("86400")} transition duration-300 ease-in-out transform hover:scale-105`} onClick={() => setCandleStickInterval("86400")}>1 day</button>
                </div>
                <div ref={chartContainerRef}>
                    {/* Chart will be rendered here */}
                </div>
            </div>

            <div ref={rsiContainerRef} className={`${theme === 'light' ? 'bg-gradient-to-r from-white to-gray-100' : 'bg-gradient-to-r from-dark-secondary to-gray-900'} p-4 rounded shadow h-1/5 overflow-hidden relative`}>
                {/* ... RSI content ... */}
            </div>
        </div>

        <div className="space-y-6 md:pl-6"> 
            {/* Desktop: UserDetailCard */}
            <UserDetailCard userData={userData} extraStyles={`hidden md:block`} toggleFavorite={toggleFavorite}/>

            <TradeCard/>

            <TradeList address={userData.address}/>
        </div>
        </div>

    )
}

export default FriendTechUserDetail