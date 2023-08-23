'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Login from '../components/Login';
import { ILoginForm } from '@/types';
import axios from 'axios';

const page = () => {
  const router = useRouter();

  const onLogin = async (formData: ILoginForm) => {
    const { username, password } = formData;
    try {
      await axios({
        method: 'POST',
        url: 'api/login',
        data: {
          username,
          password,
        },
      });
      router.push('./home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default page;
