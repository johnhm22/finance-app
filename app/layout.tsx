import Navbar from './components/Navbar';
import './globals.css';
import { UserIdProvider } from './components/UserContext';

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
