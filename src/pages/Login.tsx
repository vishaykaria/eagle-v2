import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, AlertCircle, BarChart3 } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left column - Login form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center mb-8">
            <div className="bg-primary-500 text-white p-2 rounded mr-2">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Eagle</h1>
          </div>
          
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage your Current Account, ISA, and SIPP all in one place
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.818h5.556c-.2 1.362-1.511 3.997-5.556 3.997-3.34 0-6.067-2.766-6.067-6.177s2.727-6.177 6.067-6.177c1.903 0 3.178.812 3.907 1.511l2.666-2.563c-1.711-1.6-3.926-2.568-6.573-2.568-5.42 0-9.817 4.397-9.817 9.817s4.397 9.817 9.817 9.817c5.664 0 9.421-3.978 9.421-9.586 0-.647-.069-1.139-.173-1.635z" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Apple</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.2998 0.7C15.3998 0.9 14.2998 1.5 13.6998 2.1C13.0998 2.7 12.5998 3.5 12.5998 4.7C12.5998 4.8 12.5998 4.9 12.5998 5C12.6998 5 12.8998 5 13.0998 5C14.0998 4.9 15.1998 4.3 15.8998 3.5C16.5998 2.7 16.9998 1.9 16.9998 0.9C16.9998 0.8 16.9998 0.7 16.9998 0.6C16.7998 0.6 16.5998 0.6 16.2998 0.7ZM21.0998 17.8C21.0998 17.8 21.0998 17.7 21.0998 17.7C20.8998 16.6 20.4998 15.5 19.8998 14.5C19.2998 13.5 18.5998 12.6 17.6998 11.9C16.9998 11.4 16.3998 11 15.3998 11C14.4998 11 13.8998 11.3 13.2998 11.6C12.8998 11.8 12.5998 12 12.0998 12C11.5998 12 11.2998 11.8 10.8998 11.6C10.3998 11.4 9.79978 11 8.79978 11C7.79978 11 6.99978 11.4 6.29978 12C5.19978 12.8 4.39978 14 3.89978 15.4C3.39978 16.8 3.19978 18.3 3.39978 20C3.39978 20.2 3.39978 20.4 3.49978 20.6C3.89978 22.1 4.49978 23.4 5.59978 24.5C6.19978 25.1 6.89978 25.5 7.59978 25.5C8.29978 25.5 8.79978 25.2 9.29978 25C9.79978 24.8 10.2998 24.5 10.9998 24.5C11.6998 24.5 12.1998 24.7 12.6998 25C13.1998 25.3 13.6998 25.5 14.3998 25.5C15.0998 25.5 15.6998 25.1 16.2998 24.6C17.0998 23.9 17.6998 23 17.9998 22C18.0998 21.8 18.0998 21.7 18.0998 21.5C18.0998 21.4 18.0998 21.3 17.9998 21.3C17.0998 20.8 16.3998 19.9 16.0998 18.9C15.7998 17.9 15.8998 16.9 16.3998 16C16.6998 15.5 17.0998 15.1 17.6998 14.9C17.7998 14.9 17.7998 14.8 17.7998 14.7C17.4998 14.4 17.0998 14.3 16.6998 14.1C15.8998 13.8 14.9998 13.9 14.1998 14.2C14.0998 14.2 13.9998 14.3 13.8998 14.3C13.8998 14.2 13.8998 14.2 13.8998 14.1C13.8998 13.6 13.9998 13.1 14.0998 12.6C14.2998 11.5 14.7998 10.5 15.5998 9.7C16.1998 9.1 16.9998 8.7 17.7998 8.5C18.0998 8.5 18.4998 8.4 18.7998 8.4C18.8998 8.4 18.9998 8.4 19.0998 8.4C19.1998 8.4 19.2998 8.3 19.2998 8.2C19.2998 8.1 19.2998 8 19.1998 7.9C17.5998 6.5 15.4998 5.8 13.2998 6C12.6998 6 12.1998 6.1 11.5998 6.3C11.0998 6.4 10.5998 6.7 10.1998 7C9.69978 7.4 9.29978 7.8 8.99978 8.3C8.69978 8.8 8.49978 9.4 8.39978 10C8.29978 10.6 8.29978 11.2 8.39978 11.8C8.49978 12.4 8.69978 13 8.99978 13.5C9.29978 14 9.69978 14.4 10.0998 14.7C10.1998 14.8 10.2998 14.9 10.3998 14.9C10.4998 14.9 10.5998 14.9 10.5998 14.8C10.3998 14.5 10.2998 14.1 10.1998 13.8C10.0998 13.4 9.99978 13.1 9.99978 12.7C9.99978 12.3 9.99978 11.9 10.0998 11.6C10.1998 11.2 10.2998 10.9 10.4998 10.6C10.6998 10.3 10.8998 10 11.1998 9.7C11.4998 9.4 11.8998 9.2 12.2998 9.1C12.3998 9.1 12.4998 9 12.5998 9C14.4998 8.6 16.3998 9.4 17.5998 10.9C17.6998 11 17.7998 11.1 17.8998 11.3C17.8998 11.4 17.8998 11.4 17.8998 11.5C17.7998 11.5 17.6998 11.4 17.5998 11.4C17.0998 11.2 16.5998 11.1 16.0998 11.1C15.5998 11.1 15.0998 11.2 14.5998 11.4C14.0998 11.6 13.6998 11.9 13.2998 12.3C12.8998 12.7 12.5998 13.2 12.3998 13.7C12.1998 14.2 12.0998 14.8 12.0998 15.4C12.0998 16 12.1998 16.6 12.3998 17.1C12.5998 17.6 12.8998 18.1 13.2998 18.5C13.6998 18.9 14.0998 19.2 14.5998 19.4C15.0998 19.6 15.5998 19.7 16.0998 19.7C16.5998 19.7 17.0998 19.6 17.4998 19.4C17.8998 19.2 18.1998 19 18.4998 18.7C18.7998 18.4 18.9998 18 19.0998 17.6C19.1998 17.2 19.2998 16.8 19.1998 16.4C19.0998 16 18.9998 15.6 18.7998 15.3C18.5998 15 18.3998 14.7 18.0998 14.5C17.8998 14.3 17.5998 14.2 17.2998 14.1C16.9998 14 16.6998 14 16.3998 14C16.0998 14 15.7998 14.1 15.4998 14.2C15.1998 14.3 15.0998 14.5 14.8998 14.7C14.7998 14.9 14.6998 15.1 14.5998 15.4C14.5998 15.5 14.4998 15.5 14.4998 15.5C14.3998 15.5 14.3998 15.4 14.2998 15.4C14.1998 15.3 14.1998 15.1 14.0998 15C14.2998 14.5 14.5998 14.1 14.9998 13.8C15.3998 13.5 15.8998 13.3 16.3998 13.3C16.8998 13.3 17.3998 13.4 17.7998 13.7C18.1998 14 18.4998 14.3 18.6998 14.8C18.8998 15.2 18.9998 15.7 18.8998 16.2C18.7998 16.7 18.5998 17.1 18.1998 17.5C17.7998 17.9 17.3998 18.1 16.8998 18.2C16.3998 18.3 15.8998 18.3 15.3998 18.1C14.8998 17.9 14.4998 17.7 14.0998 17.3C13.6998 16.9 13.3998 16.5 13.1998 16C12.9998 15.5 12.8998 15 12.8998 14.4C12.8998 13.8 12.9998 13.3 13.1998 12.8C13.3998 12.3 13.6998 11.9 14.0998 11.5C14.4998 11.1 14.9998 10.9 15.4998 10.7C15.9998 10.5 16.5998 10.5 17.0998 10.6C17.5998 10.7 18.0998 10.9 18.5998 11.2C18.7998 11.3 18.9998 11.5 19.1998 11.6C19.2998 11.7 19.3998 11.8 19.4998 11.9C19.5998 12 19.5998 12 19.6998 12C19.9998 12.5 20.1998 13 20.3998 13.6C20.6998 14.6 20.8998 15.7 20.8998 16.8C20.9998 17.1 21.0998 17.5 21.0998 17.8Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column - Benefits */}
      <motion.div 
        className="hidden lg:block relative w-0 flex-1 bg-primary-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-800 to-primary-600 opacity-90"></div>
        <div className="absolute inset-0 h-full w-full" style={{ backgroundImage: "url('https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')", backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.4 }}></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Banking for the modern world</h2>
            <p className="text-white text-xl mb-12 max-w-md">Manage your Current Account, Investments, and Pension all in one place with our award-winning platform.</p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Bank-level security</h3>
                  <p className="text-white text-opacity-80">Your money is protected up to £85,000 by the FSCS</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Low fees, high interest</h3>
                  <p className="text-white text-opacity-80">Competitive rates on savings and investments</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Smart insights</h3>
                  <p className="text-white text-opacity-80">AI-powered recommendations to optimize your finances</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;