
import { COINGECKO_API_BASE_URL } from '../constants';
import { CoinGeckoMarketData, CoinGeckoDetailData } from '../types';

<<<<<<< HEAD
const MAX_RETRIES = 3; // Number of retries after the initial attempt
const INITIAL_RETRY_DELAY_MS = 1000; // Base delay for exponential backoff
const RATE_LIMIT_RETRY_DELAY_MS = 10000; // Fallback delay for 429 if no Retry-After header (10 seconds)
=======
<<<<<<< HEAD
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
>>>>>>> cdcf72b (add wireframe)

async function fetchWithRetry<T>(url: string, retriesLeft = MAX_RETRIES, currentAttempt = 1): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429 && retriesLeft > 0) { // Rate limit
        const retryAfterHeader = response.headers.get('Retry-After');
        let delay = RATE_LIMIT_RETRY_DELAY_MS;
        if (retryAfterHeader) {
          const retryAfterSeconds = parseInt(retryAfterHeader, 10);
          // Use header value if it's a valid number of seconds
          if (!isNaN(retryAfterSeconds) && retryAfterSeconds > 0) {
            delay = retryAfterSeconds * 1000;
          }
        }
        console.warn(`Rate limited (429) for ${url}. Retrying in ${delay / 1000}s... (attempt ${currentAttempt + 1} of ${MAX_RETRIES + 1}, ${retriesLeft} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, retriesLeft - 1, currentAttempt + 1);
      }
      // For other HTTP errors
      throw new Error(`HTTP error ${response.status}: ${response.statusText} for URL: ${url}`);
    }
    return response.json() as Promise<T>;
  } catch (error: any) { 
    // Log detailed error information for the current attempt
    console.error(
      `Fetch attempt ${currentAttempt} of ${MAX_RETRIES + 1} failed for URL: ${url}. ` +
      `Type: ${error?.constructor?.name}. Message: ${error?.message}. Retries left: ${retriesLeft}.`
    );

    if (retriesLeft > 0) {
      let shouldRetry = true;
<<<<<<< HEAD
      // Check if it's a non-retriable HTTP error (other than 429, which is handled above)
=======
=======
const MAX_RETRIES = 3; // Number of retries after the initial attempt
const INITIAL_RETRY_DELAY_MS = 1000; // Base delay for exponential backoff
const RATE_LIMIT_RETRY_DELAY_MS = 10000; // Fallback delay for 429 if no Retry-After header (10 seconds)

async function fetchWithRetry<T>(url: string, retriesLeft = MAX_RETRIES, currentAttempt = 1): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429 && retriesLeft > 0) { // Rate limit
        const retryAfterHeader = response.headers.get('Retry-After');
        let delay = RATE_LIMIT_RETRY_DELAY_MS;
        if (retryAfterHeader) {
          const retryAfterSeconds = parseInt(retryAfterHeader, 10);
          // Use header value if it's a valid number of seconds
          if (!isNaN(retryAfterSeconds) && retryAfterSeconds > 0) {
            delay = retryAfterSeconds * 1000;
          }
        }
        console.warn(`Rate limited (429) for ${url}. Retrying in ${delay / 1000}s... (attempt ${currentAttempt + 1} of ${MAX_RETRIES + 1}, ${retriesLeft} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, retriesLeft - 1, currentAttempt + 1);
      }
      // For other HTTP errors
      throw new Error(`HTTP error ${response.status}: ${response.statusText} for URL: ${url}`);
    }
    return response.json() as Promise<T>;
  } catch (error: any) { 
    // Log detailed error information for the current attempt
    console.error(
      `Fetch attempt ${currentAttempt} of ${MAX_RETRIES + 1} failed for URL: ${url}. ` +
      `Type: ${error?.constructor?.name}. Message: ${error?.message}. Retries left: ${retriesLeft}.`
    );

    if (retriesLeft > 0) {
      let shouldRetry = true;
      // Check if it's a non-retriable HTTP error (other than 429, which is handled above)
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      if (error instanceof Error && error.message.startsWith('HTTP error')) {
        const statusCodeMatch = error.message.match(/HTTP error (\d+):/);
        if (statusCodeMatch) {
          const statusCode = parseInt(statusCodeMatch[1], 10);
<<<<<<< HEAD
=======
<<<<<<< HEAD
          // Don't retry client errors (400-499) other than 429 (rate limit, handled in try)
          // or 408 (Request Timeout), though CoinGecko might not use 408 often.
          if (statusCode >= 400 && statusCode < 500 && statusCode !== 429 && statusCode !== 408) {
=======
>>>>>>> cdcf72b (add wireframe)
          // Don't retry most 4xx client errors. 408 (Request Timeout) could be retried.
          // Explicitly non-retriable: 401 (Unauthorized), 403 (Forbidden).
          if ((statusCode >= 400 && statusCode < 500 && statusCode !== 429 && statusCode !== 408) ||
              statusCode === 401 || statusCode === 403) {
<<<<<<< HEAD
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
            shouldRetry = false;
          }
        }
      }
<<<<<<< HEAD
      // Note: "Failed to fetch" (TypeError) will result in shouldRetry = true.
      
      if (shouldRetry) {
=======
<<<<<<< HEAD
      // Note: "Failed to fetch" is typically a TypeError and will pass the `shouldRetry = true` condition.
      
      if (shouldRetry) {
        console.warn(`Retrying fetch for ${url} in ${RETRY_DELAY_MS / 1000}s... (${retries} retries left). Error type: ${error?.constructor?.name}, message: ${error?.message}`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchWithRetry(url, retries - 1);
=======
      // Note: "Failed to fetch" (TypeError) will result in shouldRetry = true.
      
      if (shouldRetry) {
>>>>>>> cdcf72b (add wireframe)
        // Calculate delay using exponential backoff for general retries
        // Number of retries already performed = MAX_RETRIES - retriesLeft
        const backoffFactor = Math.pow(2, MAX_RETRIES - retriesLeft);
        const delay = INITIAL_RETRY_DELAY_MS * backoffFactor;
        
        console.warn(`Retrying fetch for ${url} in ${delay / 1000}s... (attempt ${currentAttempt + 1} of ${MAX_RETRIES + 1}, ${retriesLeft} retries left). Error type: ${error?.constructor?.name}, message: ${error?.message}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, retriesLeft - 1, currentAttempt + 1);
<<<<<<< HEAD
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      } else {
        console.warn(`Not retrying for ${url} due to non-retriable error: ${error.message}`);
      }
    }

    // If retries exhausted or error is non-retriable
<<<<<<< HEAD
    const finalErrorMessage = `Failed to fetch data from ${url} after ${currentAttempt} attempt(s). Last error: ${error?.message || 'Unknown fetch error'}`;
    console.error("fetchWithRetry (final error): " + finalErrorMessage, "Original error object:", error);
=======
<<<<<<< HEAD
    const finalErrorMessage = `Failed to fetch data from ${url} after ${MAX_RETRIES - retries +1} attempt(s). Last error: ${error?.message || 'Unknown fetch error'}`;
    console.error("fetchWithRetry: " + finalErrorMessage, "Original error object:", error);
=======
    const finalErrorMessage = `Failed to fetch data from ${url} after ${currentAttempt} attempt(s). Last error: ${error?.message || 'Unknown fetch error'}`;
    console.error("fetchWithRetry (final error): " + finalErrorMessage, "Original error object:", error);
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    throw new Error(finalErrorMessage); // Throw a new error with a comprehensive message
  }
}


export const fetchCoinsMarketData = async (coinIds: string[]): Promise<CoinGeckoMarketData[]> => {
  if (coinIds.length === 0) return [];
  const idsParam = coinIds.join(',');
  const url = `${COINGECKO_API_BASE_URL}/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=${coinIds.length}&page=1&sparkline=false&price_change_percentage=24h`;
  try {
    const data = await fetchWithRetry<CoinGeckoMarketData[]>(url);
    return data;
  } catch (error) {
    // The 'error' here will now be the more informative Error object from fetchWithRetry
    console.error(`Error fetching coins market data (IDs: ${idsParam || 'none'}): ${error instanceof Error ? error.message : String(error)}`);
    throw error; // Re-throw the enhanced error to be handled by the caller
  }
};

export const fetchCoinDetailData = async (coinId: string): Promise<CoinGeckoDetailData> => {
  const url = `${COINGECKO_API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
  try {
    const data = await fetchWithRetry<CoinGeckoDetailData>(url);
    return data;
  } catch (error) {
    console.error(`Error fetching detail data for ${coinId}: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
