// src/components/about/AboutStudio.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

const AboutStudio = () => {
  const features = [
    {
      icon: FaUsers,
      title: 'Small by Design',
      description: 'The people you meet on the first call are the people writing the automations, migrating the data, and rebuilding the pipeline.'
    },
    {
      icon: FaRocket,
      title: 'Built to Ship',
      description: 'No layered teams, no account managers translating your problem to someone else. Just work that gets done.'
    },
    {
      icon: FaShieldAlt,
      title: 'Direct Access',
      description: 'You talk to the people doing the work. Always. From day one to deployment and beyond.'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-50/50 rounded-br-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary-50/50 rounded-tl-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              A small studio for the CRM and automation work that actually ships.
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              TalentBloc is deliberately small. The people you meet on the first call are the 
              people writing the automations, migrating the data, and rebuilding the pipeline.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              No layered teams, no account managers whose job is to translate your problem to 
              someone else.
            </p>
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
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-primary-50/50 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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

export default AboutStudio;