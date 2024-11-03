// src/pages/Login.js
import React, { useState } from 'react';
import brandLogo from '../assets/logos/vidyarthi_logo.jpg';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock } from 'react-icons/fi';

function Login() {
  const { t } = useTranslation();

  // State to handle input values and errors
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Validation function for email or phone
  const validateEmailOrPhone = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    return emailPattern.test(value) || phonePattern.test(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmailOrPhone(emailOrPhone)) {
      setError('Please enter a valid email address or a 10-digit phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }
    setError('');
    // Proceed with form submission logic here
    console.log('Form submitted successfully');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E4A56] via-[#165E6E] to-[#1D7A8C] backdrop-blur-lg px-4">
      <div className="bg-white w-full max-w-5xl p-6 lg:p-8 rounded-3xl shadow-2xl grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        
        {/* Left Column: Logo Section on Desktop */}
        <div className="flex items-center justify-center">
          <img src={brandLogo} alt="Vidyarthi Logo" className="h-48 w-auto" />
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden md:block h-full w-px bg-gray-300"></div>

        {/* Right Column: Form Section */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800">{t('login.title')}</h2>
          
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            {/* Reserved space for error message to avoid flicker */}
            <div className="h-6">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
            
            {/* Email or Phone Input */}
            <div className="relative flex items-center border rounded-full bg-gray-100 px-4 py-3">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="text"
                id="emailOrPhone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500 text-gray-800"
                placeholder={t('login.emailOrPhoneLabel')}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center border rounded-full bg-gray-100 px-4 py-3">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500 text-gray-800"
                placeholder={t('login.passwordLabel')}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition duration-200"
            >
              {t('login.loginButton')}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-sm text-center text-gray-500">
            {t('login.signUpPrompt')} <a href="/register" className="text-indigo-500 hover:underline">{t('login.signUpLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
