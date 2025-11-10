
import React, { useState } from 'react';
import type { Page } from '../App';
import { getAIFitCheck } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon } from './IconComponents';

interface AIFitCheckPageProps {
  setCurrentPage: (page: Page) => void;
}

const AIFitCheckPage: React.FC<AIFitCheckPageProps> = ({ setCurrentPage }) => {
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

  const handleCheckFit = async () => {
    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }
    setIsLoading(true);
    setResult('');
    const suggestion = await getAIFitCheck(imageFile);
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
        <SparklesIcon className="h-16 w-16 mx-auto text-teal-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">AI Fit Check</h1>
        <p className="text-gray-500 mb-8">Upload a photo of your outfit for some friendly AI feedback.</p>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
                {imagePreview && (
                    <div className="mt-4 border-4 border-gray-200 rounded-lg overflow-hidden">
                        <img src={imagePreview} alt="Outfit preview" className="max-h-80 w-auto"/>
                    </div>
                )}
            </div>
        </div>

        <button onClick={handleCheckFit} disabled={isLoading || !imageFile} className="w-full bg-gradient-to-r from-teal-500 to-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:from-gray-400 disabled:to-gray-500">
            {isLoading ? 'Checking...' : 'Check My Fit'}
        </button>

        {result && (
            <div className="mt-8 p-6 bg-teal-50 rounded-lg text-left border border-teal-200">
                <h2 className="text-xl font-bold mb-3 text-teal-900">AI Feedback:</h2>
                <p className="text-teal-800 whitespace-pre-wrap leading-relaxed">{result}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIFitCheckPage;
