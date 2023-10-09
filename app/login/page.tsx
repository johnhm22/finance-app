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
      console.log('user returned from login: ', user);
      if (user.statusText === 'OK') {
        const payload = await getUserId();
        console.log('payload returned from getUserId: ', payload);
        setPayloadData(payload);
      }
      router.push('./home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex max-container h-screen bg-slate-100 items-center justify-center'>
      <div className='flex justify-center w-4/5 md:w-3/5 h-3/4'>
        <Login onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Page;
