// src/pages/dashboard/Overview.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaNewspaper, 
  FaEnvelope, 
  FaUsers, 
  FaEye,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Overview = () => {
  const { token } = useAuth();
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [stats, setStats] = useState({
    posts: 0,
    messages: 0,
    unreadMessages: 0,
    views: 0,
    unreadNotifications: 0,
    postsChange: '0%',
    viewsChange: '0%',
    currentPeriodPosts: 0,
    previousPeriodPosts: 0,
    currentPeriodViews: 0,
    previousPeriodViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const timePeriods = [
    { value: 'daily', label: 'Daily', icon: FaCalendarDay },
    { value: 'weekly', label: 'Weekly', icon: FaCalendarWeek },
    { value: 'monthly', label: 'Monthly', icon: FaCalendarAlt },
    { value: 'yearly', label: 'Yearly', icon: FaCalendar },
  ];

  const getTimeRange = (period) => {
    const now = new Date();
    let currentStart, previousStart, previousEnd;

    switch (period) {
      case 'daily':
        currentStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 48 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'weekly':
        currentStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        currentStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'yearly':
        currentStart = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        currentStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    return { currentStart, previousStart, previousEnd };
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token, timePeriod]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [postsRes, messagesRes, notifsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/posts?status=published`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/notifications/unread/count`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const posts = postsRes.data.data || [];
      const messages = messagesRes.data.data || [];
      const unreadMessages = messages.filter(m => m.status === 'unread');

      // Get time ranges based on selected period
      const { currentStart, previousStart, previousEnd } = getTimeRange(timePeriod);

      // Count posts in current period
      const currentPeriodPosts = posts.filter(p => new Date(p.createdAt) >= currentStart);
      const previousPeriodPosts = posts.filter(p => {
        const date = new Date(p.createdAt);
        return date >= previousStart && date < previousEnd;
      });

      // Count views in current period
      const currentPeriodViews = posts.reduce((acc, p) => {
        if (new Date(p.createdAt) >= currentStart) {
          return acc + (p.views || 0);
        }
        return acc;
      }, 0);

      const previousPeriodViews = posts.reduce((acc, p) => {
        const date = new Date(p.createdAt);
        if (date >= previousStart && date < previousEnd) {
          return acc + (p.views || 0);
        }
        return acc;
      }, 0);

      // Calculate percentage changes
      const calculateChange = (current, previous) => {
        if (previous === 0) {
          return current > 0 ? '+100%' : '0%';
        }
        const change = ((current - previous) / previous) * 100;
        const rounded = Math.round(change);
        return `${rounded > 0 ? '+' : ''}${rounded}%`;
      };

      setStats({
        posts: posts.length,
        messages: messages.length,
        unreadMessages: unreadMessages.length,
        views: posts.reduce((acc, p) => acc + (p.views || 0), 0),
        unreadNotifications: notifsRes.data.count || 0,
        postsChange: calculateChange(currentPeriodPosts.length, previousPeriodPosts.length),
        viewsChange: calculateChange(currentPeriodViews, previousPeriodViews),
        currentPeriodPosts: currentPeriodPosts.length,
        previousPeriodPosts: previousPeriodPosts.length,
        currentPeriodViews: currentPeriodViews,
        previousPeriodViews: previousPeriodViews,
      });

      setRecentPosts(posts.slice(0, 5));
      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPeriodLabel = () => {
    const period = timePeriods.find(p => p.value === timePeriod);
    return period ? period.label.toLowerCase() : 'weekly';
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.posts,
      icon: FaNewspaper,
      color: 'primary',
      link: '/dashboard/posts',
      change: stats.postsChange,
      trend: stats.postsChange.startsWith('+') ? 'up' : stats.postsChange === '0%' ? 'neutral' : 'down',
      subtitle: `${stats.currentPeriodPosts} this ${getPeriodLabel()}`
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: FaEnvelope,
      color: 'secondary',
      link: '/dashboard/messages',
      change: `${stats.unreadMessages} unread`,
      trend: 'neutral'
    },
    {
      title: 'Notifications',
      value: stats.unreadNotifications,
      icon: FaBell,
      color: 'purple',
      link: '/dashboard/notifications',
      change: stats.unreadNotifications > 0 ? 'Unread' : 'All read',
      trend: stats.unreadNotifications > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Total Views',
      value: stats.views,
      icon: FaEye,
      color: 'primary',
      link: '/dashboard/analytics',
      change: stats.viewsChange,
      trend: stats.viewsChange.startsWith('+') ? 'up' : stats.viewsChange === '0%' ? 'neutral' : 'down',
      subtitle: `${stats.currentPeriodViews} this ${getPeriodLabel()}`
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Time Period Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your content.</p>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex items-center space-x-1 p-1 bg-white rounded-xl border border-gray-200 shadow-sm">
          {timePeriods.map((period) => {
            const Icon = period.icon;
            const isActive = timePeriod === period.value;
            return (
              <button
                key={period.value}
                onClick={() => setTimePeriod(period.value)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{period.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-primary-50 text-primary-500',
            secondary: 'bg-secondary-50 text-secondary-500',
            purple: 'bg-purple-50 text-purple-500',
          };
          const borderColors = {
            primary: 'border-primary-100 hover:border-primary-300',
            secondary: 'border-secondary-100 hover:border-secondary-300',
            purple: 'border-purple-100 hover:border-purple-300',
          };
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 border ${borderColors[stat.color]} hover:shadow-lg transition-all duration-300`}
            >
              <Link to={stat.link} className="block">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {stat.change && (
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 
                      stat.trend === 'down' ? 'text-red-500' : 
                      'text-gray-500'
                    }`}>
                      {stat.trend === 'up' && <FaArrowUp className="inline w-3 h-3 mr-1" />}
                      {stat.trend === 'down' && <FaArrowDown className="inline w-3 h-3 mr-1" />}
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Posts</h3>
            <Link to="/dashboard/posts" className="text-sm text-primary-500 hover:text-primary-600">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet</p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/dashboard/posts/edit/${post._id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className="capitalize">{post.type}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Messages</h3>
            <Link to="/dashboard/messages" className="text-sm text-primary-500 hover:text-primary-600">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <Link
                  key={message._id}
                  to={`/dashboard/messages/${message._id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{message.subject}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      message.status === 'unread' 
                        ? 'bg-red-100 text-red-600' 
                        : message.status === 'read'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;