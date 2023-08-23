import axios from 'axios';

import { TickerResponse } from '@/types';

export const findTicker = async (
  data: string
): Promise<TickerResponse | undefined> => {
  try {
    const response = await axios({
      // url: `http://api.marketstack.com/v1/tickers?search=${data}&access_key=6658f5c2f61c27c847e0aa612d7ff3ea&limit=5`,
      // url: `http://api.marketstack.com/v1/tickers?search=${data}&access_key=${process.env.MARKETSTACK_ACCESS_KEY}`,

      url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data}&apikey=TQTA6EKQJEOF3LS9`,
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
