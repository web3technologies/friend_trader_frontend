import React from 'react';
import { useTheme } from '../context/ThemeContext';

const OverviewMetrics = () => {
    const { theme } = useTheme();

    // Dummy data
    const data = {
        tradedShares: 15000,
        protocolFees: "5.5 ETH",
        activeShareSubjects: 4,
        recentTrades: [
            { address: "0x1234...abcd", subject: "Bitcoin", status: "buy", shareAmount: 5, ethAmount: "0.5 ETH" },
            { address: "0x5678...efgh", subject: "Ethereum", status: "sell", shareAmount: 3, ethAmount: "1.2 ETH" },
            // ... add more dummy trades as needed
        ]
    };

    return (
        <div className={`p-4 rounded-md shadow-lg bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
            <h2 className={`font-semibold text-xl mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Overview Metrics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                    <strong>Total Number of Traded Shares:</strong> {data.tradedShares}
                </div>
                <div className={`mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                    <strong>Total Protocol Fees Collected:</strong> {data.protocolFees}
                </div>
                <div className={`mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                    <strong>Active Share Subjects:</strong> {data.activeShareSubjects}
                </div>
            </div>

            <h3 className={`font-medium text-lg mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Recent Trades:</h3>
            <ul>
                {data.recentTrades.map((trade, index) => (
                    <li key={index} className={`flex flex-wrap justify-between mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                        <span>Address: {trade.address}</span>
                        <span>Subject: {trade.subject}</span>
                        <span>Status: {trade.status}</span>
                        <span>Shares: {trade.shareAmount}</span>
                        <span>ETH: {trade.ethAmount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OverviewMetrics;
