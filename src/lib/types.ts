export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  provider: string;
  imageUrl: string;
  imageHint: string;
  reviews: Review[];
}

export type Role = 'buyer' | 'provider';
