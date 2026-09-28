
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaCalendar, FaUser, FaNewspaper, FaBriefcase, FaBullhorn } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ResourceDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/slug/${slug}`);
        setPost(response.data.data);
      } catch (err) {
        setError('Post not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const getTypeConfig = (type) => {
    const configs = {
      'article': {
        icon: FaNewspaper,
        color: 'primary',
        label: 'Article'
      },
      'case-study': {
        icon: FaBriefcase,
        color: 'secondary',
        label: 'Case Study'
      },
      'announcement': {
        icon: FaBullhorn,
        color: 'purple',
        label: 'Announcement'
      }
    };
    return configs[type] || configs['article'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
          <Link to="/resources" className="text-primary-500 hover:underline mt-4 inline-block">
            ← Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const config = getTypeConfig(post.type);
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link 
            to="/resources" 
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200 mb-8"
          >
            <FaArrowLeft className="mr-2 w-4 h-4" />
            Back to Resources
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-lg ${config.color === 'primary' ? 'bg-primary-50 text-primary-600' : config.color === 'secondary' ? 'bg-secondary-50 text-secondary-600' : 'bg-purple-50 text-purple-600'}`}>
              <Icon className="w-4 h-4 mr-2" />
              {config.label}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center">
              <FaCalendar className="w-4 h-4 mr-2" />
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </span>
            {post.author && (
              <span className="flex items-center">
                <FaUser className="w-4 h-4 mr-2" />
                {post.author.name}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                {post.readTime} read
              </span>
            )}
          </div>
        </motion.div>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl mb-8"
          >
            <img 
              src={post.featuredImage.url} 
              alt={post.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

      {/* Content */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="prose prose-lg prose-primary max-w-none
    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24
    prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
    prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
    prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
    prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
    prose-strong:text-gray-900
    prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
    prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
    prose-li:text-gray-700 prose-li:my-1
    prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:not-italic
    prose-code:bg-gray-100 prose-code:text-primary-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
    prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
  "
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
};

export default ResourceDetail;