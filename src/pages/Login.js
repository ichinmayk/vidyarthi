// src/pages/Login.js
import React from 'react';
import brandLogo from '../assets/logos/vidyarthi_logo.jpg';

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-teal-400">
            <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    {/* Using a circular logo effect */}
                    <img src={brandLogo} alt="Vidyarthi Logo" className="h-24 w-auto rounded-full shadow-md" />
                </div>
                <h2 className="text-3xl font-semibold text-center text-white">Welcome Back</h2>
                <p className="text-center text-indigo-200">Log in to access your account</p>
                
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-indigo-200">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border border-transparent rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-indigo-200">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-transparent rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-sm text-center text-indigo-200">
                    Don’t have an account? <a href="/register" className="text-indigo-300 hover:text-white hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
