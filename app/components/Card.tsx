import React from 'react';
import ActiveInvestor from './ActiveInvestor';

interface IProps {
  children: JSX.Element;
}

const Card = ({ children }: IProps) => {
  return (
    <div className='flex flex-col bg-white mt-16 w-4/5 md:w-1/2 lg:w-1/3 h-5/6 lg:h-3/4 drop-shadow-md items-center justify-center'>
      <ActiveInvestor />
      {children}
    </div>
  );
};

export default Card;
