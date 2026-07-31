
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
      question: 'You call yourselves an AI operations consultancy. What does that actually mean?',
      answer: 'We work on how a company runs, not just what tools it uses. That means we look at the operating model first, then decide where AI, automation, CRM and internal tooling belong inside it. Technology is the instrument, the operating model is the offer.',
    },
    {
      question: 'How is this different from an agency?',
      answer: 'An agency ships projects. We take a position on the business. We stay long enough to see whether the operations actually got better, we say no to work that doesn\'t move a real number, and we\'re honest when the answer isn\'t more technology.',
    },
    {
      question: 'Where does AI fit in?',
      answer: 'Where it earns its keep. Some parts of the operation belong to humans, some parts belong to automation, and a specific slice belongs to AI: agents, assistants, and models that carry repeatable judgement work. We\'re deliberate about which is which.',
    },
    {
      question: 'What does the first conversation look like?',
      answer: 'Thirty minutes, no slide deck. You describe what feels heavy, we ask questions. By the end we can usually tell you whether the friction is the operating model, the instruments, the data, the process, or some flavour of all four. If we\'re not the right fit, we\'ll say so.',
    },
    {
      question: 'How long until something changes?',
      answer: 'The assessment takes 1 to 3 weeks depending on the size of the business. First visible changes in the operating model usually land inside 4 to 8 weeks after that. The full picture is a longer partnership, not a project.',
    },
    {
      question: 'Do you replace our existing tools?',
      answer: 'Almost never. Most operating problems aren\'t a tooling problem, they\'re a design problem sitting on top of tools that were never wired up to how the business actually runs. We only recommend replacement when the current instrument is genuinely holding the business back.',
    },
    {
      question: 'We don\'t really know what we need yet.',
      answer: 'That\'s most of our first conversations. You don\'t have to arrive with a spec. If you can describe what\'s frustrating, slow, or unreliable right now, we can take it from there.',
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
            <h3 className="text-2xl font-bold text-gray-900">QUESTIONS</h3>
            <p className="text-gray-600 mt-2">The things leaders ask before they book.</p>
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