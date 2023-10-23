'use client';

import Link from 'next/link';

import { useGlobalContext } from './UserContext';

const Navbar = () => {
  const { payloadData } = useGlobalContext();
  return (
    <header className='w-full z-10 bg-slate-100 fixed'>
      <nav className='max-w-[1440px] mx-2 md:mx-4 flex justify-between items-center md:px-5 sm:px-16 h-14'>
        <div className='flex justify-center items-center'>
          <p className='font-extrabold text-orange-500 text-lg  sm:text-3xl'>
            a
          </p>
          <p className='font-extrabold text-orange-500 text-3xl md:text-5xl mr-2'>
            i
          </p>
          <p className='font-bold text-sm sm:text-lg'>activeInvestor</p>
        </div>
        <div className='flex flex-row justify-end gap-3 font-semibold text-base'>
          {!payloadData?.id ? (
            <>
              <Link
                href='/login'
                className='flex justify-center items-center text-xs md:text-sm border-solid border-2 px-4 py-1 rounded-full border-blue-700'
              >
                Log in
              </Link>

              <Link
                href='/register'
                className='flex justify-center text-white font-semibold px-4 py-1 rounded-full bg-blue-700 items-center text-xs md:text-sm'
              >
                Create account
              </Link>
            </>
          ) : (
            <>
              <p className='mr-3 max-md:hidden'>
                Hi {payloadData.firstName}, welcome back
              </p>
              <Link
                href='/logout'
                className='flex justify-center items-center mr-3 text-red-500'
              >
                Log out
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
