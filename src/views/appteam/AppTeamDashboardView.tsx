
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppTeamDashboard from './Dashboard.tsx';
import ContentModeration from './ContentModeration.tsx';
import UserManagement from './UserManagement.tsx';
import BusinessOperations from './BusinessOperations.tsx';
import Analytics from './Analytics.tsx';
import AppConfiguration from './AppConfiguration.tsx';

const AppTeamDashboardView: React.FC = () => {
  return (
    <div className="flex-grow overflow-y-auto bg-lightbg dark:bg-darkbg">
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AppTeamDashboard />} />
        <Route path="moderation" element={<ContentModeration />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="business" element={<BusinessOperations />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="config" element={<AppConfiguration />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default AppTeamDashboardView;
