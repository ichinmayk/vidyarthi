// src/pages/Login.js
import React from 'react';
import brandLogo from '../assets/logos/vidyarthi_logo.jpg';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-teal-400">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Logo Background Section for Large Screens */}
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${brandLogo})` }}>
          {/* No content here, only the background image */}
        </div>
        
        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          {/* Logo only on mobile */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={brandLogo} alt="Vidyarthi Logo" className="h-16 w-auto rounded-full shadow-md" />
          </div>

          <h2 className="text-3xl font-semibold text-center text-white">{t('login.title')}</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-indigo-200">{t('login.emailOrPhoneLabel')}</label>
              <input
                type="text"
                id="emailOrPhone"
                className="w-full px-4 py-2 mt-1 border border-transparent rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder={t('login.emailOrPhoneLabel')}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-200">{t('login.passwordLabel')}</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 border border-transparent rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder={t('login.passwordLabel')}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
            >
              {t('login.loginButton')}
            </button>
          </form>

          <p className="text-sm text-center text-indigo-200">
            {t('login.signUpPrompt')} <a href="/register" className="text-indigo-300 hover:text-white hover:underline">{t('login.signUpLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
