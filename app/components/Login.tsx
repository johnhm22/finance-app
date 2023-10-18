'use client';
import { useState } from 'react';

import { ILoginForm, LoginErrors } from '@/types';
import Input from './Input';
import ButtonLarge from './ButtonLarge';
import { validateLogin } from '../validations/validation-functions/auth.validations';

interface IProps {
  // handleCloseEdit: () => void;
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
      <div className='flex flex-col bg-white md:w-2/3 lg:w-1/2 w-full'>
        <form onSubmit={handleSubmit}>
          <div className='px-5 pt-28'>
            <div className='flex justify-center items-center'>
              <p className='font-extrabold text-orange-500 text-3xl'>a</p>
              <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
              <h2 className='text-2xl font-bold'>activeInvestor</h2>
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
            <div className='self-center'>
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
      </div>
    </>
  );
};

export default Login;
