import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`/api/quick-quote/:id`, ({ request, params, cookies }) => {
    const apiResponse = {
      data: [
        {
          close: 200,
        },
      ],
    };

    return HttpResponse.json({ response: apiResponse });
  }),

  http.get(
    `https://api.marketstack.com/v1/tickers`,
    ({ request, params, cookies }) => {
      const data = [
        {
          name: 'BARCLAYS PLC ORD 25P',
          symbol: 'BARC.XLON',
          stock_exchange: { name: 'London Stock Exchange' },
        },
      ];
      return HttpResponse.json({ data });
    }
  ),
];
