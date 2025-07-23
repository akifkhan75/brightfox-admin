
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavItem, Friend } from '../types.ts';
import { QuestionMarkCircleIcon, SparklesIcon } from './icons.tsx';
import { AppDispatch, RootState } from '../src/app/store.ts';
import { fetchFriends } from '../src/features/friends/friendsSlice.ts';

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const dispatch: AppDispatch = useDispatch();
  const { items: friends, status: friendsStatus } = useSelector((state: RootState) => state.friends);

  useEffect(() => {
    if (friendsStatus === 'idle') {
      dispatch(fetchFriends());
    }
  }, [friendsStatus, dispatch]);

  const groupedNavItems: { [key: string]: NavItem[] } = {};

  navItems.forEach(item => {
    const section = item.section || 'General';
    if (!groupedNavItems[section]) {
      groupedNavItems[section] = [];
    }
    groupedNavItems[section].push(item);
  });


  return (
    <div className="w-64 bg-white dark:bg-darkcard text-slate-700 dark:text-slate-300 flex flex-col h-full shadow-lg border-r border-slate-200 dark:border-slate-700">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-primary rounded-lg">
          <SparklesIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-primary dark:text-primary-light">WonderKid</h1>
      </div>
      
      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        {Object.entries(groupedNavItems).map(([section, items]) => (
          <div key={section} className="mb-4">
            <h2 className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{section}</h2>
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-150
                   ${isActive 
                      ? 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light font-medium' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                   }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="mt-4 p-4 bg-slate-800 dark:bg-slate-900 rounded-lg text-center text-white relative overflow-hidden">
          <div className="absolute -top-8 -left-8 w-20 h-20 bg-primary/30 rounded-full opacity-50"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-secondary/30 rounded-full opacity-50"></div>
          <QuestionMarkCircleIcon className="h-10 w-10 mx-auto mb-2 text-primary-light" />
          <h4 className="font-semibold text-lg">Help Center</h4>
          <p className="text-sm text-slate-300 mt-1 mb-3">Have a problem? Send us a message!</p>
          <button className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-3 rounded-md transition-colors">
            Go to help center
          </button>
        </div>
      </div>

       <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 mb-2">Friends</h3>
        <ul className="space-y-2">
          {friends.map((friend: Friend) => (
            <li key={friend.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
              <img src={friend.avatarUrl} alt={friend.name} className="h-8 w-8 rounded-full" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{friend.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{friend.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;