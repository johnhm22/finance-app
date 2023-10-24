'use server';

import React from 'react';

import Logout from '../components/Logout';

const Page = () => {
  return (
    <div className='flex flex-1 max-container h-screen bg-slate-100 items-center justify-center'>
      <Logout />
    </div>
  );
};

export default Page;
