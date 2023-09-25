export interface IFilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export type GenericErrorsType<
  K extends string | number | symbol | keyof Object
> = {
  [k in K]?: string;
};

export type ShareEditForm = {
  bookCost: number;
  quantity: number;
  ticker: TickerSearchData;
};

export type Payload = {
  exp: number;
  firstName: string;
  iat: number;
  id: string;
  lastName: string;
  role: string;
  username: string;
};

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  firstName: string;
  lastName: string;
}

export interface AddShareForm {
  bookCost: number;
  quantity: number;
  userId: string;
  ticker: TickerSearchData;
}

export type TickerSearchData = {
  country?: string;
  has_eod: boolean;
  has_intraday: boolean;
  share_name: string;
  symbol: string;
  stock_exchange: {
    exchange_acronym: string;
    exchange_city: string;
    exchange_country: string;
    country_code: string;
    mic: string;
    exchange_name: string;
    website: string;
  };
};

export type TickerResponse = {
  data: TickerSearchData[];
  pagination: {
    count: number;
    limit: number;
    offset: number;
    total: number;
  };
};

export type Quote = {
  longName: string;
  market: string;
  region: string;
  shortName: string;
  symbol: string;
  regularMarketPrice: number;
  exchange: string;
  ask: number;
  bid: string;
};

export type QuoteResponse = {
  data: {
    quoteResponse: {
      result: Quote[];
    };
  };
  status: number;
  statusText: string;
};

export interface IShareDataToEdit {
  symbol: string;
  bookCost: number;
  quantity: number;
}
