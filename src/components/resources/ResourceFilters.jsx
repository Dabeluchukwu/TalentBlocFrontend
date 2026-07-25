
import React from 'react';
import { motion } from 'framer-motion';

const ResourceFilters = ({ options, activeFilter, onFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-8 p-1.5 bg-white rounded-xl shadow-sm border border-gray-200"
    >
      {options.map((option) => {
        const isActive = activeFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
              isActive
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
            }`}
          >
            {option.label}
            {isActive && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-lg -z-10"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
};

export default ResourceFilters;