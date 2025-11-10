import React, { useState } from 'react';
import type { Page } from '../App';
import type { Product } from '../types';
import { ArrowLeftIcon, CameraIcon, ShoppingCartIcon } from './IconComponents';

interface ProductDetailsPageProps {
    product: Product;
    setCurrentPage: (page: Page) => void;
    onSelectProductForTryOn: (imageUrl: string) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, setCurrentPage, onSelectProductForTryOn }) => {
    const [mainImage, setMainImage] = useState(product.imageUrl);

    const handleAddToCart = () => {
        alert(`${product.name} has been added to your cart! (This is a demo)`);
    };

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setCurrentPage('trending')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black font-medium">
                <ArrowLeftIcon className="h-5 w-5"/>
                Back to Shop
            </button>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-center object-cover" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[product.imageUrl, ...product.moreImages].map((img, idx) => (
                             <button 
                                key={idx} 
                                onClick={() => setMainImage(img)}
                                className={`bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1 border-2 ${mainImage === img ? 'border-purple-500' : 'border-transparent'}`}
                            >
                                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-center object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">{product.category}</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-1">{product.name}</h1>
                        <p className="text-3xl font-semibold text-gray-800 mt-4">{product.price}</p>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-auto pt-8 space-y-4">
                         <button 
                            onClick={handleAddToCart}
                            className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                         >
                            <ShoppingCartIcon className="h-6 w-6" />
                            Add to Cart
                        </button>
                        <button 
                            onClick={() => onSelectProductForTryOn(product.imageUrl)}
                            className="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <CameraIcon className="h-6 w-6" />
                            AR Try-On
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;