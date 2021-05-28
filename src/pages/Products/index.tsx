import { Header } from "../../components/Header";
import { ProductCardPrimary } from "../../components/ProductCardPrimary";
import { Announcement } from "../../components/Announcement";
import styles from "./styles.module.scss";

export default function Products() {
  return (
    <>
      <Header />
      <Announcement />
      <div className={styles.productsContainer}>
        <ProductCardPrimary />
        <ProductCardPrimary />
        <ProductCardPrimary />
        <ProductCardPrimary />
      </div>
    </>
  );
}
