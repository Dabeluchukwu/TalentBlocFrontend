// src/components/about/AboutFounder.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import founderImage from '/images/AragonImage.jpeg'; 

const AboutFounder = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary-50/20 rounded-br-[200px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary-50/20 rounded-tl-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src={founderImage} 
                  alt="Ikenna Igwebuike - Founder of TalentBloc" 
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
              >
                <FaQuoteLeft className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-secondary-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl"
              >
                <span className="text-white text-xl font-bold">⛳</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quote Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block p-3 bg-primary-50 rounded-full"
            >
              <FaQuoteLeft className="w-5 h-5 text-primary-500" />
            </motion.div>

            {/* Founder Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-gray-700 leading-relaxed">
                I started TalentBloc after enough time inside growing companies to notice a pattern. 
                The tools were there. The budget for the tools was there. And yet someone on the team 
                was quietly spending three days a week keeping the tools honest, updating the same 
                record in two places, chasing the same follow up for the fourth time, exporting a 
                report only to rebuild it in a spreadsheet.
              </p>

              <p className="text-gray-700 leading-relaxed">
                That work is invisible until it isn't. It burns out your best people first, because 
                they're the ones who care enough to hold the mess together.
              </p>

              <p className="text-gray-700 leading-relaxed font-medium text-primary-600">
                TalentBloc exists to lift that weight off. Not by throwing another platform at the 
                problem, but by getting inside the one you already have, fixing the parts that are 
                lying, and wiring the rest so it does its own carrying.
              </p>
            </motion.div>

            {/* Founder Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="pt-6 border-t border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  II
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Ikenna Igwebuike</h3>
                  <p className="text-gray-500 text-sm">FOUNDER, TALENTBLOC</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;