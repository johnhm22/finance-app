'use client';

import React, { useMemo, useState } from 'react';
import TickerSelect from './TickerSelect';
import { AddShareForm, TickerData } from '@/types';
import debounce from 'debounce-promise';
import { findTicker } from '../utils/ticker.search.helper';
import { getQuickQuotes } from '../utils/getQuickQuote';

const QuickQuote = () => {
  const [openTickerListDropDown, setOpenTickerListDropDown] =
    useState<boolean>(false);

  const [tickerList, setTickerList] = useState<TickerData[]>([]);

  const [tickerSearchText, setTickerSearchText] = useState<{ ticker: string }>({
    ticker: '',
  });

  const initialState = {
    country: '',
    has_eod: false,
    has_intraday: false,
    name: '',
    symbol: '',
    stock_exchange: {
      acronym: '',
      city: '',
      country: '',
      country_code: '',
      mic: '',
      name: '',
      website: '',
    },
  };

  const addShareFormInitialState = {
    bookCost: 0,
    quantity: 0,
    ticker: initialState,
  };

  const [addShareForm, setAddShareForm] = useState<AddShareForm>();

  const [tickerData, setTickerData] = useState<TickerData>(initialState);

  const [price, setPrice] = useState<number | undefined>();

  const saveSelectedTickerInForm = (ticker: TickerData) => {
    setAddShareForm(addShareFormInitialState);
  };

  const populatePrice = async (ticker: string) => {
    const closePrice = await getQuickQuotes(ticker);
    setPrice(closePrice.response.data[0].close);
  };

  const onTickerSelect = (ticker: TickerData) => {
    //  e.preventDefault();
    setTickerData(ticker);
    saveSelectedTickerInForm(ticker);
    //call quote function and populate state with price
    populatePrice(ticker.symbol);

    setOpenTickerListDropDown(false);
  };

  const handleOnClear = () => {
    // onSubmit(addShareForm!, payloadData.id);
    setTickerData(initialState);
    setAddShareForm(addShareFormInitialState);
    setPrice(undefined);
    setTickerSearchText({ ticker: '' });
  };

  const tickerSearch = async (data: string) => {
    const response = await findTicker(data);
    return response;
  };

  const handleTickerSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTickerSearchText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    debouncedTickerSearch(tickerSearchText);
  };

  const debouncedTickerSearch = useMemo(
    () =>
      debounce(async (tickerSearchText: { ticker: string }) => {
        const response = await tickerSearch(tickerSearchText.ticker);
        if (response!.data) {
          setOpenTickerListDropDown(true);
          setTickerList(response!.data);
        }
      }, 300),
    []
  );

  return (
    <div className='flex flex-col absolute bg-white border shadow-md mt-20 w-3/5 md:w-1/3 h-4/5 md:h-2/3 px-5 pt-12'>
      <form>
        <div className='p-5 '>
          <div className='items-center self-start'>
            <h2 className='inline-block text-sm md:text-xl text-nitro-space font-source font-bold'>
              Get a quick quote
            </h2>
          </div>
          <div className='self-center'>
            <label
              htmlFor='ticker'
              className='flex mt-5 text-xs capitalize mb-1 font-source'
            >
              Enter stock
            </label>
            <TickerSelect
              tickerList={tickerList}
              openTickerListDropDown={openTickerListDropDown}
              placeholder='Enter name or ticker symbol'
              handleTickerSearchText={handleTickerSearchText}
              onTickerSelect={onTickerSelect}
              setOpenTickerListDropDown={setOpenTickerListDropDown}
              addShareForm={addShareForm}
              tickerData={tickerData}
              tickerSearchText={tickerSearchText}
            />
          </div>
        </div>
      </form>
      <div className={`items-center self-start`}></div>
      <div className='self-center'>
        <label
          htmlFor='price'
          className='flex mt-5 text-xs capitalize mb-1 font-source'
        >
          Price
        </label>
        <input
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
          id='price'
          name='price'
          type='text'
          value={price}
        />
      </div>
      <div>
        <button
          onClick={handleOnClear}
          className='flex bg-blue-700  mt-8 md:mt-14 justify-center items-center rounded-full h-3 md:h-12 w-full p-5 hover:bg-blue-800 text-base  md:text-xl text-white'
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default QuickQuote;
