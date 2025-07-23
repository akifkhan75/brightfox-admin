
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white dark:bg-darkcard shadow-lg rounded-xl p-6 ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
    title: string;
    action?: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, action, className= "" }) => {
    return (
        <div className={`flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            {action && <div>{action}</div>}
        </div>
    );
};
