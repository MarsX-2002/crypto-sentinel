<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { CoinGeckoDetailData, CoinGeckoMarketData, NewsArticle } from '../types';
import { fetchNewsViaGrpc } from '../services/grpcNewsService'; // Updated import
=======
<<<<<<< HEAD

import React, { useEffect, useState } from 'react';
import { CoinGeckoDetailData, CoinGeckoMarketData, NewsArticle } from '../types';
import { fetchNewsViaGrpc } from '../services/demoRestNewsService'; // Updated import to correct file
=======
import React, { useEffect, useState } from 'react';
import { CoinGeckoDetailData, CoinGeckoMarketData, NewsArticle } from '../types';
import { fetchNewsViaGrpc } from '../services/grpcNewsService'; // Updated import
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
import NewsCard from './NewsCard';
import SecurityPanel from './SecurityPanel';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { VOLATILITY_THRESHOLD } from '../constants';
import { ArrowUpIcon, ArrowDownIcon, ExclamationTriangleIcon } from './IconComponents';


interface CoinDetailViewProps {
  coinId: string;
  marketData: CoinGeckoMarketData | null;
  detailedData: CoinGeckoDetailData | null;
  onClose: () => void;
  isLoadingDetails: boolean;
  detailError: string | null;
}

const CoinDetailView: React.FC<CoinDetailViewProps> = ({ coinId, marketData, detailedData, onClose, isLoadingDetails, detailError }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    if (coinId && detailedData?.name) { 
      const loadNews = async () => {
        setIsLoadingNews(true);
        setNewsError(null);
        setNews([]); 
        try {
          // Use the mocked gRPC news service
          const fetchedNews = await fetchNewsViaGrpc(coinId, detailedData.name);
          setNews(fetchedNews);
        } catch (error) {
          console.error('Error fetching mocked gRPC news in CoinDetailView:', error);
          let newsErrorMessage = 'Failed to load news articles (gRPC Mock Demo).';
          if (error instanceof Error) {
             newsErrorMessage = `Error loading news (gRPC Mock Demo): ${error.message}`;
          }
          setNewsError(newsErrorMessage);
        } finally {
          setIsLoadingNews(false);
        }
      };
      loadNews();
    }
  }, [coinId, detailedData?.name]);

  if (isLoadingDetails) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl w-full h-full sm:h-auto overflow-y-auto z-50">
        <LoadingSpinner text={`Loading details for ${coinId}...`} />
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
      </div>
    );
  }
  
  if (detailError) {
     return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl w-full h-full sm:h-auto overflow-y-auto z-50">
        <ErrorMessage message={detailError} onDismiss={onClose} />
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
      </div>
    );
  }

  if (!marketData || !detailedData) {
    return null; 
  }
  
  const change24h = marketData.price_change_percentage_24h;
  const isVolatile = Math.abs(change24h) > VOLATILITY_THRESHOLD;
  const priceColor = change24h >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-xl fixed inset-0 sm:inset-y-4 sm:right-4 sm:max-w-lg md:max-w-xl w-full sm:w-auto h-full sm:h-auto overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src={detailedData.image?.large || marketData.image} alt={detailedData.name} className="w-10 h-10 rounded-full mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{detailedData.name} ({detailedData.symbol.toUpperCase()})</h2>
        </div>
        <button onClick={onClose} className="text-3xl text-gray-400 hover:text-white">&times;</button>
      </div>

      {/* Price and Volatility */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <p className="text-3xl font-bold text-blue-300 mb-1">
          ${marketData.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
        </p>
        <div className={`flex items-center text-lg font-medium ${priceColor}`}>
          {change24h >= 0 ? <ArrowUpIcon className="w-5 h-5 mr-1" /> : <ArrowDownIcon className="w-5 h-5 mr-1" />}
          {change24h.toFixed(2)}% (24h)
          {isVolatile && <ExclamationTriangleIcon className="w-5 h-5 ml-2 text-yellow-400" title={`Volatile: ${change24h > 0 ? '+':''}${change24h.toFixed(2)}% change`} />}
        </div>
        {isVolatile && (
          <p className="text-sm text-yellow-400 mt-1">
            This coin has shown significant price movement (±{VOLATILITY_THRESHOLD}%) in the last 24 hours.
          </p>
        )}
      </div>
      
      {/* Description (shortened) */}
      {detailedData.description?.en && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-2">About {detailedData.name}</h4>
            <p className="text-sm text-gray-300 line-clamp-4">
                {detailedData.description.en.replace(/<[^>]+>/g, '')} {/* Basic HTML tag removal */}
            </p>
        </div>
      )}


      {/* Security Panel */}
      <div className="mb-6">
        <SecurityPanel coinDetail={detailedData} marketData={marketData} />
      </div>

      {/* News Feed (now using Mocked gRPC Demo) */}
      <div>
<<<<<<< HEAD
        <h3 className="text-xl font-semibold text-white mb-4">Recent News (Mocked gRPC)</h3>
        {isLoadingNews && <LoadingSpinner text="Loading news (gRPC Mock)..." />}
        {newsError && <ErrorMessage message={newsError} onDismiss={() => setNewsError(null)} />}
        {!isLoadingNews && !newsError && news.length === 0 && <p className="text-gray-400">No recent news found (gRPC Mock).</p>}
=======
<<<<<<< HEAD
        <h3 className="text-xl font-semibold text-white mb-4">Recent News (gRPC Mock Demo)</h3>
        {isLoadingNews && <LoadingSpinner text="Loading news (gRPC Mock Demo)..." />}
        {newsError && <ErrorMessage message={newsError} onDismiss={() => setNewsError(null)} />}
        {!isLoadingNews && !newsError && news.length === 0 && <p className="text-gray-400">No recent news found (gRPC Mock Demo).</p>}
=======
        <h3 className="text-xl font-semibold text-white mb-4">Recent News (Mocked gRPC)</h3>
        {isLoadingNews && <LoadingSpinner text="Loading news (gRPC Mock)..." />}
        {newsError && <ErrorMessage message={newsError} onDismiss={() => setNewsError(null)} />}
        {!isLoadingNews && !newsError && news.length === 0 && <p className="text-gray-400">No recent news found (gRPC Mock).</p>}
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
        <div className="space-y-4">
          {news.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CoinDetailView;
=======
<<<<<<< HEAD
export default CoinDetailView;
=======
export default CoinDetailView;
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
