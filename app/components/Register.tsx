'use client';

import React, { FormEvent, useRef, FormEventHandler } from 'react';
import { IRegisterForm } from '@/types';
import ButtonLarge from './ButtonLarge';

interface IProps {
  onRegister: (data: IRegisterForm) => void;
}

const Register = ({ onRegister }: IProps) => {
  const registerComponentRef = useRef(null);

  const [registerForm, setRegisterForm] = React.useState<IRegisterForm>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleClose = () => {
  //   handleCloseEdit();
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(registerForm);
    setRegisterForm({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  };

  return (
    <div className='flex flex-col bg-white w-1/3'>
      <form
        // data-modal-form={`modal-form${modalTitle && '-'}${modalTitle
        //   .replace(/ +/g, '-')
        //   .toLowerCase()}`}
        onSubmit={handleSubmit}
      >
        <div className='p-5 pt-20'>
          <div className='flex justify-center items-center'>
            <p className='font-extrabold text-orange-500 text-3xl'>a</p>
            <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
            <h2 className='text-2xl font-bold'>activeInvestor</h2>
          </div>
          <div className='self-center'>
            <div className='self-center'>
              <label className='flex mt-10 text-sm capitalize mb-1 font-source'>
                Username
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='username'
                name='username'
                type='text'
                placeholder='username'
                onChange={handleChange}
              />
            </div>
            <div className='self-center'>
              <label className='flex mt-5 text-sm capitalize mb-1 font-source'>
                First name
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='firstName'
                name='firstName'
                type='text'
                placeholder='first name'
                onChange={handleChange}
              />
            </div>
            <div className='self-center'>
              <label className='flex mt-5 text-sm capitalize mb-1 font-source'>
                Last name
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='lastName'
                name='lastName'
                type='text'
                placeholder='last name'
                onChange={handleChange}
              />
            </div>
            <div className={`items-center self-start`}></div>
            <div className='self-center'>
              <label className='flex mt-5 text-sm capitalize mb-1 font-source'>
                Password
              </label>
              <input
                className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                id='password'
                name='password'
                type='text'
                placeholder='password'
                onChange={handleChange}
              />
            </div>
          </div>
          <ButtonLarge label='Create Account' />
        </div>
      </form>
    </div>
  );
};

export default Register;
