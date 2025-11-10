import React, { useState } from 'react';
import type { Page } from '../App';
import { UserCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from './IconComponents';

interface SellerLoginPageProps {
    setCurrentPage: (page: Page) => void;
    handleLogin: () => void;
}

const SellerLoginPage: React.FC<SellerLoginPageProps> = ({ setCurrentPage, handleLogin }) => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication logic. In a real app, you would validate this.
        console.log('Attempting to log in as seller with:', { loginId, password });
        handleLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-teal-500 p-4">
            <div className="w-full max-w-md">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAFZAtEDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAA1EAABAwIEAwYFAwUBAQEBAAAAAQIRAAMEITFBUQUSYXGBkSIyobETQsHR8FLhBgcUI/EkM2L/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgMBAQEBAQAAAAAAARECEiEDMUETUWEiQv/aAAwDAQACEQMRAD8A+q0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tahUDAo=" alt="Priisme Logo" className="w-full max-w-xs mx-auto mb-8" />
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Seller Login
                    </h1>
                    <p className="text-violet-200 mt-2">Manage your store and services.</p>
                </div>

                <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                    <div className="relative">
                        <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                        <input 
                            type="text" 
                            required 
                            placeholder="Email or Phone Number"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                        />
                    </div>
                     <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200 hover:text-white"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me-seller"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me-seller" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                        Log In
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                     <p className="text-violet-200">
                        Don't have a seller account?{' '}
                        <button onClick={() => setCurrentPage('seller-signup')} className="font-semibold text-white hover:underline">
                            Sign Up
                        </button>
                    </p>
                    <p className="text-violet-200 mt-2">
                        Are you a customer?{' '}
                        <button onClick={() => setCurrentPage('customer-login')} className="font-semibold text-white hover:underline">
                            Customer Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerLoginPage;