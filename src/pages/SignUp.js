// src/pages/SignUp.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import FormWrapper from '../components/FormWrapper';
import FormHeader from '../components/FormHeader';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';

function SignUp() {
  const { t } = useTranslation();

  // State to handle input values and errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    if (!firstName || !lastName) {
      setError('Please enter your first and last name.');
      return;
    }
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
    console.log('Sign up form submitted successfully');
  };

  return (
    <FormWrapper>
      <FormHeader title={t('signup.title')} />

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Reserved space for error message to avoid flicker */}
        <div className="h-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* First Name Input */}
        <InputField
          icon={FiUser}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t('signup.firstNameLabel')}
        />

        {/* Last Name Input */}
        <InputField
          icon={FiUser}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t('signup.lastNameLabel')}
        />

        {/* Email or Phone Input */}
        <InputField
          icon={FiMail}
          type="text"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder={t('signup.emailOrPhoneLabel')}
        />

        {/* Password Input */}
        <InputField
          icon={FiLock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('signup.passwordLabel')}
        />

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition duration-200"
        >
          {t('signup.signUpButton')}
        </button>
      </form>

      {/* Footer Text */}
      <p className="text-sm text-center text-white">
        {t('signup.loginPrompt')}{' '}
        <Link to="/login" className="text-indigo-500 hover:underline">
          {t('signup.loginLink')}
        </Link>
      </p>
    </FormWrapper>
  );
}

export default SignUp;
