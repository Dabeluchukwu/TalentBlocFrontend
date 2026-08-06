// src/pages/TermsOfService.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaFileContract, 
  FaLaptop, 
  FaUsers, 
  FaClipboardList,
  FaHandshake,
  FaMoneyBillWave,
  FaCopyright,
  FaLock,
  FaExclamationTriangle,
  FaPlug,
  FaBalanceScale,
  FaEnvelope
} from 'react-icons/fa';

const TermsOfService = () => {
  const sections = [
    {
      id: 'introduction',
      icon: FaFileContract,
      title: '1. Introduction',
      content: (
        <p>
          These Terms of Service ("Terms") govern your use of the TalentBloc website and any services provided by TalentBloc ("we," "our," or "us").
          <br /><br />
          By using our website or engaging our services, you agree to these Terms. If you do not agree, please do not use our website or services.
        </p>
      )
    },
    {
      id: 'our-services',
      icon: FaLaptop,
      title: '2. Our Services',
      content: (
        <div>
          <p className="text-gray-600">
            TalentBloc is an AI operations consultancy. We help businesses improve the way they operate through operational assessments, operating model design, AI implementation, workflow automation, and related consulting services.
          </p>
          <p className="mt-3 text-gray-600 font-medium">
            The scope of every client engagement is agreed separately before work begins.
          </p>
        </div>
      )
    },
    {
      id: 'use-of-website',
      icon: FaUsers,
      title: '3. Use of Our Website',
      content: (
        <div>
          <p className="text-gray-600">
            You may use this website for lawful purposes only.
          </p>
          <p className="mt-3 text-gray-600">
            You agree not to misuse the website, interfere with its operation, attempt to gain unauthorised access to our systems, or use the website in a way that could harm TalentBloc or other users.
          </p>
        </div>
      )
    },
    {
      id: 'discovery-calls',
      icon: FaClipboardList,
      title: '4. Discovery Calls and Enquiries',
      content: (
        <div>
          <p className="text-gray-600">
            Submitting an enquiry or booking a discovery call does not create a client relationship or guarantee that we will provide consulting services.
          </p>
          <p className="mt-3 text-gray-600">
            Any engagement begins only after both parties agree on the scope of work and any applicable commercial terms.
          </p>
        </div>
      )
    },
    {
      id: 'client-responsibilities',
      icon: FaHandshake,
      title: '5. Client Responsibilities',
      content: (
        <div>
          <p className="text-gray-600">
            To deliver our services effectively, clients are expected to provide accurate information, timely feedback, and reasonable access to the systems, documents, and people required for the engagement.
          </p>
          <p className="mt-3 text-gray-600">
            Project timelines may change where required information or approvals are delayed.
          </p>
        </div>
      )
    },
    {
      id: 'fees-payments',
      icon: FaMoneyBillWave,
      title: '6. Fees and Payments',
      content: (
        <div>
          <p className="text-gray-600">
            Our fees, payment terms, and project timelines are agreed before work begins.
          </p>
          <p className="mt-3 text-gray-600">
            Unless otherwise agreed in writing, invoices are payable according to the payment terms stated on the invoice.
          </p>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      icon: FaCopyright,
      title: '7. Intellectual Property',
      content: (
        <div>
          <p className="text-gray-600">
            Clients retain ownership of the information, documents, and materials they provide.
          </p>
          <p className="mt-3 text-gray-600">
            Unless otherwise agreed in writing, TalentBloc retains ownership of its methodologies, frameworks, templates, and internal processes.
          </p>
          <p className="mt-3 text-gray-600">
            Upon full payment, clients receive the rights to the agreed project deliverables created specifically for their engagement.
          </p>
        </div>
      )
    },
    {
      id: 'confidentiality',
      icon: FaLock,
      title: '8. Confidentiality',
      content: (
        <div>
          <p className="text-gray-600">
            We treat confidential business information shared during an engagement with care and use it only for the purpose of delivering our services.
          </p>
          <p className="mt-3 text-gray-600">
            Both parties agree to respect the confidentiality of information shared throughout the engagement unless disclosure is required by law.
          </p>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      icon: FaExclamationTriangle,
      title: '9. Limitation of Liability',
      content: (
        <div>
          <p className="text-gray-600">
            While we provide our services with reasonable skill and care, we cannot guarantee specific business outcomes.
          </p>
          <p className="mt-3 text-gray-600">
            To the maximum extent permitted by applicable law, TalentBloc shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of our website or services.
          </p>
        </div>
      )
    },
    {
      id: 'third-party-services',
      icon: FaPlug,
      title: '10. Third-Party Services',
      content: (
        <div>
          <p className="text-gray-600">
            Our work may involve third-party software, AI platforms, automation tools, or business applications.
          </p>
          <p className="mt-3 text-gray-600">
            TalentBloc is not responsible for the availability, security, pricing, or performance of third-party services that are owned and operated by other organisations.
          </p>
        </div>
      )
    },
    {
      id: 'changes-terms',
      icon: FaFileContract,
      title: '11. Changes to These Terms',
      content: (
        <div>
          <p className="text-gray-600">
            We may update these Terms from time to time.
          </p>
          <p className="mt-3 text-gray-600">
            The latest version will always be available on this page together with the updated effective date.
          </p>
        </div>
      )
    },
    {
      id: 'governing-law',
      icon: FaBalanceScale,
      title: '12. Governing Law',
      content: (
        <div>
          <p className="text-gray-600">
            These Terms shall be governed by and interpreted in accordance with the laws applicable to TalentBloc's principal place of business, unless otherwise agreed in writing.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      icon: FaEnvelope,
      title: '13. Contact Us',
      content: (
        <div>
          <p className="text-gray-600 mb-3">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-semibold text-gray-900">TalentBloc</p>
            <p className="text-gray-600">
              Email: <a href="mailto:talentbloc.africa@gmail.com" className="text-primary-500 hover:text-primary-600 transition-colors">talentbloc.africa@gmail.com</a>
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200 group"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-4 border border-primary-200/50">
            <FaFileContract className="w-3 h-3 mr-2" />
            TERMS OF SERVICE
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Last updated: August 6, 2026
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                id={section.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <div className="text-gray-600 leading-relaxed space-y-2">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-8"
        >
          <p>
            If you have any questions about these Terms of Service, please{' '}
            <Link to="/contact" className="text-primary-500 hover:text-primary-600 transition-colors font-medium">
              contact us
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;