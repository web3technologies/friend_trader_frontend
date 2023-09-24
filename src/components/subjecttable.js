
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import useFriendTechSubjectList from '../hooks/usefriendtechsubjectlist';


function SubjectTable() {

    const { subjects } = useFriendTechSubjectList()
    const [isFavorited, setIsFavorited] = useState(false);
    const [sortField, setSortField] = useState(null);

    const sortedCoins = [...subjects].sort((a, b) => {
        if (sortField) {
            return a[sortField] > b[sortField] ? 1 : -1;
        }
        return subjects;
    });
    const toggleFavorite = () => {
        setIsFavorited(prevState => !prevState);
    }
    function formatNumber(num) {
        let rounded = Math.round(num * 10000) / 10000;
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4
        }).format(rounded);
      }

    console.log(subjects)

    return (
        <div className="mt-5">
            <table className="min-w-full bg-white rounded shadow divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('name')}>#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('name')}>Name</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('price')}>Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('price')}>Share Supply</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('marketCap')}>Market Cap</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.length > 1 ? subjects.map((subject, idx) => (
                        <tr key={subject.twitter_username}>
                            <td className="px-6 py-4 text-left cursor-pointer" onClick={toggleFavorite}>
                                <FaStar style={{ color: isFavorited ? 'gold' : 'transparent', strokeWidth: '5', stroke: 'black' }}/>
                            </td>
                            <td className="px-6 py-4 text-left">{idx+1}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <img src={subject.twitter_profile_pic} alt={`${subject.twitter_username} logo`} className="h-6 w-6 mr-4" />
                                    {subject.twitter_username}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price)}</td>
                            <td className="px-6 py-4 text-right">{formatNumber(subject.shares_supply)}</td>
                            <td className="px-6 py-4 text-right">Ξ {formatNumber(subject.latest_price.price * subject.shares_supply)}</td>
                            {/* Add other data fields similarly */}
                        </tr>
                    )):null}
                </tbody>
            </table>
        </div>
    );
}


export default SubjectTable