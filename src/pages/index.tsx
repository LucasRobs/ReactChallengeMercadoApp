import React, { useContext } from "react";

import { ProductCardPrimary } from "../components/ProductCardPrimary";
import { Announcement } from "../components/Announcement";
import { ModalProductDetail } from "../components/ModalProductDetail";

import { ProductContext, ProductProps } from "../contexts/ProductContext";

import styles from "./styles.module.scss";

export default function Products() {
  const { productDetailModalOpen, closeProductDetailModal, products } =
    useContext(ProductContext);

  return (
    <>
      <Announcement />
      <div className={styles.productsContainer}>
        {products ? (
          <>
            {products.map((product: ProductProps) => (
              <ProductCardPrimary key={product.id} product={product} />
            ))}
          </>
        ) : (
          <>pera ae garai</>
        )}
      </div>
      <ModalProductDetail
        isOpen={productDetailModalOpen}
        closeModal={closeProductDetailModal}
      />
    </>
  );
}
