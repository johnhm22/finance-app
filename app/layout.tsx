import { useContext, useState } from 'react';

import Navbar from './components/Navbar';
import './globals.css';
import { UserIdProvider } from './components/UserContext';

// export const metadata = {
//   title: 'Stock Exchange',
//   description: 'Check how rich you are',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // const userAuthentication = () => {
  //   setUserLoggedIn(!isUserLoggedIn);
  // };

  return (
    <html lang='en'>
      <body className='relative'>
        <UserIdProvider>
          <Navbar
          // isUserLoggedIn={isUserLoggedIn}
          // userAuthentication={userAuthentication}
          />
          {children}
        </UserIdProvider>
      </body>
    </html>
  );
}
