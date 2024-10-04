import React, { useEffect, useState } from 'react'
import CardHome from './Card';
import  { getMenShoes, getMensShirts, getProducts, getSunglasses } from '../utils/api'
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SunglassesHome() {
    const [itens, setItens] = useState<any[]>([]);
    const [shoes, setShoes] = useState<any[]>([]);
    const { addToCart } = useCart();
    const router = useRouter();

    const fetchProducts = async () => {
      const data = await getSunglasses();
      if (data && data.products) { 
        setItens(data.products.slice(0, 4)); 
      }
    };

    const handleAddToCart = (item: { id: number; title: string; price: number; thumbnail: string }) => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail 
      });
    };

    useEffect(() => {
      fetchProducts();
    }, []);
      
  return (
    <>
    <div className='w-full h-full bg-white'>
        <h2 className='text-center text-5xl py-8 font-bold'>OS MELHORES <span className='text-red-600'>OCÚLOS</span></h2>
   
   <div className='flex flex-wrap items-center justify-center gap-20 mb-14'>
    {itens.map((item, i) => (
        <>
        <CardHome key={i} imagem={item.thumbnail} title={item.title} price={item.price} id={item.id} onAddToCart={() => handleAddToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail })}/>
        </>
    ))}
   
    </div>
        <div className='w-full flex justify-center mb-10'>
          <button className='bg-transparent
           hover:bg-black text-black font-semibold hover:text-white py-2 px-9 border border-black hover:border-transparent rounded text-[20px]'>
            <Link href="/acessorios/oculos">Ver Mais</Link>
            </button>
        </div>
    </div>
    </>
  )
}
