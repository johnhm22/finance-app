import Link from 'next/link';

import Button from './components/Button';
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
    <section className='flex flex-1 w-full flex-col h-screen '>
      <div className='mt-14 md:h-[25rem] h-[35rem] bg-blue-800 text-white flex flex-row max-md:flex-col justify-between'>
        <div className='flex flex-col pt-10 pl-10'>
          <h1 className='font-bold text-3xl'>
            Welcome to your personal share app
          </h1>
          <div className='font-semibold text-2xl mt-5'>
            Join now for <span className='text-orange-500'>free</span> and
            create your portfolio
          </div>
          <br />
          <Link href='./login' className='font-semibold mb-2'>
            Please <span className='text-orange-500'>login</span> to see your
            details
          </Link>
          <Link href={'/register'}>
            <Button
              label='Open an account'
              backgroundColour='bg-white'
              textColour='text-blue-700'
            />
          </Link>
          <Link href='./quick-quote' className='font-semibold mt-5 text-2xl'>
            Try our <span className='text-orange-500'>free</span> quick quote
          </Link>
        </div>
        <div className='pl-10'>
          <div className='rounded-full pt-6 bg-orange-500 text-white w-28 h-28 font-semibold text-lg items-center text-center mr-64 mt-10'>
            Track your Portfolio
          </div>
          <div className='relative pt-16 bottom-28 left-24 rounded-full bg-blue-950 text-white w-48 h-48 font-semibold text-2xl items-center text-center'>
            Add your <br /> stocks
          </div>
        </div>
      </div>
      <div className=' flex flex-1 md:flex-row flex-col justify-between font-stone-400 h-[20rem]'>
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
        <table className='table-auto h-1/2 ml-10 mt-5 text-xl mr-10'>
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
