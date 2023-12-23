import type { Metadata } from 'next'
import './output.css'


export const metadata: Metadata = {
  title: 'OurTube',
  description: 'OurTube, experience youtube with freedom.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
