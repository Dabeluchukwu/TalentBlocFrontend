// src/components/about/AboutValues.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaCommentDots, FaClipboardList, FaDollarSign } from 'react-icons/fa';

const AboutValues = () => {
  const values = [
    {
      icon: FaUserCheck,
      title: 'Business before TECHNOLOGY',
      subtitle: 'We start with the business.',
      description: 'Every engagement begins with understanding how the business operates today. We want to know how decisions are made, where work slows down, and what gets in the way of progress before we think about technology.',
      color: 'primary'
    },
    {
      icon: FaCommentDots,
      title: 'Clarity over noise',
      subtitle: 'We don\'t recommend technology for its own sake.',
      description: 'AI, automation, and business systems are useful when they solve a real problem. If they don\'t make the business work better, they don\'t belong.',
      color: 'secondary'
    },
    {
      icon: FaClipboardList,
      title: 'Partner, not vendor',
      subtitle: 'We believe simple is better.',
      description: 'The best operating models aren\'t the most complicated ones. They\'re the ones people understand, trust, and use every day.',
      color: 'primary'
    },
    {
      icon: FaDollarSign,
      title: 'Tied to a real number',
      subtitle: 'We measure success by how the business changes.',
      description: 'More time for leadership. Fewer manual tasks. Better visibility. Faster decisions. Those are the outcomes we\'re interested in.',
      color: 'secondary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-50/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            WHAT GUIDES OUR WORK
          </span>
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            A few things we've made ourselves stubborn about.
          </h2> */}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            const isPrimary = value.color === 'primary';
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary-200 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                  isPrimary ? 'bg-primary-500' : 'bg-secondary-500'
                }`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    isPrimary ? 'bg-primary-100 text-primary-500' : 'bg-secondary-100 text-secondary-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <span className={`inline-block text-xs font-semibold uppercase tracking-wider mb-2 ${
                    isPrimary ? 'text-primary-500' : 'text-secondary-500'
                  }`}>
                    {value.title}
                  </span>

                  {/* Subtitle */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.subtitle}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValues;