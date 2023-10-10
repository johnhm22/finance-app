'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddShareForm, IShareDataToEdit } from '@/types';

import Edit from '../components/EditShare';
import AddShare from '../components/AddShare';
import { findTicker } from '@/app/utils/ticker.search.helper';
import { useGlobalContext } from '../components/UserContext';
import Button from '../components/Button';
import { decimalFormatter } from '../utils/numberFormat.helper';

interface IShareData {
  id: string;
  exchange_acronym: string;
  exchange_city: string;
  exchange_country: string;
  exchange_name: string;
  mic: string;
  price: number;
  quantity: number;
  share_name: string;
  symbol: string;
  bookCost: number;
}

const Page = () => {
  const { payloadData } = useGlobalContext();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAddShare, setShowAddShare] = useState<boolean>(false);
  const [shareData, setShareData] = useState<IShareData[]>();

  const [shareDataToEdit, setShareDataToEdit] = useState<IShareDataToEdit>({
    id: '',
    symbol: '',
    bookCost: 0,
    quantity: 0,
  });

  const [addShareForm, setAddShareForm] = React.useState<AddShareForm>({
    bookCost: 0,
    quantity: 0,
    ticker: {
      country: '',
      has_eod: false,
      has_intraday: false,
      name: '',
      symbol: '',
      stock_exchange: {
        acronym: '',
        city: '',
        country: '',
        country_code: '',
        mic: '',
        name: '',
        website: '',
      },
    },
  });

  useEffect(() => {
    getPortfolioQuotes();
  }, [payloadData]);

  const getPortfolioQuotes = async () => {
    if (payloadData) {
      try {
        const response = await axios({
          method: 'GET',
          url: `api/portfolio/${payloadData.id}`,
        });
        setShareData(response.data.stocksHeld);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  };

  const totalCost = shareData?.reduce(
    (accumVal: number, currVal: IShareData) => {
      return accumVal + (currVal.bookCost / 100) * currVal.quantity;
    },
    0
  );

  const totalValue: number | undefined = shareData?.reduce(
    (accumVal: number, currVal: IShareData) => {
      return accumVal + +((currVal.quantity * currVal.price) / 100).toFixed(2);
    },
    0
  );

  const tickerSearch = async (data: string) => {
    const response = await findTicker(data);
    return response;
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleCloseAddShare = () => {
    setShowAddShare(false);
  };

  const handleShowEdit = (
    id: string,
    symbol: string,
    bookCost: number,
    quantity: number
  ) => {
    setShareDataToEdit({
      id: id,
      symbol: symbol,
      bookCost: bookCost,
      quantity: quantity,
    });
    setShowEdit((prevState) => !prevState);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios({
        url: `api/share/${id}`,
        method: 'DELETE',
      });
      const filteredShares = shareData?.filter((data) => data.id !== id);
      setShareData(filteredShares);
    } catch (e) {
      console.log('Deletion error: ', e);
    }
  };

  const editSharesHeld = async (shareDataToEdit: IShareDataToEdit) => {
    const { symbol, quantity, bookCost, id } = shareDataToEdit;
    const updatedShare = await axios({
      url: `api/share/${id}`,
      method: 'PUT',
      data: {
        symbol,
        quantity,
        bookCost,
        id,
      },
    });
    return updatedShare;
  };

  const onConfirmEditShare = async (shareDataToEdit: IShareDataToEdit) => {
    const response = await editSharesHeld(shareDataToEdit);
    if (response.status === 200) {
      setShareData((prevState) => {
        let updatedShareIndex = prevState?.findIndex(
          (share) => share.id === response.data.updatedShare.id
        );
        if (updatedShareIndex !== -1) {
          prevState![updatedShareIndex!] = response.data.updatedShare;
        }
        return prevState;
      });
    }
    setShowEdit(false);
    setShareDataToEdit({
      id: '',
      symbol: '',
      bookCost: 0,
      quantity: 0,
    });
  };

  const onConfirmAddShare = async (
    addShareForm: AddShareForm,
    userId: string
  ) => {
    try {
      const { bookCost, quantity } = addShareForm;
      const { name, symbol } = addShareForm.ticker;
      const { stock_exchange } = addShareForm.ticker;
      const response = await axios({
        method: 'POST',
        url: 'api/share',
        data: {
          symbol,
          mic: stock_exchange.mic,
          share_name: name,
          exchange_acronym: stock_exchange.acronym,
          exchange_name: stock_exchange.name,
          exchange_country: stock_exchange.country,
          exchange_city: stock_exchange.city,
          bookCost: +bookCost,
          quantity: Math.round(+quantity),
          userId,
        },
      });
      if (response) {
        try {
          const res = await axios({
            url: `api/quote/${symbol}`,
            method: 'GET',
          });
          const newShare = response.data.response;

          const shareToAdd = {
            id: response.data.response.id,
            exchange_acronym: newShare.exchange_acronym,
            exchange_city: newShare.exchange_city,
            exchange_country: newShare.exchange_country,
            exchange_name: newShare.exchange_name,
            mic: newShare.mic,
            quantity: newShare.quantity,
            share_name: response.data.response.share_name,
            symbol: newShare.symbol,
            bookCost: newShare.bookCost,
            price: res.data.response.data[0].close,
          };

          setShareData((prevState) => [...(prevState || []), shareToAdd]);
        } catch (e) {
          console.log('Error getting quote: ', e);
        }
      }
    } catch (e) {
      console.log('Error: ', e);
    }
    setShowAddShare(false);
    setAddShareForm({
      bookCost: 0,
      quantity: 0,
      ticker: {
        country: '',
        has_eod: false,
        has_intraday: false,
        name: '',
        symbol: '',
        stock_exchange: {
          acronym: '',
          city: '',
          country: '',
          country_code: '',
          mic: '',
          name: '',
          website: '',
        },
      },
    });
  };

  return (
    <main className='flex h-screen flex-col items-center bg-slate-200'>
      <div className='flex flex-row w-11/12 md:w-2/3 bg-white justify-between px-2 py-5 items-center mt-28 drop-shadow-md'>
        <p className='font-semibold items-center'>Summary</p>
        <div className='flex flex-col'>
          <p className=''>Total Value</p>
          <p className='font-semibold'>£ {decimalFormatter(totalValue!)}</p>
        </div>

        <div className='flex flex-col'>
          {' '}
          <p className=''>Total Cost</p>
          <p className='font-semibold'>£ {decimalFormatter(totalCost!)}</p>
        </div>

        <div>
          {' '}
          <p className=''>Profit/Loss</p>
          <p className='font-semibold'>
            £ {decimalFormatter(+(totalValue! - totalCost!))}
          </p>
        </div>
      </div>
      <div className='bg-white drop-shadow-md  w-11/12 md:w-2/3 mt-5 px-2 py-5 overflow-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <h2 className={'font-semibold text-base pb-2 mr-2'}>
              {' '}
              Investments
            </h2>
          </div>
          <div className='flex flex-row text-xs'>
            <div className='basis-3/4 flex flex-row'></div>
          </div>
        </div>
        <table className='border-separate w-full '>
          <thead>
            <tr className='bg-indigo-50 font-semibold text-xs'>
              <th className='p-2 w-40'>Symbol/Name</th>
              <th className='p-2 w-32'>Quantity</th>
              <th className='p-2 w-32'>Book Cost</th>
              <th className='p-2'>Price</th>
              <th className=' p-2'>Value</th>
              <th className='p-2'>Edit/delete</th>
            </tr>
          </thead>
          <tbody>
            {shareData?.map((data) => (
              <tr key={data.id}>
                <td className='flex flex-row'>
                  <div className='flex flex-col text-blue-700 font-bold text-sm'>
                    {data.symbol}
                    <p className='text-black text-xs font-normal'>
                      {data.share_name}
                    </p>
                  </div>
                </td>
                <td className='text-black font-normal text-xs text-end pr-2'>
                  {data.quantity}
                </td>
                <td className='text-black font-normal text-xs text-end pr-2'>
                  {data.bookCost}p
                </td>
                <td className='text-black font-normal text-xs text-center'>
                  {decimalFormatter(+data.price)}p
                </td>
                <td className='text-black font-normal text-xs text-right'>
                  £ {decimalFormatter(+(data.quantity * +(data.price / 100)))}
                </td>
                <td className='flex flex-row gap-2 text-black font-normal text-xs justify-center h-full items-center'>
                  <Image
                    className=' ml-1 cursor-pointer'
                    src='./edit.svg'
                    alt='edit'
                    width={15}
                    height={25}
                    onClick={() =>
                      handleShowEdit(
                        data.id,
                        data.symbol,
                        data.bookCost,
                        data.quantity
                      )
                    }
                  />
                  <Image
                    className='cursor-pointer'
                    src='./trash-icon.svg'
                    alt='edit'
                    width={35}
                    height={35}
                    onClick={() => handleDelete(data.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>{' '}
        <div className='self-end flex items-center justify-end mt-3'>
          {' '}
          <Button
            label='Add New Share'
            backgroundColour='bg-green-400'
            textColour='text-black'
            onClick={() => setShowAddShare(true)}
          />
        </div>
        <div className='justify-start font-light text-sm italic'>
          Price = end of day
        </div>
      </div>
      {showEdit ? (
        <Edit
          handleCloseEdit={handleCloseEdit}
          onSubmit={onConfirmEditShare}
          shareDataToEdit={shareDataToEdit}
          setShareDataToEdit={setShareDataToEdit}
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
    </main>
  );
};

export default Page;
