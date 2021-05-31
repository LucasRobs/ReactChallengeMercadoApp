import { useContext, useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { CartContext } from "../../contexts/CartContext";
import { ProtudoAttributeProps } from "../../contexts/ProductContext";

import styles from "./styles.module.scss";

export function ProductCardSecondary({ product }: ProtudoAttributeProps) {
  const [amount, setAmount] = useState(0);

  const {
    addProductToCart,
    removeProductFromCart,
    getProductAmount,
    reloadAmount,
  } = useContext(CartContext);

  useEffect(() => {
    getProductAmount(product.id).then((qtd) => {
      setAmount(qtd);
    });
  }, [reloadAmount]);

  return (
    <div className={styles.container}>
      <div className={styles.imageProduct}>
        <img src={product.image} />
      </div>
      <div className={styles.infoProduct}>
        <div className={styles.nameProduct}>{product.description}</div>
        <div className={styles.lowMiddleContainer}>
          <div className={styles.priceProduct}>
            {product.offer ? (
              <>
                <div className={styles.fullprice}>
                  De:{" "}
                  <s style={{ color: "red" }}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </s>{" "}
                  <div className={styles.offer}>
                    <text>
                      Por:
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.offer)}
                    </text>
                  </div>
                </div>
              </>
            ) : (
              <>
                Por:
                <div className={styles.offer}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </div>
              </>
            )}
          </div>
          {product.promotion ? (
            <div className={styles.containerPromotion}>
              <div className={styles.infoPromotion}>
                <div className={styles.discount}>
                  {" "}
                  {Math.floor(amount / product.promotion.base)} unidades gratis
                </div>
                <div className={styles.numbers}>
                  LEVE <span>{product.promotion.value}</span> PAGUE{" "}
                  <span>{product.promotion.base}</span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.buttonsProduct}>
        <button onClick={() => addProductToCart({ product })}>
          <AiOutlinePlusCircle size={25} color="green" />
        </button>
        <div className={styles.ammountProduct}>{amount}</div>
        <button onClick={() => removeProductFromCart(product.id)}>
          <AiOutlineMinusCircle size={25} color="red" />
        </button>
      </div>
    </div>
  );
}
