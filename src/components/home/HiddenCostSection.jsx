import React from "react";
import { motion } from "framer-motion";

const HiddenCostSection = () => {
  const costs = [
    {
      number: "01",
      title: "Leadership spends more time coordinating work than making strategic decisions.",
    },
    {
      number: "02",
      title: "Employees rely on manual work, repeated tasks, and undocumented workarounds.",
    },
    {
      number: "03",
      title: "Critical information is scattered across people, spreadsheets, and disconnected systems.",
    },
    {
      number: "04",
      title: "The business keeps growing, but operations become harder to scale.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-primary-500 font-medium mb-6">
                THE HIDDEN COST OF GROWTH
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Growth creates complexity. 
                <span className="bg-gradient-to-r from-primary-500 to-slate-300 bg-clip-text text-transparent">
                  AI can't fix broken operations.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-lg text-gray-600 leading-relaxed max-w-md"
            >
              <p className="pb-2">As businesses grow, work becomes fragmented. Teams create workarounds, information lives in different systems, and decisions take longer because no one has a complete picture.</p>
              <p className="pb-2">Adding AI on top of disconnected operations only makes those problems move faster.</p>
              <p>We help businesses redesign how work flows across the organization, then apply AI where it removes friction, improves decision-making, and creates lasting operational advantage.</p>
            </motion.p>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 lg:pt-2"
          >
            {costs.map((cost) => (
              <motion.div
                key={cost.number}
                variants={itemVariants}
                className="flex items-start gap-5"
              >
                <span className="text-xs font-medium text-primary-500 mt-1">
                  {cost.number}
                </span>

                <p className="text-lg text-gray-800 leading-relaxed">
                  {cost.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HiddenCostSection;