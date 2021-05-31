import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";

import { ProductCardSecondary } from "../../components/ProductCardSecondary";
import { ProductContext, ProductProps } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import styles from "./styles.module.scss";

export default function Cart() {
  const [productsOnCart, setProductsOnCart] = useState<ProductProps[]>([]);

  useEffect(() => {
    (async () => {
      await updatePurchaseValues();
    })();
  }, []);

  useEffect(() => {
    loadProductIntoCart().then((productsInLocalStorage) => {
      const productsData = Object.keys(productsInLocalStorage).map(
        (key) => productsInLocalStorage[key].data
      );
      setProductsOnCart(productsData);
    });
  }, []);

  const { deliveryTax } = useContext(ProductContext);
  const {
    loadProductIntoCart,
    updatePurchaseValues,
    subTotal,
    discaunt,
    total,
  } = useContext(CartContext);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.leftContainerArea}>
          {productsOnCart ? (
            <>
              {productsOnCart.map((product: ProductProps) => (
                <ProductCardSecondary key={product.id} product={product} />
              ))}
            </>
          ) : (
            <>pera ae garai</>
          )}
        </div>
        <div className={styles.rightContainerArea}>
          <div className={styles.valuesInformation}>
            <div className={styles.values}>
              <div>Subtotal:</div>{" "}
              <div>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(subTotal)}
              </div>
            </div>
            <div className={styles.values}>
              <div>Taxa de Entrega:</div>{" "}
              <div>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(deliveryTax)}
              </div>
            </div>
            <div className={styles.values}>
              <div>Desconto:</div>{" "}
              <div>
                -{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(discaunt)}
              </div>
            </div>
            <hr />
            <div className={styles.values}>
              <div>Total:</div>{" "}
              <div>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </div>
            </div>
          </div>
          <div className={styles.checkOut}>
            <button type="button">Finalizar Pedido</button>
          </div>
        </div>
      </div>
      <div className={styles.comeback}>
        <button>
          <Link href="/">
            <BiArrowBack size={50} />
          </Link>
        </button>
      </div>
    </>
  );
}
