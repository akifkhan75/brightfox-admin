
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from './Dashboard.tsx';
import CourseManager from './CourseManager.tsx';
import ContentStudio from './ContentStudio.tsx';
import ClassManagement from './ClassManagement.tsx';
import Communications from './Communications.tsx';
import Earnings from './Earnings.tsx';
import Profile from './Profile.tsx';

const TeacherDashboardView: React.FC = () => {
  return (
    <div className="flex-grow overflow-y-auto bg-lightbg dark:bg-darkbg">
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<CourseManager />} />
        <Route path="content" element={<ContentStudio />} />
        <Route path="classes" element={<ClassManagement />} />
        <Route path="inbox" element={<Communications />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default TeacherDashboardView;
