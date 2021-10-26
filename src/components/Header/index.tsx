import { useContext, useEffect } from "react";
import Link from "next/link";
import { IoMdExit } from 'react-icons/io';
import styles from "./style.module.scss";

import { Cart } from "../Cart";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { totalAmount, updateTotalAmount, logOut } = useContext(CartContext);

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
          <button title="Sair e limpar carrinho" className={styles.exitButton} onClick={logOut}>
            <IoMdExit size={40} color={"var(--red)"}/>
          </button>

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
