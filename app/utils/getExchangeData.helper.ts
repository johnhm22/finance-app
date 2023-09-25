import axios from 'axios';

type ExchangeData = {
  data: [
    {
      close: number;
      date: string;
      symbol: string;
      exchange: string;
      open: number;
    }
  ];
};

export const getExchangeData = async (): Promise<ExchangeData[]> => {
  try {
    const result = await Promise.all([
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=FTSE.INDX&limit=1`,
      }),
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=IXIC.INDX&limit=1`,
      }),
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=DJI.INDX&limit=1`,
      }),
    ]);

    const data = result.map((res) => res.data);
    const resolvedData = data.flat();
    return resolvedData;
  } catch (error: any) {
    return error;
  }
};
