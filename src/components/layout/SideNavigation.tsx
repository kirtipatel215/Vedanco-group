
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SideNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Start' },
    { id: 'about', label: 'About' },
    { id: 'businesses', label: 'Ecosystem' },
    { id: 'solutions', label: 'Why Us' },
    { id: 'trust', label: 'Partners' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-4 focus:outline-none"
        >
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 origin-left ${activeSection === section.id ? 'opacity-100 translate-x-0 text-slate-900' : 'opacity-0 -translate-x-2 text-slate-400 group-hover:opacity-100 group-hover:translate-x-0'}`}>
            {section.label}
          </span>
          <div className={`transition-all duration-500 ${activeSection === section.id ? 'h-8 bg-slate-900' : 'h-1.5 bg-slate-300 group-hover:bg-slate-500'} w-[2px] rounded-full`} />
        </button>
      ))}
    </motion.div>
  );
};

export default SideNavigation;
        