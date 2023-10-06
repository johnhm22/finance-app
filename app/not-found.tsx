import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <main className='flex h-screen flex-col items-center bg-slate-200'>
        <div className='flex flex-col px-5 mt-20 bg-white w-2/3 sm:w-1/2 md:w-1/3 h-5/6 md:h-3/4 items-center drop-shadow-md'>
          <div className='flex justify-center items-center mt-28 px-5 w-2/3 '>
            <p className='font-extrabold text-orange-500 text-3xl'>a</p>
            <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
            <h2 className='text-2xl font-bold'>activeInvestor</h2>
          </div>
          <h2 className='sm:text-xl text-lg mt-10'>
            Sorry, we couldn&apos;t find that page.
          </h2>
          <Link href='/' className=' mt-20 w-2/3'>
            <button className='flex bg-orange-500 justify-center items-center rounded-full h-12 w-full text-black font-semibold text-base px-5'>
              Return to the home page
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
