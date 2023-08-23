import Link from 'next/link';
// import Image from 'next/image';
// import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className='w-full absolute z-10 bg-slate-100'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          Home
        </Link>

        <div className='self-end flex items-center justify-end font-semibold text-base'>
          <Link href='/login' className='flex justify-center items-center mr-3'>
            Log in
          </Link>
          <Link
            href='/logout'
            className='flex justify-center items-center mr-3 text-red-500'
          >
            Log out
          </Link>
          <Link href='/register' className='flex justify-center items-center'>
            Create account
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
