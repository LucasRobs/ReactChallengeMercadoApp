import Modal from "react-modal";
import styles from "./styles.module.scss";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineClose,
} from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  changeStateModal: () => void;
}
export function ModalProductDetail(modalProps: ModalProps) {
  const { isOpen, changeStateModal } = modalProps;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={changeStateModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <button className={styles.buttonCloseModal} onClick={changeStateModal}>
        <AiOutlineClose size={25} />
      </button>

      <div className={styles.imageProduct}>
        <img src="/images/abacaxi.png" />
      </div>
      <div className={styles.rightInformation}>
        <div className={styles.infoProduct}>
          <div className={styles.nameProduct}>
            ABSORVENTE ALWAYS PROTETOR DIARIO LEVE 40 PAGUE 35 UNIDADES
          </div>
          <div className={styles.price}>
            <div className={styles.fullprice}>
              De:{" "}
              <s style={{ color: "red" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(3.4)}
              </s>{" "}
              Por:
            </div>
            <div className={styles.offer}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(2.3)}
            </div>
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
        <div className={styles.infoPromotion}>
          3 unidades gratis
          <div className={styles.discount}>Meu desconto</div>
          <div className={styles.numbers}>
            LEVE <span>4</span> PAGUE <span>3</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
