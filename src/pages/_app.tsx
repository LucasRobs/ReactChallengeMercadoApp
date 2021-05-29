import { AppProps } from "next/app";
import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/global.scss";
import Products from "./Products";
import Cart from "../pages/Cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Supermercado Show</title>
      </Head>
      <Cart />
    </>
  );
}

export default MyApp;
