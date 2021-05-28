import Modal from "react-modal";
import styles from "./styles.module.scss";

import { ProductProps } from "../../modules/Product";
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
        <div className={styles.infoPromotion}>Você ganha 3 unidades gratis</div>
      </div>
    </Modal>
  );
}
