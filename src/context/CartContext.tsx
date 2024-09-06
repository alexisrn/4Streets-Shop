// context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  cartQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Carregar o carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      setTotal(parsedCart.reduce((acc:any, curr:any) => acc + curr.price, 0));
      setCartQuantity(parsedCart.length);
    }
  }, []);

  // Atualizar o localStorage e a quantidade de itens quando o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartQuantity(cart.length); // Atualiza a quantidade de itens no carrinho
  }, [cart]);

  const addToCart = (item: CartItem) => {
    console.log('Adicionando ao carrinho:', item);
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      setTotal(updatedCart.reduce((acc, curr) => acc + curr.price, 0));
      return updatedCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      setTotal(updatedCart.reduce((acc, curr) => acc + curr.price, 0));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, total, cartQuantity, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
