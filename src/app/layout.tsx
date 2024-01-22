import type { Metadata } from 'next';
import './static/output.css';

import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider';
import Navbar from '@/components/Layout/Navbar/Navbar';
import { css } from '@/utils/css/css';
import { Auth } from '@/components/Auth';


export const metadata: Metadata = {
  title: 'OurTube',
  description: 'OurTube, experience youtube with freedom.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  
  return (
    <html lang="en">
      <head>
        <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
            crossOrigin="anonymous" 
            referrerPolicy="no-referrer" 
          />
      </head>
      <body>
        <SessionProvider session={session}>
          <Auth>
            <Navbar />
            <main className={css("container", "").class} data-type="full">
                {children}
            </main>
          </Auth>
        </SessionProvider>
      </body>
    </html>
  )
}
