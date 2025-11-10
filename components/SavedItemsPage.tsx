import React from 'react';
import { allProducts } from '../services/mockData';
import type { Product } from '../types';
import type { Page } from '../App';
import { ArrowLeftIcon, HeartIcon, HeartFilledIcon } from './IconComponents';

interface SavedItemsPageProps {
    setCurrentPage: (page: Page) => void;
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
    onSelectProductForTryOn: (imageUrl: string) => void;
    onSelectProduct: (product: Product) => void;
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


const SavedItemsPage: React.FC<SavedItemsPageProps> = ({ setCurrentPage, wishlist, toggleWishlist, onSelectProductForTryOn, onSelectProduct }) => {
    const savedProducts = allProducts.filter(p => wishlist.includes(p.id));

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black font-medium">
                <ArrowLeftIcon className="h-5 w-5"/>
                Back to Profile
            </button>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Saved Items</h1>

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
        </div>
    );
};

export default SavedItemsPage;