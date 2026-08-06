
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaTwitter, 
  FaClock, 
  FaUsers, 
  FaCogs,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ContactInfo = () => {
  const infoItems = [
    {
      icon: FaEnvelope,
      label: 'Direct Email',
      value: 'talentbloc.africa@gmail.com',
      link: 'mailto:talentbloc.africa@gmail.com',
      color: 'primary'
    },
    {
      icon: FaClock,
      label: 'Response Time',
      value: 'We typically respond within one business day.',
      color: 'secondary'
    },
    {
      icon: FaXTwitter,
      label: 'Follow Us',
      value: '@talentbloc',
      link: 'https://twitter.com/talentbloc',
      color: 'primary'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
  

      {/* Info Cards */}
      <div className="space-y-3">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          const isPrimary = item.color === 'primary';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`group bg-white rounded-xl p-5 border ${
                isPrimary ? 'border-primary-100 hover:border-primary-300' : 'border-secondary-100 hover:border-secondary-300'
              } hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                  isPrimary ? 'bg-primary-50 text-primary-500' : 'bg-secondary-50 text-secondary-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.label === 'Follow Us' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-gray-900 font-medium hover:text-primary-500 transition-colors duration-200 break-all flex items-center group"
                    >
                      {item.value}
                      <FaArrowRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium break-al">{item.value}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
          {/* Best Fit Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <FaUsers className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Best Fit</h3>
              <p className="text-xs text-gray-400">Who we work best with</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
             Growing businesses that have outgrown the way they operate. If your team spends too much time coordinating work, relying on manual processes, or working across disconnected systems, we're probably a good fit.
          </p>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-2 pt-4"
      >
        <span className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-full border border-primary-100">
          <FaCogs className="w-3 h-3 mr-2" />
          Operations
        </span>
        <span className="inline-flex items-center px-4 py-2 bg-secondary-50 text-secondary-700 text-sm font-medium rounded-full border border-secondary-100">
          <FaCogs className="w-3 h-3 mr-2" />
          Automation
        </span>
        <span className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
          <FaCheckCircle className="w-3 h-3 mr-2 text-primary-500" />
          Precision
        </span>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center"
      >
        <p className="text-sm text-gray-500">
          ⚡️ We reply to every message within 24 hours
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;