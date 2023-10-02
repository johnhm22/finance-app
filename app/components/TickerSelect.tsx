'use client';

import React, {useState} from 'react';


import { AddShareForm, TickerData, TickerResponse, TickerSearchData } from '@/types';
import { fakeTickerData } from '@/app/utils/fakeTickerData';
import { isObject } from 'lodash';

interface IProps {
  tickerList: TickerData[];
  openTickerListDropDown: boolean;
  placeholder: string;
  onTickerSelect: (ticker: TickerData) => void;
  setOpenTickerListDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string;

  handleTickerSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TickerSelect: React.FC<IProps> = ({
  tickerList,
  openTickerListDropDown,
  placeholder,
  handleTickerSearchChange,
  onTickerSelect,
  setOpenTickerListDropDown,
  value,
}) => {

  console.log('value', value);
  //   useOutsideClick(optionsRef, () => {
  //     toggleOptionsDropDown(false);
  //   });

// const [name, setName] = useState('');

  const handleSaveTicker = (
    e: React.MouseEvent<HTMLElement>,
    ticker: TickerData
  ) => {
    //need to use setFormData to save selected ticker and display it in the
    //input field
    // handleTickerSearchChange(ticker);
    onTickerSelect(ticker);
    // setName(`${ticker.name} ${ticker.symbol}`)
    // document.querySelector('input')!.setAttribute("value", `${ticker.name} ${ticker.symbol}`);
  };
// console.log('get value attribute: ',document.querySelector('input')?.getAttribute('value'));

// console.log('value name: ',name);

  return (
    <div>
      <div    
      >
        <input        
          placeholder={placeholder}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
          onChange={handleTickerSearchChange}          
          // value={value}
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
          {/* {fakeTickerData.map((ticker, idx) => { */}
            return (
              <li
                id={ticker.symbol}
                key={idx}
                className='px-4 py-2 text-gray-700 hover:bg-white cursor-pointer'
                onClick={(e) => handleSaveTicker(e, ticker)}
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
