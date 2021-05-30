import { createContext, useState, ReactNode, useEffect } from "react";

import api from "../services/api";

export interface ProtudoAttributeProps {
  product: ProductProps;
}

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
  productDetailModalOpen: boolean;
  closeProductDetailModal: () => void;
  openProductDetailModal: (ProtudoAttributeProps) => void;
  productOnModal: ProductProps;
}

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextData);

export function ProductsProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [deliveryTax, setDeliveryTax] = useState<number>();
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [productOnModal, setProductOnModal] = useState<ProductProps>(null);
  const [productsOnCart, setProductsOnCart] = useState<ProductProps[]>([]);

  function openProductDetailModal({ product }: ProtudoAttributeProps) {
    setProductOnModal(product);
    setProductDetailModalOpen(true);
    console.log(productDetailModalOpen);
    console.log(product);
  }

  function closeProductDetailModal() {
    setProductDetailModalOpen(false);
  }

  async function fetchProducts() {
    try {
      const { data } = await api.get("/");
      setProducts(data.items);
      setDeliveryTax(data.delivery_tax);
    } catch (error) {
      throw new ErrorEvent(error);
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
        productDetailModalOpen,
        closeProductDetailModal,
        openProductDetailModal,
        productOnModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
