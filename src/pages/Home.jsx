// src/pages/Home.jsx
import React, { useRef } from 'react';
import HeroSection from '../components/home/HeroSection';
import HiddenCostSection from '../components/home/HiddenCostSection'; 
import ServicesSection from '../components/home/ServicesSection';
import StackSection from '../components/home/StackSection';
import ThingsPeopleSay from '../components/home/ThingsPeopleSay';
import ProcessSection from '../components/home/ProcessSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import InsightsSection from '../components/home/InsightsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const processRef = useRef(null);

  const scrollToProcess = () => {
    if (processRef.current) {
      processRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="overflow-hidden">
      <HeroSection scrollToProcess={scrollToProcess} />
      <HiddenCostSection />
      <ServicesSection />
      <StackSection />
      <ThingsPeopleSay />
      <div ref={processRef}>
        <ProcessSection />
      </div>
      <WhyChooseUs />
      {/* <TestimonialsSection /> */}
      <InsightsSection />
      <CTASection />
    </div>
  );
};

export default Home;