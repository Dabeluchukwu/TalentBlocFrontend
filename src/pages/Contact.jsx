// src/pages/Contact.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactCTA from '../components/contact/ContactCTA';

const Contact = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      // Get the actual form element inside the container
      const formElement = formRef.current.querySelector('form');
      if (formElement) {
        const elementPosition = formElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 120; // Adjust offset as needed
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to container if form not found
        const elementPosition = formRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            LET'S TALK
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Tell us what's still being done{' '}
            <span className="text-primary-500">by hand.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Whether you're exploring AI, improving your operations, or trying to make sense of the systems you already have, we'd be happy to have a conversation. Send us a message or book a discovery call, and we'll get back to you within one business day.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3" ref={formRef}>
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>

        {/* Full Width CTA Section */}
        <div className="mt-12">
          <ContactCTA onBookCall={scrollToForm} />
        </div>
      </div>
    </div>
  );
};

export default Contact;