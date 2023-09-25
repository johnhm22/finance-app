import React from 'react';

// import { useOutsideClick } from "../utils/hooks";
import { AddShareForm, TickerResponse, TickerSearchData } from '@/types';
import { fakeTickerData } from '@/app/utils/fakeTickerData';

interface IProps {
  tickerList: TickerSearchData[];
  openTickerListDropDown: boolean;
  placeholder: string;

  onTickerSelect: (ticker: TickerSearchData) => void;
  setOpenTickerListDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  value?: AddShareForm;

  handleTickerSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   onTickerSelect OptionSelect: (
  //     e: React.MouseEvent<HTMLLIElement>, // eslint-disable-line no-unused-vars
  //     args?: any // eslint-disable-line no-unused-vars
  //   ) => void;
  //   toggleOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
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
  //   useOutsideClick(optionsRef, () => {
  //     toggleOptionsDropDown(false);
  //   });
  const handleSaveTicker = (
    e: React.MouseEvent<HTMLElement>,
    ticker: TickerSearchData
  ) => {
    //need to use setFormData to save selected ticker and display it in the
    //input field
    // handleTickerSearchChange(ticker);
    onTickerSelect(ticker);
  };

  return (
    <div>
      <div
      //    ref={inputRef}
      // onBlur={() => setOpenTickerListDropDown(false)}
      >
        <input
          placeholder={placeholder}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
          onChange={handleTickerSearchChange}
          value={`${value?.ticker.share_name}  ${value?.ticker.symbol}`}
        />
      </div>
      {openTickerListDropDown ? (
        <ul
          className='z-10 absolute py-2 bg-gray-200 rounded-md overflow-y-auto shadow-xl'
          style={{
            // width: `${inputRef.current?.clientWidth}px`,
            maxHeight: '40%',
          }}
        >
          {/* {tickerList.map((ticker, idx) => { */}
          {fakeTickerData.map((ticker, idx) => {
            return (
              <li
                id={ticker.symbol}
                key={idx}
                className='px-4 py-2 text-gray-700 hover:bg-white cursor-pointer'
                onClick={(e) => handleSaveTicker(e, ticker)}
              >
                {ticker.share_name} &nbsp;&nbsp;{ticker.symbol}&nbsp;
                {ticker.stock_exchange.exchange_name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TickerSelect;
