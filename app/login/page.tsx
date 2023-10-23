'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Login from '../components/Login';
import { ILoginForm } from '@/types';
import axios from 'axios';
import { useGlobalContext } from '../components/UserContext';
import { getUserId } from '../utils/getUserId';

const Page = () => {
  const router = useRouter();

  const { setPayloadData } = useGlobalContext();

  const onLogin = async (formData: ILoginForm) => {
    const { username, password } = formData;
    try {
      const user = await axios({
        method: 'POST',
        url: 'api/login',
        data: {
          username,
          password,
        },
      });
      if (user.status === 200) {
        const payload = await getUserId();
        setPayloadData(payload);
      }
      router.push('./home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-1 max-container h-screen items-center justify-center bg-slate-100'>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default Page;
