
import React, { useState } from 'react';
import type { Page } from '../App';
import { generateOutfitSuggestion } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon } from './IconComponents';

interface OutfitGeneratorPageProps {
  setCurrentPage: (page: Page) => void;
}

const OutfitGeneratorPage: React.FC<OutfitGeneratorPageProps> = ({ setCurrentPage }) => {
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [colors, setColors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!style || !occasion) {
        alert("Please fill in Style and Occasion.");
        return;
    }
    setIsLoading(true);
    setResult('');
    const suggestion = await generateOutfitSuggestion(style, occasion, colors);
    setResult(suggestion);
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
        <h1 className="text-4xl font-bold mb-2">AI Outfit Generator</h1>
        <p className="text-gray-500 mb-8">Describe your vibe, and we'll create the perfect look for you.</p>

        <div className="space-y-4 text-left">
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">Style</label>
            <input type="text" id="style" value={style} onChange={e => setStyle(e.target.value)} placeholder="e.g., Casual, Streetwear, Chic" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">Occasion</label>
            <input type="text" id="occasion" value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="e.g., Coffee run, Night out, Work" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Preferred Colors (Optional)</label>
            <input type="text" id="colors" value={colors} onChange={e => setColors(e.target.value)} placeholder="e.g., Pastels, Black and white" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
          </div>
        </div>

        <button onClick={handleGenerate} disabled={isLoading} className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:from-gray-400 disabled:to-gray-500">
            {isLoading ? 'Generating...' : 'Generate My Outfit'}
        </button>

        {result && (
            <div className="mt-8 p-6 bg-purple-50 rounded-lg text-left border border-purple-200">
                <h2 className="text-xl font-bold mb-3 text-purple-900">Your Personalized Outfit:</h2>
                <p className="text-purple-800 whitespace-pre-wrap leading-relaxed">{result}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default OutfitGeneratorPage;