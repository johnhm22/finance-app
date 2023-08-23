import axios from 'axios';
import { cookies } from 'next/headers';
import React, { useEffect } from 'react';

interface IProps {
  onLogout: () => void;
}

const Logout = ({ onLogout }: IProps) => {
  console.log('Logout component');

  // useEffect(() => {
  //   onLogout();
  // }, []);

  // console.log('get all cookies in logout component: ', cookies().getAll());

  return (
    <div className='fixed w-full h-screen grid grid-cols-1 font-semibold place-content-center justify-items-center'>
      {/* fixed h-screen w-full grid grid-cols-1 place-content-center justify-items-center */}
      <div>Thanks for visiting, goodbye!</div>
    </div>
  );
};

export default Logout;
