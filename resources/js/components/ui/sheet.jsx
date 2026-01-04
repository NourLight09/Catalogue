import React, { useState } from 'react';

export const Sheet = ({ open, onOpenChange, children, className = '' }) => {
  return (
    <>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { open, onOpenChange });
      })}
    </>
  );
};

export const SheetTrigger = ({ open, onOpenChange, onClick, children, className = '' }) => {
  const handleClick = (e) => {
    onOpenChange(true);
    onClick && onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

export const SheetContent = ({ open, onOpenChange, children, className = '' }) => {
  return (
    <>
      {open && (
        <div
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export const SheetHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const SheetTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const SheetClose = ({ onOpenChange, onClick, children, className = '' }) => {
  const handleClick = (e) => {
    onOpenChange(false);
    onClick && onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

