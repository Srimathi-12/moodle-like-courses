import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/TeacherNavbar';
import Sidebar from '@/components/TeacherSidebar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            <div className="grid gap-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
