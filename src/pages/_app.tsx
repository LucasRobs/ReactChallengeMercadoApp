import { AppProps } from "next/app";
import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/global.scss";
import { ProductsProvider } from "../contexts/ProductContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Supermercado Show</title>
      </Head>
      <ProductsProvider>
        <Header />
        <Component {...pageProps} />
      </ProductsProvider>
    </>
  );
}

export default MyApp;
