import React from 'react';

export const Input = React.forwardRef(({
  type = 'text',
  placeholder = '',
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

