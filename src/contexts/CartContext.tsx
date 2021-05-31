import { createContext, ReactNode, useState } from "react";
import { ProductProps, ProtudoAttributeProps } from "./ProductContext";

interface CartContextData {
  reloadAmount: boolean;
  addProductToCart: (ProtudoAttributeProps) => Promise<void>;
  loadProductIntoCart: () => Promise<StorageProductProps>;
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
  const [reloadAmount, setReloadAmount] = useState<boolean>();

  async function saveOnLocalStorage(
    products: StorageProductProps
  ): Promise<void> {
    try {
      await localStorage.setItem(
        "@SuperMarket:products",
        JSON.stringify({ ...products })
      );
      setReloadAmount(!reloadAmount);
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function getProductAmount(id: string): Promise<number> {
    try {
      const productsOnCart = await loadProductIntoCart();
      let amount = 0;
      Object.keys(productsOnCart).find((idProduct) => {
        idProduct == id ? (amount = productsOnCart[idProduct].amount) : {};
      });
      return amount;
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
    const data = await localStorage.getItem("@SuperMarket:products");
    const Products = data ? (JSON.parse(data) as StorageProductProps) : {};
    if (!Products[id]) return;
    Products[id].amount > 1 ? Products[id].amount-- : delete Products[id];
    await saveOnLocalStorage(Products);
  }
  return (
    <CartContext.Provider
      value={{
        reloadAmount,
        addProductToCart,
        loadProductIntoCart,
        removeProductFromCart,
        productExisteOnCart,
        getProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
