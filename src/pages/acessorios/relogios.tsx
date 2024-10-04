import CardHome from '@/components/Card';
import { useCart } from '@/context/CartContext';
import Layout from '@/template/Layout'
import { getCategoryProducts } from '@/utils/api';
import {Breadcrumbs, BreadcrumbItem, Spinner} from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Relogio(props:any) {
    const [itens, setItens] = useState<any[]>([]);
    const [itemWoman, setItemWoman] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const router = useRouter();
  
    const fetchProducts = async () => {
        const data = await getCategoryProducts("mens-watches");
        if (data && data.products) { 
          setItens(data.products); 
        }
        setLoading(false);
      };



      const fetchProductsWoman = async () => {
        const data = await getCategoryProducts("womens-watches");
        if (data && data.products) { 
            setItemWoman(data.products); 
        }
        setLoading(false);
      };

      useEffect(() => {
        fetchProducts();
        fetchProductsWoman()
      }, []);
  
      const handleAddToCart = (item: { id: number; title: string; price: number; thumbnail: string }) => {
        addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail 
        });
      };

  return (
    <>
    <Layout title="Roupas Masculina - 4Streets" color='bg-black/90'  >
        <div className='w-full h-full py-[100px] px-10'>
        <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: "px-2"
      }}
    >
     <BreadcrumbItem> <Link href='/'>Home</Link></BreadcrumbItem>
      <BreadcrumbItem>Acessórios</BreadcrumbItem>
      <BreadcrumbItem>Bolsas</BreadcrumbItem>
    </Breadcrumbs>


    <div className='flex flex-wrap justify-center gap-20 mt-20'>
    {loading ? (
        <div className='flex justify-center items-center h-96'>
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className='flex flex-wrap items-center justify-center gap-20 mb-14'>
          {itens.map((item) => (
            <CardHome
              id={item.id}
              key={item.id}
              imagem={item.thumbnail}
              title={item.title}
              price={item.price}
              onAddToCart={() => handleAddToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail })}
            />
          ))}

{itemWoman.map((item) => (
            <CardHome
              id={item.id}
              key={item.id}
              imagem={item.thumbnail}
              title={item.title}
              price={item.price}
              onAddToCart={() => handleAddToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail })}
            />
          ))}
        </div>
      )}
    </div>
        </div>
    </Layout>
    </>
  )
}
