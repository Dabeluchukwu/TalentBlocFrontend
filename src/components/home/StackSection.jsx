// src/components/home/StackSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHubspot, 
  FaSalesforce,
  FaCog,
  FaBolt,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
  FaBook,
  FaUsers,
  FaBuilding,
  FaCloud,
  FaDatabase,
  FaCode,
  FaTools,
  FaRocket,
  FaNetworkWired,
  FaPlug,
  FaMicrochip,
  FaChartLine,
  FaUserFriends,
  FaClipboardList,
  FaTasks,
  FaProjectDiagram,
  FaLink,
  FaWrench
} from 'react-icons/fa';

const StackSection = () => {
  const crmTools = [
    { name: 'HubSpot', icon: FaHubspot, color: '#FF7A59' },
    { name: 'Salesforce', icon: FaSalesforce, color: '#00A1E0' },
    { name: 'Pipedrive', icon: FaPlug, color: '#1D6F9C' },
    { name: 'Monday.com', icon: FaNetworkWired, color: '#FF6D00' },
    { name: 'Zoho', icon: FaCloud, color: '#E42527' },
  ];

  const otherTools = [
    { name: 'Aircall', icon: FaPhone, color: '#00B388' },
    { name: 'Asana', icon: FaClipboardList, color: '#F06A6A' },
    { name: 'Mailchimp', icon: FaEnvelope, color: '#FFE01B' },
    { name: 'Stripe', icon: FaDollarSign, color: '#635BFF' },
    { name: 'QuickBooks', icon: FaBook, color: '#2CA01C' },
    { name: 'Zendesk', icon: FaUserFriends, color: '#03363D' },
    { name: 'RingCentral', icon: FaPhone, color: '#0D5B8F' },
    { name: 'ClickUp', icon: FaRocket, color: '#7B68EE' },
    { name: 'PayPal', icon: FaDollarSign, color: '#003087' },
    { name: 'Xero', icon: FaChartLine, color: '#13B5EA' },
    { name: 'Intercom', icon: FaUsers, color: '#AF52DE' },
    { name: 'Trello', icon: FaClipboardList, color: '#0052CC' },
    { name: 'Square', icon: FaBuilding, color: '#557D9E' },
  ];

  const automationTools = [
    { name: 'Zapier', icon: FaBolt, color: '#FF4A00' },
    { name: 'Make', icon: FaCog, color: '#6D4C41' },
    { name: 'n8n', icon: FaTools, color: '#B44B3A' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            THE SHAPE OF THE FIX
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
            One stack, quietly talking to itself.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your CRM sits in the middle. The rest of your stack plugs into it. In between them, 
            a thin automation layer keeps everything in sync without anyone touching a keyboard.
          </p>
        </motion.div>

        {/* Layer 1 - CRM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg">
              LAYER 01 / YOUR CRM
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {crmTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                >
                  <Icon className="w-5 h-5" style={{ color: tool.color }} />
                  <span className="font-medium text-gray-700">{tool.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Layer 2 - Everything Else */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            <span className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg">
              LAYER 02 / EVERYTHING ELSE YOU RUN
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {otherTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4" style={{ color: tool.color }} />
                  <span className="text-sm text-gray-600">{tool.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Layer 3 - Automation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg">
              LAYER 03 / THE WIRING
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {automationTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                >
                  <Icon className="w-5 h-5" style={{ color: tool.color }} />
                  <span className="font-medium text-gray-700">{tool.name}</span>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center italic">
            Keeps the layers above talking without anyone in the loop.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;