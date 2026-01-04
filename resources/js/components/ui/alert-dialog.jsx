import React from 'react';

export const AlertDialog = ({ open, onOpenChange, children, className = '' }) => {
  return (
    open && (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
        <div onClick={() => onOpenChange(false)} className="absolute inset-0" />
        <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full mx-4">
          {children}
        </div>
      </div>
    )
  );
};

export const AlertDialogContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDialogHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDialogTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const AlertDialogDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-gray-600 mt-2 ${className}`}>
      {children}
    </p>
  );
};

export const AlertDialogFooter = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-2 justify-end mt-6 pt-4 border-t ${className}`}>
      {children}
    </div>
  );
};

export const AlertDialogAction = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export const AlertDialogCancel = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition ${className}`}
    >
      {children}
    </button>
  );
};

