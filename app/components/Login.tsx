'use client';
import { useState } from 'react';

import { ILoginForm, LoginErrors } from '@/types';
import Input from './Input';
import ButtonLarge from './ButtonLarge';
import { validateLogin } from '../validations/validation-functions/auth.validations';

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
      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-16 pb-5 bg-white w-4/5 md:w-1/2 lg:w-1/3 h:1/2 lg:h-3/4'
      >
        <div className='px-5 pt-16'>
          <div className='flex justify-center items-center'>
            <p className='font-extrabold text-orange-500 text-lg  sm:text-3xl'>
              a
            </p>
            <p className='font-extrabold text-orange-500 text-3xl md:text-5xl mr-2'>
              i
            </p>
            <h2 className=' text-sm md:text-xl font-bold'>activeInvestor</h2>
          </div>
          <div className='self-center'>
            <Input
              label='Username'
              name='username'
              type='text'
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
              placeholder='password'
              onChange={handleChange}
              errors={errors?.password}
            />
          </div>
          <ButtonLarge label='Log in' />
        </div>
      </form>
    </>
  );
};

export default Login;
