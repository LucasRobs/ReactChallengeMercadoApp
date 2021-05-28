import { ProductCardPrimary } from "../../components/ProductCardPrimary";
import styles from "./styles.module.scss";

export default function Products() {
  return (
    <>
      <div className={styles.productsContainer}>
        <ProductCardPrimary />
        <ProductCardPrimary />
        <ProductCardPrimary />
        <ProductCardPrimary />
      </div>
    </>
  );
}
