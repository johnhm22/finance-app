export interface IFilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export interface IShareUpdateForm {
  bookCost: number;
  quantity: number;
}

export interface IAddShareForm {
  bookCost: number;
  quantity: number;
  ticker: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  firstName: string;
  lastName: string;
}

export type TickerSearchData = {
  name: string;
  symbol: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

export type TickerResponse = {
  bestMatches: TickerSearchData[];
};
