import React from 'react';
import type { Page } from '../App';
import { StoreIcon, ProfileIcon } from './IconComponents';

interface ChoicePageProps {
    setCurrentPage: (page: Page) => void;
}

const ChoicePage: React.FC<ChoicePageProps> = ({ setCurrentPage }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-teal-500 p-4">
            <div className="text-center mb-12">
                 <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAFZAtEDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAA1EAABAwIEAwYFAwUBAQEBAAAAAQIRAAMEITFBUQUSYXGBkSIyobETQsHR8FLhBgcUI/EkM2L/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgMBAQEBAQAAAAAAARECEiEDMUETUWEiQv/aAAwDAQACEQMRAD8A+q0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tahUDAo=" alt="Priisme Logo" className="w-full max-w-sm mx-auto" />
            </div>

            <div className="w-full max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-center text-white mb-6">How would you like to start?</h2>
                <div className="space-y-4">
                    <button 
                        onClick={() => setCurrentPage('customer-login')} 
                        className="group w-full flex items-center text-left p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-violet-50 transition-all"
                    >
                        <div className="p-4 bg-violet-100 rounded-lg mr-5">
                             <ProfileIcon className="h-8 w-8 text-violet-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">I'm a Customer</h3>
                            <p className="text-gray-500">Shop, book services, and get inspired.</p>
                        </div>
                        <span className="ml-auto text-gray-400 group-hover:text-violet-600 transition-colors">&rarr;</span>
                    </button>
                    
                     <button 
                        onClick={() => setCurrentPage('seller-login')}
                        className="group w-full flex items-center text-left p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-purple-50 transition-all"
                    >
                        <div className="p-4 bg-purple-100 rounded-lg mr-5">
                             <StoreIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">I'm a Seller or Freelancer</h3>
                            <p className="text-gray-500">Sell products or offer your creative services.</p>
                        </div>
                        <span className="ml-auto text-gray-400 group-hover:text-purple-600 transition-colors">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChoicePage;
