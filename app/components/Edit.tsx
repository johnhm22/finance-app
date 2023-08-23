import React, { FormEvent, FormEventHandler } from 'react';
// import Image from 'next/image';

import { IShareUpdateForm } from '@/types';

interface IProps {
  handleCloseEdit: () => void;
  onSubmit: (arg: IShareUpdateForm[], ticker: string) => void;
  setShareUpdateForm: React.Dispatch<React.SetStateAction<IShareUpdateForm[]>>;
  shareUpdateForm: IShareUpdateForm[];
  ticker: string;
}

const Edit = ({
  handleCloseEdit,
  onSubmit,
  setShareUpdateForm,
  shareUpdateForm,
  ticker,
}: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setShareUpdateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleClose = () => {
    handleCloseEdit();
  };

  const handleOnConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(shareUpdateForm, ticker);
  };

  return (
    <div
      className={`h-screen w-full fixed inset-0 z-20 overflow-hidden flex items-center justify-center`}
    >
      <div className='bg-blue-100 grid relative w-[358px] min-h-300 rounded-lg max-h-[90vh] border border-slate-300'>
        {/* <div
          className=' className="ml-3 cursor-pointer'
          onClick={handleCloseEdit}
        >
          <div className='text-end'>
            <Image
              src='./close.svg'
              width={10}
              height={10}
              alt='close icon'
              layout={'fixed'}
            />
          </div>
        </div> */}
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
                  Update data for shareholding
                </h2>
              </div>
              <div className='self-center'>
                <label className='flex mt-5 text-xs capitalize mb-1 font-source'>
                  Enter new book cost
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
