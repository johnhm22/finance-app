import axios from 'axios';

import { TickerResponse } from '@/types';

export const findTicker = async (
  data: string
): Promise<TickerResponse | undefined> => {
  try {
    const response = await axios({
      url: `http://api.marketstack.com/v1/tickers?search=${data}&access_key={process.env.MARKETSTACK_ACCESS_KEY}&limit=5`,
      // url: `http://api.marketstack.com/v1/tickers?search=${data}&access_key=${process.env.MARKETSTACK_ACCESS_KEY}`,
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
