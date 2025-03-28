// src/components/ui/input.jsx
import React from 'react';

// Componente de Input com estilo básico
const Input = ({ type = 'text', value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
