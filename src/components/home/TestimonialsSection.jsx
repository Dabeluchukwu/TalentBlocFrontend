
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'Nexa Solutions',
      content: 'Talent Bloc transformed our engineering culture. Their approach to talent acquisition didn\'t just fill seats; it elevated our entire output.',
      rating: 5,
    },
    {
      name: 'Marcus Thorne',
      title: 'VP of Ops',
      company: 'Global Logistics',
      content: 'The leadership development workshops were a game-changer. Our executives are more aligned and productive than ever before.',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      title: 'Founder',
      company: 'CreativTales',
      content: 'They understand the nuance of growth. Talent Bloc\'s organizational strategy helped us scale from 50 to 500 without losing our soul.',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="w-4 h-4 text-secondary-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="w-4 h-4 text-secondary-500" />);
      } else {
        stars.push(<FaStar key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
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
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 leading-relaxed flex-grow">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;