import React from "react";
import { motion } from "framer-motion";

const HiddenCostSection = () => {
  const costs = [
    {
      number: "01",
      title: "Leadership spends more time coordinating than deciding.",
    },
    {
      number: "02",
      title: "Every new hire has to be trained on the workarounds.",
    },
    {
      number: "03",
      title: "Reports contradict each other and nobody quite trusts either.",
    },
    {
      number: "04",
      title: "Growth is arriving faster than the operations can absorb it.",
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
                Most of the friction
                <br />
                inside a growing
                <br />
                company is
                <br />
                <span className="bg-gradient-to-r from-primary-500 to-slate-300 bg-clip-text text-transparent">
                  operational debt.
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
              It looks like small things. A workaround here, a duplicated
              spreadsheet there, a tool nobody quite trusts. Left alone it
              compounds, until the way you're running the company is the reason
              it can't move. It rarely shows up on a P&amp;L. It shows up in how
              tired leadership is.
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