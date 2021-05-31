import { createContext, ReactNode, useContext, useState } from "react";
import {
  ProductProps,
  ProductContext,
  ProtudoAttributeProps,
} from "./ProductContext";

interface CartContextData {
  total: number;
  discaunt: number;
  subTotal: number;
  totalAmount: number;
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

  const [total, setTotal] = useState(0);
  const [discaunt, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reloadAmount, setReloadAmount] = useState(false);

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
      return productsOnCart[id] ? true : false;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function addProductToCart({
    product,
  }: ProtudoAttributeProps): Promise<void> {
    try {
      const productsOnCart = await loadProductIntoCart();
      const id = product.id as string;

      if (await productExisteOnCart(id)) {
        let availableStock = 0;
        const product = productsOnCart[id].data;
        if (product.promotion) {
          availableStock =
            product.stock - product.stock / product.promotion.value;
        } else {
          availableStock = product.stock;
        }
        if (availableStock <= productsOnCart[id].amount) return;
        productsOnCart[id].amount++;
        saveOnLocalStorage(productsOnCart);
        return;
      } else {
        const newProduct = {
          [product.id]: {
            data: product,
            amount: 1,
          },
        };
        saveOnLocalStorage({ ...newProduct, ...productsOnCart });
      }
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function loadProductIntoCart(): Promise<StorageProductProps> {
    try {
      const data = await localStorage.getItem("@SuperMarket:products");
      const products = JSON.parse(data) as StorageProductProps;
      return products ? products : {};
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

  async function getSubTotal(): Promise<number> {
    const products = await loadProductIntoCart();
    let summationSubTotal = 0;
    Object.keys(products).map(
      (key) =>
        (summationSubTotal += products[key].data.price * products[key].amount)
    );
    return summationSubTotal;
  }

  async function getTotalWithDiscount(): Promise<number> {
    const products = await loadProductIntoCart();
    let totalWithDiscount = 0;
    Object.keys(products).map((key) => {
      const product = products[key];
      product.data.offer
        ? (totalWithDiscount += product.data.offer * product.amount)
        : (totalWithDiscount += product.data.price * product.amount);
    });
    return totalWithDiscount;
  }

  async function updatePurchaseValues(): Promise<void> {
    const subTotal = await getSubTotal();
    setSubTotal(subTotal);
    const totalWithDiscount = await getTotalWithDiscount();
    setDiscount(subTotal - totalWithDiscount);
    setTotal(totalWithDiscount + deliveryTax);
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
        discaunt,
        subTotal,
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
