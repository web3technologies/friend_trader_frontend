import React from 'react';
import useCandleStickData from './hooks/usecandlestickdata';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { useTheme } from './context/ThemeContext';

function App() {
    
    const {
        chartContainerRef,
        rsiContainerRef,
        userData,
        getData,
        setSearchState,
        handleDropdownChange
    } = useCandleStickData()

    const { theme } = useTheme();

    return (
        <>
        <Header/>
        <Sidebar/>
        <div className={`flex items-start justify-between h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>
            <div className="flex-1 flex flex-col space-y-6 pr-6">
                <div className={`${theme === 'light' ? 'bg-white' : 'bg-dark-secondary'} p-4 rounded shadow overflow-hidden relative`}>
                    {/* Time Interval Select Menu */}
                    <div className="absolute top-4 right-4">
                        <select 
                            className="p-2 border dark:border-gray-700 rounded text-gray-600 dark:bg-dark-secondary dark:text-light-foreground"
                            onChange={handleDropdownChange}
                        >
                            <option value="300">5 minutes</option>
                            <option value="3600">1 hour</option>
                            <option value="14400">4 hours</option>
                        </select>
                    </div>
                    <div ref={chartContainerRef}>
                        {/* Chart will be rendered here */}
                    </div>
                </div>
                
                <div ref={rsiContainerRef} className={`${theme === 'light' ? 'bg-white' : 'bg-dark-secondary'} p-4 rounded shadow h-1/5 overflow-hidden`}>
                    {/* RSI will be rendered here */}
                </div>
            </div>
            <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded shadow p-4 space-y-6 overflow-y-auto">
                <div className="flex items-center justify-center border-b dark:border-gray-700 pb-4">
                    <img 
                        src={userData.twitter_profile_pic} 
                        alt="User Profile" 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                        <h1 className="text-xl text-gray-800 dark:text-light-foreground mb-1">{userData.twitter_username}</h1>
                        <p className="text-gray-500 dark:text-gray-400">ShareSupply: {userData.shares_supply}</p>
                        <p className="text-gray-500 dark:text-gray-400">Followers: {userData.twitter_followers ? userData.twitter_followers.toLocaleString() : null}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <input 
                        className="flex-2 mr-2 p-2 border dark:border-gray-700 rounded text-gray-600 dark:bg-dark-secondary dark:text-light-foreground"
                        onChange={(e) => setSearchState(e.target.value)}
                        placeholder="Search..."
                    />
                </div>

                <p className="text-gray-600 dark:text-light-foreground">
                    Current price {userData.candle_stick_data.length > 0 ? userData.candle_stick_data[userData.candle_stick_data.length-1].low : null}
                </p>
            </div>
        </div>
        </>
    )
}

export default App;
