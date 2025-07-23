
import React from 'react';
import { SearchIcon, SunIcon, MoonIcon, BellIcon, CogIcon, PlusIcon, ChevronDownIcon } from './icons.tsx';
import { UserRole } from '../types.ts';
import { Input } from './common/Input.tsx';
import { Button } from './common/Button.tsx';

interface HeaderProps {
  currentRole: UserRole;
  onToggleRole: (role: UserRole) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onAddNew?: () => void; // Optional: specific action for "Add New"
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onToggleRole, darkMode, onToggleDarkMode, onAddNew, pageTitle }) => {
  return (
    <header className="bg-white dark:bg-darkcard shadow-md h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mr-8">{pageTitle}</h1>
        <div className="w-96">
          <Input 
            type="search" 
            placeholder="Search your course..." 
            icon={<SearchIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />} 
            className="bg-slate-100 dark:bg-slate-700 border-transparent focus:bg-white dark:focus:bg-slate-600"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
            <button 
                onClick={onToggleDarkMode}
                className={`p-2 rounded-md ${!darkMode ? 'bg-primary text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                aria-label="Toggle Light Mode"
            >
                <SunIcon className="h-5 w-5" /> 
            </button>
            <button 
                onClick={onToggleDarkMode}
                className={`p-2 rounded-md ${darkMode ? 'bg-primary text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                aria-label="Toggle Dark Mode"
            >
                <MoonIcon className="h-5 w-5" />
            </button>
        </div>

        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
          <CogIcon className="h-6 w-6" />
        </button>

        <div className="relative">
          <select 
            value={currentRole} 
            onChange={(e) => onToggleRole(e.target.value as UserRole)}
            className="appearance-none bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          >
            <option value={UserRole.Teacher}>Teacher View</option>
            <option value={UserRole.AppTeam}>AppTeam View</option>
          </select>
          <ChevronDownIcon className="h-4 w-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        
        {onAddNew && (
            <Button onClick={onAddNew} variant="primary" size="md" leftIcon={<PlusIcon className="h-5 w-5"/>}>
                Add New Board
            </Button>
        )}
      </div>
    </header>
  );
};

export default Header;