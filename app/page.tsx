import Link from 'next/link';

import { getExchangeData } from './utils/getExchangeData.helper';
import { decimalFormatter } from './utils/numberFormat.helper';
import { getCurrencyData } from './utils/getCurrencyData.helper';

enum ExchangeAcronym {
  FTSE = 'FTSE 100',
  IXIC = 'NASDAQ',
  DJI = 'Dow Jones',
}

const Landing = async () => {
  const exchangeData = await getExchangeData();
  const currencyData = await getCurrencyData();

  return (
    <section className='flex flex-1 w-full flex-col'>
      <div className='mt-14 md:h-[25rem] h-[40rem] bg-blue-800 text-white flex flex-row max-md:flex-col justify-between'>
        <div className='flex flex-col pt-10 pl-10'>
          <h1 className='font-bold text-3xl'>
            Welcome to your personal share app
          </h1>
          <div className='font-semibold text-2xl mt-5'>
            Join now for <span className='text-orange-500'>free</span> and
            create your portfolio
          </div>
          <br />
          <p className='font-semibold mb-2'>
            Please {''}
            <Link href='./login'>
              <span className='text-orange-500'>login</span>
            </Link>
            {''} to see your details
          </p>
          <Link
            href='/register'
            className='flex justify-center mt-2 md:mt-5 hover:cursor-pointer bg-white text-blue-700 py-3 md:py-3 px-2 md:px-4 font-semibold text-sm md:text-base w-32 md:w-44 items-center  rounded-full'
          >
            Open an account
          </Link>
          <p className='font-semibold mt-5 text-2xl mb-5'>
            Try our {''}
            <Link href='./quick-quote'>
              <span className='text-orange-500'>free</span>
            </Link>
            {''} quick quote
          </p>
        </div>
        <div className='pl-10'>
          <div className='rounded-full relative max-sm:bottom-10 max-sm:left-6 pt-6 bg-orange-500 text-white w-20 md:w-28 h-20 md:h-28 font-semibold text-sm  md:text-lg items-center text-center mr-64 mt-10'>
            Track your Portfolio
          </div>
          <div className='relative pt-8 md:pt-14 bottom-28 left-24 md:bottom-28 md:left-24 rounded-full bg-blue-950 text-white w-28 md:w-48 h-28 md:h-48 font-semibold text-lg md:text-2xl items-center text-center'>
            Add your <br /> stocks
          </div>
        </div>
      </div>
      <div className='flex flex-1 md:flex-row flex-col justify-between h-[30rem]'>
        <table className='table-auto h-1/2 ml-10 mt-5 text-xl mr-10'>
          <tbody>
            {exchangeData?.map((exchange) => (
              <tr
                key={exchange.data[0].symbol}
                className='border-b-2 border-gray-300 h-16'
              >
                <td className='w-36'>
                  <span className='font-normal'>
                    {exchange.data[0].symbol.split('.')[0] === 'IXIC'
                      ? 'NASDAQ'
                      : exchange.data[0].symbol.split('.')[0]}
                  </span>
                  <br />
                  <span className='font-semibold'>
                    {decimalFormatter(+exchange.data[0].close)}
                  </span>
                </td>
                {exchange.data[0].close - exchange.data[0].open >= 0 ? (
                  <td className='w-60 text-end text-green-600'>
                    {decimalFormatter(
                      +(exchange.data[0].close - exchange.data[0].open)
                    )}{' '}
                    {(
                      (+(exchange.data[0].close - exchange.data[0].open) *
                        100) /
                      +exchange.data[0].open
                    ).toFixed(2)}
                    %
                  </td>
                ) : (
                  <td className='w-60 text-end text-red-500'>
                    {decimalFormatter(
                      +(exchange.data[0].close - exchange.data[0].open)
                    )}{' '}
                    {(
                      (+(exchange.data[0].close - exchange.data[0].open) *
                        100) /
                      +exchange.data[0].open
                    ).toFixed(2)}
                    %
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <table className='table-auto h-1/2 ml-10 mt-5 mb-5 text-xl mr-10'>
          <tbody>
            <tr className='border-b-2 border-gray-300 h-16'>
              <td className='w-36'>
                <span className='font-normal'>USD:EUR</span>{' '}
              </td>
              <td className='w-60 text-end'>{currencyData[0].EUR}</td>
            </tr>
            <tr className='border-b-2 border-gray-300 h-16'>
              <td className='w-36'>
                <span className='font-normal'>USD:GBP</span>{' '}
              </td>
              <td className='w-60 text-end'>{currencyData[0].GBP}</td>
            </tr>
            <tr className='border-b-2 border-gray-300 h-16'>
              <td className='w-36'>
                <span className='font-normal'>GBP:EUR</span>{' '}
              </td>
              <td className='w-60 text-end'>{currencyData[1].EUR}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Landing;
