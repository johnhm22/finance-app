'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import { deleteCookies } from '../utils/deleteCookies';
import { useGlobalContext } from './UserContext';
import ActiveInvestor from './ActiveInvestor';
import Card from './Card';

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
    <Card>
      {
        <div className='flex flex-col mt-10 bg-white justify-center items-center'>
          <div className='flex flex-1 text-sm md:text-xl font-semibold'>
            Thanks for visiting, goodbye!
          </div>
          <Link
            className='flex bg-blue-700 mt-10 sm:mt-20 justify-center items-center rounded-full w-full sm:w-10/12 p-3 md:p-5 hover:bg-blue-800 text-xs lg:text-lg text-white'
            href='/'
          >
            Back to welcome page
          </Link>
        </div>
      }
    </Card>
  );
};

export default Logout;
