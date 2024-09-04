import { CartProvider } from '../context/CartContext';
import { Providers } from "@/providers/next-ui";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </CartProvider>
  );
}
