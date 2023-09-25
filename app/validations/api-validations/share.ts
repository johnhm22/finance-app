export const validateAddShare = (
  symbol: string,
  share_name: string,
  bookCost: number,
  quantity: number,
  exchange_acronym: string,
  exchange_city: string,
  exchange_country: string,
  exchange_name: string
) => {
  const errors: any = {};

  if (typeof symbol !== 'string' || symbol === undefined) {
    errors.bookCost = 'Please enter a valid ticker symbol';
  }

  if (typeof bookCost !== 'number' || bookCost === undefined) {
    errors.bookCost = 'Please enter a valid bookcost';
  }

  if (typeof quantity !== 'number' || quantity === undefined) {
    errors.quantity = 'Please enter a valid quantity';
  }

  if (typeof share_name !== 'string' || share_name === undefined) {
    errors.share_name = 'Please enter a valid name for the share name';
  }

  if (typeof exchange_acronym !== 'string' || exchange_acronym === undefined) {
    errors.exchange_acronym = 'Please enter a valid exchange acronym';
  }

  if (typeof exchange_city !== 'string' || exchange_city === undefined) {
    errors.exchange_city = 'Please enter a valid exchange city';
  }
  if (typeof exchange_country !== 'string' || exchange_country === undefined) {
    errors.exchange_country = 'Please enter a valid exchange country';
  }
  if (typeof exchange_name !== 'string' || exchange_name === undefined) {
    errors.exchange_name = 'Please enter a valid exchange name';
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
};

export const validateDeleteShare = (id: string) => {
  const errors: any = {};

  if (typeof id !== 'string' || id === undefined) {
    errors.bookCost = 'Please enter a valid share id';
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
};
