import React, { useState } from 'react';
import type { Page } from '../App';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, PhoneIcon } from './IconComponents';

interface SellerSignupPageProps {
    setCurrentPage: (page: Page) => void;
    handleSignup: () => void;
}

const SellerSignupPage: React.FC<SellerSignupPageProps> = ({ setCurrentPage, handleSignup }) => {
    const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
    
    // Form state for email signup
    const [role, setRole] = useState('seller');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    
    // Form state for phone signup
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [mockOtp, setMockOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpError, setOtpError] = useState('');

    const validateEmail = () => {
        if (!email.endsWith('@gmail.com')) {
            return 'Email must be a @gmail.com address.';
        }
        return '';
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return 'Password must be at least 8 characters long and contain letters, numbers, and special characters.';
        }
        return '';
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = validateEmail();
        const passwordError = validatePassword();
        
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }
        
        setErrors({});
        handleSignup();
    };

    const handleSendOtp = () => {
        if (phoneNumber.length < 10) { // Simple validation
            setOtpError('Please enter a valid phone number.');
            return;
        }
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        setMockOtp(generatedOtp);
        setIsOtpSent(true);
        setOtpError('');
        alert(`OTP sent to ${phoneNumber}. Your OTP is: ${generatedOtp}`);
    };
    
    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === mockOtp) {
            setOtpError('');
            handleSignup();
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    const emailSignupForm = (
        <form onSubmit={handleEmailSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" required placeholder="Jane Doe" className="mt-1 block w-full px-3 py-2 bg-sky-600 text-white placeholder-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent" />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 bg-sky-600 text-white placeholder-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 border-2 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-transparent focus:ring-sky-400'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        id="password" 
                        required 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 pr-10 bg-sky-600 text-white placeholder-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 border-2 ${errors.password ? 'border-red-400 focus:ring-red-400' : 'border-transparent focus:ring-sky-400'}`}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5 text-sky-200 hover:text-white" /> : <EyeIcon className="h-5 w-5 text-sky-200 hover:text-white" />}
                    </button>
                </div>
                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">I want to be a...</label>
                 <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-sky-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent appearance-none">
                    <option value="seller">Seller (selling products)</option>
                    <option value="freelancer">Freelancer (offering services)</option>
                 </select>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                Create Seller Account
            </button>
        </form>
    );
    
    const phoneSignupForm = (
        <form onSubmit={handlePhoneSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            {!isOtpSent ? (
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phone"
                        required 
                        placeholder="+1 555-555-5555"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-sky-600 text-white placeholder-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                    />
                </div>
            ) : (
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                    <input 
                        type="text" 
                        id="otp"
                        required 
                        placeholder="6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-sky-600 text-white placeholder-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                    />
                </div>
            )}
            
            {otpError && <p className="text-red-500 text-xs text-center">{otpError}</p>}

            {!isOtpSent ? (
                 <button type="button" onClick={handleSendOtp} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Send OTP
                </button>
            ) : (
                <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Verify & Create Account
                </button>
            )}
        </form>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-teal-500 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        {signupMethod === 'email' ? 'Become a Seller' : 'Sign Up with Phone'}
                    </h1>
                    <p className="text-violet-200 mt-2">
                        {signupMethod === 'email' ? 'Join our community of creators.' : "We'll send you a verification code."}
                    </p>
                </div>

                {signupMethod === 'email' ? emailSignupForm : phoneSignupForm}

                <div className="my-6 flex items-center justify-center">
                    <div className="flex-grow border-t border-violet-300"></div>
                    <span className="flex-shrink mx-4 text-violet-200">or</span>
                    <div className="flex-grow border-t border-violet-300"></div>
                </div>

                {signupMethod === 'email' ? (
                    <button onClick={() => { setSignupMethod('phone'); setErrors({}); }} className="w-full bg-white text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <PhoneIcon className="h-5 w-5"/>
                        Sign Up with Phone Number
                    </button>
                ) : (
                    <button onClick={() => { setSignupMethod('email'); setOtpError(''); setIsOtpSent(false); }} className="w-full bg-white text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                         <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        Sign Up with Email
                    </button>
                )}
                
                <div className="text-center mt-6 text-sm">
                     <p className="text-violet-200">
                        Already have an account?{' '}
                        <button onClick={() => setCurrentPage('seller-login')} className="font-semibold text-white hover:underline">
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerSignupPage;