import useBlock from '../hooks/useblock'
import { useParams } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { FaChevronDown, FaChevronRight, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext'; // Assuming you have a similar context
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const BlockDetail = () => {

  const { blockNumber } = useParams()
  const { block  } = useBlock(blockNumber)
  const { theme } = useTheme()
  const [expandedTradeId, setExpandedTradeId] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (tradeId) => {
    setExpandedTradeId(expandedTradeId === tradeId ? null : tradeId);
  };

  const formattedDate = new Date(block.block_timestamp * 1000).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
<div className={`flex flex-col items-center ${theme === 'dark' ? 'bg-dark-primary text-white' : 'bg-light-background text-black'} min-h-screen py-8`}>
  <div className="w-2/3">
    <div className="p-4 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded shadow-xl">
      <h2 className="text-3xl">Block #{block.block_number}</h2>
      <p className="mt-2">{formattedDate}</p>
    </div>
    <div className="space-y-6 mt-6">
      {block.trade_set.map((trade) => (
        <div key={trade.id} className={`border ${trade.is_buy === true ? 'border-green-400' : 'border-red-400'} dark:border-gray-600 rounded-lg p-4 shadow-md`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${trade.is_buy === true? 'text-green-500' : 'text-red-500'}`}>
                {trade.is_buy === true? <FaArrowUp size={16} /> : <FaArrowDown size={16} />}
                <span className="ml-2">{trade.is_buy === true ? "Buy": "Sell"}</span>
              </div>
              <img src={trade.subject.twitter_profile_pic} alt={`${trade.subject.twitter_username}'s profile pic`} className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <p className="text-sm">Subject:</p>
                <p className="font-bold text-lg cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => navigate(`/user/${trade.subject.twitter_username}`)}>
                  @{trade.subject.twitter_username}
                </p>
                <p className="text-sm">Share Amount: {trade.share_amount}</p>
              </div>
            </div>
            <button onClick={() => toggleAccordion(trade.id)} className="text-gray-500 hover:text-black dark:hover:text-white transition">
              {expandedTradeId === trade.id ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
            </button>
          </div>
          {expandedTradeId === trade.id && (
            <div className="mt-2 space-y-4">
              <h3 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Prices:</h3>
              <ul className="list-disc pl-6">
                {trade.prices.map((price, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">Ξ{price.price}</li>
                ))}
              </ul>
              <div className="flex items-center space-x-4">
                <p className="text-sm">Trader:</p>
                <img src={trade.trader.twitter_profile_pic} alt={`${trade.trader.twitter_username}'s profile pic`} className="w-8 h-8 rounded-full" />
                <p className="font-bold text-sm cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => navigate(`/user/${trade.trader.twitter_username}`)}>
                  @{trade.trader.twitter_username}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>



  );
};

export default BlockDetail;
