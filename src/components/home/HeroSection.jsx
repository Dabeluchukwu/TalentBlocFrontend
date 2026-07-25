// src/components/home/HeroSection.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import heroBg from '/images/talentBlocImage.png'; 

const HeroSection = ({ scrollToProcess }) => {
  const stats = [
    { number: '500+', label: 'Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Expert Consultants' },
  ];

  const handleScrollToProcess = (e) => {
    e.preventDefault();
    if (scrollToProcess) {
      scrollToProcess();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Background Decorative Elements - Optional, can keep or remove */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary-500/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/10">
                CRM & Automation Consultancy
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Your software should be doing more of the work.{' '}
              <span className="text-primary-400">Right now your team is.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg text-gray-200 leading-relaxed max-w-lg"
            >
              We build, repair, and connect the CRMs and tools your business runs on, so the day to day stops depending on someone remembering a step, opening a spreadsheet, or copying a name into a second app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Book a 30min call
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button
                onClick={handleScrollToProcess}
                className="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <FaPhoneAlt className="mr-2 w-4 h-4" />
                See how we work
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Illustration */}
              <div className="relative z-10 bg-gradient-to-br from-primary-500/30 to-primary-700/30 backdrop-blur-sm rounded-3xl p-8 aspect-square flex items-center justify-center border border-white/10">
                <div className="text-center text-white">
                  <div className="text-7xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold">Talent Bloc</h3>
                  <p className="text-primary-200 mt-2">Empowering Teams Worldwide</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 z-20"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold text-gray-900">4.9/5</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 z-20"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏆</span>
                  <span className="font-semibold text-gray-900">Top Consultancy</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;