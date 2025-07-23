
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, id, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
      <div className="relative rounded-md shadow-sm">
        {icon && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>}
        <input
          id={id}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                     text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 
                     focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
