'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getUserId } from '@/app/utils/getUserId';
import { Payload } from '@/types';
import { JwtPayload } from 'jsonwebtoken';

// const UserIdContext = createContext<JwtPayload>({
//   exp: 0,
//   firstName: '',
//   iat: 0,
//   id: '',
//   lastName: '',
//   role: '',
//   username: '',
// });

const UserIdContext = createContext({});

// type Children = React.FC

export const UserIdProvider = ({ children }) => {
  const [payloadData, setPayloadData] = useState<JwtPayload | string | null>();

  const getPayload = async () => {
    const payload = await getUserId();
    setPayloadData(payload);
  };

  useEffect(() => {
    getPayload();
  }, []);

  return (
    <UserIdContext.Provider value={{ payloadData, setPayloadData }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useGlobalContext = () => useContext(UserIdContext);
