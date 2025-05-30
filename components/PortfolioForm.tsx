
import React, { useState } from 'react';
import { PlusCircleIcon } from './IconComponents';

interface PortfolioFormProps {
  onAddCoin: (id: string, quantity: number) => void;
  isLoading: boolean;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ onAddCoin, isLoading }) => {
  const [coinId, setCoinId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const trimmedCoinId = coinId.trim().toLowerCase();
    const numQuantity = parseFloat(quantity);

    if (trimmedCoinId && !isNaN(numQuantity) && numQuantity > 0) {
      onAddCoin(trimmedCoinId, numQuantity);
      setCoinId('');
      setQuantity('');
    } else {
      let errorParts = [];
      if (!trimmedCoinId) errorParts.push("CoinGecko ID is required.");
      if (isNaN(numQuantity) || numQuantity <= 0) errorParts.push("a valid positive quantity is required.");
      setFormError(`Please enter a valid CoinGecko ID (e.g., bitcoin, the-open-network) and ${errorParts.join(' and ')}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Add Coin to Portfolio</h3>
      {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
      <div className="space-y-4">
        <div>
          <label htmlFor="coinId" className="block text-sm font-medium text-gray-300 mb-1">
            CoinGecko ID (e.g., bitcoin, ethereum, the-open-network)
          </label>
          <input
            type="text"
            id="coinId"
            value={coinId}
            onChange={(e) => setCoinId(e.target.value)}
            placeholder="Enter CoinGecko ID (not symbol)"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="coinId-description"
            required
          />
          <p id="coinId-description" className="mt-1 text-xs text-gray-400">
            Find the official ID on CoinGecko's website (usually in the URL or API docs for the coin). For example, for Toncoin, use "the-open-network".
          </p>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 1.5"
            min="0.00000001" // Smallest practical unit for many cryptos
            step="any" // Allow decimals
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Adding...' : 'Add Coin'}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
