import styles from "./style.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="logo" />
        </div>

        <div className={styles.cart}>
          <button className={styles.cartButton}>
            <div>
              <Cart value={10} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
