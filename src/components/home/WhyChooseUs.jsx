
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaSyncAlt, FaChartLine, FaArrowRight, FaUserFriends } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Operations before automation',
      description: 'We improve the way work flows before introducing technology. Better operations make every AI investment more effective.',
      color: 'primary',
    },
    {
      icon: FaSyncAlt,
      title: 'Built around your business',
      description: 'No templates. No one-size-fits-all solutions. Every operating model is designed around how your business works, your people, and your goals.',
      color: 'secondary',
    },
    {
      icon: FaChartLine,
      title: 'Practical implementation',
      description: 'Strategy only matters if it gets adopted. We work alongside your team to implement, refine, and improve until the new way of working becomes the normal way of working.',
      color: 'primary',
    },
     {
      icon: FaUserFriends,
      title: 'Long-term partnership',
      description: 'Business doesn\'t stand still, and neither should your operations. We continue helping you adapt your systems, processes, and AI capabilities as your business grows.',
      color: 'secondary',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/30 rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-50/30 rounded-tr-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              WHY TALENT BLOC
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              We don't start with AI. We start with how your business works.
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Most AI projects fail because they're built on top of inefficient operations. We take a different approach. We help businesses design better ways of working first, then apply AI where it creates measurable value.

            </p>
            {/* <blockquote className="mt-6 pl-4 border-l-4 border-primary-500">
              <p className="text-gray-700 italic">
                "Our mission is to bridge the gap between human potential and business objectives."
              </p>
            </blockquote>
             */}
            <Link
              to="/about"
              className="inline-flex items-center mt-8 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              About Us
              <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isPrimary = feature.color === 'primary';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPrimary ? 'bg-primary-100 text-primary-500' : 'bg-secondary-100 text-secondary-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;