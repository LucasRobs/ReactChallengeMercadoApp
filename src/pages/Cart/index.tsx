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
        <div className={styles.rightContainerArea}>
          <div className={styles.valuesInformation}>
            <div className={styles.values}>
              <div>Subtotal:</div> <div>R$5,50</div>
            </div>
            <div className={styles.values}>
              <div>Taxa de Entrega:</div> <div>R$8,50</div>
            </div>
            <div className={styles.values}>
              <div>Economia:</div> <div>- R$3,50</div>
            </div>
            <hr />
            <div className={styles.values}>
              <div>Total:</div> <div>R$14,00</div>
            </div>
          </div>
          <div className={styles.checkOut}>
            <button type="button">Finalizar Pedido</button>
          </div>
        </div>
      </div>
    </>
  );
}
