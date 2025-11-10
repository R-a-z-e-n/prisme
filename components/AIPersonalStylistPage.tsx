import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import { generateOutfitSuggestion } from '../services/geminiService';
import { allProducts } from '../services/mockData';
import type { Product } from '../types';
import { ArrowLeftIcon, SparklesIcon, CameraIcon } from './IconComponents';

interface AIPersonalStylistPageProps {
  setCurrentPage: (page: Page) => void;
  onSelectProductForTryOn: (imageUrl: string) => void;
}

const AIPersonalStylistPage: React.FC<AIPersonalStylistPageProps> = ({ setCurrentPage, onSelectProductForTryOn }) => {
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [colors, setColors] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ description: string; keyItem: string; } | null>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null);

  useEffect(() => {
    setResult(null);
    setTryOnProduct(null);
  }, [style, occasion, colors, bodyType, skinTone, imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!style || !occasion) {
        alert("Please describe your Style and Occasion.");
        return;
    }
    setIsLoading(true);
    setResult(null);
    setTryOnProduct(null);

    const suggestion = await generateOutfitSuggestion(style, occasion, colors, bodyType, skinTone, imageFile);
    setResult(suggestion);
    
    if (suggestion.keyItem) {
        const keyItemLower = suggestion.keyItem.toLowerCase();
        const foundProduct = allProducts.find(p => 
            p.name.toLowerCase().includes(keyItemLower) || 
            keyItemLower.includes(p.name.toLowerCase())
        );
        setTryOnProduct(foundProduct || null);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
            <ArrowLeftIcon className="h-5 w-5"/>
            Back to Home
        </button>

      <div className="max-w-2xl mx-auto text-center">
        <SparklesIcon className="h-16 w-16 mx-auto text-purple-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">AI Personal Stylist</h1>
        <p className="text-gray-500 mb-8">Your one-stop-shop for AI-powered fashion and beauty advice.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-left">Outfit Stylist</h2>
            <div className="space-y-4 text-left">
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700">Style Vibe</label>
                <input type="text" id="style" value={style} onChange={e => setStyle(e.target.value)} placeholder="e.g., Casual, Streetwear, Elegant" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">Occasion</label>
                <input type="text" id="occasion" value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="e.g., Brunch with friends, Formal event" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700">Body Type (Optional)</label>
                    <input type="text" id="bodyType" value={bodyType} onChange={e => setBodyType(e.target.value)} placeholder="e.g., Pear, Hourglass, Athletic" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                   <div>
                    <label htmlFor="skinTone" className="block text-sm font-medium text-gray-700">Skin Tone (Optional)</label>
                    <input type="text" id="skinTone" value={skinTone} onChange={e => setSkinTone(e.target.value)} placeholder="e.g., Warm, Cool, Neutral" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                  </div>
              </div>
              <div>
                <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Preferred Colors (Optional)</label>
                <input type="text" id="colors" value={colors} onChange={e => setColors(e.target.value)} placeholder="e.g., Earth tones, pastels, monochrome" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
              </div>
               <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Upload a Photo (Optional)</label>
                    <p className="text-xs text-gray-500 mb-2">For more accurate body type & skin tone analysis.</p>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {imagePreview && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreview} alt="User preview" className="max-h-40 rounded-lg shadow-sm" />
                        </div>
                    )}
                </div>
            </div>
             <button onClick={handleGenerate} disabled={isLoading} className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:from-gray-400 disabled:to-gray-500">
                {isLoading ? 'Thinking...' : 'Get My Outfit'}
            </button>
        </div>

        {result && (
            <div className="mt-8 p-6 bg-purple-50 rounded-lg text-left border border-purple-200">
                <h2 className="text-xl font-bold mb-3 text-purple-900">Here's a look crafted just for you:</h2>
                <div 
                    className="prose text-purple-800"
                    dangerouslySetInnerHTML={{ __html: result.description.replace(/\n/g, '<br />') }} 
                />
                {tryOnProduct && (
                    <button 
                        onClick={() => onSelectProductForTryOn(tryOnProduct.imageUrl)}
                        className="mt-6 w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <CameraIcon className="h-6 w-6"/>
                        Virtual Try-On: {tryOnProduct.name}
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default AIPersonalStylistPage;