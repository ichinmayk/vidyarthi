import React from 'react';
import brandLogo from '../assets/logos/vidyarthi_logo.jpg';

function FormWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E4A56] via-[#165E6E] to-[#1D7A8C] backdrop-blur-lg px-4">
      <div className="bg-white w-full max-w-5xl p-6 lg:p-8 rounded-3xl shadow-2xl grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        
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
