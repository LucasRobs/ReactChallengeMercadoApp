import Head from "next/head";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { ProductsProvider } from "../contexts/ProductContext";
import { CartProvider } from "../contexts/CartContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SuperShow!</title>
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
