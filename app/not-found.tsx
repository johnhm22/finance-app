import Link from 'next/link';
import ActiveInvestor from './components/ActiveInvestor';

export default function NotFound() {
  return (
    <>
      <main className='flex h-screen flex-col items-center bg-slate-200'>
        <div className='flex flex-col mt-16 justify-center pt-16 px-5 bg-white w-4/5 md:w-1/2 lg:w-1/3 h-5/6 lg:h-3/4 items-center drop-shadow-md'>
          {/* <div className='mt-16   justify-center'> */}
          <ActiveInvestor />
          <h2 className='sm:text-xl text-lg mt-10 text-center'>
            Sorry, we couldn&apos;t find that page.
          </h2>
          <Link href='/' className=' mt-20 w-2/3'>
            <button className='flex bg-orange-500 justify-center items-center rounded-full h-10 md:h-12 w-full text-black font-semibold text-sm md:text-xl px-5'>
              Home page
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
