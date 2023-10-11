'use server';

import axios from 'axios';

export const findTicker = async (data: string) => {
  try {
    const response = await axios({
      url: `http://api.marketstack.com/v1/tickers?search=${data}&exchange=XLON&access_key=${process.env.MARKETSTACK_ACCESS_KEY}&limit=5`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.log('ERROR: ', error);
  }
};
