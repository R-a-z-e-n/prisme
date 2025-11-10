import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import { generateTrendReport } from '../services/geminiService';
import { ArrowLeftIcon } from './IconComponents';

interface AITrendAnalyzerPageProps {
  setCurrentPage: (page: Page) => void;
}

const AITrendAnalyzerPage: React.FC<AITrendAnalyzerPageProps> = ({ setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      const result = await generateTrendReport();
      setReport(result);
      setIsLoading(false);
    };
    fetchReport();
  }, []);

  return (
    <div className="p-4 md:p-8">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
            <ArrowLeftIcon className="h-5 w-5"/>
            Back to Home
        </button>
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">AI Fashion Trend Report</h1>
                <p className="text-gray-500">Your live feed from the global fashion scene, curated by AI.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-12">
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                        <p className="text-gray-500">Analyzing the latest runway and street styles...</p>
                    </div>
                ) : (
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />').replace(/### (.*)/g, '<h3>$1</h3>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\* \s*(.*)/g, '<li>$1</li>').replace(/(\r\n|\n|\r)/gm, (match, p1, offset, string) => (string[offset-1] === '>' ? match : '')) }} />
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default AITrendAnalyzerPage;
