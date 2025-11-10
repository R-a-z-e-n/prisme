import React from 'react';
import { trendingProducts, salonServices, recommendedProducts } from '../services/mockData';
import type { Page } from '../App';
import { Product } from '../types';
import { CameraIcon, SparklesIcon, FitCheckIcon, HeartIcon, HeartFilledIcon, MessageIcon } from './IconComponents';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<{product: Product, isWishlisted: boolean, onToggleWishlist: () => void, onSelectProduct: (product: Product) => void}> = ({ product, isWishlisted, onToggleWishlist, onSelectProduct }) => (
    <div className="group relative">
        <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
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
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, wishlist, toggleWishlist, onSelectProduct }) => {
  return (
    <div className="space-y-12 p-4 md:p-8">
      {/* Main Action Buttons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <button onClick={() => setCurrentPage('salon')} className="p-4 bg-rose-100 rounded-lg shadow hover:bg-rose-200 transition-colors">
          <h2 className="font-bold text-rose-800">Salons</h2>
        </button>
        <button onClick={() => setCurrentPage('video')} className="p-4 bg-violet-100 rounded-lg shadow hover:bg-violet-200 transition-colors">
          <h2 className="font-bold text-violet-800">Reels</h2>
        </button>
        <button onClick={() => setCurrentPage('try-on')} className="p-4 bg-sky-100 rounded-lg shadow hover:bg-sky-200 transition-colors flex flex-col items-center">
          <CameraIcon className="h-6 w-6 text-sky-800 mb-1" />
          <h2 className="font-bold text-sky-800">Try On</h2>
        </button>
        <button onClick={() => setCurrentPage('fit-check')} className="p-4 bg-teal-100 rounded-lg shadow hover:bg-teal-200 transition-colors flex flex-col items-center">
          <FitCheckIcon className="h-6 w-6 text-teal-800 mb-1" />
          <h2 className="font-bold text-teal-800">AI Fit Check</h2>
        </button>
      </section>

       {/* New AI Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => setCurrentPage('ai-personal-stylist')} className="cursor-pointer group bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
          <SparklesIcon className="h-8 w-8 mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-bold text-lg">AI Personal Stylist</h3>
          <p className="text-sm opacity-90">Get complete outfits, makeup, and style recommendations.</p>
        </div>
        <div onClick={() => setCurrentPage('ai-beauty-advisor')} className="cursor-pointer group bg-gradient-to-br from-rose-400 to-orange-500 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
          <HeartIcon className="h-8 w-8 mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-bold text-lg">AI Beauty Advisor</h3>
          <p className="text-sm opacity-90">Analyze your features for custom skincare advice.</p>
        </div>
        <div onClick={() => setCurrentPage('ai-virtual-closet')} className="cursor-pointer group bg-gradient-to-br from-sky-400 to-cyan-500 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
          <svg className="h-8 w-8 mb-2 opacity-80 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5m3-13.5H3.75a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5z" /></svg>
          <h3 className="font-bold text-lg">AI Virtual Closet</h3>
          <p className="text-sm opacity-90">Upload your wardrobe and get new outfit ideas.</p>
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {trendingProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
                onSelectProduct={onSelectProduct}
              />
            ))}
        </div>
      </section>

      {/* AI Recommendation Engine */}
      <section>
        <h2 className="text-2xl font-bold mb-4">✨ Just For You</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
            {recommendedProducts.map(product => (
              <div key={product.id} className="w-64 flex-shrink-0">
                 <ProductCard 
                    product={product} 
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    onSelectProduct={onSelectProduct}
                  />
              </div>
            ))}
        </div>
      </section>

      {/* AI Chat Stylist */}
      <section className="bg-gradient-to-r from-sky-500 to-indigo-500 p-8 rounded-lg text-white text-center">
        <MessageIcon className="h-12 w-12 mx-auto mb-2" />
        <h2 className="text-3xl font-bold mb-2">AI Chat Stylist</h2>
        <p className="mb-4">Get instant fashion advice from your personal AI stylist.</p>
        <button onClick={() => setCurrentPage('ai-chat-stylist')} className="bg-white text-sky-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-transform hover:scale-105">
          Start Chatting
        </button>
      </section>
    </div>
  );
};

export default HomePage;
