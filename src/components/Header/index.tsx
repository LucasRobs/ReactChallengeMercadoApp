import Link from "next/link";
import styles from "./style.module.scss";
import { Cart } from "../Cart";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { totalAmount, updateTotalAmount } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      await updateTotalAmount();
    })();
  }, []);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.cart}>
          <Link href="/cart">
            <button className={styles.cartButton}>
              <Cart value={totalAmount} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
