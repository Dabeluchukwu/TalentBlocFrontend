// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaUserCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import logo from '/images/TalentBlocLogo.jpeg';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Refs for dropdown containers
  const resourcesTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);
  const resourcesRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsResourcesOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
      if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    };
  }, []);

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
      resourcesTimeoutRef.current = null;
    }
    setIsResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 200); // 200ms delay to allow moving to dropdown
  };

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
      profileTimeoutRef.current = null;
    }
    setIsProfileOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      path: '/resources', 
      label: 'Resources', 
      hasDropdown: true,
      dropdownItems: [
        { path: '/resources/articles', label: 'Articles' },
        { path: '/resources/case-studies', label: 'Case Studies' },
        { path: '/resources/announcements', label: 'Announcements' },
      ]
    },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Image */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105 overflow-hidden">
              <img 
                src={logo} 
                alt="Talent Bloc Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-black tracking-tight">
              Talent<span className="text-primary-500">Bloc</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.hasDropdown ? (
                  <div
                    ref={resourcesRef}
                    onMouseEnter={handleResourcesMouseEnter}
                    onMouseLeave={handleResourcesMouseLeave}
                  >
                    <div className="flex items-center">
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 py-2 ${
                            isActive ? 'text-primary-500' : ''
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <button
                        onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                        className="ml-1 p-1 text-gray-400 hover:text-primary-500 transition-colors duration-200"
                        aria-label="Toggle resources dropdown"
                      >
                        <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                          isResourcesOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                    
                    {isResourcesOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in"
                        onMouseEnter={handleResourcesMouseEnter}
                        onMouseLeave={handleResourcesMouseLeave}
                      >
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors duration-200"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 py-2 ${
                        isActive ? 'text-primary-500' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Dashboard Link - Only visible when logged in */}
            {user && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
              >
                <FaTachometerAlt className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Right Side - CTA Button or Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Profile Dropdown when logged in
              <div
                ref={profileRef}
                className="relative"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors duration-200"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                    {user?.profileImage?.url ? (
                      <img 
                        src={user.profileImage.url} 
                        alt={user.name || 'User'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0) || 'A'
                    )}
                  </div>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isProfileOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in"
                    onMouseEnter={handleProfileMouseEnter}
                    onMouseLeave={handleProfileMouseLeave}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaTachometerAlt className="w-4 h-4" />
                      <span>Go to Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // CTA Button when not logged in
              <Link
                to="/contact"
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Schedule an assessment
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.hasDropdown ? (
                  <>
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block text-gray-700 hover:text-primary-500 font-medium py-2 ${
                            isActive ? 'text-primary-500' : ''
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                      <button
                        onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                        className="p-2 text-gray-400 hover:text-primary-500 transition-colors duration-200"
                      >
                        <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          isResourcesOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                    {isResourcesOpen && (
                      <div className="ml-4 space-y-2 border-l-2 border-primary-200 pl-4 mt-2">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block text-gray-600 hover:text-primary-500 py-2"
                            onClick={() => {
                              setIsOpen(false);
                              setIsResourcesOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-gray-700 hover:text-primary-500 font-medium py-2 ${
                        isActive ? 'text-primary-500' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
            
            {/* Mobile Dashboard Link */}
            {user && (
              <NavLink
                to="/dashboard"
                className="block text-gray-700 hover:text-primary-500 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <FaTachometerAlt className="inline w-4 h-4 mr-2" />
                Dashboard
              </NavLink>
            )}
            
            <Link
              to="/contact"
              className="block w-full text-center bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Book a call
            </Link>

            {/* Mobile Logout */}
            {user && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full text-center text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                <FaSignOutAlt className="inline w-4 h-4 mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;