import React from 'react';

// import { useOutsideClick } from "../utils/hooks";
import { TickerResponse, TickerSearchData } from '@/types';

interface IProps {
  tickerList: TickerSearchData[];
  openTickerListDropDown: boolean;
  placeholder: string;
  handleTickerSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTickerSelect: (ticker: TickerSearchData) => void;
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
  //   onTickerSelect, OptionSelect,
  //   toggleOptionsDropDown,
}) => {
  //   const inputRef = React.useRef<HTMLInputElement | null>(null);
  //   const optionsRef = React.useRef<HTMLUListElement | null>(null);

  //   useOutsideClick(optionsRef, () => {
  //     toggleOptionsDropDown(false);
  //   });

  const handleSaveTicker = (ticker: TickerSearchData) => {
    onTickerSelect(ticker);
  };

  return (
    <div>
      <div
      //    ref={inputRef}
      >
        <input
          placeholder={placeholder}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
          onChange={handleTickerSearchChange}
        />
      </div>
      {openTickerListDropDown ? (
        <ul
          //   ref={optionsRef}
          className='z-10 absolute py-2 bg-gray-200 rounded-md overflow-y-auto shadow-xl'
          style={{
            // width: `${inputRef.current?.clientWidth}px`,
            maxHeight: '40%',
          }}
        >
          {tickerList.map((ticker, idx) => {
            return (
              <li
                id={ticker.symbol}
                key={idx}
                // value={option.value}
                className='px-4 py-2 text-gray-700 hover:bg-white cursor-pointer'
                onClick={(e) => handleSaveTicker(ticker)}
              >
                {ticker.name}
                {ticker.symbol}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TickerSelect;
