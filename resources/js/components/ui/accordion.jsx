import React, { useState } from 'react';

export const Accordion = ({ children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ value, children, className = '' }) => {
  return (
    <div className={`border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const AccordionTrigger = ({ value, onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-left font-medium hover:bg-gray-50 flex justify-between items-center ${className}`}
    >
      {children}
    </button>
  );
};

export const AccordionContent = ({ value, children, isOpen = false, className = '' }) => {
  return (
    isOpen && (
      <div className={`px-4 py-2 bg-gray-50 ${className}`}>
        {children}
      </div>
    )
  );
};

