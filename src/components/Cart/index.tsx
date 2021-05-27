import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import styles from "./styles.module.scss";

interface ModalProps {
  value: number;
}

const Cart: React.FC<ModalProps> = ({ value }) => {
  return (
    <div className={styles.cart}>
      <FaShoppingCart size={45} color={"var(--red)"} />
      <div className={styles.modal}>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
};

export default Cart;
