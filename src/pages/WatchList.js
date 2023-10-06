import React from 'react'
import { useNavigate } from 'react-router-dom';

import { FaStar, } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'

import Login from './Login';
import useWatchList from '../hooks/usewatchlist';


function WatchList() {
    const { user, handleSignIn, theme } = useTheme();
    if (!user) {
        return <Login handleSignIn={handleSignIn}/>;
    }

    return <WatchListContent theme={theme}/>;
}



function UserCard({ data, theme }) {
    const isDark = theme === 'dark';

    const navigate = useNavigate();

    const getChangeStyle = (value) => {
        if (value > 0) return 'text-green-500';
        if (value < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    };

    function formatPercent(num) {
        let rounded = Math.round(num * 10000) / 10000;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(rounded);
    }

    return (
        <div 
            onClick={() => navigate(`/user/${data.twitter_username}`)}
            className={`border p-4 m-2 rounded-md shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-100 to-white hover:from-gray-200 hover:to-gray-100'} transition duration-300 cursor-pointer relative`}
        >
            
            {/* Star in top right */}
            <div className={`absolute top-2 right-2 ${isDark ? 'text-yellow-500' : 'text-yellow-400'}`}>
                <FaStar style={{ color: 'gold', strokeWidth: '5', stroke: 'black' }} />
            </div>

            <div className="flex items-center space-x-4">
                {data.twitter_profile_pic ? (
                    <img
                        src={data.twitter_profile_pic}
                        alt="Profile"
                        className={`w-16 h-16 rounded-full ${isDark ? 'border-2 border-gray-700' : 'border-2 border-gray-300'}`}
                    />
                ) : (
                    <div className={`w-16 h-16 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded-full flex items-center justify-center text-xl ${isDark ? 'text-gray-400' : 'text-white'}`}>
                        {getInitials(data.twitter_username || 'AU')}
                    </div>
                )}

                <div>
                    <h2 className={`font-bold text-xl ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                        {data.twitter_username || 'Anonymous User'}
                    </h2>
                    {data.twitter_followers && (
                        <p className={`text-gray-600 ${isDark ? 'text-gray-500' : ''}`}>{data.twitter_followers} followers</p>
                    )}
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <p className={`text-gray-700 ${isDark ? 'text-gray-400' : ''}`}>Shares Supply: {data.shares_supply}</p>
                <p className={getChangeStyle(data.twenty_four_hour_percent_change)}>
                    24 Hour Change: {formatPercent(data.twenty_four_hour_percent_change)}%
                </p>
                <p className={getChangeStyle(data.seven_day_percent_change)}>
                    7 Day Change: {formatPercent(data.seven_day_percent_change)}%
                </p>
            </div>
        </div>
    );
}


function WatchListContent({ theme }) {
    const { watchList, isLoading } = useWatchList();
    // const navigate = useNavigate();
    const isDark = theme === 'dark';

    if (watchList.length > 0) {
        return (
            <div className={`p-8 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Your WatchList:</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {watchList.map(item => (
                        <UserCard key={item.id} data={item.friend_tech_user} theme={theme} />
                    ))}
                </div>
            </div>
        );
    } else if(isLoading) {
        return (
            <div className={`flex justify-center items-center min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="text-center space-y-2">
                    {/* You can use a spinner component or icon here */}
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-800'} animate-spin`}>
                        🔄
                    </div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                        Loading...
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`flex justify-center items-center min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="text-center space-y-2">
                    {/* You can use a relevant icon or illustration here */}
                    <div className={`text-4xl ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                        👁️
                    </div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                        No users in your watch list...
                    </p>
                    {/* Optionally, you can add a button or link for the user to perform an action
                    <button className={`px-4 py-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} onClick={()=>{console.log("test"); navigate("");}}>
                        Add Users
                    </button> */}
                </div>
            </div>
        );
    }
}


export default WatchList;
