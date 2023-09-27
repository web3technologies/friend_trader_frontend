
import React, { useState } from 'react';
import { FaSort, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useFriendTechSubjectList from '../hooks/usefriendtechsubjectlist';


function SubjectTable() {

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

    return (
        <div className="mt-5">
            <h2 className="text-2xl font-bold mb-4">Top Subjects Overview!</h2>
            <table className="min-w-full bg-white rounded shadow divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('shares_supply')}>
                            Share Supply {sortField === 'shares_supply' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('marketCap')}>
                            Market Cap {sortField === 'marketCap' && (sortOrder ? <FaChevronUp /> : <FaChevronDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.length > 1 ? subjects.map((subject, idx) => (
                        <tr key={subject.twitter_username} className="hover:bg-gray-100 transition-colors duration-200">
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
                            <td className="px-6 py-4 text-left">Ξ {formatNumber(subject.last_trade_time)}</td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price)}</td>
                            <td className="px-6 py-4 text-right">{formatNumber(subject.shares_supply)}</td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price * subject.shares_supply)}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );
}


export default SubjectTable