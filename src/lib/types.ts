export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  photoUrl?: string;
}

export interface ServiceTag {
    name: 'top-rated' | 'new' | 'booked';
    type: 'default' | 'destructive' | 'outline' | 'secondary'
}

export type BookingStatus = 'requested' | 'in progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'in escrow' | 'cleared' | 'refunded';

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
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
}

export type Role = 'buyer' | 'provider';

export type KycStatus = 'pending' | 'verified' | 'rejected' | 'not-started';

export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
  kycStatus: KycStatus;
}
