import Link from 'next/link';
import Image from 'next/image';

export default function Landing() {
  return (
    <div className='fixed h-screen w-full grid grid-cols-1 place-content-center justify-items-center'>
      {/* <div className='bg-blue-100 grid relative w-[358px] min-h-300 rounded-lg max-h-[90vh] border border-slate-300'> */}
      {/* <div className='w-full bg-violet-300 h-60'>01</div> */}
      <div className='bg-blue-100 w-full p-2 text-center font-semibold text-[50px]'>
        <h1>Welcome to your personal share information app</h1>
        <Link href='./login' className='font-semibold text-[30px]'>
          Please login to see your details
        </Link>
      </div>
      <div className='w-full bg-blue-400 h-40'>03</div>
    </div>
  );
}
