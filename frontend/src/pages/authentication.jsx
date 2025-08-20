import * as React from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/Authcontext.jsx';

export default function Authentication() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        if (isLoading) return;
        
        // Basic validation
        if (!email?.trim() || !password?.trim()) {
            setError('Email and password are required');
            return;
        }
        
        if (formState === 1) {
            if (!name?.trim()) {
                setError('Full name is required for registration');
                return;
            }
            if (!confirmPassword?.trim()) {
                setError('Please confirm your password');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        setIsLoading(true);
        setError('');

        try {
            if (formState === 0) {
                await handleLogin(email, password);
                toast.success("Login successful!");
            }
            if (formState === 1) {
                const result = await handleRegister(name, email, password, confirmPassword);
                toast.success(result || "Registration successful!");
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
                setFormState(0);
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                toast.error("Email or password is incorrect.");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAuth();
    };

    // Auto-hide snackbar
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
                setMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left side - Background Image */}
            <div 
                className="hidden sm:flex sm:w-1/3 md:w-3/5 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                }}
            />
            
            {/* Right side - Authentication Form */}
            <div className="w-full sm:w-2/3 md:w-2/5 flex items-center justify-center p-8 bg-white shadow-2xl">
                <div className="w-full max-w-md space-y-8">
                    {/* Avatar and Header */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                            <svg 
                                className="w-6 h-6 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                                />
                            </svg>
                        </div>

                        {/* Form Mode Toggle */}
                        <div className="flex space-x-0 bg-gray-100 rounded-lg p-1 mb-6">
                            <button
                                type="button"
                                className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
                                    formState === 0
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => { 
                                    setFormState(0); 
                                    setError(''); 
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
                                    formState === 1
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => { 
                                    setFormState(1); 
                                    setError(''); 
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Full Name Field (Registration only) */}
                        {formState === 1 && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required={formState === 1}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Confirm Password Field (Registration only) */}
                        {formState === 1 && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required={formState === 1}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {formState === 0 ? 'Signing in...' : 'Creating account...'}
                                </>
                            ) : (
                                formState === 0 ? 'Login' : 'Register'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Success Snackbar */}
            {open && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-0 max-w-md">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="flex-1">{message}</span>
                        <button 
                            onClick={() => setOpen(false)}
                            className="ml-2 text-gray-300 hover:text-white flex-shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
