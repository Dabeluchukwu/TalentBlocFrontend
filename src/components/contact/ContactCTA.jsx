// src/components/contact/ContactCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ContactCTA = ({ onBookCall }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Not sure where to start?
        </h3>
        <p className="text-xl sm:text-2xl font-semibold text-primary-400 mb-4">
          That's completely fine.
        </p>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6 text-sm sm:text-base">
          Most businesses come to us because they know something isn't working, not because they already know the solution. We'll help you understand where the friction is, what's causing it, and whether we're the right team to help.
        </p>
        <button
          onClick={onBookCall}
          className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl text-base"
        >
          Book a Discovery Call
          <FaArrowRight className="ml-3 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ContactCTA;