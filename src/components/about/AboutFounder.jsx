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
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              {/* Main Image - Circular and Smaller */}
              <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl relative border-4 border-primary-100">
                <img 
                  src={founderImage} 
                  alt="Ikenna Igwebuike - Founder of TalentBloc" 
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center shadow-xl"
              >
                <FaQuoteLeft className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-secondary-500 rounded-full w-10 h-10 flex items-center justify-center shadow-xl"
              >
                <span className="text-white text-lg font-bold">⛳</span>
              </motion.div>
            </div>

            {/* Founder Signature - Moved Below Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <div className="flex flex-col items-center space-y-1">
                <h3 className="text-xl font-bold text-gray-900">Ikenna Igwebuike</h3>
                <p className="text-gray-500 text-sm">FOUNDER, TALENTBLOC</p>
                <div className="w-12 h-0.5 bg-primary-400 mt-2" />
              </div>
            </motion.div>
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
                I'm convinced most businesses don't have a technology problem. They have an operating problem. I've watched capable teams buy new software, hire good people, and adopt whatever AI tool is popular that quarter, and still struggle to move faster or decide better.
              </p>

              <p className="text-gray-700 leading-relaxed font-bold">
                Technology doesn't fix how an organisation works. It amplifies it.
              </p>

              <p className="text-gray-700 leading-relaxed">
                If your processes are disconnected, your information is scattered, and your decisions still depend on someone manually chasing three people for an answer, adding AI on top of that doesn't transform anything. It usually just gives the mess a faster engine.
              </p>

               <p className="text-gray-700 leading-relaxed">
                At TalentBloc, we study how work really moves through a business. We find where time, knowledge, and decisions are getting lost, and we build the systems that make the business simpler to run. 
              </p>

              <p className="text-gray-700 leading-relaxed">
               Sometimes that's automation. Sometimes it's redesigning a workflow. Sometimes it's putting AI exactly where it earns its keep, and nowhere else.
              </p>

              <p className="text-gray-700 leading-relaxed font-medium text-primary-600 pt-6 border-t border-gray-200">
               I'm not trying to get companies to use more AI. I'm trying to help them build organisations that make better decisions, move faster, and keep getting better as they grow.
              </p>

              {/* Added - Ikenna in blue */}
              <p className="text-primary-500 font-medium text-left mt-2">
                — Ikenna
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;