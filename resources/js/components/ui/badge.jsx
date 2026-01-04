import React from 'react';

const VARIANTS = {
  default: 'bg-gray-900 text-white',
  secondary: 'bg-gray-200 text-gray-900',
  destructive: 'bg-red-600 text-white',
  outline: 'border border-gray-300 text-gray-900',
};

export const Badge = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

