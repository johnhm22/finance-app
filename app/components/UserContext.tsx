'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUserId } from '@/app/utils/getUserId';
import { Payload } from '@/types';

export type GlobalContent = {
  payloadData: Record<string, any>;
  setPayloadData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const UserIdContext = createContext<GlobalContent>({
  payloadData: {
    exp: 0,
    firstName: '',
    iat: 0,
    id: '',
    lastName: '',
    role: '',
    username: '',
  },
  setPayloadData: () => {},
});

export const UserIdProvider = ({ children }: { children: ReactNode }) => {
  const [payloadData, setPayloadData] = useState<Record<string, any>>({
    exp: 0,
    firstName: '',
    iat: 0,
    id: '',
    lastName: '',
    role: '',
    username: '',
  });

  const getPayload = async () => {
    const payload: Record<string, any | undefined> = await getUserId();
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
