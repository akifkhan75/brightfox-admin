
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from '../src/views/teacher/Dashboard.tsx';
import CourseManager from '../src/views/teacher/CourseManager.tsx';
import ContentStudio from '../src/views/teacher/ContentStudio.tsx';
import ClassManagement from '../src/views/teacher/ClassManagement.tsx';
import Communications from '../src/views/teacher/Communications.tsx';
import Earnings from '../src/views/teacher/Earnings.tsx';
import Profile from '../src/views/teacher/Profile.tsx';

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
