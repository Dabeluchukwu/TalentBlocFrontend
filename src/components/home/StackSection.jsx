// src/components/home/StackSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHubspot, 
  FaSalesforce,
} from 'react-icons/fa';
import { CgMonday } from "react-icons/cg";
import { SiPiped, SiZoho, SiAircall, SiAsana, SiQuickbooks, SiZendesk, SiClickup, SiPaypal, SiXero, SiIntercom, SiTrello, SiZapier, SiMake, SiN8N } from "react-icons/si";
import { FaMailchimp, FaStripe } from "react-icons/fa";
import { LuSquareSquare } from "react-icons/lu";


const StackSection = () => {
  const crmTools = [
    { name: 'HubSpot', icon: FaHubspot, color: '#FF7A59' },
    { name: 'Salesforce', icon: FaSalesforce, color: '#00A1E0' },
    { name: 'Pipedrive', icon: SiPiped, color: '#1D6F9C' },
    { name: 'Monday.com', icon: CgMonday, color: '#FF6D00' },
    { name: 'Zoho', icon: SiZoho, color: '#E42527' },
  ];

  const otherTools = [
    { name: 'Aircall', icon: SiAircall, color: '#00B388' },
    { name: 'Asana', icon: SiAsana, color: '#F06A6A' },
    { name: 'Mailchimp', icon: FaMailchimp, color: '#FFE01B' },
    { name: 'Stripe', icon: FaStripe, color: '#635BFF' },
    { name: 'QuickBooks', icon: SiQuickbooks, color: '#2CA01C' },
    { name: 'Zendesk', icon: SiZendesk, color: '#03363D' },
    // { name: 'RingCentral', icon: SiClickup, color: '#0D5B8F' },
    { name: 'ClickUp', icon: SiClickup, color: '#7B68EE' },
    { name: 'PayPal', icon: SiPaypal, color: '#003087' },
    { name: 'Xero', icon: SiXero, color: '#13B5EA' },
    { name: 'Intercom', icon: SiIntercom, color: '#AF52DE' },
    { name: 'Trello', icon: SiTrello, color: '#0052CC' },
    { name: 'Square', icon: LuSquareSquare, color: '#557D9E' },
  ];

  const automationTools = [
    { name: 'Zapier', icon: SiZapier, color: '#FF4A00' },
    { name: 'Make', icon: SiMake, color: '#6D4C41' },
    { name: 'n8n', icon: SiN8N, color: '#B44B3A' },
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
            THE SHAPE OF THE SOLUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
           Operations first.  <span className='text-primary-400'>Technology second.</span> 
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
           Technology delivers the most value when it's built around the way your business should operate, not the way it happens to operate today.
           We start by designing the operating model. Then we select and connect the right systems, automate repetitive work, and introduce AI where it improves decisions, execution, and efficiency.
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
             LAYER 1 · YOUR CORE BUSINESS PLATFORM
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
              LAYER 2 · THE TOOLS YOUR BUSINESS RUNS ON
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
             LAYER 3 · AI AND AUTOMATION
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
            THE INTELLIGENCE THAT CONNECTS EVERYTHING TOGETHER.
          </p>
          <p className="mt-4 text-sm text-gray-500 text-center">
            AI ASSISTANTS, WORKFLOW AUTOMATION, INTEGRATIONS, AND BUSINESS LOGIC ELIMINATE REPETITIVE WORK, KEEP INFORMATION IN SYNC, AND HELP WORK MOVE WITHOUT CONSTANT MANUAL COORDINATION.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;