
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaPencilAlt, FaRocket as FaShip, FaSeedling, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProcessSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const steps = [
    {
      icon: FaUserFriends,
      title: 'Assess',
      description: 'We spend real time inside the business, with leadership and the team, watching where the day actually goes. We surface where the operational debt is hiding, and what it\'s costing.',
      color: 'primary',
    },
    {
      icon: FaPencilAlt,
      title: 'Blueprint',
      description: 'A written operating model. What the process should be, which decisions need to be human, which don\'t, which instruments carry the load, and what should measurably change.',
      color: 'secondary',
    },
    {
      icon: FaShip,
      title: 'Build',
      description: 'We put the plan into the live business in phases. AI, automation, CRM and internal tooling tuned to the model. Something useful is in your hands within weeks, not quarters.',
      color: 'primary',
    },
    {
      icon: FaSeedling,
      title: 'Partner',
      description: 'Operations doesn\'t sit still. We stay close, tune what\'s live, and help the operating model evolve as the business does. Fewer surprises, more confidence.',
      color: 'secondary',
    },
  ];

  const faqs = [
    {
      question: 'What does an AI operations consultancy do?',
      answer: 'We help businesses improve the way they operate before introducing AI. That means understanding how work moves through your organization, identifying where time and effort are being lost, and designing a better way of working. Once the operating model is clear, we implement the right AI, automation, and business systems to support it.',
    },
    {
      question: 'How are you different from an AI agency or automation company?',
      answer: 'Most AI agencies focus on building AI solutions or automating individual tasks. We start with the business itself. We look at your operations, processes, and decision-making first, then use AI where it creates measurable value. Our goal is not to add more technology. It\'s to build a business that runs better.',
    },
    {
      question: 'Where does AI fit into the process?',
      answer: 'AI is part of the solution, not the starting point. Once we understand how your business should operate, we identify where AI can reduce manual work, improve decision-making, support your team, or automate repetitive processes. Every implementation has a clear business purpose.',
    },
    {
      question: 'What happens during the first conversation?',
      answer: 'The first conversation is a discovery session. We learn about your business, how your team works, the challenges you\'re facing, and what you\'re trying to achieve. We\'ll also explain how we work and whether we\'re the right partner for your business.',
    },
    {
      question: 'How long before we start seeing results?',
      answer: 'That depends on the complexity of your business and the work involved. Some improvements can be delivered within a few weeks, while larger operational transformations happen over several months. We focus on delivering value in stages so you begin seeing meaningful improvements as early as possible.',
    },
    {
      question: 'Are we going to replace our existing systems?',
      answer: 'Usually not. We prefer to improve what you already have before recommending new tools. In many cases, the problem is not the software; it\'s how the systems are connected and how people use them. If new technology is genuinely needed, we\'ll recommend it with a clear reason.',
    },
    {
      question: 'What if we don\'t know exactly what we need yet?',
      answer: 'That\'s completely normal. Many clients come to us knowing something isn\'t working but aren\'t sure what\'s causing it. We\'ll help you understand the underlying operational challenges, identify the biggest opportunities for improvement, and recommend the most practical next steps.',
    },
  ];

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
            FOUR STEPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Four steps, no theatre.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isPrimary = step.color === 'primary';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    isPrimary ? 'bg-primary-100 text-primary-500' : 'bg-secondary-100 text-secondary-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            {/* <p className="text-gray-600 mt-2">The things leaders ask before they book.</p> */}
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openQuestion === index ? (
                    <FaChevronUp className="w-4 h-4 text-primary-500 flex-shrink-0 ml-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;