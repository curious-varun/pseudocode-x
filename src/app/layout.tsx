import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/providers';


const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={jakarta.className}>
        <div className='max-w-[2200px] mx-auto'>
          {children}
        </div>
      </body>
    </html >
  );
}
