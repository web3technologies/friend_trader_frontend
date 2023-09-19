import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useTradePolling from '../hooks/usetradepolling'
import { useNavigate } from 'react-router-dom';


function TradeTable() {
    const { data } = useTradePolling();

    const navigate = useNavigate();

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
                        <th className="text-left py-2 px-3">Time</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                        {data.length > 0 ? (
                            data.map(item => (
                                <CSSTransition
                                    key={item.hash}
                                    timeout={500}
                                    classNames="fade"
                                    onEnter={(node) => {
                                        node.style.opacity = "0";
                                        node.style.transitionProperty = "opacity, transform";
                                        node.style.transitionDuration = "2000ms"; // Updated duration
                                        node.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
                                    }}
                                    onEntering={(node) => {
                                        node.style.opacity = "1";
                                        node.style.transform = "scale(1) translateY(0)";
                                    }}
                                >
                                    <tr className="border-b hover:bg-gray-100">
                                        <td className="py-2 px-3 cursor-pointer" onClick={()=> navigate(`/user/${item.trader.twitter_username}`)}>
                                            <div className="flex items-center">
                                                <img src={item.trader.twitter_profile_pic} alt={item.trader.twitter_username} className="w-8 h-8 rounded-full mr-3"/>
                                                @{item.trader.twitter_username}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 cursor-pointer" onClick={()=> navigate(`/user/${item.subject.twitter_username}`)}>
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
                                        <td className="py-2 px-3">{item.block.block_timestamp}</td>
                                    </tr>
                                </CSSTransition>
                            ))
                        ) : null}
                    </TransitionGroup>
            </table>
            </div>
        </div>
    );
}

export default TradeTable
