import React from 'react';

export const Slider = React.forwardRef(({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-blue-600 ${className}`}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

