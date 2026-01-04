import React from 'react';

export const Label = React.forwardRef(({
  children,
  htmlFor = '',
  className = '',
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

