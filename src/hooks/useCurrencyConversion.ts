import useSWR from 'swr';

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/GBP';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCurrencyConversion() {
  const { data, error } = useSWR(EXCHANGE_API_URL, fetcher, {
    refreshInterval: 60000 * 60, // Refresh every hour
    revalidateOnFocus: false,
  });

  const convertGBPToUSD = (amount: number): number => {
    if (!data) return amount * 1.27; // Fallback rate
    return amount * data.rates.USD;
  };

  return {
    convertGBPToUSD,
    isLoading: !error && !data,
    isError: error
  };
}