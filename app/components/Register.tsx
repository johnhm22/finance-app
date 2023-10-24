'use client';

import React, { useRef, useState } from 'react';
import { IRegisterForm, RegisterErrors } from '@/types';
import ButtonLarge from './ButtonLarge';
import { validateRegister } from '../validations/validation-functions/auth.validations';
import Input from './Input';
import ActiveInvestor from './ActiveInvestor';
import Card from './Card';

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
    <Card>
      {
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white justify-center items-center w-full'
        >
          <div className='w-3/4 md:w-2/3 h:1/2 lg:h-full'>
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
      }
    </Card>
  );
};

export default Register;
