'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <div className='flex flex-col bg-white md:w-9/12 lg:w-3/6 px-5 pt-20 sm:pt-28 w-full drop-shadow-md'>
        <div className='flex justify-center items-center'>
          <p className='font-extrabold text-orange-500 text-3xl'>a</p>
          <p className='font-extrabold text-orange-500 text-5xl mr-2'>i</p>
          <h2 className='text-2xl font-bold'>activeInvestor</h2>
        </div>
        <h2>Sorry, something went wrong!</h2>
        <div>
          <button type='submit'>Login</button>
        </div>

        <button
          className='flex bg-green-500 mt-8 justify-center items-center rounded-full h-12 w-full p-5 hover:bg-blue-800 text-xl text-white'
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </html>
  );
}
