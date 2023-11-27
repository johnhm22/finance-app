'use client';

import React, { useMemo, useRef, useState } from 'react';
import debounce from 'debounce-promise';

import { AddShareForm, TickerData, TickerResponse } from '@/types';

import TickerSelect from './TickerSelect';
import { useGlobalContext } from './UserContext';
import { CloseOnOutsideClick } from '../utils/closeOnOutsideClick';
import { findTicker } from '../utils/ticker.search.helper';

interface IProps {
  handleCloseAddShare: () => void;
  onSubmit: (arg: AddShareForm, userId: string) => void;
  setAddShareForm: React.Dispatch<React.SetStateAction<AddShareForm>>;
  addShareForm: AddShareForm | undefined;
}

const AddShare = ({
  handleCloseAddShare,
  onSubmit,
  setAddShareForm,
  addShareForm,
}: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddShareForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { payloadData } = useGlobalContext();

  const addShareComponentRef = useRef(null);

  CloseOnOutsideClick(addShareComponentRef, handleCloseAddShare);

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

  const saveSelectedTickerInForm = (ticker: TickerData) => {
    setAddShareForm((prevState) => ({
      ...prevState,
      ticker,
    }));
  };

  const [openTickerListDropDown, setOpenTickerListDropDown] =
    useState<boolean>(false);

  const [tickerList, setTickerList] = useState<TickerData[]>([]);

  const [tickerSearchText, setTickerSearchText] = useState<{ ticker: string }>({
    ticker: '',
  });

  // useEffect(() => {
  //   return () => {
  //     debounce.cancel;
  //   };
  // }, []);

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

  const onTickerSelect = (ticker: TickerData) => {
    setTickerData(ticker);
    saveSelectedTickerInForm(ticker);
    setOpenTickerListDropDown(false);
  };

  const handleOnConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(addShareForm!, payloadData.id);
    setTickerSearchText({ ticker: '' });
  };

  return (
    <div
      ref={addShareComponentRef}
      className='flex flex-col absolute bg-white border shadow-md mt-20 w-3/5 md:w-1/3 h-4/5 md:h-2/3 px-5 pt-12'
    >
      <form onSubmit={handleOnConfirm}>
        <div className='p-5 '>
          <div className='items-center self-start'>
            <h2 className='inline-block text-sm md:text-xl text-nitro-space font-source font-bold'>
              Add new shareholding
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
              placeholder='Enter name or share symbol'
              handleTickerSearchText={handleTickerSearchText}
              onTickerSelect={onTickerSelect}
              setOpenTickerListDropDown={setOpenTickerListDropDown}
              tickerData={tickerData}
              tickerSearchText={tickerSearchText}
            />
          </div>
          <div className='self-center'>
            <label
              htmlFor='bookCost'
              className='flex mt-5 text-xs capitalize mb-1 font-source'
            >
              Enter book cost
            </label>
            <input
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
              id='bookCost'
              name='bookCost'
              type='text'
              placeholder='book cost'
              onChange={handleChange}
            />
          </div>

          <div className={`items-center self-start`}></div>
          <div className='self-center'>
            <label
              htmlFor='quantity'
              className='flex mt-5 text-xs capitalize mb-1 font-source'
            >
              Enter quantity
            </label>
            <input
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
              id='quantity'
              name='quantity'
              type='text'
              placeholder='quantity'
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              data-testid='button'
              type='submit'
              className='flex bg-blue-700  mt-8 md:mt-14 justify-center items-center rounded-full h-3 md:h-12 w-full p-5 hover:bg-blue-800 text-base  md:text-xl text-white'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddShare;
