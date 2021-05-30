import { createContext, ReactNode } from "react";
import { ProductProps, ProtudoAttributeProps } from "./ProductContext";

interface CartContextData {
  addProductToCart: (ProtudoAttributeProps) => Promise<void>;
  loadProductIntoCart: () => Promise<StorageProductProps[]>;
  removeProductFromCart: (id: string) => Promise<void>;
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
  async function saveOnLocalStorage(
    products: StorageProductProps
  ): Promise<void> {
    try {
      await localStorage.setItem(
        "@SuperMarket:products",
        JSON.stringify({ ...products })
      );
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function productExiste(id: string): Promise<boolean> {
    const data = await localStorage.getItem("@SuperMarket:products");
    const oldProducts = data ? (JSON.parse(data) as StorageProductProps) : {};
    let existe = false;
    Object.keys(oldProducts).find((oldProduct) => {
      oldProduct == id ? (existe = true) : {};
    });
    if (existe) return true;
    else return false;
  }

  async function addProductToCart({
    product,
  }: ProtudoAttributeProps): Promise<void> {
    try {
      const data = await localStorage.getItem("@SuperMarket:products");
      const oldProducts = data ? (JSON.parse(data) as StorageProductProps) : {};
      if (await productExiste(product.id as string)) {
        oldProducts[product.id as string].amount++;
        saveOnLocalStorage(oldProducts);
        return;
      }
      const newProduct = {
        [product.id]: {
          data: product,
          amount: 1,
        },
      };
      saveOnLocalStorage({ ...newProduct, ...oldProducts });
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function loadProductIntoCart(): Promise<StorageProductProps[]> {
    try {
      const data = await localStorage.getItem("@SuperMarket:products");
      const products = JSON.parse(data) as StorageProductProps[];
      return products;
    } catch (error) {
      throw new ErrorEvent(error);
    }
  }

  async function removeProductFromCart(id: string): Promise<void> {
    const data = await localStorage.getItem("@SuperMarket:products");
    const Products = data ? (JSON.parse(data) as StorageProductProps) : {};
    Products[id].amount > 1 ? Products[id].amount-- : delete Products[id];
    await localStorage.setItem(
      "@SuperMarket:products",
      JSON.stringify(Products)
    );
  }
  return (
    <CartContext.Provider
      value={{ addProductToCart, loadProductIntoCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
