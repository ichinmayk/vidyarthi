
import React from 'react';

function InputField({ icon: Icon, type, value, onChange, placeholder }) {
  return (
    <div className="relative flex items-center border rounded-full bg-gray-100 px-4 py-3">
      <Icon className="text-gray-400 mr-2" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-transparent w-full focus:outline-none placeholder-gray-500 text-gray-800"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputField;
