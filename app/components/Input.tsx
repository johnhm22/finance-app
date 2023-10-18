import React from 'react';

type IProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  errors?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  name,
  type,
  placeholder,
  errors,
  onChange,
}: IProps) => {
  return (
    <>
      <label className='flex mt-5 text-sm capitalize mb-1 font-source'>
        {label}
      </label>
      {errors ? <span className='text-red-500 text-sm'>{errors}</span> : null}
      <input
        className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
