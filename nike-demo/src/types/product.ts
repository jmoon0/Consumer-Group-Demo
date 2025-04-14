export interface Product {
  // Product data
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  sport?: string;
  fit?: string;
  collection?: string;
  // For UI
  salePrice: number | null;
  image: string;
  colors: number;
  isNew: boolean;
}
