import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getCategoryProducts } from '../utils/api';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import CardHome from './Card';

export default function RoupasHome(props: any) {
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getCategoryProducts(props.value);
      if (data && data.products) {
        setItens(data.products.slice(0, 4));
      }
      setLoading(false);
    };

    fetchProducts();
  }, [props.value]);

  const handleAddToCart = (item: { id: number; title: string; price: number }) => {
    addToCart(item); 
  };

  return (
    <div className='w-full h-full bg-white'>
      <h2 className='text-center text-5xl py-8 font-bold'>
        PRODUTOS EM <span className='text-red-600'>PROMOÇÃO</span>
      </h2>
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
              onAddToCart={() => handleAddToCart({ id: item.id, title: item.title, price: item.price })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
