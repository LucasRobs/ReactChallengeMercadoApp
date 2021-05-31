import { useContext, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";

import {
  ProtudoAttributeProps,
  ProductContext,
} from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import styles from "./styles.module.scss";

export function ProductCardPrimary({ product }: ProtudoAttributeProps) {
  const [amount, setAmount] = useState(0);

  const { openProductDetailModal } = useContext(ProductContext);
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
      <button
        className={styles.modalButton}
        type="button"
        onClick={() => openProductDetailModal({ product })}
      >
        <div className={styles.imageProduct}>
          {product.promotion ? (
            <div className={styles.tagPromotion}>
              <img src="/images/tag.png" />
            </div>
          ) : (
            <></>
          )}
          <img src={product.image} />
        </div>
        <div className={styles.infoProduct}>
          <div className={styles.nameProduct}>{product.description}</div>
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
                  Por:
                </div>
                <div className={styles.offer}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.offer)}
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
        </div>
      </button>
      {amount === 0 ? (
        <div className={styles.buttonsProductAdd}>
          <button onClick={() => addProductToCart({ product })}>
            <FaCartPlus size={25} /> <> Adicionar ao carrinho</>
          </button>
        </div>
      ) : (
        <div className={styles.buttonsProduct}>
          <button onClick={() => removeProductFromCart(product.id)}>
            <AiOutlineMinusCircle size={25} color="red" />
          </button>
          <div className={styles.ammountProduct}>{amount}</div>
          <button onClick={() => addProductToCart({ product })}>
            <AiOutlinePlusCircle size={25} color="green" />
          </button>
        </div>
      )}
    </div>
  );
}
