
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';


interface AboutPageProps {
  onBack: () => void;
  targetId?: string | null;
}

// const leadership = [
//   { name: "Aditya Vedanco", role: "Founder & Chairman", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000", bio: "Visionary leader with 20+ years in scaling multi-national conglomerates." },
//   { name: "Sarah Jenkins", role: "Global CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000", bio: "Former VP at Fortune 500 tech firms, driving operational excellence." },
//   { name: "Rajiv Mehta", role: "Chief Technology Officer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000", bio: "Pioneer in AI architecture and enterprise cloud systems." },
//   { name: "Elena Rossi", role: "Head of Design", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000", bio: "Award-winning architect overseeing our real estate and interior verticals." }
// ];

const values = [
    { title: "Integrity First", desc: "We operate with radical transparency in every transaction, from contracts to code." },
    { title: "Relentless Innovation", desc: "We don't just adopt technology; we forge it. Stagnation is our only enemy." },
    { title: "Global Citizenry", desc: "Our impact goes beyond profit. We build sustainably and invest in local communities." }
];

const AboutPage: React.FC<AboutPageProps> = ({ onBack, targetId }) => {
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
    <div className="min-h-screen bg-white">
      <section id="about-vedanco-group" className="relative h-[60vh] flex items-end pb-20 bg-slate-100 overflow-hidden scroll-mt-28">
          <div className="absolute inset-0">
           <img  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="w-full h-full object-cover grayscale opacity-30" alt="Office" />
        

              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-6"
              >
                  Our Legacy.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed"
              >
                  Built on trust, fueled by innovation, and dedicated to creating value that transcends generations.
              </motion.p>
          </div>
      </section>

      <section id="vision-mission" className="py-24 scroll-mt-28">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">From Humble Beginnings to Global Impact</h2>
                  <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                      <p>
                          Vedanco Group began with a simple premise: that a single organization could deliver world-class expertise across disparate industries by focusing on the one thing that connects them all—operational excellence.
                      </p>
                      <p>
                          What started as a boutique IT consultancy has evolved into a multi-national conglomerate with interests spanning real estate, aviation, logistics, and artificial intelligence.
                      </p>
                      <p>
                          Today, we employ over 1,000 professionals across 5 countries, but our core philosophy remains unchanged: <strong>Excellence is a habit, not an act.</strong>
                      </p>
                  </div>
              </div>
              <div className="space-y-8">
                  {values.map((val, i) => (
                      <div key={i} className="bg-slate-50 p-8 rounded-xl border-l-4 border-blue-600">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{val.title}</h3>
                          <p className="text-slate-500">{val.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* <section id="leadership" className="py-24 bg-slate-50 scroll-mt-28">
          <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-16 text-center">The Leadership Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {leadership.map((leader, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                          <div className="h-80 overflow-hidden relative">
                              <img src={leader.img} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                  <p className="text-white text-sm">{leader.bio}</p>
                              </div>
                          </div>
                          <div className="p-6">
                              <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                              <p className="text-blue-600 text-sm font-bold uppercase tracking-wide mt-1">{leader.role}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section> */}

      <section id="global-presence" className="py-24 bg-slate-900 text-white scroll-mt-28">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif mb-4">Global Presence</h2>
                  <p className="text-slate-400">Operating hubs in India, UAE, UK, and USA.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  {[
                      { label: "Years of Excellence", val: "4+" },
                      { label: "Countries Present", val: "10" },
                      { label: "Team Members", val: "20+" },
                      { label: "Client Satisfaction", val: "98%" }
                  ].map((stat, i) => (
                      <div key={i}>
                          <div className="text-5xl font-serif font-bold mb-2">{stat.val}</div>
                          <div className="text-slate-400 text-sm uppercase tracking-widest">{stat.label}</div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default AboutPage;
