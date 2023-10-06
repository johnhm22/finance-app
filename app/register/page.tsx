'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Register from '@/app/components/Register';
import { IRegisterForm } from '@/types';

const Page = () => {
  const router = useRouter();

  const onRegister = async (data: IRegisterForm) => {
    const { username, password, firstName, lastName } = data;

    try {
      const response = await axios.post('api/register', {
        username,
        password,
        firstName,
        lastName,
      });

      router.push('./login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-1 h-screen justify-center items-center bg-slate-100'>
      <Register onRegister={onRegister} />
    </div>
  );
};

export default Page;
