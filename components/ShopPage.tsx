import React, { useState, useMemo } from 'react';
import { allProducts } from '../services/mockData';
import type { Product } from '../types';
import type { Page } from '../App';
import { findSimilarProductsFromImage } from '../services/geminiService';
import { HeartIcon, HeartFilledIcon } from './IconComponents';

interface ShopPageProps {
    pageType: Page;
    onSelectProductForTryOn: (imageUrl: string) => void;
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
    onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<{
    product: Product, 
    onTryOn: (imageUrl: string) => void,
    isWishlisted: boolean,
    onToggleWishlist: () => void,
    onSelectProduct: (product: Product) => void;
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
            className="mt-2 w-full bg-sky-500 text-white text-xs py-1.5 rounded-md font-semibold hover:bg-sky-600 transition-colors z-20 relative"
        >
            AR Try-On
        </button>
    </div>
);

const ShopPage: React.FC<ShopPageProps> = ({ pageType, onSelectProductForTryOn, wishlist, toggleWishlist, onSelectProduct }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [aiResult, setAiResult] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setAiResult('');
        }
    };

    const handleImageSearch = async () => {
        if (!imageFile) return;
        setIsLoading(true);
        const result = await findSimilarProductsFromImage(imageFile);
        setAiResult(result);
        setIsLoading(false);
    };

    const pageTitle = useMemo(() => {
        if (pageType === 'streetwear') return 'Streetwear';
        if (pageType === 'trending') return 'Trending Now';
        return 'Discover Our Collection';
    }, [pageType]);

    const filteredProducts = useMemo(() => {
        if (pageType === 'streetwear') {
            return allProducts.filter(p => p.category.toLowerCase() === 'streetwear');
        }
        if (pageType === 'trending') {
            return allProducts.filter(p => p.category.toLowerCase() === 'trending');
        }
        return allProducts;
    }, [pageType]);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-2 text-center">{pageTitle}</h1>
            <p className="text-center text-gray-500 mb-8">Find your next favorite piece.</p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-3 text-center">Find by Image</h2>
                <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                    {imageFile && <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>}
                    <button 
                        onClick={handleImageSearch} 
                        disabled={!imageFile || isLoading}
                        className="w-full bg-violet-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-violet-600 disabled:bg-gray-400 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="to 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            'Find Similar Products'
                        )}
                    </button>
                    {aiResult && (
                        <div className="mt-4 p-4 bg-white rounded-md w-full">
                            <h3 className="font-bold text-gray-800">AI Suggestions:</h3>
                            <p className="text-gray-600 whitespace-pre-wrap">{aiResult}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {filteredProducts.map(product => (
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
        </div>
    );
};

export default ShopPage;