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
        {(pathname !== '/' && pathname !== '/login') && <Navbar />}
        {children}
      </body>
    </html>
  )
}