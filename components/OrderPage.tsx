import React, { useState } from 'react';
import type { Page } from '../App';
import { mockOrders, allProducts } from '../services/mockData';
import type { Order, Product } from '../types';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, HeartIcon, HeartFilledIcon } from './IconComponents';

interface OrderPageProps {
    setCurrentPage: (page: Page) => void;
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
    onSelectProductForTryOn: (imageUrl: string) => void;
    onSelectProduct: (product: Product) => void;
}

const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
        case 'Delivered':
            return 'bg-emerald-100 text-emerald-800';
        case 'Shipped':
            return 'bg-sky-100 text-sky-800';
        case 'Processing':
            return 'bg-amber-100 text-amber-800';
        case 'Cancelled':
            return 'bg-rose-100 text-rose-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleTrackOrder = () => {
        alert('Tracking information is not yet available for this order.');
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onClick={() => setIsExpanded(!isExpanded)}>
                <div>
                    <p className="font-bold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                     <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                    </span>
                    {isExpanded ? <ChevronUpIcon className="h-6 w-6 text-gray-500" /> : <ChevronDownIcon className="h-6 w-6 text-gray-500" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t p-4 space-y-4 bg-gray-50/50">
                    <h4 className="font-semibold text-gray-800">Items in this order</h4>
                    {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-b-0">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <p className="font-medium text-gray-800">{item.price}</p>
                        </div>
                    ))}
                    <div className="pt-4 mt-4 flex justify-between items-center">
                        <p className="font-semibold text-lg">Total</p>
                        <p className="font-bold text-xl text-gray-900">{order.total}</p>
                    </div>
                     <div className="mt-2 text-right">
                        <button onClick={handleTrackOrder} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                            Track Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const ProductCard: React.FC<{
    product: Product, 
    onTryOn: (imageUrl: string) => void,
    isWishlisted: boolean,
    onToggleWishlist: () => void,
    onSelectProduct: (product: Product) => void,
}> = ({ product, onTryOn, isWishlisted, onToggleWishlist, onSelectProduct }) => (
    <div className="group relative">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
            <button
                onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
                className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-2 rounded-full z-20 hover:scale-110 transition-transform"
                aria-label="Add to wishlist"
            >
                {isWishlisted ? (
                    <HeartFilledIcon className="h-5 w-5 text-red-500" />
                ) : (
                    <HeartIcon className="h-5 w-5 text-gray-700" />
                )}
            </button>
             <button onClick={() => onSelectProduct(product)} className="absolute inset-0 z-10" aria-label={`View details for ${product.name}`}></button>
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); onTryOn(product.imageUrl); }}
            className="mt-2 w-full bg-sky-500 text-white text-xs py-1.5 rounded-md font-semibold hover:bg-sky-600 transition-colors relative z-20"
        >
            AR Try-On
        </button>
    </div>
);

const OrderPage: React.FC<OrderPageProps> = ({ setCurrentPage, wishlist, toggleWishlist, onSelectProductForTryOn, onSelectProduct }) => {
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
    const savedProducts = allProducts.filter(p => wishlist.includes(p.id));
    
    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
             <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black font-medium">
                <ArrowLeftIcon className="h-5 w-5"/>
                Back to Profile
            </button>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-slate-800">My Activity</h1>

                <div className="flex border-b mb-6">
                    <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'orders' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-purple-500'}`}>
                        My Orders
                    </button>
                    <button onClick={() => setActiveTab('wishlist')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'wishlist' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-purple-500'}`}>
                        Wishlist ({wishlist.length})
                    </button>
                </div>

                {activeTab === 'orders' ? (
                     <div className="space-y-6">
                        {mockOrders.length > 0 ? (
                            mockOrders.map(order => <OrderCard key={order.id} order={order} />)
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700">No Orders Found</h2>
                                <p className="text-gray-500 mt-2">Looks like you haven't placed any orders yet.</p>
                                 <button onClick={() => setCurrentPage('trending')} className="mt-6 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700">
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-8">
                        {savedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                                {savedProducts.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onTryOn={onSelectProductForTryOn} 
                                        isWishlisted={wishlist.includes(product.id)}
                                        onToggleWishlist={() => toggleWishlist(product.id)}
                                        onSelectProduct={onSelectProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <HeartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                <h2 className="text-xl font-semibold text-gray-700">Your Wishlist is Empty</h2>
                                <p className="text-gray-500 mt-2">Tap the heart on any item to save it here.</p>
                                 <button onClick={() => setCurrentPage('trending')} className="mt-6 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700">
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;