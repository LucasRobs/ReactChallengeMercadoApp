import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ProductProps } from "../../contexts/ProductContext";

import styles from "./styles.module.scss";

interface ProductProviderProps {
  product: ProductProps;
}

export function ProductCardPrimary({ product }: ProductProviderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tagPromotion}>
        <img src="/images/tag.png" />
      </div>
      <div className={styles.imageProduct}>
        <img src={product.image} />
      </div>

      <div className={styles.infoProduct}>
        <div className={styles.nameProduct}>{product.description}</div>
        <div className={styles.priceProduct}>
          {product.offer ? (
            <>
              <div className={styles.fullprice}>
                De: <s style={{ color: "red" }}>{product.price}</s> Por:
              </div>
              <div className={styles.offer}>{product.offer}</div>
            </>
          ) : (
            <>
              Por:
              <div className={styles.offer}>{product.price}</div>
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonsProduct}>
        <button>
          <AiOutlineMinusCircle size={25} color="red" />
        </button>
        <div className={styles.ammountProduct}>2</div>
        <button>
          <AiOutlinePlusCircle size={25} color="green" />
        </button>
      </div>
    </div>
  );
}
