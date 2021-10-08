import { createContext, useState, ReactNode, useEffect } from "react";

import api from "../services/api";

export interface ProtudoAttributeProps {
  product: ProductProps;
}

export interface ProductProps {
  id: string;
  image: string;
  price: number;
  stock: number;
  offer?: number;
  description: string;
  order_number: string;
  promotion?: {
    kind: string;
    base: number;
    value: number;
  };
}

interface ProductContextData {
  deliveryTax: number;
  products: ProductProps[];
  productOnModal: ProductProps;
  productDetailModalOpen: boolean;
  closeProductDetailModal: () => void;
  openProductDetailModal: (ProtudoAttributeProps) => void;
  loading?: boolean;
}

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextData);

export function ProductsProvider({ children }: ProductProviderProps) {
  const [deliveryTax, setDeliveryTax] = useState<number>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productOnModal, setProductOnModal] = useState<ProductProps>();
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setProductLoading(true);
      const { data } = await api.get("/");
      setProducts(data.items);
      setDeliveryTax(data.delivery_tax);
    } catch (error) {
      setProductLoading(false);
      throw new ErrorEvent(error);
    } finally {
      setProductLoading(false);
    }
  }

  function openProductDetailModal({ product }: ProtudoAttributeProps) {
    setProductOnModal(product);
    setProductDetailModalOpen(true);
  }

  function closeProductDetailModal() {
    setProductDetailModalOpen(false);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        deliveryTax,
        productOnModal,
        productDetailModalOpen,
        closeProductDetailModal,
        openProductDetailModal,
        loading: productLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
