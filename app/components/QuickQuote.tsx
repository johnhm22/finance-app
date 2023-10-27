'use client';

import React, { useMemo, useRef, useState } from 'react';

import TickerSelect from './TickerSelect';
import { TickerData } from '@/types';
import debounce from 'debounce-promise';
import { getQuickQuotes } from '../utils/getQuickQuote';
import { CloseOnOutsideClick } from '../utils/closeOnOutsideClick';
import Link from 'next/link';
import Card from './Card';
import { findTickerQuickQuote } from '../utils/ticker.search.quick-quote.helper';

const QuickQuote = () => {
  const [openTickerListDropDown, setOpenTickerListDropDown] =
    useState<boolean>(false);

  const [tickerList, setTickerList] = useState<TickerData[]>([]);

  const [tickerSearchText, setTickerSearchText] = useState<{ ticker: string }>({
    ticker: '',
  });

  const getQuoteComponentRef = useRef(null);

  const handleCloseTickerList = () => {
    setOpenTickerListDropDown(false);
  };

  CloseOnOutsideClick(getQuoteComponentRef, handleCloseTickerList);

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

  const [tickerData, setTickerData] = useState<TickerData>(initialState);

  const [price, setPrice] = useState<number | string>('');

  const populatePrice = async (ticker: string) => {
    const closePrice = await getQuickQuotes(ticker);
    setPrice(closePrice.response.data[0].close);
  };

  const onTickerSelect = (ticker: TickerData) => {
    setTickerData(ticker);
    populatePrice(ticker.symbol);
    setOpenTickerListDropDown(false);
  };

  const handleOnClear = () => {
    setTickerData(initialState);
    setPrice('');
    setTickerSearchText({ ticker: '' });
  };

  const tickerSearch = async (data: string) => {
    const response = await findTickerQuickQuote(data);
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
          setTickerList(response!.data);
          setOpenTickerListDropDown(true);
        }
      }, 300),
    []
  );

  return (
    <Card>
      {
        <form className='flex flex-col mt-10 bg-white justify-center items-center w-full'>
          <div className='px-5 pt-5'>
            <div className='items-center self-start'>
              <h2 className='inline-block text-sm md:text-xl font-source font-bold'>
                Get a quick quote
              </h2>
            </div>
            <div ref={getQuoteComponentRef} className='self-center'>
              <label
                htmlFor='ticker'
                className='flex mt-5 text-xs capitalize mb-1 font-source'
              >
                Enter stock
              </label>
              <TickerSelect
                tickerList={tickerList}
                openTickerListDropDown={openTickerListDropDown}
                placeholder='Enter name or symbol'
                handleTickerSearchText={handleTickerSearchText}
                onTickerSelect={onTickerSelect}
                setOpenTickerListDropDown={setOpenTickerListDropDown}
                tickerData={tickerData}
                tickerSearchText={tickerSearchText}
              />
            </div>
            <div className='flex flex-col mt-8 gap-2'>
              <p className='text-xs'>Price: </p>
              <div className='flex h-8 justify-center py-1 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-20 rounded-md sm:text-sm focus:ring-1'>
                <span>{price ? price : ''}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-row w-full justify-around mt-8'>
            <Link
              href='/'
              className='flex bg-green-500 ml-2 justify-center items-center rounded-full h-3 md:h-12 w-20 p-5 hover:bg-green-600 text-xs md:text-lg text-white'
            >
              Back
            </Link>

            <button
              onClick={handleOnClear}
              className='flex bg-blue-700 mr-2 justify-center items-center rounded-full h-3 md:h-12 w-20 p-5 hover:bg-blue-800 text-xs md:text-xl text-white'
            >
              Reset
            </button>
          </div>
        </form>
      }
    </Card>
  );
};

export default QuickQuote;
