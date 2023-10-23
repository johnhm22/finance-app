'use client';

import React, { useRef, useState } from 'react';
import { IRegisterForm, RegisterErrors } from '@/types';
import ButtonLarge from './ButtonLarge';
import { validateRegister } from '../validations/validation-functions/auth.validations';
import Input from './Input';
import ActiveInvestor from './ActiveInvestor';

interface IProps {
  onRegister: (data: IRegisterForm) => void;
}

const Register = ({ onRegister }: IProps) => {
  const registerComponentRef = useRef(null);

  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<RegisterErrors | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterForm((prevState) => ({
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
    const { errors, isValid } = validateRegister(registerForm);
    if (isValid) {
      onRegister(registerForm);
      setRegisterForm({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
      });
    } else {
      setErrors({ ...errors });
    }
  };

  return (
    <div className='flex flex-col bg-white w-2/3  sm:w-3/5 md:w-1/3'>
      <form onSubmit={handleSubmit}>
        <div className='p-5 pt-20'>
          <ActiveInvestor />
          <div className='self-center'>
            <div className='self-center'>
              <Input
                label='Username'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                type='text'
                errors={errors?.username}
              />
            </div>
            <div className='self-center'>
              <Input
                label='First name'
                name='firstName'
                placeholder='First name'
                onChange={handleChange}
                type='text'
                errors={errors?.firstName}
              />
            </div>
            <div className='self-center'>
              <Input
                label='Last name'
                name='lastName'
                placeholder='Last name'
                onChange={handleChange}
                type='text'
                errors={errors?.lastName}
              />
            </div>
            <div className='self-center mb-10'>
              <Input
                label='Password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                type='text'
                errors={errors?.password}
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
