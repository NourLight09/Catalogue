import React from 'react';

export const Checkbox = React.forwardRef(({
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';

