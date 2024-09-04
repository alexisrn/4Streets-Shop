import Link from 'next/link';
import React from 'react';

interface CardHomeProps {
  imagem: string;
  title: string;
  price: number;
  id: string | number;
  onAddToCart: () => void;
}

export default function CardHome({ imagem, title, price, id, onAddToCart }: CardHomeProps) {
  return (
    <>
    <Link href={`/produto/${id}`}>
    <div className='w-[250px] h-[300px]'>
      <div className='h-[70%]'>
        <img className='w-full h-full' src={imagem} alt={title} />
      </div>
      <p className='text-center text-[22px] mt-4'>{title}</p>
      <p className='text-center text-[24px] font-bold text-red-600'>R$ {price}</p>
    </div>
    </Link>
    </>
  );
}
