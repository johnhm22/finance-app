'use client';

import React from 'react';
import Logout from '../components/Logout';
import axios from 'axios';
import { cookies } from 'next/headers';

const page = () => {
  console.log('logout page called');
  // const logoutUser = async () => {

  const onLogout = async () => {
    try {
      await axios({
        method: 'GET',
        url: 'api/logout',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // try {
  //   const response = await axios({
  //     url: 'api/logout',
  //     method: 'GET',
  //   });
  //   return response.data;
  // } catch (e) {
  //   console.log('Error: ', e);
  //   return null;
  // }
  // };

  // return <Logout logoutUser={logoutUser} />;

  return <Logout onLogout={onLogout} />;
};

export default page;
