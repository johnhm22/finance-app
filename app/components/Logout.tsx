'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { deleteCookies } from '../utils/deleteCookies';
import { getUserId } from '../utils/getUserId';
import { useGlobalContext } from './UserContext';
import Link from 'next/link';

const Logout = () => {
  const router = useRouter();

  const { setPayloadData } = useGlobalContext();
  useEffect(() => {
    const removeCookies = async () => {
      await deleteCookies();
    };
    removeCookies();
    const payload = getUserId();
    console.log('payload after logout :', payload);
    setPayloadData(payload);
  }, []);

  return (
    <div className='flex flex-col bg-white md:w-2/3 lg:w-1/2 w-full drop-shadow-md'>
      <div className='px-5 pt-28 h-full'>
        <div className='flex justify-center items-center'>
          <p className='font-extrabold text-orange-500 text-3xl'>a</p>
          <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
          <h2 className='text-2xl font-bold'>activeInvestor</h2>
        </div>
        <div className='flex flex-col mt-10 bg-white justify-center items-center'>
          <div className='flex justify-center text-xl font-semibold'>
            Thanks for visiting, goodbye!
          </div>
          <div className='flex flex-col w-2/3 items-center mt-20'>
            <button
              type='submit'
              className='flex bg-blue-700 justify-center items-center rounded-full h-12 w-full p-5 hover:bg-blue-800 text-xl text-white'
            >
              <Link href='/'>Back to welcome page</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
