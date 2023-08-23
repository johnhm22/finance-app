'use client';

import React, { useMemo, useState } from 'react';

import { IAddShareForm, TickerResponse, TickerSearchData } from '@/types';
import { debounce } from 'lodash';
import TickerSelect from './TickerSelect';

interface IProps {
  handleCloseAddShare: () => void;
  onSubmit: (arg: IAddShareForm[]) => void;
  setAddShareForm: React.Dispatch<React.SetStateAction<IAddShareForm[]>>;
  addShareForm: IAddShareForm[];
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

  const [openTickerListDropDown, setOpenTickerListDropDown] =
    useState<boolean>(false);

  const [tickerList, setTickerList] = useState<TickerSearchData[]>([]);

  const handleTickerSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    const response = await tickerSearch(value);
    console.log('response: ', response);

    if (response?.bestMatches.length) {
      setOpenTickerListDropDown(true);
      setTickerList(response.bestMatches);
      // setTickerList(
      //   response.bestMatches.map(() => {
      //     return;
      //   })
      // );
    }
    // setAddShareForm((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  // const handleTickerChange = (selectedOption) => {
  //   console.log('ticker input: ', selectedOption);
  // };

  const debouncedChangeHandlerForTickerSearch = useMemo(
    () => debounce(handleTickerSearchChange, 300),
    []
  );

  const handleClose = () => {
    handleCloseAddShare();
  };

  const onTickerSelect = (ticker: TickerSearchData) => {
    console.log('ticker data: ', ticker);
  };

  const handleOnConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(addShareForm);
  };

  return (
    <div
      className={`h-screen w-full fixed inset-0 z-20 overflow-hidden flex items-center justify-center`}
      onBlur={() => setOpenTickerListDropDown(false)}
    >
      <div className='bg-blue-100 grid relative w-[358px] min-h-300 rounded-lg max-h-[90vh] border border-slate-300'>
        <form
          // data-modal-form={`modal-form${modalTitle && '-'}${modalTitle
          //   .replace(/ +/g, '-')
          //   .toLowerCase()}`}
          onSubmit={handleOnConfirm}
        >
          <div className='p-5 '>
            <div>
              <div className={`items-center self-start`}>
                <h2 className='inline-block text-nitro-space font-source font-bold'>
                  Add new shareholding
                </h2>
              </div>
              {/* <div className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'> */}
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
                  handleTickerSearchChange={handleTickerSearchChange}
                  onTickerSelect={onTickerSelect}
                />
              </div>
              <div className='self-center'>
                <label
                  htmlFor='cost'
                  className='flex mt-5 text-xs capitalize mb-1 font-source'
                >
                  Enter book cost
                </label>
                <input
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                  id='cost'
                  name='cost'
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
            </div>
            <div className='self-end flex gap-1 items-center justify-end mt-3'>
              {' '}
              <button
                className='bg-red-400 rounded p-1 hover:bg-red-500 text-xs'
                onClick={handleClose}
              >
                Cancel
              </button>
              <div className='self-end flex items-center justify-end'>
                {' '}
                <button
                  type='submit'
                  className='bg-blue-400 rounded p-1 hover:bg-blue-500 text-xs'
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShare;
