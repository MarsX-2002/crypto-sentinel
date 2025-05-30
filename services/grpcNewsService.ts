import { NewsArticle } from '../types';

// MOCKED_NEWS_DATA for the gRPC conceptual demo
const MOCKED_NEWS_DATA: NewsArticle[] = [
  {
    id: 'grpc-mock-1',
    headline: 'gRPC Mock: Project Titan Launch Successful',
    source: 'gRPC Demo News',
    link: '#',
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    coinId: 'all',
  },
  {
    id: 'grpc-mock-2',
    headline: 'gRPC Insights: The Future of Microservices',
    source: 'gRPC Demo News',
    link: '#',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    coinId: 'all',
  },
  {
    id: 'grpc-mock-3',
    headline: 'Understanding Protocol Buffers in gRPC',
    source: 'Tech Talks (gRPC Mock)',
    link: '#',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    coinId: 'all',
  },
];

/**
 * Simulates fetching "news" articles via a conceptual gRPC call.
 * This is a mock implementation and does not make actual network requests.
 *
 * @param coinId - The ID of the coin (used to slightly customize mock data if needed).
 * @param coinName - The name of the coin (used to slightly customize mock data if needed).
 * @returns A Promise that resolves to an array of NewsArticle objects.
 */
export const fetchNewsViaGrpc = async (coinId?: string, coinName?: string): Promise<NewsArticle[]> => {
  console.log(`Simulating gRPC news fetch for coin: ${coinName || coinId || 'general'}...`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // You could customize the mocked data based on coinId/coinName if desired
  // For this demo, we'll return the same generic mocked news.
  return MOCKED_NEWS_DATA.map(article => ({
    ...article,
    // Example of minor customization if coinName is available:
    // headline: coinName ? `${coinName}: ${article.headline}` : article.headline, 
    coinId: coinId || 'all',
  }));
};