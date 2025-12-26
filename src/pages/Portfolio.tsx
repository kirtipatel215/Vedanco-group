
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface PortfolioPageProps {
  onBack: () => void;
}

const featuredProjects = [
  {
    id: 1,
    client: "Global FinTech Corp",
    title: "Modernizing Legacy Banking Infrastructure",
    domain: "IT & Software Engineering",
    challenge: "The client was operating on a 20-year-old monolithic architecture that prevented real-time transaction processing and mobile scalability.",
    solution: "Vedanco deployed a microservices architecture on AWS, rewriting core banking modules in Go and React. We implemented a bank-grade security layer and real-time fraud detection AI.",
    outcome: "Reduced transaction latency by 90% and enabled the launch of a mobile-first banking app used by 2M+ customers.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    stats: ["90% Faster", "2M+ Users", "Zero Downtime"]
  },
  {
    id: 2,
    client: "EuroLogistics Group",
    title: "AI-Driven Supply Chain Optimization",
    domain: "AI & Automation",
    challenge: "Inefficient route planning and warehouse management led to a 15% annual loss in operational overhead across 12 countries.",
    solution: "We integrated a custom predictive logistics model using Vedanco AI. The system analyzes weather, traffic, and inventory levels to optimize fleet routing in real-time.",
    outcome: "Saved €4.5M in the first year and reduced carbon footprint by 12% through optimized fuel consumption.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    stats: ["€4.5M Saved", "12% Less CO2", "Real-time AI"]
  },
  {
    id: 3,
    client: "Vertex Healthcare",
    title: "Digital Transformation & Patient Experience",
    domain: "Consulting & Strategy",
    challenge: "Patient onboarding was a manual, paper-heavy process taking 45 minutes per admission, causing bottlenecks.",
    solution: "Vedanco Consulting restructured the operational workflow while our tech team built a contactless iPad-based intake system synchronized with the hospital's EHR.",
    outcome: "Reduced admission time to 7 minutes and improved patient satisfaction scores (NPS) by 40 points.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070",
    stats: ["7min Admission", "+40 NPS", "Paperless"]
  }
];

const caseStudies = [
  {
    title: "Scaling a SaaS Unicorn",
    category: "Venture Studio",
    summary: "From MVP to Series B: How we acted as the technical co-founder for a leading EdTech platform.",
    details: "We provided the initial engineering team, devised the go-to-market strategy, and facilitated introductions to top-tier VC firms. The platform now hosts 500k active students."
  },
  {
    title: "Luxury Brand Re-launch",
    category: "Marketing & Branding",
    summary: "Revitalizing a 50-year-old fashion house for the digital age without losing its heritage.",
    details: "Our branding team executed a complete visual overhaul, while our digital marketing arm launched a targeted influencer campaign that drove a 300% increase in e-commerce sales."
  },
  {
    title: "Corporate HQ Interior Fit-out",
    category: "Interior Solutions",
    summary: "Designing a 50,000 sq. ft. sustainable workspace in Dubai.",
    details: "Delivered a turnkey interior solution featuring biophilic design, smart lighting automation, and locally sourced sustainable materials, achieving LEED Gold certification."
  }
];

const FeaturedProject: React.FC<{ project: typeof featuredProjects[0], index: number }> = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className="py-24 border-b border-slate-100 last:border-0">
            <div className="container mx-auto px-6 md:px-12">
                <div className={`flex flex-col lg:flex-row gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    <div className="lg:w-1/2 w-full h-[600px] overflow-hidden relative group">
                        <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] relative">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-6xl font-serif font-bold text-slate-100">0{project.id}</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-widest rounded-full">{project.domain}</span>
                        </div>
                        
                        <h3 className="text-4xl font-serif font-bold text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-slate-400 font-medium mb-8 uppercase tracking-wide text-sm">{project.client}</p>

                        <div className="space-y-6 mb-10">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-2">The Challenge</h4>
                                <p className="text-slate-600 leading-relaxed">{project.challenge}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-2">The Solution</h4>
                                <p className="text-slate-600 leading-relaxed">{project.solution}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 border-t border-slate-100 pt-6">
                            {project.stats.map((stat, i) => (
                                <div key={i}>
                                    <span className="block font-bold text-slate-900">{stat}</span>
                                    <span className="text-xs text-slate-400 uppercase">Impact</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

const PortfolioPage: React.FC<PortfolioPageProps> = ({ }) => {
  const containerRef = useRef(null);
  
  const Hero = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 800], [1.1, 1]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50"></div>
            
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div style={{ scale, opacity }} className="w-full h-full">
                    <video 
                        autoPlay loop muted playsInline 
                        className="w-full h-full object-cover grayscale opacity-10"
                        src="https://videos.pexels.com/video-files/3252038/3252038-uhd_2560_1440_25fps.mp4"
                    />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-slate-200 rounded-full bg-white/50 backdrop-blur-sm">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Portfolio</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-8 leading-[0.95] tracking-tight">
                        Our Work<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500">Speaks for Us.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-light mb-12 leading-relaxed max-w-2xl">
                        Real businesses. Real impact. From startups to enterprises, Vedanco Group delivers scalable solutions across technology, consulting, and operations.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <button 
                            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1"
                        >
                            View Selected Projects
                        </button>
                        <button 
                            onClick={() => document.getElementById('studies')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all"
                        >
                            Case Studies
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
  };

  const StrategicOverview = () => (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100/50">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight"
                >
                    We don't just execute.<br/>We partner for growth.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-slate-600 leading-relaxed mb-6"
                >
                    Our portfolio represents the depth and diversity of Vedanco Group’s capabilities. Each project reflects a combination of strategic thinking, execution excellence, and a long-term partnership mindset.
                </motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 leading-relaxed"
                >
                    Whether building a digital backbone for a bank or designing a luxury villa, our ethos remains the same: <strong>Excellence without compromise.</strong>
                </motion.p>
            </div>
            <div className="lg:w-1/2 relative">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-[500px] w-full bg-slate-200 rounded-sm overflow-hidden"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" 
                        alt="Strategic Planning" 
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl max-w-xs hidden lg:block">
                    <p className="font-serif italic text-slate-800 text-lg">"Success is not an accident. It is designed."</p>
                </div>
            </div>
        </div>
    </section>
  );

  const IndustryBreakdown = () => (
    <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Expertise Across Industries</h2>
                <p className="text-slate-500">Delivering value in every vertical we operate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                {[
                    "IT & Software", "AI & Automation", "Consulting", "Marketing",
                    "Recruitment", "Real Estate", "Aviation", "Logistics"
                ].map((ind, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group"
                    >
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors cursor-default">{ind}</h3>
                        <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-blue-200 transition-all duration-500 mb-4"></div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Delivering enterprise-grade solutions with deep domain expertise and operational excellence.
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );

  const CaseStudies = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="studies" className="py-32 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <h2 className="text-4xl font-serif font-bold text-slate-900 mb-12">Deep Dive: Case Studies</h2>
                
                <div className="space-y-4">
                    {caseStudies.map((study, i) => (
                        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                            >
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">{study.category}</span>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900">{study.title}</h3>
                                </div>
                                <span className={`text-2xl text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50/50"
                                    >
                                        <div className="p-8 pt-0 border-t border-slate-100 mt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-2">Overview</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{study.summary}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-2">Our Execution</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{study.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
  };

  const CTA = () => (
    <section className="py-40 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8">Let's Build Your Success Story</h2>
            <p className="text-xl text-slate-500 mb-12 font-light">
                Whether you need a digital transformation, a brand overhaul, or operational scaling, Vedanco is your partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1"
                >
                    Discuss Your Project
                </button>
            </div>
        </div>
    </section>
  );

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
        <Hero />
        <StrategicOverview />
        
        <div id="featured" className="bg-gradient-to-b from-white to-blue-50/30">
            {featuredProjects.map((project, i) => (
                <FeaturedProject key={project.id} project={project} index={i} />
            ))}
        </div>

        <IndustryBreakdown />
        <CaseStudies />
        <CTA />
    </div>
  );
};

export default PortfolioPage;
