import React from 'react';
import type { Page, UserType } from '../App';
import { StoreIcon, ChevronRightIcon, StarIcon } from './IconComponents';

interface ProfilePageProps {
    setCurrentPage: (page: Page) => void;
    userType: UserType | null;
    handleLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentPage, userType, handleLogout }) => {

    const menuItems = [
        { name: 'My Orders', page: 'order' as Page },
        { name: 'Subscription', page: 'profile' as Page },
        { name: 'Settings', page: 'profile' as Page }, // Placeholder page
        { name: 'Privacy Policy', page: 'privacy-policy' as Page },
    ];

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-8">
                    <img src="https://picsum.photos/100/100?random=42" alt="Profile" className="w-20 h-20 rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold">Jane Doe</h1>
                        <p className="text-gray-500">jane.doe@example.com</p>
                    </div>
                </div>

                {/* Subscription Plan Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg text-white shadow-lg flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <StarIcon className="h-6 w-6" />
                                <h2 className="text-xl font-bold">Free Plan</h2>
                            </div>
                            <p className="text-sm">Access basic features and browse our collection.</p>
                        </div>
                        <button 
                            className="bg-white text-orange-600 font-bold py-2 px-5 rounded-full hover:bg-gray-100 transition-transform hover:scale-105"
                        >
                            Upgrade
                        </button>
                    </div>
                </div>

                {/* Seller Section */}
                <div className="mb-8">
                    {userType === 'seller' ? (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white shadow-lg">
                             <h2 className="text-xl font-bold mb-2">Welcome, Seller!</h2>
                             <p className="mb-4">Manage your products, view orders, and track your earnings.</p>
                             <button 
                                onClick={() => setCurrentPage('seller-dashboard')} 
                                className="w-full bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 flex items-center justify-center gap-2"
                             >
                                <StoreIcon className="h-5 w-5" />
                                Go to Seller Dashboard
                             </button>
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Want to Sell on Priisme?</h2>
                            <p className="text-gray-600 mb-4">Log out and sign up as a seller to join our community of creators.</p>
                             <button
                                onClick={handleLogout}
                                className="w-full bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Switch to Seller Account
                            </button>
                        </div>
                    )}
                </div>

                {/* Menu List */}
                <div className="bg-white rounded-lg shadow">
                    <ul className="divide-y divide-gray-200">
                        {menuItems.map(item => (
                             <li key={item.name} onClick={() => setCurrentPage(item.page)} className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                                <span className="font-medium">{item.name}</span>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Logout Button */}
                 <div className="mt-8 text-center">
                    <button onClick={handleLogout} className="text-red-500 font-medium hover:text-red-700">
                        Log Out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;