// src/components/home/ThingsPeopleSay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const ThingsPeopleSay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const quotes = [
    {
      text: "The same client is in three tools with three different names.",
      icon: "🔄"
    },
    {
      text: "Our pipeline says one thing, the sales team says another.",
      icon: "📊"
    },
    {
      text: "Half the tribal knowledge lives in one person's head.",
      icon: "🧠"
    },
    {
      text: "Something broke in the automation, we notice it a week later.",
      icon: "⚠️"
    },
    {
      text: "Nobody actually opens the dashboard we paid for.",
      icon: "📋"
    },
    {
      text: "Reporting takes a full day and I still don't trust the number.",
      icon: "📈"
    },
    {
      text: "I've turned into a human bridge between our apps.",
      icon: "🌉"
    },
    {
      text: "The setup that carried us at ten people is falling apart at fifty.",
      icon: "🏗️"
    }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(quotes.length / itemsPerPage);

  // Auto-play functionality with hover pause
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set up interval if not hovered
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === totalPages - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    // Cleanup on unmount or when hover state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, totalPages]);

  const getCurrentQuotes = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return quotes.slice(start, end);
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary-500/20 text-secondary-400 text-sm font-semibold rounded-full mb-4 border border-secondary-500/20">
            REAL TALK
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Things People Say To Us In Week One
          </h2>
          <p className="mt-2 text-gray-400 text-lg">
            You're probably somewhere in here.
          </p>
        </motion.div>

        {/* Quotes Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid md:grid-cols-2 gap-6"
            >
              {getCurrentQuotes().map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-primary-500/20 transition-colors duration-300">
                          {quote.icon}
                        </div>
                      </div>
                      <div>
                        <FaQuoteLeft className="w-4 h-4 text-primary-400/50 mb-2" />
                        <p className="text-gray-200 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                          "{quote.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Hover indicator - subtle pause icon */}
          {/* {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-400 border border-gray-700"
            >
              ⏸ Paused
            </motion.div>
          )} */}

          {/* Dot Indicators - Minimal */}
          <div className="flex justify-center items-center mt-10 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                className="relative"
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'bg-primary-400 w-6' 
                      : 'bg-gray-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default ThingsPeopleSay;