import React from 'react';

const OverviewMetrics = () => {

    const data = {
        totalTradedShares: "1,500,000",
        totalProtocolFees: "120 ETH",
        activeShareSubjects: "350",
        recentTrades: [
          {
            traderAddress: "0x1234aBcD1234aBcD1234aBcD1234aBcD1234aBcD",
            subject: "Apple Inc.",
            status: "Buy",
            shareAmount: "500",
            ethAmount: "5 ETH"
          },
          {
            traderAddress: "0x5678EfGh5678EfGh5678EfGh5678EfGh5678EfGh",
            subject: "Microsoft Corp.",
            status: "Sell",
            shareAmount: "200",
            ethAmount: "2.5 ETH"
          },
          {
            traderAddress: "0x9abcXYZa9abcXYZa9abcXYZa9abcXYZa9abcXYZa",
            subject: "Tesla, Inc.",
            status: "Buy",
            shareAmount: "1,000",
            ethAmount: "10 ETH"
          },
          {
            traderAddress: "0xdef0LmnOdef0LmnOdef0LmnOdef0LmnOdef0LmnO",
            subject: "Amazon Inc.",
            status: "Sell",
            shareAmount: "300",
            ethAmount: "3 ETH"
          },
          {
            traderAddress: "0xghijPQrSghijPQrSghijPQrSghijPQrSghijPQrS",
            subject: "Netflix Inc.",
            status: "Buy",
            shareAmount: "400",
            ethAmount: "4 ETH"
          }
        ]
      };
      


  return (
    <div className="p-4">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-300 to-pink-400 p-4 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-2">Total Traded Shares</h2>
          <p className="text-xl">{data.totalTradedShares}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-2">Protocol Fees Collected</h2>
          <p className="text-xl">{data.totalProtocolFees}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-2">Active Share Subjects</h2>
          <p className="text-xl">{data.activeShareSubjects}</p>
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Trader Address</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Share Amount</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ETH Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.recentTrades.map((trade, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{trade.traderAddress}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{trade.subject}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{trade.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{trade.shareAmount}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{trade.ethAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewMetrics;
