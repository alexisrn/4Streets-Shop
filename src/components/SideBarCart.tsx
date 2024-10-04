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
      <div className="z-10 w-full bg-black/70 flex justify-end fixed inset-0">
        <div className='w-[300px] h-full bg-white text-black'>
          <p className='text-2xl flex justify-end'>
            <IoCloseOutline className='text-end cursor-pointer' onClick={props.close} />
          </p>

          <h2 className='text-center text-3xl mb-[30px]'>Carrinho</h2>

          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <div className="overflow-y-scroll max-h-[60vh] px-4"> {/* Adiciona a rolagem */}
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

              <div className='flex justify-center'>
                <h2 className='border-t-1 border-b-1 py-[10px] px-[30px] font-bold text-xl'>
                  Subtotal: R$ {total.toFixed(2)}
                </h2>
              </div>
            </div>
          )}

          <div className='flex justify-center mt-4'>
            <button className='bg-red-500 text-white text-xl py-2 px-[55px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-red-700'>
              Finalizar Pedido
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
