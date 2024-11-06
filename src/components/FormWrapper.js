import React from 'react';
import brandLogo from '../assets/logos/vidyarthi_logo.jpg';

function FormWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-100 backdrop-blur-lg px-4">
      <div className="w-full max-w-5xl p-6 lg:p-8 shadow-2xl grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        
        {/* Left Column: Logo Section on Desktop */}
        <div className="flex items-center justify-center">
          <img src={brandLogo} alt="Vidyarthi Logo" className="h-48 w-auto" />
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden md:block h-full w-px bg-gray-300"></div>

        {/* Right Column: Content Section */}
        <div className="flex flex-col items-center space-y-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormWrapper;
