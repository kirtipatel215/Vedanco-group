
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const domains = [
  "IT Solutions", "AI & Automation", "Consulting", "Interiors", "Marketing",
  "Recruitment", "Venture Studio", "Real Estate", "Aviation", "Logistics", "Travel"
];

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden h-[100dvh] w-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ delay: 3.8, duration: 1.2, ease: "easeInOut" }}
      onAnimationComplete={() => onComplete()}
    >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: [20, 0, 0, -20]
                }}
                transition={{ 
                    duration: 3.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut"
                }}
                className="flex flex-col items-center text-center"
            >
                <div className="relative mb-6 md:mb-8">
                    <motion.div 
                        className="absolute inset-0 bg-blue-100 rounded-full blur-xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white text-slate-900 flex items-center justify-center rounded-full font-serif font-bold text-4xl md:text-5xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 relative z-20">
                        V
                    </div>
                </div>

                <div className="text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-none mb-3"
                    >
                        VEDANCO
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="h-[1px] w-6 md:w-8 bg-slate-300"></div>
                        <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.4em] text-slate-400">Group</p>
                        <div className="h-[1px] w-6 md:w-8 bg-slate-300"></div>
                    </motion.div>
                </div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-sm md:text-lg text-slate-400 font-serif italic font-light mt-6 max-w-xs md:max-w-none"
                >
                    Empowering Businesses Across Industries
                </motion.p>
            </motion.div>

            <motion.div 
                className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-3 max-w-3xl mx-auto mt-10 md:mt-16"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, y: 10 }} 
                transition={{ delay: 3.2, duration: 0.8 }}
            >
                {domains.map((domain, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                            delay: 1.2 + (index * 0.12),
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="flex items-center"
                    >
                        <span className="text-xs md:text-base text-slate-500 font-medium tracking-wide whitespace-nowrap">
                            {domain}
                        </span>
                        {index !== domains.length - 1 && (
                            <span className="mx-2 md:mx-3 text-slate-200 text-[0.4rem] opacity-50">●</span>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.div>
  );
};

export default IntroAnimation;
