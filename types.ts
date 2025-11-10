// Fix: Added import for React to resolve 'Cannot find namespace React' error.
import React from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  description: string;
  moreImages: string[];
}

export interface Beautician {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  availableDates: string[];
  rating: number;
  reviews: number;
}

export interface Salon {
  id: number;
  name:string;
  rating: number;
  reviews: number;
  location: string;
  imageUrl: string;
  beauticians: Beautician[];
}

export interface Service {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Comment {
    id: number;
    user: string;
    avatarUrl: string;
    text: string;
}

export interface Video {
    id: number;
    user: string;
    description: string;
    videoUrl: string;
    avatarUrl: string;
    likes: number;
    commentsCount: number;
    shares: number;
    reposts: number;
    comments: Comment[];
    videoProducts?: number[];
}

export interface Message {
    id: number;
    sender: 'me' | 'them';
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: number;
    userName: string;
    avatarUrl: string;
    lastMessage: string;
    timestamp: string;
    messages: Message[];
}

export interface Order {
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
    total: string;
    items: Product[];
}
