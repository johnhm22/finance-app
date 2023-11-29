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

  http.get(`/api/portfolio/`, ({ request, params, cookies }) => {
    const stocksHeld = [
      {
        id: '12345',
        symbol: 'LLOY.XLON',
        share_name: 'LLOYDS BANKING GROUP PLC ORD 10P',
        bookCost: 20,
        quantity: 60,
        userId: '678910',
        price: 45,
      },
      {
        id: '54321',
        symbol: 'RYA.XLON',
        share_name: 'RYANAIR HOLDINGS PLC ORD EUR0.006',
        bookCost: 90,
        quantity: 10,
        userId: '678910',
        price: 125.5,
      },
    ];

    const data = { stocksHeld };

    return HttpResponse.json({ stocksHeld });
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
