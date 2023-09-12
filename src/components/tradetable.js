import usePolling from '../hooks/usepolling'

function TradeTable() {
    const { data } = usePolling();

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-2/3 xl:w-1/2">
            <div className="bg-gray-800 text-white p-4">
                <h3 className="text-lg font-semibold">Recent Trades</h3>
            </div>
            <div className="max-h-600 overflow-y-auto"> 
            <table className="min-w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left py-2 px-3">Trader</th>
                        <th className="text-left py-2 px-3">Subject</th>
                        <th className="text-left py-2 px-3">Action</th>
                        <th className="text-left py-2 px-3">Price</th>
                        <th className="text-left py-2 px-3">Block</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map(item => (
                        <tr key={item.hash} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-3">
                                <div className="flex items-center">
                                    <img src={item.trader.twitter_profile_pic} alt={item.trader.twitter_username} className="w-8 h-8 rounded-full mr-3"/>
                                    @{item.trader.twitter_username}
                                </div>
                            </td>
                            <td className="py-2 px-3">
                                <div className="flex items-center">
                                    <img src={item.subject.twitter_profile_pic} alt={item.subject.twitter_username} className="w-8 h-8 rounded-full mr-3"/>
                                    @{item.subject.twitter_username}
                                </div>
                            </td>
                            <td className={`py-2 px-3 ${item.is_buy ? 'text-green-500' : 'text-red-500'}`}>
                                {item.is_buy ? 'Bought' : 'Sold'}
                            </td>
                            <td className="py-2 px-3">Ξ{parseFloat(item.price).toFixed(2)}</td>
                            <td className="py-2 px-3">{item.block}</td>
                        </tr>
                    )) : <tr><td colSpan="5" className="text-center py-2 px-3 text-gray-500">No trades available.</td></tr>}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default TradeTable
