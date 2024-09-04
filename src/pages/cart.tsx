import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, total, removeFromCart } = useCart();

  return (
    <div>
      <h1>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - R$ {item.price.toFixed(2)}
                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <h2>Total: R$ {total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
