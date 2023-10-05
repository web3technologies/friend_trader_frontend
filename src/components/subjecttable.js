
import React, { useState } from 'react';
import { FaSort, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

import useFriendTechSubjectList from '../hooks/usefriendtechsubjectlist';


function SubjectTable() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { subjects } = useFriendTechSubjectList();
    const [isFavorited, setIsFavorited] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending

    const sortedCoins = [...subjects].sort((a, b) => {
        if (sortField) {
            if (sortOrder) {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        }
        return subjects;
    });

    const toggleFavorite = () => setIsFavorited(prevState => !prevState);

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

    return (
        <div className="mt-5">
            <h2 className={`text-2xl font-bold mb-4 transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 ${theme === 'light' ? 'text-gray-800' : 'text-white'} bg-gradient-to-r ${theme === 'light' ? 'from-blue-400 to-pink-500' : 'from-purple-700 to-indigo-600'}`}>
                Top Subjects Overview!
            </h2>
            <table className={`min-w-full rounded shadow divide-y ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                <thead className={`bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            # <FaSort />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortField === 'name' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('last_trade_time')}>
                            Last Trade {sortField === 'last_trade_time' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            Price {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            24h % {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                            7d % {sortField === 'price' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('shares_supply')}>
                            Share Supply {sortField === 'shares_supply' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('marketCap')}>
                            Market Cap {sortField === 'marketCap' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} divide-y divide-gray-200`}>
                    {subjects.length > 1 ? subjects.map((subject, idx) => (
                        <tr key={subject.twitter_username} className={`${theme === 'light' ? 'hover:bg-gray-200 text-gray-900' : 'hover:bg-gray-800 text-white'} transition-colors duration-200`}>
                            <td className="px-6 py-4 text-left cursor-pointer" onClick={toggleFavorite}>
                                <FaStar style={{ color: isFavorited ? 'gold' : 'transparent', strokeWidth: '5', stroke: 'black' }} />
                            </td>
                            <td className="px-6 py-4 text-left">{idx + 1}</td>
                            <td className="px-6 py-4 cursor-pointer" onClick={() => navigate(`/user/${subject.twitter_username}`)}>
                                <div className="flex items-center">
                                    <img src={subject.twitter_profile_pic} alt={`${subject.twitter_username} logo`} className="h-6 w-6 mr-4" />
                                    {subject.twitter_username}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-left">{new Date(subject.last_trade_time * 1000).toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price)}</td>
                            <td className="px-6 py-4 text-right">
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

                            <td className="px-6 py-4 text-right">
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
                            <td className="px-6 py-4 text-right">{subject.shares_supply}</td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price * subject.shares_supply)}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );
}


export default SubjectTable