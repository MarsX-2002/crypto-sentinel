
import React from 'react';
import { PortfolioItem, CoinGeckoMarketData } from '../types';
import { VOLATILITY_THRESHOLD } from '../constants';
import { TrashIcon, ArrowUpIcon, ArrowDownIcon, ExclamationTriangleIcon, EyeIcon } from './IconComponents';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
  marketData: Record<string, CoinGeckoMarketData>;
  onRemoveCoin: (id: string) => void;
  onSelectCoin: (id: string) => void;
  isLoading: boolean;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ portfolio, marketData, onRemoveCoin, onSelectCoin, isLoading }) => {
  if (isLoading && portfolio.length === 0) {
    return <p className="text-gray-400 text-center py-4">Loading portfolio data...</p>;
  }
  
  if (portfolio.length === 0) {
    return <p className="text-gray-400 text-center py-4">Your portfolio is empty. Add some coins!</p>;
  }

  const totalPortfolioValue = portfolio.reduce((acc, item) => {
    const data = marketData[item.id];
    return acc + (data ? item.quantity * data.current_price : 0);
  }, 0);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-2 sm:p-4">
      <h3 className="text-xl font-semibold text-white mb-4 px-2 sm:px-0">My Portfolio</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Coin</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price (USD)</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value (USD)</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {portfolio.map((item) => {
              const data = marketData[item.id];
              if (!data) {
                return (
                  <tr key={item.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{item.name || item.id}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-400">{item.quantity}</td>
                    <td colSpan={3} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 italic">Loading data...</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => onRemoveCoin(item.id)} className="text-red-500 hover:text-red-400">
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                );
              }

              const value = item.quantity * data.current_price;
              const change24h = data.price_change_percentage_24h;
              const isVolatile = Math.abs(change24h) > VOLATILITY_THRESHOLD;
              const changeColor = change24h >= 0 ? 'text-green-400' : 'text-red-400';
              const alertColor = isVolatile ? 'text-yellow-400' : '';

              return (
                <tr key={item.id} className="hover:bg-gray-750 transition-colors duration-150">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={data.image} alt={data.name} className="w-6 h-6 rounded-full mr-2" />
                      <span className="text-sm font-medium text-gray-200">{data.name} ({data.symbol.toUpperCase()})</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{item.quantity.toLocaleString()}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">${data.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-gray-200">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className={`px-3 py-4 whitespace-nowrap text-sm font-medium ${changeColor} ${alertColor}`}>
                    <div className="flex items-center">
                      {change24h >= 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                      {change24h.toFixed(2)}%
                      {isVolatile && <ExclamationTriangleIcon className="w-4 h-4 ml-1 text-yellow-400" title={`Volatile: ${change24h > 0 ? '+':''}${change24h.toFixed(2)}% change in 24h`} />}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm space-x-2">
                    <button onClick={() => onSelectCoin(item.id)} className="text-blue-400 hover:text-blue-300" title="View Details">
                      <EyeIcon />
                    </button>
                    <button onClick={() => onRemoveCoin(item.id)} className="text-red-500 hover:text-red-400" title="Remove Coin">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 bg-gray-750 rounded-md">
        <h4 className="text-lg font-semibold text-white">Total Portfolio Value: 
          <span className="ml-2 text-green-400">${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </h4>
      </div>
    </div>
  );
};

export default PortfolioTable;
