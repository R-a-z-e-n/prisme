

import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon, PackageIcon, DollarSignIcon, ChartBarIcon, SparklesIcon } from './IconComponents';
import { generateSellerInsights } from '../services/geminiService';

interface SellerDashboardPageProps {
    setCurrentPage: (page: Page) => void;
}

const StatCard: React.FC<{title: string, value: string, icon: React.ReactNode}> = ({title, value, icon}) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const SellerDashboardPage: React.FC<SellerDashboardPageProps> = ({ setCurrentPage }) => {
    const [insights, setInsights] = useState<{predictedTopSeller: string; customerSegment: string; marketingIdea: string;} | null>(null);
    const [isLoadingInsights, setIsLoadingInsights] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            setIsLoadingInsights(true);
            const result = await generateSellerInsights();
            setInsights(result);
            setIsLoadingInsights(false);
        };
        fetchInsights();
    }, []);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black">
                <ArrowLeftIcon className="h-5 w-5"/>
                Back to Profile
            </button>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Seller Dashboard</h1>
                     <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700">
                        + Add New Product
                    </button>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Revenue" value="$4,823" icon={<DollarSignIcon className="h-6 w-6 text-purple-600" />} />
                    <StatCard title="New Orders" value="12" icon={<PackageIcon className="h-6 w-6 text-purple-600" />} />
                    <StatCard title="Products Listed" value="78" icon={<ChartBarIcon className="h-6 w-6 text-purple-600" />} />
                </div>
                
                {/* AI Customer Intelligence Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><SparklesIcon className="h-6 w-6 text-purple-500"/> AI Insights</h2>
                    {isLoadingInsights ? (
                        <div className="text-center p-6 bg-white rounded-lg shadow">
                            <p className="text-gray-500">Generating AI insights for your store...</p>
                        </div>
                    ) : insights ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-400">
                                <h3 className="font-bold text-gray-800 mb-2">Predicted Top Seller</h3>
                                <p className="text-gray-600">{insights.predictedTopSeller}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rose-400">
                                <h3 className="font-bold text-gray-800 mb-2">Customer Segment Spotlight</h3>
                                <p className="text-gray-600">{insights.customerSegment}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sky-400">
                                <h3 className="font-bold text-gray-800 mb-2">Suggested Marketing Campaign</h3>
                                <p className="text-gray-600">{insights.marketingIdea}</p>
                            </div>
                        </div>
                    ) : (
                         <div className="text-center p-6 bg-white rounded-lg shadow">
                            <p className="text-red-500">Could not load AI insights.</p>
                        </div>
                    )}
                </div>

                {/* Dashboard Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Manage Listings</h2>
                        <p className="text-gray-600 mb-4">View, edit, or remove your product listings.</p>
                        <button className="text-purple-600 font-semibold">View All Listings &rarr;</button>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Active Orders</h2>
                        <p className="text-gray-600 mb-4">You have 5 orders that need to be fulfilled.</p>
                        <button className="text-purple-600 font-semibold">View Orders &rarr;</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Earnings & Payouts</h2>
                        <p className="text-gray-600 mb-4">Manage your payment methods and view your payout history.</p>
                        <button className="text-purple-600 font-semibold">Manage Payouts &rarr;</button>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Analytics</h2>
                        <p className="text-gray-600 mb-4">Track your store's performance and customer insights.</p>
                        <button className="text-purple-600 font-semibold">View Analytics &rarr;</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerDashboardPage;
