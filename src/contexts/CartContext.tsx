import { createContext, ReactNode, useContext, useState } from "react";
import {
  ProductContext,
  ProductProps,
  ProtudoAttributeProps,
} from "./ProductContext";

interface CartContextData {
  totalAmount: number;
  subTotal: number;
  discaunt: number;
  total: number;
  reloadAmount: boolean;
  addProductToCart: (ProtudoAttributeProps) => Promise<void>;
  loadProductIntoCart: () => Promise<StorageProductProps>;
  updateTotalAmount: () => Promise<void>;
  updatePurchaseValues: () => Promise<void>;
  removeProductFromCart: (id: string) => Promise<void>;
  productExisteOnCart: (id: string) => Promise<Boolean>;
  getProductAmount: (id: string) => Promise<number>;
}

interface CartProviderProps {
  children: ReactNode;
}

export interface StorageProductProps {
  [id: string]: {
    data: ProductProps;
    amount: number;
  };
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const { deliveryTax } = useContext(ProductContext);

  const [totalAmount, setTotalAmount] = useState(0);
  const [reloadAmount, setReloadAmount] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discaunt, setDiscount] = useState(0);

  async function saveOnLocalStorage(
    products: StorageProductProps
  ): Promise<void> {
    try {
      await localStorage.setItem(
        "@SuperMarket:products",
        JSON.stringify({ ...products })
      );
      updateData();
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function getProductAmount(id: string): Promise<number> {
    try {
      const productsOnCart = await loadProductIntoCart();
      const product = productsOnCart[id];
      return product ? product.amount : 0;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function productExisteOnCart(id: string): Promise<boolean> {
    try {
      const productsOnCart = await loadProductIntoCart();
      let existe = false;
      Object.keys(productsOnCart).find((idProduct) => {
        idProduct == id ? (existe = true) : {};
      });
      if (existe) return true;
      return false;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function addProductToCart({
    product,
  }: ProtudoAttributeProps): Promise<void> {
    try {
      const productsOnCart = await loadProductIntoCart();
      if (await productExisteOnCart(product.id as string)) {
        productsOnCart[product.id as string].amount++;
        saveOnLocalStorage(productsOnCart);
        return;
      }
      const newProduct = {
        [product.id]: {
          data: product,
          amount: 1,
        },
      };
      saveOnLocalStorage({ ...newProduct, ...productsOnCart });
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function loadProductIntoCart(): Promise<StorageProductProps> {
    try {
      const data = await localStorage.getItem("@SuperMarket:products");
      const products = JSON.parse(data) as StorageProductProps;
      return products;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function removeProductFromCart(id: string): Promise<void> {
    const products = await loadProductIntoCart();
    if (!products[id]) return;
    products[id].amount > 1 ? products[id].amount-- : delete products[id];
    await saveOnLocalStorage(products);
  }

  async function updateTotalAmount(): Promise<void> {
    const products = await loadProductIntoCart();
    let summationAmmount = 0;
    Object.keys(products).map(
      (key) => (summationAmmount += products[key].amount)
    );
    setTotalAmount(summationAmmount);
  }

  async function updatePurchaseValues(): Promise<void> {
    const products = await loadProductIntoCart();
    let summationSubTotal = 0;
    Object.keys(products).map(
      (key) =>
        (summationSubTotal += products[key].data.price * products[key].amount)
    );
    setSubTotal(summationSubTotal);
    let summationTotalWithDiscount = 0;
    Object.keys(products).map((key) =>
      products[key].data.offer
        ? (summationTotalWithDiscount +=
            products[key].data.offer * products[key].amount)
        : (summationTotalWithDiscount +=
            products[key].data.price * products[key].amount)
    );
    setDiscount(summationSubTotal - summationTotalWithDiscount);

    setTotal(summationTotalWithDiscount + deliveryTax);
  }

  async function updateData() {
    setReloadAmount(!reloadAmount);
    await updateTotalAmount();
    await updatePurchaseValues();
  }

  return (
    <CartContext.Provider
      value={{
        total,
        subTotal,
        discaunt,
        totalAmount,
        reloadAmount,
        addProductToCart,
        getProductAmount,
        updateTotalAmount,
        loadProductIntoCart,
        productExisteOnCart,
        updatePurchaseValues,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
