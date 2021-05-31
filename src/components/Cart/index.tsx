import React from "react";
import { FaShoppingCart } from "react-icons/fa";

import styles from "./styles.module.scss";

export function Cart({ value }) {
  return (
    <div className={styles.cart}>
      <FaShoppingCart size={45} color={"var(--red)"} />
      <div className={styles.modal}>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
}
