
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaWrench, 
  FaDatabase, 
  FaRobot,
  FaArrowRight 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: FaRocket,
      title: 'CRM Foundations',
      description: 'For teams still running on inboxes, sticky notes and one very heroic spreadsheet. We choose the platform that fits how you actually sell, stand it up properly, and get the team using it in the first week.',
      color: 'primary',
    },
    {
      icon: FaWrench,
      title: 'System Rehab',
      description: 'Half your pipeline stages are lying, an automation quietly died last quarter, and nobody trusts the reports. We open the hood, find what\'s wrong, and rebuild the parts that need it.',
      color: 'secondary',
    },
    {
      icon: FaDatabase,
      title: 'Data Rescue',
      description: 'Duplicates, missing fields, imports that landed sideways, three different spellings of the same company. We clean it, restructure it, and put the guardrails in place so it stays clean.',
      color: 'primary',
    },
    {
      icon: FaRobot,
      title: 'Automation Builds',
      description: 'Lead handoffs, onboarding checklists, invoice follow ups, status updates across tools. If your team is copying, pasting, or forwarding it, there\'s a build here that removes the step entirely.',
      color: 'secondary',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Four ways in. Same team on the other side.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isPrimary = service.color === 'primary';
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
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    isPrimary ? 'bg-primary-100 text-primary-500' : 'bg-secondary-100 text-secondary-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-4">
                    <Link 
                      to="/services" 
                      className={`inline-flex items-center text-sm font-semibold ${
                        isPrimary ? 'text-primary-500 hover:text-primary-600' : 'text-secondary-500 hover:text-secondary-600'
                      } transition-colors duration-200 group-hover:translate-x-1 transition-transform`}
                    >
                      Learn More
                      <FaArrowRight className="ml-2 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;