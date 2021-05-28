import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./styles.module.scss";

export function ProductCardPrimary() {
  return (
    <div className={styles.container}>
      <div className={styles.tagPromotion}>
        <img src="/images/tag.png" />
      </div>
      <div className={styles.imageProduct}>
        <img src="/images/abacaxi.png" />
      </div>

      <div className={styles.infoProduct}>
        <div className={styles.nameProduct}>Abacaxi</div>
        <div className={styles.priceProduct}>
          <div className={styles.fullprice}>
            <s>R$6,50</s>
          </div>
          <div className={styles.offer}> R$3,40</div>
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
