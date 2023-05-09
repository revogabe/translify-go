import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './Provider'
import { SideBar } from '@/components/SideBar'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Translify GO',
  description: 'Chat with artificial intelligence to learn english',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex bg-zinc-900 selection:bg-emerald-500 selection:text-white">
        <Provider>
          <SideBar />
          <div className="w-full">{children}</div>
          <Analytics />
        </Provider>
      </body>
    </html>
  )
}
