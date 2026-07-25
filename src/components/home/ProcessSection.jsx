
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaPencilAlt, FaRocket as FaShip, FaSeedling, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProcessSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const steps = [
    {
      icon: FaUserFriends,
      title: 'Sit in',
      description: 'We spend real time with your team, in your tools, watching where the day actually goes. No 40 page audit, just an honest read.',
      color: 'primary',
    },
    {
      icon: FaPencilAlt,
      title: 'Sketch',
      description: 'A short, prioritised plan. What we\'d fix first, what it costs in time and money, what number should move because of it.',
      color: 'secondary',
    },
    {
      icon: FaShip,
      title: 'Ship',
      description: 'We build in phases inside your live stack. Something usable is in your hands within weeks, not quarters.',
      color: 'primary',
    },
    {
      icon: FaSeedling,
      title: 'Tend',
      description: 'After launch we stay close. Broken automations get caught by us, not by you. New workflows get added as the business grows.',
      color: 'secondary',
    },
  ];

  const faqs = [
    {
      question: 'Which CRMs do you actually work in?',
      answer: 'Day in, day out we are in HubSpot, Salesforce, Pipedrive, Monday.com and Zoho. Around them we wire in the phone, project, billing, marketing and support tools you\'re already using. When the tool hits its ceiling, we build the custom piece.',
    },
    {
      question: 'What does the first call look like?',
      answer: 'Thirty minutes, no slide deck. You describe the mess, we ask questions. By the end we can usually tell you whether it\'s the platform, the setup, the data, the process, or some flavour of all four. If we\'re not the right fit, we\'ll say so.',
    },
    {
      question: 'We don\'t have a CRM at all. Is that a problem?',
      answer: 'It\'s actually a great starting point. Nothing to unwind. We help you pick the platform that suits how your team really works, get it live, and make sure the team is using it in week one instead of ignoring it in month three.',
    },
    {
      question: 'How long until we see something real?',
      answer: 'A focused cleanup or one big automation is usually 2 to 4 weeks. A full setup with data migration and several automations is closer to 6 to 8. You get a written scope and timeline before anyone signs anything.',
    },
    {
      question: 'Do you always rebuild from scratch?',
      answer: 'Almost never. Most of the time your setup has good bones and just needs surgery in a few specific places. We\'ll only recommend starting over when the current tool is genuinely holding the business back.',
    },
    {
      question: 'We don\'t really know what we need yet.',
      answer: 'That\'s most of our first conversations. You don\'t have to arrive with a spec. If you can describe what\'s frustrating, slow, or unreliable right now, we can take it from there.',
    },
    {
      question: 'Do you handle stuff outside the CRM?',
      answer: 'Yes. Onboarding, invoicing, quoting, reporting, approvals, internal handoffs. If a person is doing it manually and a system could carry it, that\'s fair game.',
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
            <p className="text-gray-600 mt-2">The things people ask before they book.</p>
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