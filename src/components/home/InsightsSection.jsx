// src/components/home/InsightsSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaNewspaper, FaBriefcase, FaBullhorn } from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const InsightsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts?featured=true&status=published&limit=3`
      );
      setPosts(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch featured posts:', err);
      setError('Failed to load featured content');
    } finally {
      setLoading(false);
    }
  };

  const getTypeConfig = (type) => {
    const configs = {
      'article': {
        icon: FaNewspaper,
        color: 'primary',
        bgColor: 'bg-primary-100',
        textColor: 'text-primary-700',
        label: 'Article'
      },
      'case-study': {
        icon: FaBriefcase,
        color: 'secondary',
        bgColor: 'bg-secondary-100',
        textColor: 'text-secondary-700',
        label: 'Case Study'
      },
      'announcement': {
        icon: FaBullhorn,
        color: 'purple',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        label: 'Announcement'
      }
    };
    return configs[type] || configs['article'];
  };

  // Calculate read time (approximate)
  const getReadTime = (content) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Render loading state
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                INSIGHTS & RESOURCES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Insights & Resources
              </h2>
              <p className="mt-2 text-gray-600">
                Stay ahead of the curve with our latest research and success stories.
              </p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center mt-4 sm:mt-0 text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-200 group"
            >
              View All Articles
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Loading Spinner */}
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              INSIGHTS & RESOURCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Insights & Resources
            </h2>
            <p className="mt-2 text-gray-600">
              Stay ahead of the curve with our latest research and success stories.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center mt-4 sm:mt-0 text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-200 group"
          >
            View All Articles
            <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Content Area */}
        {error ? (
          // Error State
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchFeaturedPosts}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          // Empty State - No content available
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
          >
            <div className="flex justify-center space-x-6 mb-4">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <FaNewspaper className="w-6 h-6 text-primary-500" />
              </div>
              <div className="w-14 h-14 bg-secondary-100 rounded-full flex items-center justify-center">
                <FaBriefcase className="w-6 h-6 text-secondary-500" />
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <FaBullhorn className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No featured content available</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Articles, case studies, and announcements will appear here once they're published and marked as featured.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center mt-6 text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-200 group"
            >
              Browse all resources
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        ) : (
          // Posts Grid - Content available
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const config = getTypeConfig(post.type);
              const Icon = config.icon;
              const readTime = getReadTime(post.content);
              
              return (
                <motion.article
                  key={post._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/resources/${post.slug || post._id}`} className="block h-full">
                    {/* Image */}
                    {post.featuredImage?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.featuredImage.url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Type Badge on Image */}
                        <div className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1.5 rounded-lg ${config.bgColor} backdrop-blur-sm border border-white/20`}>
                          <Icon className={`w-3 h-3 ${config.textColor}`} />
                          <span className={`text-xs font-semibold ${config.textColor}`}>
                            {config.label}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category Badge (if no image) */}
                      {!post.featuredImage?.url && (
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.textColor}`}>
                            <Icon className="w-3 h-3 inline mr-1" />
                            {config.label}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <FaClock className="w-3 h-3 mr-1" />
                            {readTime}
                          </span>
                        </div>
                      )}
                      
                      {/* Read Time (if image exists) */}
                      {post.featuredImage?.url && (
                        <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                          <FaClock className="w-3 h-3 mr-1" />
                          {readTime}
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {/* Read More */}
                      <div className={`inline-flex items-center mt-4 text-sm font-semibold ${
                        config.color === 'primary' 
                          ? 'text-primary-500 hover:text-primary-600' 
                          : config.color === 'secondary'
                          ? 'text-secondary-500 hover:text-secondary-600'
                          : 'text-purple-500 hover:text-purple-600'
                      } transition-colors duration-200 group-hover:translate-x-1 transition-transform`}>
                        Read More
                        <FaArrowRight className="ml-2 w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;