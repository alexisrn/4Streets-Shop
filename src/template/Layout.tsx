import Head from 'next/head'
import React from 'react'
import { Teko } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps{
    title: string,
    children: any,
    color?: any,
}

const teko = Teko({ subsets: ["latin"] })

export default function Layout({title, children, color}:LayoutProps) {
  return (
   <>

    <Head>
        <title>{title}</title>
    </Head>
    <main className={teko.className}>
    <Header color={color} />
   {children}
   </main>
   <Footer />
   </>
  )
}
