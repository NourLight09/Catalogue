import React from 'react';

export const Dialog = ({ open, onOpenChange, children, className = '' }) => {
  return (
    open && (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
        <div onClick={() => onOpenChange(false)} className="absolute inset-0" />
        <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          {children}
        </div>
      </div>
    )
  );
};

export const DialogContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-gray-600 mt-2 ${className}`}>
      {children}
    </p>
  );
};

export const DialogFooter = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-2 justify-end mt-6 pt-4 border-t ${className}`}>
      {children}
    </div>
  );
};

export const DialogTrigger = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

