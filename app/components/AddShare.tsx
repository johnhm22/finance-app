'use client';

import React, { useMemo, useRef, useState } from 'react';
import debounce from 'debounce-promise';

import { AddShareForm, TickerData, TickerResponse } from '@/types';

import TickerSelect from './TickerSelect';
import { useGlobalContext } from './UserContext';
import { closeOnOutsideClick } from '../utils/closeOnOutsideClick';
// import { debounce } from '../utils/debounce';

interface IProps {
  handleCloseAddShare: () => void;
  onSubmit: (arg: AddShareForm, userId: string) => void;
  setAddShareForm: React.Dispatch<React.SetStateAction<AddShareForm>>;
  addShareForm: AddShareForm | undefined;
  tickerSearch: (arg: string) => Promise<TickerResponse | undefined>;
}

const AddShare = ({
  handleCloseAddShare,
  onSubmit,
  setAddShareForm,
  addShareForm,
  tickerSearch,
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

  closeOnOutsideClick(addShareComponentRef, handleCloseAddShare);

  const saveSelectedTickerInForm = (ticker: TickerData) => {
    setAddShareForm((prevState) => ({
      ...prevState,
      ticker,
    }));
  };

  const [openTickerListDropDown, setOpenTickerListDropDown] =
    useState<boolean>(false);

  const [tickerList, setTickerList] = useState<TickerData[]>([]);

  // useEffect(() => {
  //   return () => {
  //     debounce.cancel;
  //   };
  // }, []);

  const handleTickerSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const response = await tickerSearch(value);
    if (response!.data) {
      setOpenTickerListDropDown(true);
      setTickerList(response!.data);
    }
  };

  const debouncedChangeHandlerForTickerSearch = useMemo(
    () => debounce(handleTickerSearchChange, 300),
    []
  );

  const onTickerSelect = (ticker: TickerData) => {
    saveSelectedTickerInForm(ticker);
    setOpenTickerListDropDown(false);
  };

  const handleOnConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(addShareForm!, payloadData.id);
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
              placeholder='Enter name or ticker symbol'
              // handleTickerSearchChange={handleTickerSearchChange}
              handleTickerSearchChange={debouncedChangeHandlerForTickerSearch}
              onTickerSelect={onTickerSelect}
              setOpenTickerListDropDown={setOpenTickerListDropDown}
              addShareForm={addShareForm}
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
              id='cost'
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
