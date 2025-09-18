export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  band?: string;
  description: string;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'newest';
