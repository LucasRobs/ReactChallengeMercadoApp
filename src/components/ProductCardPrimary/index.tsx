import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ProtudoAttributeProps } from "../../contexts/ProductContext";
import { ProductContext } from "../../contexts/ProductContext";
import { useContext } from "react";
import styles from "./styles.module.scss";

export function ProductCardPrimary({ product }: ProtudoAttributeProps) {
  const { openProductDetailModal } = useContext(ProductContext);
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
      <div className={styles.buttonsProduct}>
        <button>
          <AiOutlineMinusCircle size={25} color="red" />
        </button>
        <div className={styles.ammountProduct}>0</div>
        <button>
          <AiOutlinePlusCircle size={25} color="green" />
        </button>
      </div>
    </div>
  );
}
