
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaArrowRight, FaNewspaper, FaBriefcase, FaBullhorn } from 'react-icons/fa';
import { format } from 'date-fns';

const ResourceCard = ({ post, index }) => {
  const getTypeConfig = (type) => {
    const configs = {
      'article': {
        icon: FaNewspaper,
        color: 'primary',
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-600',
        borderColor: 'border-primary-200',
        label: 'Article'
      },
      'case-study': {
        icon: FaBriefcase,
        color: 'secondary',
        bgColor: 'bg-secondary-50',
        textColor: 'text-secondary-600',
        borderColor: 'border-secondary-200',
        label: 'Case Study'
      },
      'announcement': {
        icon: FaBullhorn,
        color: 'purple',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        borderColor: 'border-purple-200',
        label: 'Announcement'
      }
    };
    return configs[type] || configs['article'];
  };

  const config = getTypeConfig(post.type);
  const Icon = config.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
    >
      <Link to={`/resources/${post.slug || post._id}`} className="block h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.featuredImage?.url || 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Talent+Bloc'} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Type Badge */}
          <div className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1.5 rounded-lg ${config.bgColor} border ${config.borderColor} backdrop-blur-sm`}>
            <Icon className={`w-3 h-3 ${config.textColor}`} />
            <span className={`text-xs font-semibold ${config.textColor}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaClock className="w-3 h-3 mr-1" />
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
              </span>
              {post.readTime && (
                <span>{post.readTime}</span>
              )}
            </div>
            <span className="text-primary-500 group-hover:translate-x-1 transition-transform duration-200">
              <FaArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ResourceCard;