'use client';

import Link from 'next/link';

import { useGlobalContext } from './UserContext';

// import Image from 'next/image';
// import CustomButton from "./CustomButton";

const Navbar = () => {
  const { payloadData } = useGlobalContext();
  return (
    <header className='w-full z-10 bg-slate-100 fixed'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center px-5  sm:px-16 h-14'>
        {/* <Link href='/' className='flex justify-center items-center'> */}
        <div className='flex justify-center items-center'>
          <p className='font-extrabold text-orange-500 text-3xl'>a</p>
          <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
          <p className='font-bold'>activeInvestor</p>
        </div>
        {/* </Link> */}

        <div className='self-end flex flex-row justify-end gap-3 mb-4 font-semibold text-base'>
          {!payloadData?.id ? (
            <>
              <Link
                href='/login'
                className='flex justify-center items-center text-sm border-solid border-2 px-4 py-1 rounded-full border-blue-700'
              >
                Log in
              </Link>
              <button className='text-white font-semibold px-4 py-1 rounded-full bg-blue-700'>
                <Link
                  href='/register'
                  className='flex justify-center items-center'
                >
                  Create account
                </Link>
              </button>
            </>
          ) : (
            <>
              <p className='mr-3'>Hi {payloadData.firstName}, welcome back</p>
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
