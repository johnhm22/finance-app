'use client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

import Card from './Card';
import { sendMessage } from '../utils/server-actions';

const handleSubmit = async (data: FormData) => {
  const result = await sendMessage(data);
  if (result.success) {
    toast.success('Email sent');
    redirect('/');
  } else {
    toast.error('Sorry, something went wrong');
  }
};

const ContactUs = () => {
  return (
    <>
      <Card>
        {
          <form
            suppressHydrationWarning
            className='flex flex-col mt-2 bg-white items-center w-full'
            action={handleSubmit}
          >
            <div className='w-3/4 md:w-2/3 h:1/2 lg:h-3/4'>
              <div className='items-center self-start'>
                <h2 className='inline-block text-sm md:text-xl font-source font-bold'>
                  Contact Us
                </h2>
              </div>
              <div className='self-center'>
                <label
                  className='flex mt-5 text-xs capitalize mb-1 font-source'
                  htmlFor='email'
                >
                  Enter your email address
                </label>
                <input
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                  name='email'
                  type='email'
                  placeholder='email address'
                  required
                />
              </div>
              <div className='self-center'>
                <label
                  className='flex mt-5 text-xs capitalize mb-1 font-source'
                  htmlFor='subject'
                >
                  Message subject
                </label>
                <input
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                  name='subject'
                  type='text'
                  placeholder='message subject'
                  required
                />
              </div>
              <div className='self-center'>
                <label
                  className='flex mt-5 text-xs capitalize mb-1 font-source'
                  htmlFor='message'
                >
                  Message
                </label>
                <textarea
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1'
                  name='message'
                  maxLength={500}
                  rows={8}
                  cols={40}
                  placeholder='message text'
                  required
                />
              </div>

              <div className='flex flex-row w-full justify-around my-4'>
                <Link
                  href='/'
                  className='flex bg-green-500 ml-2 justify-center items-center px-8 rounded-full hover:bg-green-600 text-xs md:text-sm text-white'
                >
                  Back
                </Link>
                <button className='flex bg-blue-700 mr-2 justify-center items-center rounded-full h-3 md:h-12 w-20 p-5 hover:bg-blue-800 text-xs md:text-sm text-white'>
                  Send
                </button>
              </div>
            </div>
          </form>
        }
      </Card>
    </>
  );
};

export default ContactUs;
