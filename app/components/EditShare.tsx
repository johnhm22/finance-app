import React, { FormEvent, FormEventHandler, useRef } from 'react';
// import Image from 'next/image';

import { AddShareForm, IShareDataToEdit, ShareEditForm } from '@/types';
import { CloseOnOutsideClick } from '../utils/closeOnOutsideClick';

interface IProps {
  handleCloseEdit: () => void;
  onSubmit: (arg: IShareDataToEdit) => void;
  shareDataToEdit: IShareDataToEdit;
  setShareDataToEdit: React.Dispatch<React.SetStateAction<IShareDataToEdit>>;
}

const Edit = ({
  handleCloseEdit,
  onSubmit,
  shareDataToEdit,
  setShareDataToEdit,
}: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setShareDataToEdit((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const editShareComponentRef = useRef(null);
  CloseOnOutsideClick(editShareComponentRef, handleCloseEdit);

  // const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleOnConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(shareEditForm, shareDataToEdit[0].symbol);
    onSubmit(shareDataToEdit);
  };

  // export interface IShareDataToEdit {
  //   symbol: string;
  //   bookCost: number;
  //   quantity: number;
  // }

  return (
    <div
      ref={editShareComponentRef}
      // className='flex flex-col absolute bg-white border shadow-md w-1/3 h-2/3 px-5 pt-12'
      className='flex flex-col absolute bg-white border shadow-md mt-20 w-3/5 md:w-1/3 h-4/5 md:h-2/3 px-5 pt-12'
    >
      <form
        // data-modal-form={`modal-form${modalTitle && '-'}${modalTitle
        //   .replace(/ +/g, '-')
        //   .toLowerCase()}`}
        onSubmit={handleOnConfirm}
      >
        <div className='p-5 '>
          <div>
            <div className={`items-center self-start`}>
              <h2 className='inline-block text-xl text-nitro-space font-source font-bold'>
                Update data for shareholding
              </h2>
            </div>
            <div className='self-center'>
              <p className='flex mt-5 text-lg capitalize mb-1 font-source font-semibold'>
                Symbol: {shareDataToEdit.symbol}
              </p>
            </div>
            <div className='self-center'>
              <label className='flex mt-5 text-xs capitalize mb-1 font-source'>
                Enter new book cost
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='cost'
                name='bookCost'
                type='text'
                placeholder='book cost'
                onChange={handleChange}
                value={shareDataToEdit.bookCost}
              />
            </div>
            <div className={`items-center self-start`}></div>
            <div className='self-center'>
              <label className='flex mt-5 text-xs capitalize mb-1 font-source'>
                Enter quantity
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='quantity'
                name='quantity'
                type='text'
                placeholder='quantity'
                onChange={handleChange}
                value={shareDataToEdit.quantity}
              />
            </div>
          </div>
          {/* <div className='self-end flex gap-1 items-center justify-end mt-3'>
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
                  Update
                </button>
              </div>
            </div> */}
          <button
            type='submit'
            className='flex bg-blue-700 mt-12 justify-center items-center rounded-full h-12 w-full p-5 hover:bg-blue-800 text-xl text-white'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
