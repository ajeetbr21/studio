export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

export interface ServiceTag {
    name: 'top-rated' | 'new' | 'booked';
    type: 'default' | 'destructive' | 'outline' | 'secondary'
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
  tags?: ServiceTag[];
}

export type Role = 'buyer' | 'provider';
