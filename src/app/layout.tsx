import type { Metadata } from 'next';
import './output.css';

import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider';


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
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
