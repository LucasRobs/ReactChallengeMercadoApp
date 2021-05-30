import Link from "next/link";
import styles from "./style.module.scss";
import { Cart } from "../Cart";

export function Header() {
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
              <Cart value={10} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
