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
   
    </>
  )
}
