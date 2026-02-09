import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
