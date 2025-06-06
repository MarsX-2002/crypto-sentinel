import { NewsArticle } from '../types';

<<<<<<< HEAD
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
    id: 'grpc-mock-3',
    headline: 'Understanding Protocol Buffers in gRPC',
    source: 'Tech Talks (gRPC Mock)',
    link: '#',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
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
  
];
=======
<<<<<<< HEAD
// Example: Fetching posts from JSONPlaceholder and mapping them to NewsArticle
// This service demonstrates a practical REST API call for the "news" section.

interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
>>>>>>> cdcf72b (add wireframe)

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

<<<<<<< HEAD
=======
    // Map JSONPlaceholder posts to NewsArticle[]
    return posts.map(post => ({
      id: `jsonplaceholder-${post.id}`,
      headline: post.title,
      source: 'JSONPlaceholder (REST Demo)',
      link: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      date: new Date().toISOString(), // Mock date, as posts don't have one
      coinId: 'all', // Generic
    }));

  } catch (error) {
    console.error('Error fetching from JSONPlaceholder:', error);
    if (error instanceof Error) {
      throw new Error(`Could not load demo news from JSONPlaceholder: ${error.message}`);
    }
    throw new Error('Could not load demo news from JSONPlaceholder: Unknown error');
  }
};
=======
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

>>>>>>> cdcf72b (add wireframe)
  // You could customize the mocked data based on coinId/coinName if desired
  // For this demo, we'll return the same generic mocked news.
  return MOCKED_NEWS_DATA.map(article => ({
    ...article,
    // Example of minor customization if coinName is available:
    // headline: coinName ? `${coinName}: ${article.headline}` : article.headline, 
    coinId: coinId || 'all',
  }));
<<<<<<< HEAD
};
=======
};
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
