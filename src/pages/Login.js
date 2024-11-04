// src/pages/Login.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock } from 'react-icons/fi';
import FormWrapper from '../components/FormWrapper';
import FormHeader from '../components/FormHeader';
import InputField from '../components/InputField';

function Login() {
  const { t } = useTranslation();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmailOrPhone = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    return emailPattern.test(value) || phonePattern.test(value);
  };

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
    console.log('Form submitted successfully');
  };

  return (
    <FormWrapper>
      <FormHeader title={t('login.title')} />
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="h-6">{error && <p className="text-red-500 text-sm text-center">{error}</p>}</div>
        <InputField
          icon={FiMail}
          type="text"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder={t('login.emailOrPhoneLabel')}
        />
        <InputField
          icon={FiLock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.passwordLabel')}
        />
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition duration-200"
        >
          {t('login.loginButton')}
        </button>
      </form>
      <p className="text-sm text-center text-gray-500">
        {t('login.signUpPrompt')} <a href="/signup" className="text-indigo-500 hover:underline">{t('login.signUpLink')}</a>
      </p>
    </FormWrapper>
  );
}

export default Login;
