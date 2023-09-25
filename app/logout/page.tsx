'use server';

import React from 'react';

import Logout from '../components/Logout';

const page = () => {
  return (
    <div className='flex max-container h-screen bg-slate-100 items-center justify-center'>
      <div className='flex justify-center w-3/5 h-3/4'>
        <Logout />
      </div>
    </div>
  );
};

export default page;
