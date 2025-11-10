
import React, { useState } from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon } from './IconComponents';

interface BecomeSellerPageProps {
    setCurrentPage: (page: Page) => void;
}

const BecomeSellerPage: React.FC<BecomeSellerPageProps> = ({ setCurrentPage }) => {
    const [submitted, setSubmitted] = useState(false);
    const [role, setRole] = useState('seller');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
             <div className="p-4 md:p-8 max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-emerald-600 mb-4">Application Submitted!</h1>
                <p className="text-gray-600 mb-8">Thank you for your interest. We'll review your application and get in touch with you soon.</p>
                <button onClick={() => setCurrentPage('profile')} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700">
                    Back to Profile
                </button>
             </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black">
                <ArrowLeftIcon className="h-5 w-5"/>
                Back to Profile
            </button>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-center">Join Our Community</h1>
                <p className="text-gray-500 mb-8 text-center">Apply to become a seller or freelancer on Priisme.</p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" required placeholder="Jane Doe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" required placeholder="you@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700">I want to be a...</label>
                         <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                            <option value="seller">Seller (selling products)</option>
                            <option value="freelancer">Freelancer (offering services)</option>
                         </select>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            {role === 'seller' ? 'Tell us about your products' : 'Tell us about your services'}
                        </label>
                        <textarea id="description" rows={4} required placeholder={role === 'seller' ? 'e.g., I create handmade vintage-style jewelry.' : 'e.g., I am a professional makeup artist specializing in bridal looks.'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BecomeSellerPage;
