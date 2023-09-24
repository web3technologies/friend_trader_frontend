
import React, { useState } from 'react';

import useFriendTechSubjectList from '../hooks/usefriendtechsubjectlist';

function SubjectTable() {

    const { subjects } = useFriendTechSubjectList()

    const [sortField, setSortField] = useState(null);

    const sortedCoins = [...subjects].sort((a, b) => {
        if (sortField) {
            return a[sortField] > b[sortField] ? 1 : -1;
        }
        return subjects;
    });

    console.log(subjects)

    return (
        <div className="mt-5">
            <table className="min-w-full bg-white rounded shadow divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('name')}>Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('symbol')}>Symbol</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('price')}>Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortField('marketCap')}>Market Cap</th>
                        {/* Add other headings similarly */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.length > 1 ? subjects.map(subject => (
                        <tr key={subject.twitter_username}>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <img src={subject.twitter_profile_pic} alt={`${subject.twitter_username} logo`} className="h-6 w-6 mr-4" />
                                    {subject.twitter_username}
                                </div>
                            </td>
                            <td className="px-6 py-4">{subject.twitter_username}</td>
                            <td className="px-6 py-4 text-right">Ξ{subject.latest_price.price}</td>
                            {/* <td className="px-6 py-4 text-right">{coin.marketCap}</td> */}
                            {/* Add other data fields similarly */}
                        </tr>
                    )):null}
                </tbody>
            </table>
        </div>
    );
}


export default SubjectTable