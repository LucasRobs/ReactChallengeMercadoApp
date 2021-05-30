import { AppProps } from "next/app";
import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/global.scss";
import { ProductsProvider } from "../contexts/ProductContext";
import { CartProvider } from "../contexts/CartContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Supermercado Show</title>
      </Head>
      <ProductsProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default MyApp;
