import React, { useState } from 'react';
import type { Page } from '../App';
import { UserCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, PhoneIcon } from './IconComponents';

interface CustomerSignupPageProps {
    setCurrentPage: (page: Page) => void;
    handleSignup: () => void;
}

const CustomerSignupPage: React.FC<CustomerSignupPageProps> = ({ setCurrentPage, handleSignup }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
    
    // Form state for email signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
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
        // In a real app, this would be an API call. For the demo, we show an alert.
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
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Create Account
                </h1>
                <p className="text-violet-200 mt-2">Start your journey with Priisme.</p>
            </div>
            <form onSubmit={handleEmailSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
                <div className="relative">
                    <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                    <input 
                        type="text" 
                        required 
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                    />
                </div>
                <div>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        <input 
                            type="email" 
                            required 
                            placeholder="Email Address (@gmail.com)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 border-2 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-transparent focus:ring-sky-400'}`}
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
                </div>
                <div>
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 border-2 ${errors.password ? 'border-red-400 focus:ring-red-400' : 'border-transparent focus:ring-sky-400'}`}
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
                    {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Sign Up with Email
                </button>
            </form>
        </>
    );

    const phoneSignupForm = (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Sign Up with Phone
                </h1>
                <p className="text-violet-200 mt-2">We'll send you a verification code.</p>
            </div>
            <form onSubmit={handlePhoneSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                {!isOtpSent ? (
                     <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                        <input 
                            type="tel" 
                            required 
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200" />
                        <input 
                            type="text" 
                            required 
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-sky-600 text-white placeholder-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border-transparent"
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
                        Verify & Sign Up
                    </button>
                )}
            </form>
        </>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-teal-500 p-4">
            <div className="w-full max-w-md">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAFZAtEDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAA1EAABAwIEAwYFAwUBAQEBAAAAAQIRAAMEITFBUQUSYXGBkSIyobETQsHR8FLhBgcUI/EkM2L/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgMBAQEBAQAAAAAAARECEiEDMUETUWEiQv/aAAwDAQACEQMRAD8A+q0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tqW1rK0tahUDAo=" alt="Priisme Logo" className="w-full max-w-xs mx-auto mb-8" />
                
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
                        <button onClick={() => setCurrentPage('customer-login')} className="font-semibold text-white hover:underline">
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignupPage;