import React, { useState, useEffect, useContext } from "react";

import api from "../services/api";

import { ProductCardPrimary } from "../components/ProductCardPrimary";
import { Announcement } from "../components/Announcement";
import { ModalProductDetail } from "../components/ModalProductDetail";

import { ProductContext, ProductProps } from "../contexts/ProductContext";

import styles from "./styles.module.scss";

export default function Products() {
  const { products } = useContext(ProductContext);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);

  function changeStateProductDetailModal() {
    setProductDetailModalOpen(!productDetailModalOpen);
    //console.log(products);
  }

  return (
    <>
      <Announcement />
      <div className={styles.productsContainer}>
        {products ? (
          <>
            {products.map((product: ProductProps) => (
              <ProductCardPrimary key={product.id} />
            ))}
          </>
        ) : (
          <>pera ae garai</>
        )}
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
