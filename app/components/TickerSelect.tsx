'use client';

import React from 'react';

import { AddShareForm, TickerData } from '@/types';

interface IProps {
  tickerList: TickerData[];
  openTickerListDropDown: boolean;
  placeholder: string;
  onTickerSelect: (ticker: TickerData) => void;
  setOpenTickerListDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string;
  addShareForm: AddShareForm | undefined;
  tickerData: TickerData | undefined;
  handleTickerSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tickerSearchText: { ticker: string };
}

const TickerSelect: React.FC<IProps> = ({
  tickerList,
  openTickerListDropDown,
  onTickerSelect,
  handleTickerSearchText,
  tickerSearchText,
  tickerData,
}) => {
  const handleSaveTicker = (ticker: TickerData) => {
    onTickerSelect(ticker);
  };

  return (
    <div>
      <div>
        <input
          placeholder='Enter name or ticker symbol'
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
          onChange={handleTickerSearchText}
          value={
            tickerData?.symbol ? tickerData.symbol : tickerSearchText.ticker
          }
          name='ticker'
        />
      </div>
      {openTickerListDropDown ? (
        <ul
          className='z-10 absolute py-2 bg-gray-200 rounded-md overflow-y-auto shadow-xl'
          style={{
            maxHeight: '40%',
          }}
        >
          {tickerList.map((ticker, idx) => {
            return (
              <li
                id={ticker.symbol}
                key={idx}
                className='px-4 py-2 text-gray-700 hover:bg-white cursor-pointer'
                onClick={(e) => handleSaveTicker(ticker)}
              >
                {ticker.name} &nbsp;&nbsp;{ticker.symbol}&nbsp;
                {ticker.stock_exchange.name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TickerSelect;
