
import React from 'react';
import { CoinGeckoDetailData, CoinGeckoMarketData } from '../types';
import { ExternalLinkIcon } from './IconComponents';

interface SecurityPanelProps {
  coinDetail: CoinGeckoDetailData | null;
  marketData: CoinGeckoMarketData | null;
}

const SecurityPanelItem: React.FC<{ label: string; value?: string | number | React.ReactNode; link?: string }> = ({ label, value, link }) => (
  <div className="py-2">
    <dt className="text-sm font-medium text-gray-400">{label}</dt>
    <dd className="mt-1 text-sm text-gray-200">
      {link && typeof value === 'string' ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline">
          {value} <ExternalLinkIcon />
        </a>
      ) : (
        value ?? 'N/A'
      )}
    </dd>
  </div>
);


const SecurityPanel: React.FC<SecurityPanelProps> = ({ coinDetail, marketData }) => {
  if (!coinDetail || !marketData) {
    return <p className="text-gray-400">Loading security details...</p>;
  }

  const getPrimaryLink = (links: string[] | undefined) => links && links.length > 0 ? links[0] : undefined;

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-white mb-3">Security & Info Panel</h4>
      <dl className="divide-y divide-gray-600">
        <SecurityPanelItem label="Market Cap Rank" value={coinDetail.market_cap_rank ? `#${coinDetail.market_cap_rank}` : 'N/A'} />
        <SecurityPanelItem label="Market Cap (USD)" value={marketData.market_cap ? `$${marketData.market_cap.toLocaleString()}` : 'N/A'} />
        <SecurityPanelItem label="CoinGecko Score" value={coinDetail.coingecko_score ? coinDetail.coingecko_score.toFixed(1) : 'N/A'} />
        
        {coinDetail.links?.homepage && getPrimaryLink(coinDetail.links.homepage) && (
            <SecurityPanelItem 
                label="Official Website" 
                value={getPrimaryLink(coinDetail.links.homepage)?.replace(/^https?:\/\//, '')} 
                link={getPrimaryLink(coinDetail.links.homepage)} 
            />
        )}
        {coinDetail.links?.blockchain_site && getPrimaryLink(coinDetail.links.blockchain_site) && (
            <SecurityPanelItem 
                label="Blockchain Explorer" 
                value="View on Explorer" 
                link={getPrimaryLink(coinDetail.links.blockchain_site)}
            />
        )}
        {coinDetail.links?.repos_url?.github && getPrimaryLink(coinDetail.links.repos_url.github) && (
            <SecurityPanelItem 
                label="GitHub Repository" 
                value="View Source Code" 
                link={getPrimaryLink(coinDetail.links.repos_url.github)}
            />
        )}
        <SecurityPanelItem 
            label="Audit Status" 
            value={
                <span className="italic">
                    Check official project resources and community for audit reports. 
                    {getPrimaryLink(coinDetail.links?.official_forum_url) && (
                         <a href={getPrimaryLink(coinDetail.links?.official_forum_url)} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 hover:underline">Forum</a>
                    )}
                </span>
            } 
        />
      </dl>
    </div>
  );
};

export default SecurityPanel;
