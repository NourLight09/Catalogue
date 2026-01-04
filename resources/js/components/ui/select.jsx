import React, { useState } from 'react';

export const Select = ({ value, onValueChange, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { isOpen, setIsOpen, value, onValueChange });
      })}
    </div>
  );
};

export const SelectTrigger = ({ isOpen, setIsOpen, value, children, className = '' }) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ children, className = '' }) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};

export const SelectContent = ({ isOpen, setIsOpen, value, onValueChange, children, className = '' }) => {
  return (
    isOpen && (
      <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto ${className}`}>
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { setIsOpen, onValueChange });
        })}
      </div>
    )
  );
};

export const SelectItem = ({ value, onValueChange, setIsOpen, children, className = '' }) => {
  const handleClick = () => {
    onValueChange(value);
    setIsOpen(false);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

