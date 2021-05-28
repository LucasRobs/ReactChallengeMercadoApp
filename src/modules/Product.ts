export interface ProductsProps{
  id: string,
  order_number: string,
  stock: number,
  image: string,
  description: string,
  price: number,
  offer?: number,
  promotion?: {
    kind: string,
    base: number,
    value: number
  }
}
