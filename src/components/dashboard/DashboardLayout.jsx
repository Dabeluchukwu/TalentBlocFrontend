// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaNewspaper, 
  FaEnvelope, 
  FaBell, 
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaExternalLinkAlt,
  FaTachometerAlt
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import NotificationBell from './Notifications/NotificationBell';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Overview';
    if (path.startsWith('/dashboard/posts')) {
      if (path.includes('/create')) return 'Create Post';
      if (path.includes('/edit')) return 'Edit Post';
      return 'Posts';
    }
    if (path.startsWith('/dashboard/messages')) return 'Messages';
    if (path.startsWith('/dashboard/notifications')) return 'Notifications';
    if (path.startsWith('/dashboard/analytics')) return 'Analytics';
    if (path.startsWith('/dashboard/settings')) return 'Settings';
    return 'Dashboard';
  };

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Overview' },
    { path: '/dashboard/posts', icon: FaNewspaper, label: 'Posts' },
    { path: '/dashboard/messages', icon: FaEnvelope, label: 'Messages' },
    { path: '/dashboard/notifications', icon: FaBell, label: 'Notifications' },
    // { path: '/dashboard/analytics', icon: FaChartLine, label: 'Analytics' },
    { path: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Helper to get user avatar
  const getUserAvatar = () => {
    if (user?.profileImage?.url) {
      return <img src={user.profileImage.url} alt={user.name} className="w-full h-full object-cover" />;
    }
    return user?.name?.charAt(0) || 'A';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Dashboard Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <FaBars className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FaTachometerAlt className="w-5 h-5 text-primary-500" />
              <span className="text-lg font-bold text-gray-900 hidden sm:block">
                {getPageTitle()}
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <NotificationBell />
            
            {/* Go to Site Button */}
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors duration-200"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span className="hidden sm:inline">Go to Site</span>
            </Link>

            {/* User Info with Profile Image */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.profileImage?.url ? (
                  <img 
                    src={user.profileImage.url} 
                    alt={user.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || 'A'
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@talentbloc.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* User Profile with Image */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {user?.profileImage?.url ? (
                  <img 
                    src={user.profileImage.url} 
                    alt={user.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || 'A'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.name || 'Admin'}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email || 'admin@talentbloc.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-primary-50 text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-primary-500' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-6 bg-primary-500 rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors duration-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaExternalLinkAlt className="w-5 h-5" />
              <span className="font-medium">Go to Site</span>
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-primary-500 rounded-lg transition-colors duration-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaCog className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <button
              onClick={() => {
                setIsSidebarOpen(false);
                logout();
              }}
              className="flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Outlet renders child routes here */}
      <main className="lg:ml-64 pt-16 p-6 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;