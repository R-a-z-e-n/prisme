
import React, { useState } from 'react';
import type { Page } from '../App';
import { generateVirtualClosetOutfits } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon } from './IconComponents';

interface AIVirtualClosetPageProps {
  setCurrentPage: (page: Page) => void;
}

const AIVirtualClosetPage: React.FC<AIVirtualClosetPageProps> = ({ setCurrentPage }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
      setResult('');
      
      // Use FileReader to create data URLs for image previews, which is safer
      // than using object URLs and helps prevent memory leaks.
      // FIX: Explicitly type `file` as `File` to resolve a type inference issue.
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImagePreviews(prev => [...prev, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleGenerate = async () => {
    if (imageFiles.length === 0) {
        alert("Please upload photos of your clothes first.");
        return;
    }
    setIsLoading(true);
    setResult('');
    const suggestion = await generateVirtualClosetOutfits(imageFiles);
    setResult(suggestion);
    setIsLoading(false);
  };
  
  const handleClearCloset = () => {
      setImageFiles([]);
      setImagePreviews([]);
      setResult('');
  }

  return (
    <div className="p-4 md:p-8">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
            <ArrowLeftIcon className="h-5 w-5"/>
            Back to Home
        </button>

      <div className="max-w-4xl mx-auto text-center">
        <svg className="h-16 w-16 mx-auto text-sky-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5m3-13.5H3.75a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5z" /></svg>
        <h1 className="text-4xl font-bold mb-2">AI Virtual Closet</h1>
        <p className="text-gray-500 mb-8">Upload your clothes, and let our AI create new outfits for you.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-3 text-center">Add Items to Your Closet</h2>
            <div className="flex flex-col items-center gap-4">
                 <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full max-w-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                />
                {imagePreviews.length > 0 && (
                    <div className="mt-4 w-full">
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Closet item ${index+1}`} className="w-full h-auto object-cover rounded-md aspect-square"/>
                            ))}
                        </div>
                        <button onClick={handleClearCloset} className="mt-4 text-sm text-gray-500 hover:text-red-500">Clear Closet</button>
                    </div>
                )}
            </div>
        </div>

        <button onClick={handleGenerate} disabled={isLoading || imageFiles.length === 0} className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center gap-2">
            <SparklesIcon className="h-6 w-6"/>
            {isLoading ? 'Styling...' : 'Generate Outfits'}
        </button>

        {result && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg text-left border border-sky-200 prose">
                <h2 className="text-xl font-bold mb-3 text-sky-900">Your Outfit Ideas:</h2>
                <div className="text-sky-800 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIVirtualClosetPage;