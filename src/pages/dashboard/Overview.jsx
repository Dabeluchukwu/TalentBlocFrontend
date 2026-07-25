// src/pages/dashboard/Overview.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaNewspaper, 
  FaEnvelope, 
  FaUsers, 
  FaEye,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const Overview = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    posts: 0,
    messages: 0,
    unreadMessages: 0,
    views: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, messagesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/posts?status=published`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const posts = postsRes.data.data || [];
        const messages = messagesRes.data.data || [];
        const unreadMessages = messages.filter(m => m.status === 'unread');

        setStats({
          posts: posts.length,
          messages: messages.length,
          unreadMessages: unreadMessages.length,
          views: posts.reduce((acc, p) => acc + (p.views || 0), 0),
        });

        setRecentPosts(posts.slice(0, 5));
        setRecentMessages(messages.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.posts,
      icon: FaNewspaper,
      color: 'primary',
      link: '/dashboard/posts',
      change: '+12%',
      trend: 'up'
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
      title: 'Total Views',
      value: stats.views,
      icon: FaEye,
      color: 'purple',
      link: '/dashboard/analytics',
      change: '+8%',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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