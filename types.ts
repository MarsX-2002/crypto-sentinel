
export interface PortfolioItem {
  id: string; // CoinGecko coin ID (e.g., "bitcoin")
  name: string; // Full name (e.g. "Bitcoin") fetched after adding
  symbol: string; // Symbol (e.g. "btc") fetched after adding
  quantity: number;
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  // Add other relevant fields if needed
}

export interface CoinGeckoDetailData {
  id: string;
  symbol: string;
  name: string;
  description?: { en: string };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    official_forum_url?: string[];
    repos_url?: { github?: string[] };
  };
  image?: { large: string };
  coingecko_score?: number;
  market_cap_rank?: number;
  // Add other relevant fields if needed
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  link: string;
  date: string;
  coinId: string; // To associate news with a coin
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // other types of chunks if needed
}

export interface NotificationAction {
  label: string;
  onAction: () => void;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
  isRead: boolean;
  relatedCoinId?: string;
  action?: NotificationAction;
}
