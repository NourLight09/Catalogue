import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <table className={`w-full border-collapse ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
};

export const TableFooter = ({ children, className = '' }) => {
  return (
    <tfoot className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </tfoot>
  );
};

export const TableRow = ({ children, className = '' }) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = '' }) => {
  return (
    <th className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 ${className}`}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-2 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
};

