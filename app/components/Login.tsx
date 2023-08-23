'use client';
import { useState } from 'react';

import { ILoginForm, IShareUpdateForm } from '@/types';

interface IProps {
  // handleCloseEdit: () => void;
  onLogin: (formData: ILoginForm) => Promise<void>;
}

const Login = ({ onLogin }: IProps) => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(loginForm);
    setLoginForm({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <div
        // className={`h-screen w-full fixed inset-0 z-20 overflow-hidden flex items-center justify-center`}
        className={`fixed inset-0 z-2 flex items-center justify-center`}
      >
        <div className='bg-blue-100 grid relative w-[358px] min-h-300 rounded-lg max-h-[90vh] border border-slate-300'>
          <form
            // data-modal-form={`modal-form${modalTitle && '-'}${modalTitle
            //   .replace(/ +/g, '-')
            //   .toLowerCase()}`}
            onSubmit={handleSubmit}
          >
            <div className='p-5 '>
              <div>
                <div className={`items-center self-start`}>
                  <h2 className='inline-block text-nitro-space font-source font-bold'>
                    Login
                  </h2>
                </div>
                <div className='self-center'>
                  <label className='flex mt-5 text-xs capitalize mb-1 font-source'>
                    Username
                  </label>
                  <input
                    className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                    id='username'
                    name='username'
                    type='text'
                    placeholder='username'
                    onChange={handleChange}
                  />
                </div>
                <div className={`items-center self-start`}></div>
                <div className='self-center'>
                  <label className='flex mt-5 text-xs capitalize mb-1 font-source'>
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
              <div className='self-end flex gap-1 items-center justify-end mt-3'>
                {' '}
                <button
                  className='bg-red-400 rounded p-1 hover:bg-red-500 text-xs'
                  // onClick={handleClose}
                >
                  Cancel
                </button>
                <div className='self-end flex items-center justify-end'>
                  {' '}
                  <button
                    type='submit'
                    className='bg-blue-400 rounded p-1 hover:bg-blue-500 text-xs'
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
