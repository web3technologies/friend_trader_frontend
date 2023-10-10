
import React, { useState } from 'react';
import { FaSort, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

import useFriendTechSubjectList from '../hooks/usefriendtechsubjectlist';


const Elipsis = () => (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-opacity-50 bg-gray-700 flex justify-center items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
);


function SubjectTable() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { subjects, isLoadingRef, watchFriendTechUser } = useFriendTechSubjectList();
    const [isFavorited, setIsFavorited] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending

    const toggleFavorite = async (friendTechUserId) => {
        console.log(friendTechUserId)
        await watchFriendTechUser(friendTechUserId)
        // setIsFavorited(prevState => !prevState)
    };

    const handleSort = field => {
        if (sortField === field) {
            setSortOrder(!sortOrder);
        } else {
            setSortOrder(true);
        }
        setSortField(field);
    };

    function formatNumber(num) {
        let rounded = Math.round(num * 10000) / 10000;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }).format(rounded);
    }

    function formatPercent(num) {
        let rounded = Math.round(num * 10000) / 10000;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(rounded);
    }

    const headerBaseClasses = "text-2xl font-bold p-4 rounded-lg transition-transform duration-200";
    const headerLightClasses = "text-gray-800 bg-blue-500 hover:bg-blue-600";
    const headerDarkClasses = "text-white bg-indigo-700 hover:bg-indigo-800";

    const headerClasses = theme === 'light' ? `${headerBaseClasses} ${headerLightClasses}` : `${headerBaseClasses} ${headerDarkClasses}`;

    return (
        <div className="mt-5">
            <h2 className={headerClasses}>
                Top Subjects Overview!
            </h2>
            <table className={`min-w-full rounded shadow divide-y ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                <thead className={`bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
                    <tr>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"></th>
                        <th className="px-2 py-2 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            # <FaSort />
                        </th>
                        <th className="px-2 py-2 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortField === 'name' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('last_trade_time')}>
                            Last Trade {sortField === 'last_trade_time' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-2 py-2 sm:px-6 sm:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            Price {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            24h % {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            7d % {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('shares_supply')}>
                            Share Supply {sortField === 'shares_supply' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('marketCap')}>
                            Market Cap {sortField === 'marketCap' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} divide-y divide-gray-200`}>
                    {subjects.length > 1 ? subjects.map((subject, idx) => (
                        <tr key={subject.twitter_username} className={`${theme === 'light' ? 'hover:bg-gray-200 text-gray-900' : 'hover:bg-gray-800 text-white'} transition-colors duration-200`}>
                            <td className="hidden md:table-cell px-6 py-4 text-left cursor-pointer" onClick={()=> toggleFavorite(subject.id)}>
                                <FaStar style={{ color: isFavorited ? 'gold' : 'transparent', strokeWidth: '5', stroke: 'black' }} />
                            </td>
                            <td className="px-2 py-2 sm:px-6 sm:py-4 text-left">{idx + 1}</td>
                            <td className="px-2 py-2 sm:px-6 sm:py-4 cursor-pointer" onClick={() => navigate(`/user/${subject.twitter_username}`)}>
                                <div className="flex items-center">
                                    <img src={subject.twitter_profile_pic} alt={`${subject.twitter_username} logo`} className="h-6 w-6 mr-4" />
                                    {subject.twitter_username}
                                </div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 text-left">{new Date(subject.last_trade_time * 1000).toLocaleString()}</td>
                            <td className="px-2 py-2 sm:px-6 sm:py-4 text-right">Ξ {formatNumber(subject.latest_price.price)}</td>
                            <td className="hidden md:table-cell px-6 py-4 text-right">
                                <div className="flex items-center">
                                    {subject.twenty_four_hour_percent_change > 0 ? 
                                        <FaChevronUp className="text-green-500 mr-1" /> : 
                                        subject.twenty_four_hour_percent_change < 0 ?
                                            <FaChevronDown className="text-red-500 mr-1" /> :
                                            null
                                    }
                                    <span className={
                                        subject.twenty_four_hour_percent_change > 0 ? "text-green-500" :
                                        subject.twenty_four_hour_percent_change < 0 ? "text-red-500" :
                                        "text-gray-500"
                                    }>
                                        {subject.twenty_four_hour_percent_change !== 0 ? 
                                            formatPercent(subject.twenty_four_hour_percent_change) + " %" : 
                                            '—'}
                                    </span>
                                </div>
                            </td>

                            <td className="hidden md:table-cell px-6 py-4 text-right">
                                <div className="flex items-center">
                                    {subject.seven_day_percent_change > 0 ? 
                                        <FaChevronUp className="text-green-500 mr-1" /> : 
                                        subject.seven_day_percent_change < 0 ?
                                            <FaChevronDown className="text-red-500 mr-1" /> :
                                            null
                                    }
                                    <span className={
                                        subject.seven_day_percent_change > 0 ? "text-green-500" :
                                        subject.seven_day_percent_change < 0 ? "text-red-500" :
                                        "text-gray-500"
                                    }>
                                        {subject.seven_day_percent_change !== 0 ? 
                                            formatPercent(subject.seven_day_percent_change) + " %" : 
                                            '—'}
                                    </span>
                                </div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 text-right">{subject.shares_supply}</td>
                            <td className="hidden md:table-cell px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price * subject.shares_supply)}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            {isLoadingRef.current && <Elipsis />}
        </div>
    );
}


export default SubjectTable