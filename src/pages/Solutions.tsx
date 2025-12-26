
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SolutionsPageProps {
  onBack: () => void;
  targetId?: string | null;
}

const services = [
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    icon: "🚀",
    description: "Reimagining business processes for the digital age.",
    features: ["Legacy System Modernization", "Cloud Migration Strategies", "Digital Workflow Design", "Customer Experience (CX) Overhaul"]
  },
  {
    id: "ai-automation-solutions",
    title: "AI & Automation Solutions",
    icon: "🤖",
    description: "Embedding intelligence into the core of your operations.",
    features: ["Predictive Analytics Models", "RPA (Robotic Process Automation)", "Conversational AI Agents", "Computer Vision Systems"]
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    icon: "📊",
    description: "Data-driven strategies to navigate market complexity.",
    features: ["Market Entry Strategy", "Financial Restructuring", "Operational Efficiency Audits", "Risk Management"]
  },
  {
    id: "startup-incubation",
    title: "Startup Incubation",
    icon: "🌱",
    description: "From napkin sketch to Series A funding.",
    features: ["MVP Development", "Go-To-Market Strategy", "VC Networking & Fundraising", "Technical Co-founder Services"]
  },
  {
    id: "enterprise-solutions",
    title: "Enterprise Solutions",
    icon: "🏢",
    description: "Robust infrastructure for large-scale organizations.",
    features: ["Custom ERP/CRM Development", "Supply Chain Management Systems", "HR & Payroll Automation", "Cybersecurity & Compliance"]
  },
  {
    id: "international-expansion",
    title: "International Expansion",
    icon: "🌍",
    description: "Bridging borders for global commerce.",
    features: ["Cross-border Trade Compliance", "Localization & Translation", "Global Logistics Optimization", "Offshore Team Setup"]
  }
];

const SolutionsPage: React.FC<SolutionsPageProps> = ({ onBack, targetId }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    if (targetId) {
        setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
  }, [targetId]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070" className="w-full h-full object-cover" alt="Solutions Background" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <div className="inline-block px-4 py-1 mb-6 border border-blue-400/30 rounded-full bg-blue-900/20 backdrop-blur-md text-blue-300 text-xs font-bold uppercase tracking-widest">
                Vedanco Solutions
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Future-Proof Your Business</h1>
             <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
                Comprehensive strategies and technologies designed to solve the most complex challenges of the modern enterprise.
             </p>
           </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Solving Complexity with <span className="text-blue-600">Precision</span>.</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      At Vedanco, we do not believe in one-size-fits-all. Our solutions are bespoke, crafted by domain experts who understand the nuances of your industry. Whether you are scaling a startup or optimizing a multinational conglomerate, our toolkit is adaptable and rigorous.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                      We leverage the latest in Generative AI, Cloud Architecture, and Global Economic modeling to deliver results that are not just measurable, but sustainable.
                  </p>
              </div>
              <div className="relative h-[400px] bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070" className="w-full h-full object-cover" alt="Data Analysis" />
              </div>
          </div>
      </section>

      <section id="services-grid" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-20">
                  <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Core Competencies</h2>
                  <p className="text-slate-500">Select a domain to dive deeper.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, idx) => (
                      <motion.div
                          id={service.id}
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className={`bg-white p-10 rounded-xl shadow-sm transition-all duration-300 border border-slate-100 group scroll-mt-28 ${targetId === service.id ? 'ring-2 ring-blue-500 shadow-xl scale-[1.02]' : 'hover:shadow-xl hover:-translate-y-2'}`}
                      >
                          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
                              {service.icon}
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{service.title}</h3>
                          <p className="text-slate-500 mb-8 leading-relaxed h-16">{service.description}</p>
                          
                          <div className="space-y-3">
                              {service.features.map((feature, fIdx) => (
                                  <div key={fIdx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                      {feature}
                                  </div>
                              ))}
                          </div>

                          <button className="mt-8 w-full py-3 border border-slate-200 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all">
                              Learn More
                          </button>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-32 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Ready to Transform?</h2>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView()}
                className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:scale-105"
              >
                  Schedule a Discovery Call
              </button>
          </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
