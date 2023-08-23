import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Stock Exchange',
  description: 'Check how rich you are',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
