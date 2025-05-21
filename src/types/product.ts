
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  featured?: boolean;
  stock: number;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}
