'use client';
import React, { useState } from 'react';

import { ILoginForm, LoginErrors } from '@/types';
import Input from './Input';
import ButtonLarge from './ButtonLarge';
import { validateLogin } from '../validations/validation-functions/auth.validations';
import Card from './Card';

interface IProps {
  onLogin: (formData: ILoginForm) => Promise<void>;
}

const Login = ({ onLogin }: IProps) => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, isValid } = validateLogin(loginForm);
    if (isValid) {
      onLogin(loginForm);
      setLoginForm({
        username: '',
        password: '',
      });
    } else {
      setErrors({ ...errors });
    }
  };

  return (
    <>
      <Card>
        {
          <form
            onSubmit={handleSubmit}
            className='flex flex-col mt-10 bg-white justify-center items-center w-full'
          >
            <div className='w-3/4 md:w-2/3 h:1/2 lg:h-3/4'>
              <div className='self-center'>
                <Input
                  label='Username'
                  name='username'
                  type='text'
                  value={loginForm.username}
                  placeholder='username'
                  onChange={handleChange}
                  errors={errors?.username}
                />
              </div>
              <div className='self-center mb-10'>
                <Input
                  label='Password'
                  name='password'
                  type='text'
                  value={loginForm.password}
                  placeholder='password'
                  onChange={handleChange}
                  errors={errors?.password}
                />
              </div>
              <ButtonLarge label='Log in' />
            </div>
          </form>
        }
      </Card>
    </>
  );
};

export default Login;
