import { forwardRef } from 'react';

const VARIANTS = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
  ghost: 'text-gray-900 hover:bg-gray-100',
};

const SIZES = {
  sm: 'px-3 py-1 text-sm',
  default: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  icon: 'p-2',
};

export const Button = forwardRef(({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const sizeClass = SIZES[size] || SIZES.default;
  
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

