import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { ProductsProvider } from "../contexts/ProductContext";
import { CartProvider } from "../contexts/CartContext";
import "../styles/global.scss";

Router.events.on("routeChageStart", (url) => {
  NProgress.start();
});
Router.events.on("routerChangeComplete", () => NProgress.done());
Router.events.on("routerChangeError", () => NProgress.done());

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
