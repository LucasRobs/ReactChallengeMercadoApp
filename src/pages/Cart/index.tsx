import React, { useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { ProductCardSecondary } from "../../components/ProductCardSecondary";
import styles from "./styles.module.scss";

export default function Cart() {
  return (
    <>
      <Header />
      <div className={styles.cartContainer}>
        <div className={styles.leftContainerArea}>
          <ProductCardSecondary />
          <ProductCardSecondary />
          <ProductCardSecondary />
          <ProductCardSecondary />
        </div>
        <div className={styles.rightContainerArea}></div>
      </div>
    </>
  );
}
