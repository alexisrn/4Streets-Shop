import { useCart } from '@/context/CartContext';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface SideBarCartProps { 
  close: () => void;
}

export default function SideBarCart(props: SideBarCartProps) {
  const { cart, total, removeFromCart } = useCart();

  return (
    <>
      <div className="z-10 w-full bg-black/70 flex justify-end" style={{ height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <div className='w-[300px] h-full bg-white text-black'>
          <p className='text-2xl flex justify-end'>
            <IoCloseOutline className='text-end cursor-pointer' onClick={props.close} />
          </p>

          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center mb-4">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-red-500 text-sm ml-4"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              <h2>Total: R$ {total.toFixed(2)}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
