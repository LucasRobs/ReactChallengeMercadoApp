import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";

import Modal from "react-modal";
import styles from "./styles.module.scss";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { CartContext } from "../../contexts/CartContext";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
export function ModalProductDetail(modalProps: ModalProps) {
  const [amount, setAmount] = useState(0);

  const {
    addProductToCart,
    removeProductFromCart,
    getProductAmount,
    reloadAmount,
  } = useContext(CartContext);
  const { productOnModal } = useContext(ProductContext);

  const { isOpen, closeModal } = modalProps;

  useEffect(() => {
    if (productOnModal)
      getProductAmount(productOnModal.id).then((amount) => {
        setAmount(amount);
      });
  }, [reloadAmount, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <button className={styles.buttonCloseModal} onClick={closeModal}>
        <AiOutlineClose size={25} />
      </button>
      {productOnModal ? (
        <>
          <div className={styles.imageProduct}>
            <img src={productOnModal.image} />
          </div>
          <div className={styles.rightInformation}>
            <div className={styles.infoProduct}>
              <div className={styles.nameProduct}>
                {productOnModal.description}
              </div>
              {productOnModal.offer ? (
                <div className={styles.price}>
                  <div className={styles.fullprice}>
                    De:{" "}
                    <s style={{ color: "red" }}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(productOnModal.price)}
                    </s>{" "}
                    Por:
                  </div>
                  <div className={styles.offer}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(productOnModal.offer)}
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.price}>
                    <div className={styles.fullprice}>Por:</div>
                    <div className={styles.offer}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(productOnModal.price)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.buttonsProduct}>
              <button onClick={() => removeProductFromCart(productOnModal.id)}>
                <AiOutlineMinusCircle size={25} color="red" />
              </button>
              <div className={styles.ammountProduct}>{amount}</div>
              <button
                onClick={() => addProductToCart({ product: productOnModal })}
              >
                <AiOutlinePlusCircle size={25} color="green" />
              </button>
            </div>
            {productOnModal.promotion ? (
              <div className={styles.infoPromotion}>
                {Math.floor(amount / productOnModal.promotion.base)} unidades
                gratis
                <div className={styles.discount}>Meu desconto</div>
                <div className={styles.numbers}>
                  LEVE <span>{productOnModal.promotion.value}</span> PAGUE{" "}
                  <span>{productOnModal.promotion.base}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </Modal>
  );
}
