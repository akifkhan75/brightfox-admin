
import React, { useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import TeacherDashboardView from './views/TeacherDashboardView.tsx';
import AppTeamDashboardView from './views/AppTeamDashboardView.tsx';
import { UserRole } from './types.ts';
import { TEACHER_NAV_ITEMS, APP_TEAM_NAV_ITEMS } from './constants.tsx';
import { Modal } from './components/common/Modal.tsx';
import { Button } from './components/common/Button.tsx';
import { Input } from './components/common/Input.tsx';
import { RootState, AppDispatch } from './src/app/store.ts';
import { toggleDarkMode, setModalOpen } from './src/features/ui/uiSlice.ts';
import { setCurrentRole } from './src/features/user/userSlice.ts';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const { darkMode, isModalOpen } = useSelector((state: RootState) => state.ui);
  const { currentRole } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => dispatch(toggleDarkMode());
  
  const handleRoleToggle = (role: UserRole) => {
    dispatch(setCurrentRole(role));
  };
  
  const handleSetModalOpen = (isOpen: boolean) => {
      dispatch(setModalOpen(isOpen));
  }

  const navItems = currentRole === UserRole.Teacher ? TEACHER_NAV_ITEMS : APP_TEAM_NAV_ITEMS;
  
  const currentTopLevelRoute = currentRole === UserRole.Teacher ? '/teacher' : '/appteam';

  const getPageTitle = (): string => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => currentPath.includes(item.path));
    if (activeItem) return activeItem.name;
    
    // Default titles for base paths
    if (currentPath.startsWith('/teacher')) return 'Teacher Dashboard';
    if (currentPath.startsWith('/appteam')) return 'AppTeam Dashboard';
    
    return 'WonderKid Admin';
  };

  const memoizedSidebar = useMemo(() => <Sidebar navItems={navItems} />, [navItems]);


  return (
    <div className="flex h-screen overflow-hidden">
      {memoizedSidebar}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentRole={currentRole}
          onToggleRole={handleRoleToggle}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onAddNew={() => handleSetModalOpen(true)}
          pageTitle={getPageTitle()}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
                <Route path="/" element={<Navigate to={`${currentTopLevelRoute}/dashboard`} replace />} />
                <Route path="/teacher/*" element={currentRole === UserRole.Teacher ? <TeacherDashboardView /> : <Navigate to="/appteam/dashboard" replace />} />
                <Route path="/appteam/*" element={currentRole === UserRole.AppTeam ? <AppTeamDashboardView /> : <Navigate to="/teacher/dashboard" replace />} />
                {/* Redirect if role changes and path doesn't match */}
                <Route path="*" element={<Navigate to={`${currentTopLevelRoute}/dashboard`} replace />} />
            </Routes>
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => handleSetModalOpen(false)} title="Add New Board">
        <form className="space-y-4">
          <Input label="Board Title" id="boardTitle" placeholder="Enter title for the new board" />
          <Input label="Description (Optional)" id="boardDescription" placeholder="A brief description" />
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={() => handleSetModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Board</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;