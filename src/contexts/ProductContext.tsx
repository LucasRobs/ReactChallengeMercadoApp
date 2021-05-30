import { createContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api";

export interface ProductProps {
  id: string;
  order_number: string;
  stock: number;
  image: string;
  description: string;
  price: number;
  offer?: number;
  promotion?: {
    kind: string;
    base: number;
    value: number;
  };
}

interface ProductContextData {
  products: ProductProps[];
  deliveryTax: number;
}

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextData);

export function ProductsProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [deliveryTax, setDeliveryTax] = useState<number>();

  async function fetchProducts() {
    try {
      const { data } = await api.get("/");
      setProducts(data.items);
      console.log(data.items);
      setDeliveryTax(data.delivery_tax);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        deliveryTax,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
