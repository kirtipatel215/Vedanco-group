
import React from 'react';
import { motion } from 'framer-motion';

interface CareersPageProps {
  onBack: () => void;
}

const departments = [
  { title: "Technology & AI", desc: "Engineers, Data Scientists, and Architects building sovereign AI and enterprise platforms.", icon: "⚡" },
  { title: "Strategic Consulting", desc: "MBAs and Industry Veterans driving growth for our partners and portfolio companies.", icon: "📊" },
  { title: "Brand & Design", desc: "Creative Directors and Designers crafting the visual identity of the next decade.", icon: "🎨" },
  { title: "Global Operations", desc: "Logistics experts and Project Managers ensuring execution across 12 countries.", icon: "🌍" }
];

const CareersPage: React.FC<CareersPageProps> = ({ }) => {
  return (
    <div className="min-h-screen bg-white pt-20">
       <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
           <div className="container mx-auto px-6 relative z-10 text-center">
               <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-serif font-bold mb-6"
               >
                   Build the Extraordinary.
               </motion.h1>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                   Join a team of visionaries, engineers, and strategists working on the world's most complex challenges.
               </p>
           </div>
       </section>

       <section className="py-24 bg-slate-50">
           <div className="container mx-auto px-6 md:px-12">
               <div className="mb-16 text-center">
                   <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Areas of Impact</h2>
                   <p className="text-slate-500 max-w-2xl mx-auto">
                       We don't hire for jobs; we hire for careers. Explore the domains where you can leave a mark.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {departments.map((dept, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group"
                       >
                           <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">{dept.icon}</div>
                           <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{dept.title}</h3>
                           <p className="text-slate-500 leading-relaxed">{dept.desc}</p>
                       </motion.div>
                   ))}
               </div>

               <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
                >
                   <div className="relative z-10">
                        <h3 className="text-3xl font-serif font-bold mb-4">No Open Roles Right Now?</h3>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
                            We are always looking for exceptional talent to join our "Bench" program. If you are the best at what you do, we will create a role for you.
                        </p>
                        <a href="mailto:careers@vedanco.com" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
                            Submit General Application
                        </a>
                   </div>
                   
                   {/* Decorative background elements */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 mix-blend-screen"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 mix-blend-screen"></div>
               </motion.div>
           </div>
       </section>

       <section className="py-24 bg-white text-center">
           <div className="container mx-auto px-6 max-w-4xl">
               <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">Life at Vedanco</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                       { title: "Innovation", desc: "Work with cutting-edge AI and tech." },
                       { title: "Growth", desc: "Uncapped potential for career advancement." },
                       { title: "Impact", desc: "Projects that touch millions of lives globally." }
                   ].map((item, i) => (
                       <div key={i} className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                           <h3 className="font-bold text-xl mb-2 text-slate-900">{item.title}</h3>
                           <p className="text-slate-500">{item.desc}</p>
                       </div>
                   ))}
               </div>
           </div>
       </section>
    </div>
  );
};

export default CareersPage;
