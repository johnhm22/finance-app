import { Metadata } from 'next';

import Navbar from './components/Navbar';
import './globals.css';
import { UserIdProvider } from './components/UserContext';

export const metadata: Metadata = {
  title: 'My finance app',
  description:
    'Designed primarily as a learning exercise to improve knowledge of Next.js v13 and tailwind.css. The functionality enables a user to look up share prices and create a portfolio.',
  authors: [{ name: 'John Morgan' }],
  openGraph: {
    type: 'website',
    url: 'https://finance-app-puce.vercel.app/',
    title: 'My finance app',
    description:
      'Designed primarily as a learning exercise to improve knowledge of Next.js v13 and tailwind.css. The functionality enables a user to look up share prices and create a portfolio.',
    images: [
      {
        url: 'https://res.cloudinary.com/dbu5rpxkg/image/upload/v1698662802/finance_ngrwxn.png',
        width: '1200',
        height: '630',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <UserIdProvider>
          <Navbar />
          {children}
        </UserIdProvider>
      </body>
    </html>
  );
}
