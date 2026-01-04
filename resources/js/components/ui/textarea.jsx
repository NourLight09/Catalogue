import React from 'react';

export const Textarea = React.forwardRef(({
  placeholder = '',
  disabled = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed resize-none ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

