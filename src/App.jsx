// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
const Navbar = lazy(() => import('./components/common/Navbar'));
const Footer = lazy(() => import('./components/common/Footer'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const Articles = lazy(() => import('./pages/Articles'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Announcements = lazy(() => import('./pages/Announcements'));
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'));
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const PostsManagement = lazy(() => import('./pages/dashboard/PostsManagement'));
const CreatePost = lazy(() => import('./pages/dashboard/CreatePost'));
const MessagesView = lazy(() => import('./pages/dashboard/MessagesView'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes with Navbar & Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/resources/articles" element={<Articles />} />
                        <Route path="/resources/case-studies" element={<CaseStudies />} />
                        <Route path="/resources/announcements" element={<Announcements />} />
                        <Route path="/resources/:slug" element={<ResourceDetail />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Dashboard Routes - Nested inside DashboardLayout */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Suspense fallback={<PageLoader />}>
                    <DashboardLayout />
                  </Suspense>
                </PrivateRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="posts" element={<PostsManagement />} />
              <Route path="posts/create" element={<CreatePost />} />
              <Route path="posts/edit/:id" element={<CreatePost />} />
              <Route path="messages" element={<MessagesView />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;