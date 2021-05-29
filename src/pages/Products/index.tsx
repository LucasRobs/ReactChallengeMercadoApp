import React, { useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { ProductCardPrimary } from "../../components/ProductCardPrimary";
import { Announcement } from "../../components/Announcement";
import styles from "./styles.module.scss";
import { ModalProductDetail } from "../../components/ModalProductDetail";

export default function Products() {
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  function changeStateProductDetailModal() {
    setProductDetailModalOpen(!productDetailModalOpen);
  }
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
      <button type="button" onClick={changeStateProductDetailModal}>
        Open Modal
      </button>

      <ModalProductDetail
        isOpen={productDetailModalOpen}
        changeStateModal={changeStateProductDetailModal}
      />
    </>
  );
}
