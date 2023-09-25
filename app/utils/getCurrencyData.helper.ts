import axios, { AxiosResponse } from 'axios';

type CurrencyData = {
  result: string;
  conversion_rates: {
    USD: number;
    GBP: number;
    EUR: number;
  };
};

export const getCurrencyData = async () => {
  try {
    const result: AxiosResponse<CurrencyData>[] = await Promise.all([
      axios({
        method: 'GET',
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`,
      }),
      axios({
        method: 'GET',
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/GBP`,
      }),
    ]);
    const data = result.map((res) => res.data.conversion_rates);
    return data;
  } catch (error: any) {
    return error;
  }
};
