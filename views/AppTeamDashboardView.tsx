
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppTeamDashboard from '../src/views/appteam/Dashboard.tsx';
import ContentModeration from '../src/views/appteam/ContentModeration.tsx';
import UserManagement from '../src/views/appteam/UserManagement.tsx';
import BusinessOperations from '../src/views/appteam/BusinessOperations.tsx';
import Analytics from '../src/views/appteam/Analytics.tsx';
import AppConfiguration from '../src/views/appteam/AppConfiguration.tsx';

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
