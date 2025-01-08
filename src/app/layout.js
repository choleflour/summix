"use client";
import { Inter } from 'next/font/google'
import Navbar from './components/navbar';
import { usePathname } from 'next/navigation';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata = {
//   title: "summix",
//   description: "Generated for hackSC",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div style={{ padding: 0, margin: 0 }}>
        {(pathname !== '/' && pathname !== '/login' && pathname !== '/preferences' && pathname !== '/create' ) && <Navbar />}
        {children}
        </div>
        
      </body>
    </html>
  )
}