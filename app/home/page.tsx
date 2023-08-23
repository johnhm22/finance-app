'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IAddShareForm, IShareUpdateForm } from '@/types';
import { v4 as uuidv4 } from 'uuid';

import Edit from '../components/Edit';
import AddShare from '../components/AddShare';
import { findTicker } from '@/utils/ticker.search.helper';

interface IShareData {
  longName: string;
  regularMarketPrice: number;
  symbol: string;
}

const Home = () => {
  const [underline, setUnderline] = useState<string>('investments');
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAddShare, setShowAddShare] = useState<boolean>(false);
  const [bookCost, setBookCost] = useState<number>(400);
  const [shareData, setShareData] = useState<IShareData[]>();

  const handleUnderline = () => {
    if (underline === 'investments') {
      setUnderline('orders');
    } else {
      setUnderline('investments');
    }
  };

  const [shareUpdateForm, setShareUpdateForm] = React.useState<
    IShareUpdateForm[]
  >([]);

  const [addShareForm, setAddShareForm] = React.useState<IAddShareForm[]>([]);

  // const setNewMemberInviteForm: React.Dispatch<React.SetStateAction<IInviteUserForm>>

  // const [newMemberInviteForm, setNewMemberInviteForm] =
  // React.useState<IInviteUserForm>({
  //   firstName: "",
  //   email: "",
  //   userRole: "PARENT",
  //   studentUserId: "",
  // });

  // useEffect(() => {
  //   //call function that gets price of smt.l
  //   console.log('useEffect called');
  //   const getQuote = async () => {
  //     try {
  //       const response = await fetch(`api/quote/smt.l`);
  //       console.log('response.body.getReader(): ', response.body?.getReader());
  //     } catch {}
  //   };
  //   getQuote();
  // });

  const getQuote = async () => {
    try {
      const response = await axios.get(`api/quote`);
      const data = response.data.quoteResponse.result;

      const dataArray: IShareData[] = [];

      data.map((d: IShareData) => {
        dataArray.push({
          longName: d.longName,
          regularMarketPrice: d.regularMarketPrice,
          symbol: d.symbol,
        });
      });

      setShareData(dataArray);

      //map over response.data.quoteResponse.result and enter into setShareData

      // setShareData({
      //   longName: response.data.price.longName,
      //   price: response.data.price.regularMarketPrice.raw,
      //   symbol: response.data.price.symbol,
      // });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const tickerSearch = async (data: string) => {
    const response = await findTicker(data);
    console.log('response from tickerSearch in page.tsx: ', response);
    return response;
  };

  // const debouncedSearch = debounce((arg) => {
  //   setSearchText(arg);
  //   if (arg === '') {
  //     getPrompts();
  //   } else {
  //     const filteredPosts = posts!.filter(
  //       (p) =>
  //         p.prompt.includes(searchText) ||
  //         p.creator.username === searchText ||
  //         p.tag === searchText
  //     );
  //     setPosts(filteredPosts);
  //   }
  // }, 200);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleCloseAddShare = () => {
    setShowAddShare(false);
  };

  const handleShowEdit = () => {
    setShowEdit((prevState) => !prevState);
  };

  const handleDelete = (symbol: string) => {
    console.log('Delete data for this symbol', symbol);
  };

  const onSubmit = (shareUpdateForm: IShareUpdateForm[], ticker: string) => {
    console.log('shareUpdateForm', shareUpdateForm);
    console.log('ticker: ', ticker);

    //filter out shareholding being updated
    //add in data on edited shareholding

    const updateShares = shareData!.filter((data) => {
      data.symbol != ticker;
    });
    // setShareData((preValue) => (
    //   ...preValue,
    //   shareUpdateForm));
    //update details for shareholding held in state and also call internal api to update details held in database
    setShowEdit(false);
  };

  const onConfirmAddShare = (addShareForm: IAddShareForm[]) => {
    console.log('addShareForm: ', addShareForm);
  };

  // const handleAddNewCollege = async (formData: IAddCollegeForm) => {
  // const newCollege = await addNewCollege(studentId, formData);

  // if (newCollege) {
  //   setSelectedColleges([...selectedColleges, newCollege]);
  //   await addCostOfAttendance(newCollege.id);
  // }
  // window.heap.track("Add College Form Submission");
  // return newCollege;
  // };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-200'>
      <div className=''>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            {underline === 'investments' ? (
              <>
                <h2
                  className={
                    'font-semibold text-base pb-2 mr-2  decoration-indigo-500 decoration-4 underline underline-offset-4'
                  }
                >
                  {' '}
                  Investments
                </h2>
                <h2
                  className={'font-normal text-base pb-2 mr-2 '}
                  onClick={handleUnderline}
                >
                  {' '}
                  Orders
                </h2>
              </>
            ) : (
              <>
                <h2
                  className={'font-normal text-base pb-2 mr-2'}
                  onClick={handleUnderline}
                >
                  Investments
                </h2>
                <h2
                  className={
                    'font-semibold text-base pb-2 mr-2  decoration-indigo-500 decoration-4 underline underline-offset-4'
                  }
                >
                  Orders
                </h2>
              </>
            )}
          </div>
          <div className='flex flex-row text-xs'>
            <div className='basis-3/4 flex flex-row'>
              <Image
                className='pb-2 mr-1'
                src='./dots.svg'
                alt='dots'
                width={5}
                height={10}
              />
              <h2 className='font-semibold mr-2'>Group by</h2>
              <h2 className='pb-2'>All</h2>
            </div>
            <div className='text-xs justify-end basis-1/4 text-right'>end</div>
          </div>
        </div>
        <table className='table-auto border-separate'>
          <thead>
            <tr className='bg-indigo-200 font-semibold text-xs'>
              <th className='p-2'>Symbol/Name</th>
              <th className='p-2'>Quantity</th>
              <th className='p-2'>Book Cost</th>
              <th className='p-2'>Price</th>
              <th className=' p-2'>Value</th>
              <th className=' bg-slate-200 p-2'></th>
              <th className=' bg-slate-200 p-2'></th>
            </tr>
          </thead>
          <tbody>
            {shareData?.map((data) => (
              <tr key={uuidv4()} className='text-blue-500 font-bold text-sm'>
                <td className='flex flex-row'>
                  <Image
                    className='mr-1'
                    src='./dots.svg'
                    alt='dots'
                    width={5}
                    height={10}
                  />
                  <div className='flex flex-col'>
                    {data.symbol}
                    <p className='text-black text-xs font-normal'>
                      {data.longName}
                    </p>
                  </div>
                </td>
                <td className='text-black font-normal text-xs text-end'>
                  1053
                </td>
                <td className='text-black font-normal text-xs text-end'>
                  {bookCost}p
                </td>
                <td className='text-black font-normal text-xs text-center'>
                  {data.regularMarketPrice}
                </td>
                <td className='text-black font-normal text-xs text-center'>
                  £4,742.86
                </td>
                <td className='text-black font-normal text-xs text-center'>
                  <Image
                    className='ml-1 cursor-pointer'
                    src='./edit.svg'
                    alt='edit'
                    width={10}
                    height={20}
                    onClick={handleShowEdit}
                  />
                </td>
                <td className='text-black font-normal text-xs text-center'>
                  <Image
                    className='ml-1 cursor-pointer'
                    src='./trash-icon.svg'
                    alt='edit'
                    width={25}
                    height={25}
                    onClick={() => handleDelete(data.symbol)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEdit ? (
          <Edit
            handleCloseEdit={handleCloseEdit}
            onSubmit={onSubmit}
            shareUpdateForm={shareUpdateForm!}
            setShareUpdateForm={setShareUpdateForm}
            ticker='SMT.l'
          />
        ) : null}
        {showAddShare ? (
          <AddShare
            handleCloseAddShare={handleCloseAddShare}
            onSubmit={onConfirmAddShare}
            addShareForm={addShareForm}
            setAddShareForm={setAddShareForm}
            tickerSearch={tickerSearch}
          />
        ) : null}
        <div className='self-end flex gap-1 items-center justify-end mt-3'>
          {' '}
          <div className='self-end flex items-center justify-end'>
            {' '}
            <button
              type='submit'
              className='bg-green-400 rounded p-1 hover:bg-green-500 text-xs'
              onClick={() => setShowAddShare(true)}
            >
              Add New Share
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
