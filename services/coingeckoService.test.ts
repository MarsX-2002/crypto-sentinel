import { fetchCoinDetailData } from './coingeckoService';

jest.mock('./coingeckoService');

describe('fetchCoinDetailData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch coin detail data with valid ID', async () => {
    const coinId = 'bitcoin';
    const mockData = {
      id: coinId,
      name: 'Bitcoin',
      market_data: {},
    };
    (fetchCoinDetailData as jest.Mock).mockResolvedValue(mockData);
    const data = await fetchCoinDetailData(coinId);
    expect(data).toHaveProperty('id', coinId);
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('market_data');
  });

  it('should handle invalid ID and return error', async () => {
    const coinId = 'invalid-id';
    (fetchCoinDetailData as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));
    await expect(fetchCoinDetailData(coinId)).rejects.toThrowError();
  });
});