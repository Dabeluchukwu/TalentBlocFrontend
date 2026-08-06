// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaEnvelope, FaCalendarAlt, FaLock, FaCookie, FaUserShield } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'introduction',
      icon: FaShieldAlt,
      title: '1. Introduction',
      content: (
        <p>
          TalentBloc ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us.
          <br /><br />
          This Privacy Policy explains what information we collect, how we use it, and the choices you have when you visit our website, contact us, or engage our services.
          <br /><br />
          By using our website, you agree to the practices described in this policy.
        </p>
      )
    },
    {
      id: 'information-collect',
      icon: FaUserShield,
      title: '2. Information We Collect',
      content: (
        <div>
          <p className="font-medium text-gray-800 mb-2">We may collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Your name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Phone number (where provided)</li>
            <li>Information you include in contact forms, emails, or discovery call requests</li>
          </ul>
          <p className="mt-3 text-gray-600">
            If you become a client, we may also collect information required to deliver our services, prepare agreements, issue invoices, and communicate throughout the engagement.
          </p>
          <p className="mt-3 text-gray-600">
            We may also collect limited technical information automatically, such as your IP address, browser type, device information, and pages visited on our website.
          </p>
        </div>
      )
    },
    {
      id: 'how-we-use',
      icon: FaCalendarAlt,
      title: '3. How We Use Your Information',
      content: (
        <div>
          <p className="font-medium text-gray-800 mb-2">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Respond to your enquiries</li>
            <li>Schedule meetings and discovery calls</li>
            <li>Deliver our consulting services</li>
            <li>Prepare proposals, agreements, and invoices</li>
            <li>Improve our website and services</li>
            <li>Communicate with you about your engagement</li>
            <li>Meet our legal and business obligations</li>
          </ul>
          <p className="mt-3 text-gray-600">We only collect information that is relevant to these purposes.</p>
        </div>
      )
    },
    {
      id: 'how-we-share',
      icon: FaLock,
      title: '4. How We Share Information',
      content: (
        <div>
          <p className="text-gray-600">
            We do not sell your personal information.
            <br /><br />
            We may share information with trusted service providers that help us operate our business, such as website hosting, email services, scheduling platforms, payment providers, or document management services.
            <br /><br />
            We may also disclose information where required by law or to protect our legal rights.
          </p>
        </div>
      )
    },
    {
      id: 'cookies',
      icon: FaCookie,
      title: '5. Cookies and Analytics',
      content: (
        <div>
          <p className="text-gray-600">
            Our website may use cookies and similar technologies to improve your browsing experience and understand how visitors use our website.
            <br /><br />
            You can control or disable cookies through your browser settings. Please note that some parts of the website may not function properly if cookies are disabled.
          </p>
        </div>
      )
    },
    {
      id: 'data-security',
      icon: FaLock,
      title: '6. Data Security',
      content: (
        <div>
          <p className="text-gray-600">
            We take reasonable administrative, technical, and organisational measures to protect the information we collect.
            <br /><br />
            While no method of storing or transmitting data can guarantee complete security, we work to protect your information using appropriate safeguards.
          </p>
        </div>
      )
    },
    {
      id: 'data-retention',
      icon: FaCalendarAlt,
      title: '7. Data Retention',
      content: (
        <div>
          <p className="text-gray-600">
            We keep personal information only for as long as necessary to provide our services, meet legal obligations, resolve disputes, and maintain appropriate business records.
            <br /><br />
            When information is no longer required, we securely delete or anonymise it where appropriate.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      icon: FaUserShield,
      title: '8. Your Rights',
      content: (
        <div>
          <p className="font-medium text-gray-800 mb-2">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to certain uses of your information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="mt-3 text-gray-600">To exercise any of these rights, please contact us using the details below.</p>
        </div>
      )
    },
    {
      id: 'third-party',
      icon: FaShieldAlt,
      title: '9. Third-Party Websites',
      content: (
        <div>
          <p className="text-gray-600">
            Our website may contain links to third-party websites or services.
            <br /><br />
            We are not responsible for the privacy practices of those websites, and we encourage you to review their privacy policies before providing personal information.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      icon: FaCalendarAlt,
      title: '10. Changes to This Policy',
      content: (
        <div>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time.
            <br /><br />
            Any updates will be published on this page together with the revised "Last updated" date.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      icon: FaEnvelope,
      title: '11. Contact Us',
      content: (
        <div>
          <p className="text-gray-600 mb-3">
            If you have any questions about this Privacy Policy or how we handle your information, please contact us.
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
            <FaShieldAlt className="w-3 h-3 mr-2" />
            PRIVACY POLICY
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Privacy Policy
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
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-8"
        >
          <p>
            If you have any questions about this Privacy Policy, please{' '}
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

export default PrivacyPolicy;