import React, { useState } from 'react';
import type { Page } from '../App';
import { generateBeautyAdvice } from '../services/geminiService';
import { ArrowLeftIcon, HeartIcon } from './IconComponents';

interface AIBeautyAdvisorPageProps {
  setCurrentPage: (page: Page) => void;
}

const AIBeautyAdvisorPage: React.FC<AIBeautyAdvisorPageProps> = ({ setCurrentPage }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setResult('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }
    setIsLoading(true);
    setResult('');
    const advice = await generateBeautyAdvice(imageFile);
    setResult(advice);
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
            <ArrowLeftIcon className="h-5 w-5"/>
            Back to Home
        </button>

      <div className="max-w-2xl mx-auto text-center">
        <HeartIcon className="h-16 w-16 mx-auto text-rose-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">AI Beauty Advisor</h1>
        <p className="text-gray-500 mb-8">Upload a clear, makeup-free photo for personalized skincare and haircare advice.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col items-center gap-4">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                />
                {imagePreview && (
                    <div className="mt-4 border-4 border-gray-200 rounded-lg overflow-hidden">
                        <img src={imagePreview} alt="Face preview" className="max-h-80 w-auto"/>
                    </div>
                )}
            </div>
        </div>

        <button onClick={handleAnalysis} disabled={isLoading || !imageFile} className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:from-gray-400 disabled:to-gray-500">
            {isLoading ? 'Analyzing...' : 'Get My Beauty Advice'}
        </button>

        {result && (
            <div className="mt-8 p-6 bg-rose-50 rounded-lg text-left border border-rose-200 prose">
                <h2 className="text-xl font-bold mb-3 text-rose-900">Your AI Beauty Report:</h2>
                <div className="text-rose-800 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
        )}
      </div>
    </div>
  );
};

export default AIBeautyAdvisorPage;