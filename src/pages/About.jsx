
import React from 'react';
import { motion } from 'framer-motion';
import AboutHero from '../components/about/AboutHero';
import AboutStudio from '../components/about/AboutStudio';
import AboutValues from '../components/about/AboutValues';
import AboutFounder from '../components/about/AboutFounder';
import AboutCTA from '../components/about/AboutCTA';

const About = () => {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <AboutStudio />
      <AboutValues />
      <AboutFounder />
      <AboutCTA />
    </div>
  );
};

export default About;