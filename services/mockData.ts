import { Product, Salon, Service, Video, Beautician, Comment, Conversation, Order } from '../types';
import { SparklesIcon, ScissorsIcon, PaintBrushIcon, HeartIcon } from '../components/IconComponents';

const generateMoreImages = (seed: number, count: number): string[] => {
    return Array.from({ length: count }, (_, i) => `https://picsum.photos/600/800?random=${seed + i + 1}`);
};

export const trendingProducts: Product[] = [
  { 
    id: 1, 
    name: 'Vintage Graphic Tee', 
    category: 'Streetwear', 
    price: '$45', 
    imageUrl: 'https://picsum.photos/400/500?random=1',
    description: "A classic-fit tee with a unique, faded vintage graphic. Made from 100% premium cotton for ultimate comfort. Perfect for a relaxed, everyday look.",
    moreImages: generateMoreImages(100, 3)
  },
  { 
    id: 2, 
    name: 'Oversized Denim Jacket', 
    category: 'Trending', 
    price: '$85', 
    imageUrl: 'https://picsum.photos/400/500?random=2',
    description: "The perfect layering piece. This oversized denim jacket features a light wash, distressed details, and a comfortable, slouchy fit.",
    moreImages: generateMoreImages(104, 3)
  },
  { 
    id: 3, 
    name: 'High-Top Canvas Sneakers', 
    category: 'Streetwear', 
    price: '$70', 
    imageUrl: 'https://picsum.photos/400/500?random=3',
    description: "Timeless high-top sneakers crafted from durable canvas with a cushioned sole for all-day wear. A versatile staple for any wardrobe.",
    moreImages: generateMoreImages(108, 3)
  },
  { 
    id: 4, 
    name: 'Cargo Pants', 
    category: 'Streetwear', 
    price: '$65', 
    imageUrl: 'https://picsum.photos/400/500?random=4',
    description: "Utility-inspired cargo pants with a modern, straight-leg fit. Features multiple pockets and a durable cotton twill fabric.",
    moreImages: generateMoreImages(112, 3)
  },
];

export const allProducts: Product[] = [
    ...trendingProducts,
    { 
        id: 5, 
        name: 'Retro Sunglasses', 
        category: 'Accessories', 
        price: '$30', 
        imageUrl: 'https://picsum.photos/400/500?random=5',
        description: "Channel a retro vibe with these stylish rectangular sunglasses. Offers 100% UV protection and a lightweight frame.",
        moreImages: generateMoreImages(116, 3)
    },
    { 
        id: 6, 
        name: 'Bucket Hat', 
        category: 'Streetwear', 
        price: '$25', 
        imageUrl: 'https://picsum.photos/400/500?random=6',
        description: "A trendy and practical bucket hat made from soft cotton. The perfect accessory for sunny days.",
        moreImages: generateMoreImages(120, 3)
    },
    { 
        id: 7, 
        name: 'Minimalist Hoodie', 
        category: 'Trending', 
        price: '$90', 
        imageUrl: 'https://picsum.photos/400/500?random=7',
        description: "An elevated basic. This hoodie is made from ultra-soft fleece with a clean, minimalist design and no drawstrings for a modern look.",
        moreImages: generateMoreImages(124, 3)
    },
    { 
        id: 8, 
        name: 'Crossbody Bag', 
        category: 'Accessories', 
        price: '$55', 
        imageUrl: 'https://picsum.photos/400/500?random=8',
        description: "A compact and functional crossbody bag, perfect for carrying your essentials. Features an adjustable strap and multiple zip compartments.",
        moreImages: generateMoreImages(128, 3)
    },
    { 
        id: 9, 
        name: 'Pleated Skirt', 
        category: 'Trending', 
        price: '$50', 
        imageUrl: 'https://picsum.photos/400/500?random=9',
        description: "A chic, high-waisted pleated mini skirt. Its versatile design makes it easy to dress up or down for any occasion.",
        moreImages: generateMoreImages(132, 3)
    },
    { 
        id: 10, 
        name: 'Platform Boots', 
        category: 'Trending', 
        price: '$120', 
        imageUrl: 'https://picsum.photos/400/500?random=10',
        description: "Make a statement with these chunky platform boots. Crafted from faux leather with a comfortable block heel and side zipper.",
        moreImages: generateMoreImages(136, 3)
    },
];

export const recommendedProducts: Product[] = [
    allProducts[6], allProducts[7], allProducts[8], allProducts[5]
];

const generateAvailableDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    // Add some random available dates in the next 60 days
    for (let i = 0; i < 60; i++) {
        if (Math.random() > 0.4) { // 60% chance of being available
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
    }
    return dates;
};

export const beauticians: Beautician[] = [
    { id: 1, name: 'Jessica Smith', specialty: 'Hair Styling', imageUrl: 'https://picsum.photos/100/100?random=31', availableDates: generateAvailableDates(), rating: 4.9, reviews: 120 },
    { id: 2, name: 'Emily White', specialty: 'Makeup Artistry', imageUrl: 'https://picsum.photos/100/100?random=32', availableDates: generateAvailableDates(), rating: 5.0, reviews: 98 },
    { id: 3, name: 'Olivia Green', specialty: 'Nail Art', imageUrl: 'https://picsum.photos/100/100?random=33', availableDates: generateAvailableDates(), rating: 4.8, reviews: 215 },
    { id: 4, name: 'Chloe Brown', specialty: 'Spa Treatments', imageUrl: 'https://picsum.photos/100/100?random=34', availableDates: generateAvailableDates(), rating: 4.9, reviews: 75 },
    { id: 5, name: 'Sophia Miller', specialty: 'All-rounder', imageUrl: 'https://picsum.photos/100/100?random=35', availableDates: generateAvailableDates(), rating: 5.0, reviews: 150 },
];

export const topSalons: Salon[] = [
  { id: 1, name: 'Glamour Lounge', rating: 4.9, reviews: 245, location: 'New York, NY', imageUrl: 'https://picsum.photos/400/300?random=11', beauticians: [beauticians[0], beauticians[1]] },
  { id: 2, name: 'The Style Studio', rating: 4.8, reviews: 189, location: 'Los Angeles, CA', imageUrl: 'https://picsum.photos/400/300?random=12', beauticians: [beauticians[2], beauticians[4]] },
  { id: 3, name: 'Elegance Hair & Spa', rating: 5.0, reviews: 310, location: 'Chicago, IL', imageUrl: 'https://picsum.photos/400/300?random=13', beauticians: [beauticians[1], beauticians[3], beauticians[4]] },
  { id: 4, name: 'Nail Nirvana', rating: 4.7, reviews: 150, location: 'Miami, FL', imageUrl: 'https://picsum.photos/400/300?random=14', beauticians: [beauticians[2]] },
];

export const salonServices: Service[] = [
  { name: 'Hair Styling', icon: ScissorsIcon },
  { name: 'Makeup', icon: PaintBrushIcon },
  { name: 'Nails', icon: SparklesIcon },
  { name: 'Spa Treatment', icon: HeartIcon },
];

export const availableTimeSlots: { time: string, demand: 'high' | 'medium' | 'low' }[] = [
    { time: '09:00 AM', demand: 'medium' },
    { time: '10:00 AM', demand: 'high' },
    { time: '11:00 AM', demand: 'high' },
    { time: '01:00 PM', demand: 'medium' },
    { time: '02:00 PM', demand: 'low' },
    { time: '03:00 PM', demand: 'medium' },
    { time: '04:00 PM', demand: 'high' }
];

const mockComments: Comment[] = [
    { id: 1, user: '@fashionfan', avatarUrl: 'https://picsum.photos/100/100?random=51', text: 'Love this look! So chic.' },
    { id: 2, user: '@trendsetter', avatarUrl: 'https://picsum.photos/100/100?random=52', text: 'Where did you get that jacket?' },
    { id: 3, user: '@stylewatcher', avatarUrl: 'https://picsum.photos/100/100?random=53', text: 'Amazing! 🔥' },
];

export const videos: Video[] = [
    { id: 1, user: '@stylemaven', description: 'My top 5 streetwear looks for this season! #fashion #streetwear', videoUrl: 'https://videos.pexels.com/video-files/854728/854728-hd.mp4', avatarUrl: 'https://picsum.photos/100/100?random=21', likes: 12500, commentsCount: 302, shares: 128, reposts: 56, comments: mockComments.slice(0, 2), videoProducts: [1, 3, 6] },
    { id: 2, user: '@glowupguru', description: 'Trying the viral makeup hack ✨ #makeup #beauty', videoUrl: 'https://videos.pexels.com/video-files/855799/855799-hd.mp4', avatarUrl: 'https://picsum.photos/100/100?random=22', likes: 23100, commentsCount: 512, shares: 430, reposts: 112, comments: mockComments, videoProducts: [] },
    { id: 3, user: '@denimdreamer', description: 'How to style cargo pants 👖 #ootd #stylehacks', videoUrl: 'https://videos.pexels.com/video-files/4902970/4902970-hd.mp4', avatarUrl: 'https://picsum.photos/100/100?random=23', likes: 8904, commentsCount: 150, shares: 98, reposts: 23, comments: [mockComments[2]], videoProducts: [4, 2] },
    { id: 4, user: '@vintagewaves', description: 'Come thrift with me! 🛍️ #vintage #thrifting', videoUrl: 'https://videos.pexels.com/video-files/5586629/5586-629-hd.mp4', avatarUrl: 'https://picsum.photos/100/100?random=24', likes: 15200, commentsCount: 432, shares: 250, reposts: 88, comments: mockComments.slice(1,3), videoProducts: [1, 5] },
];

export const conversations: Conversation[] = [
    {
        id: 1,
        userName: 'Jessica Smith',
        avatarUrl: 'https://picsum.photos/100/100?random=31',
        lastMessage: "Of course! Let me know if you have any more questions.",
        timestamp: "2:45 PM",
        messages: [
            { id: 1, sender: 'them', text: "Hi there! I was wondering about the hair styling service.", timestamp: "2:40 PM" },
            { id: 2, sender: 'me', text: "Hello! I'd be happy to help. What would you like to know?", timestamp: "2:41 PM" },
            { id: 3, sender: 'them', text: "Is it possible to book for a wedding party?", timestamp: "2:44 PM" },
            { id: 4, sender: 'them', text: "Of course! Let me know if you have any more questions.", timestamp: "2:45 PM" }
        ]
    },
    {
        id: 2,
        userName: 'Style Support',
        avatarUrl: 'https://picsum.photos/100/100?random=61',
        lastMessage: "Your order has been shipped and should arrive by Friday.",
        timestamp: "Yesterday",
        messages: [
             { id: 1, sender: 'me', text: "What's the status of my order #12345?", timestamp: "Yesterday" },
             { id: 2, sender: 'them', text: "Your order has been shipped and should arrive by Friday.", timestamp: "Yesterday" },
        ]
    },
    {
        id: 3,
        userName: 'Olivia Green',
        avatarUrl: 'https://picsum.photos/100/100?random=33',
        lastMessage: "Can't wait to see you then!",
        timestamp: "3 days ago",
        messages: [
            { id: 1, sender: 'me', text: "Just wanted to confirm my nail appointment for this Saturday.", timestamp: "3 days ago" },
            { id: 2, sender: 'them', text: "Hi! Yes, we have you down for 11 AM. Can't wait to see you then!", timestamp: "3 days ago" },
        ]
    }
];

export const mockOrders: Order[] = [
    {
        id: 'PRSM-001',
        date: 'May 15, 2024',
        status: 'Delivered',
        total: '$110.00',
        items: [allProducts[0], allProducts[3]]
    },
    {
        id: 'PRSM-024',
        date: 'June 1, 2024',
        status: 'Shipped',
        total: '$90.00',
        items: [allProducts[6]]
    },
    {
        id: 'PRSM-031',
        date: 'June 5, 2024',
        status: 'Processing',
        total: '$175.00',
        items: [allProducts[9], allProducts[7]]
    }
];
