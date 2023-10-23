'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import { deleteCookies } from '../utils/deleteCookies';
import { useGlobalContext } from './UserContext';
import ActiveInvestor from './ActiveInvestor';

const Logout = () => {
  const { setPayloadData } = useGlobalContext();
  useEffect(() => {
    const removeCookies = async () => {
      await deleteCookies();
    };
    removeCookies();
    setPayloadData({
      exp: 0,
      firstName: '',
      iat: 0,
      id: '',
      lastName: '',
      role: '',
      username: '',
    });
  }, []);

  return (
    <div className='flex flex-col bg-white md:w-9/12 lg:w-3/6 px-5 pt-20 sm:pt-28 w-full drop-shadow-md'>
      {/* <div className='flex justify-center items-center'>
        <p className='font-extrabold text-orange-500 text-lg  sm:text-3xl'>a</p>
        <p className='font-extrabold text-orange-500 text-3xl md:text-5xl mr-2'>
          i
        </p>
        <h2 className=' text-sm md:text-xl font-bold'>activeInvestor</h2>
      </div> */}
      <ActiveInvestor />
      <div className='flex flex-col mt-10 bg-white justify-center items-center'>
        <div className='flex flex-1 text-sm md:text-xl font-semibold'>
          Thanks for visiting, goodbye!
        </div>
        <Link
          className='flex bg-blue-700 mt-10 sm:mt-20 text-center items-center rounded-full h-12 w-full sm:w-10/12 p-3 md:p-5 hover:bg-blue-800 text-xs lg:text-lg text-white'
          href='/'
        >
          Back to welcome page
        </Link>
      </div>
    </div>
  );
};

export default Logout;
