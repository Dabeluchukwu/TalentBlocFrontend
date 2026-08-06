// // src/components/about/AboutStudio.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

// const AboutStudio = () => {
//   const features = [
//     {
//       icon: FaUsers,
//       title: 'Small by Design',
//       description: 'The people you meet on the first call are the people writing the automations, migrating the data, and rebuilding the pipeline.'
//     },
//     {
//       icon: FaRocket,
//       title: 'Built to Ship',
//       description: 'No layered teams, no account managers translating your problem to someone else. Just work that gets done.'
//     },
//     {
//       icon: FaShieldAlt,
//       title: 'Direct Access',
//       description: 'You talk to the people doing the work. Always. From day one to deployment and beyond.'
//     }
//   ];

//   return (
//     <section className="py-20 bg-white relative overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-50/50 rounded-br-[100px]" />
//         <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary-50/50 rounded-tl-[100px]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
//               ABOUT US
//             </span>

//              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
//               TWe believe most businesses don't have a technology problem.
//               <span>They have an operating problem.</span>
//             </h2>
            

            
              
          
//             <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//               As businesses grow, the way work gets done often stays the same. New software gets added. More people join the team. Processes become longer. Decisions start depending on the same few people. Before long, simple work feels more complicated than it should.

//             </p>
//             <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//               Technology doesn't usually create those problems, and on its own, it doesn't solve them either.

//             </p>
//             <p className="mt-4 text-gray-600 leading-relaxed">
//               That's the thinking behind TalentBloc.

//             </p>
//             <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//               We spend time understanding how work moves through a business before recommending AI, automation, or new systems. Sometimes the answer is a better process. Sometimes it's a different way of making decisions. Sometimes technology is exactly what's needed.
//             </p>
//             <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//               Our goal is to build a business that's easier to run, easier to grow, and better prepared for what's next.

//             </p>
//           </motion.div>

//           {/* Right Content - Features
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.15 }}
//                   viewport={{ once: true }}
//                   className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-primary-50/50 transition-all duration-300 group"
//                   whileHover={{ x: 5 }}
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                     <Icon className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{feature.title}</h3>
//                     <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutStudio;


import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

const AboutStudio = () => {
  const features = [
    {
      icon: FaUsers,
      title: 'Small by Design',
      description: 'The people you meet on the first call are the people writing the automations, migrating the data, and rebuilding the pipeline.'
    },
    {
      icon: FaRocket,
      title: 'Built to Ship',
      description: 'No layered teams, no account managers translating your problem to someone else. Just work that gets done.'
    },
    {
      icon: FaShieldAlt,
      title: 'Direct Access',
      description: 'You talk to the people doing the work. Always. From day one to deployment and beyond.'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-50/50 rounded-br-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary-50/50 rounded-tl-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-4 border border-primary-200/50">
              ABOUT US
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
          >
            We believe most businesses don't have a{' '}
            <span className="text-primary-500">technology problem.</span>
            <br />
            <span className="text-primary-400">They have an operating problem.</span>
          </motion.h2>

          {/* Body Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              As businesses grow, the way work gets done often stays the same. New software gets added. More people join the team. Processes become longer. Decisions start depending on the same few people. Before long, simple work feels more complicated than it should.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Technology doesn't usually create those problems, and on its own, it doesn't solve them either.
            </p>

            <div className="py-1">
              <p className="text-lg sm:text-xl font-semibold text-primary-600 leading-relaxed">
                That's the thinking behind TalentBloc.
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We spend time understanding how work moves through a business before recommending AI, automation, or new systems. Sometimes the answer is a better process. Sometimes it's a different way of making decisions. Sometimes technology is exactly what's needed.
            </p>

            <div className="pt-1 border-t-2 border-primary-100/50 max-w-xs mx-auto"></div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              Our goal is to build a business that's easier to run, easier to grow, and better prepared for what's next.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStudio;