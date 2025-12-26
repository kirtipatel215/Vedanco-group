
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface BusinessPageProps {
  onBack: () => void;
  targetId?: string | null;
}

const domains = [
  {
    id: "vedanco-it-solutions",
    name: "Vedanco IT Solutions",
    tagline: "Building the digital backbone of modern enterprises.",
    description: "In an era where technology defines competitive advantage, Vedanco IT Solutions delivers more than just code. We architect scalable, secure, and future-proof digital ecosystems. From enterprise ERPs to consumer-facing mobile experiences, our engineering teams build the infrastructure that powers your growth.",
    capabilities: ["Enterprise Software Development", "Cloud Architecture", "Mobile Application Ecosystems", "UI/UX Design Systems"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    gradient: "from-slate-50 via-white to-blue-50",
    details: {
        approach: "We utilize a microservices-first architecture combined with DevSecOps practices to ensure that every line of code is scalable, secure, and deployable. Our teams work in agile sprints aligned with your business KPIs.",
        impact: "Reduced go-to-market time by 40% for our enterprise partners through modular architecture.",
        deliverables: ["Custom ERP/CRM Development", "Cloud Migration (AWS/Azure)", "SaaS Product Engineering", "Legacy System Modernization"]
    }
  },
  {
    id: "vedanco-ai-automation",
    name: "Vedanco AI & Automation",
    tagline: "Intelligence that never sleeps, automating your growth.",
    description: "We help businesses transcend operational bottlenecks by integrating intelligent automation into their core workflows. Our AI solutions don't just process data; they learn, adapt, and predict, turning your organization into an agile, data-driven powerhouse that operates with unprecedented efficiency.",
    capabilities: ["Predictive Analytics", "Workflow Automation Agents", "Conversational AI Chatbots", "Machine Learning Integration"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000",
    gradient: "from-blue-50 via-white to-indigo-50",
    details: {
        approach: "We audit your data infrastructure, identify high-friction workflows, and deploy custom LLMs and autonomous agents to handle repetitive cognitive tasks.",
        impact: "Average of 60% reduction in manual data entry and 24/7 customer support capability.",
        deliverables: ["Custom LLM Training", "RPA (Robotic Process Automation)", "AI Sales Agents", "Predictive Forecasting Models"]
    }
  },
  {
    id: "vedanco-consulting",
    name: "Vedanco Consulting",
    tagline: "Strategic clarity in a complex global market.",
    description: "Growth is rarely linear. Our consulting division partners with leadership teams to navigate market volatility, identify hidden opportunities, and restructure for scale. We combine deep industry insights with practical execution strategies to turn ambition into measurable reality.",
    capabilities: ["Business Strategy & Transformation", "Startup Incubation Advisory", "Operational Optimization", "Market Entry Strategy"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    gradient: "from-indigo-50 via-white to-slate-50",
    details: {
        approach: "We don't just deliver slide decks. We embed with your leadership team to co-create strategies, bringing in data from our global network to validate every decision.",
        impact: "Guided 50+ startups from seed to Series A and restructured 10+ legacy enterprises.",
        deliverables: ["Market Entry Feasibility", "Financial Modeling", "Organizational Restructuring", "Digital Transformation Roadmaps"]
    }
  },
  {
    id: "vedanco-interiors",
    name: "Vedanco Interior Solutions",
    tagline: "Spaces that inspire productivity and define luxury.",
    description: "Your physical environment is a statement of your brand's ethos. We craft bespoke residential and commercial interiors that blend aesthetic brilliance with functional harmony. Whether it is a corporate HQ in Dubai or a luxury villa in India, we deliver turnkey execution and high-fidelity 3D visualization.",
    capabilities: ["Turnkey Commercial Fit-outs", "Luxury Residential Design", "3D Visualization & VR Walkthroughs", "Global Material Sourcing"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
    gradient: "from-slate-50 via-white to-stone-100",
    details: {
        approach: "We combine high-fidelity 3D VR previews with a global procurement network, allowing you to walk through your space before a single brick is laid.",
        impact: "Zero-surprise execution with material sourcing from Italy, China, and India.",
        deliverables: ["Space Planning & Layout", "3D Rendering & VR", "Material Procurement", "On-site Project Management"]
    }
  },
  {
    id: "vedanco-marketing",
    name: "Vedanco Marketing & Branding",
    tagline: "Amplifying narratives that create market leaders.",
    description: "In a noisy world, only the clearest voices are heard. Our marketing arm functions as your brand's custodian, crafting compelling narratives and distributing them with precision. We blend creative storytelling with performance marketing to build brands that don't just sell, but matter.",
    capabilities: ["Brand Identity & Strategy", "Performance Digital Marketing", "Influencer & PR Campaigns", "Content Production"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    gradient: "from-stone-100 via-white to-orange-50",
    details: {
        approach: "We use a data-led creative approach. We analyze audience sentiment to craft visual and verbal identities that resonate emotionally while tracking ROAS obsessively.",
        impact: "Generated over $10M in attributable revenue for clients through integrated campaigns.",
        deliverables: ["Logo & Brand Guidelines", "Social Media Management", "PPC & SEO Campaigns", "Video Production"]
    }
  },
  {
    id: "vedanco-recruitment",
    name: "Vedanco Recruitment Solutions",
    tagline: "Connecting world-class talent with global visionaries.",
    description: "Great companies are built by people, not products. We specialize in identifying and acquiring top-tier talent across geographies. Our recruitment experts understand culture as deeply as competence, ensuring that every hire is a strategic asset to your organization's long-term vision.",
    capabilities: ["Executive Search", "Technical Staffing", "International Recruitment", "RPO Services"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084",
    gradient: "from-orange-50 via-white to-rose-50",
    details: {
        approach: "We utilize AI-driven candidate screening combined with human behavioral interviews to ensure cultural fit and technical excellence.",
        impact: "Reduced time-to-hire by 50% for technical roles with a 95% retention rate over 12 months.",
        deliverables: ["C-Suite Executive Search", "Remote Team Setup", "Contract Staffing", "HR Policy Consulting"]
    }
  },
  {
    id: "vedanco-venture-studio",
    name: "Vedanco Venture Studio",
    tagline: "Incubating the next generation of unicorns.",
    description: "We don't just support startups; we build them. Vedanco Venture Studio acts as a co-founder to visionary entrepreneurs, providing capital, technical resources, and mentorship. We bridge the gap between a disruptive idea and a scalable, revenue-generating enterprise.",
    capabilities: ["Seed Funding & Investment", "MVP Development", "Go-to-Market Support", "Mentorship Network"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    gradient: "from-rose-50 via-white to-purple-50",
    details: {
        approach: "We provide 'Sweat Equity'—offering development, marketing, and legal resources in exchange for equity, minimizing early-stage cash burn.",
        impact: "Successfully launched 5+ SaaS products and 3 D2C brands in the last 24 months.",
        deliverables: ["Product Roadmap & Build", "Investor Pitch Deck Creation", "Legal & Compliance Setup", "Initial Customer Acquisition"]
    }
  },
  {
    id: "vedanco-real-estate",
    name: "Vedanco Real Estate",
    tagline: "Premium assets for the discerning investor.",
    description: "Real estate remains the bedrock of wealth. We offer advisory and brokerage services for premium land deals, commercial assets, and luxury residential properties. Our deep market intelligence ensures that every transaction is not just a purchase, but a strategic investment.",
    capabilities: ["Land Acquisition", "Commercial Leasing", "NRI Investment Advisory", "Property Valuation"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    gradient: "from-purple-50 via-white to-emerald-50",
    details: {
        approach: "We leverage proprietary market data to identify high-yield zones before they trend. We handle all legal due diligence in-house.",
        impact: "Facilitated over $50M in asset transactions with an average annual appreciation of 12%.",
        deliverables: ["Land Due Diligence", "Luxury Apartment Sales", "Commercial Lease Negotiation", "Asset Management"]
    }
  },
  {
    id: "vedanco-tours-travels",
    name: "Vedanco Tours & Travels",
    tagline: "Curating journeys that transcend boundaries.",
    description: "Travel is personal. Whether it's a corporate retreat or a luxury family holiday, we curate seamless travel experiences. From visa logistics to private hotel bookings, we handle the complexities of global travel so you can focus on the journey itself.",
    capabilities: ["Corporate Travel Management", "Luxury Holiday Packages", "Visa & Immigration Support", "Flight & Hotel Logistics"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074",
    gradient: "from-emerald-50 via-white to-cyan-50",
    details: {
        approach: "We assign a dedicated travel concierge to every client, ensuring 24/7 support from departure to arrival.",
        impact: "99% visa approval rate for complex jurisdictions (USA, UK, Schengen).",
        deliverables: ["Custom Itinerary Planning", "MICE (Meetings & Events)", "Visa Processing", "Priority Bookings"]
    }
  },
  {
    id: "vedanco-air",
    name: "Vedanco Air",
    tagline: "Time is the ultimate luxury. We help you master it.",
    description: "For those who move the world, waiting is not an option. Vedanco Air provides premium private jet charters and aviation logistics. We offer an experience defined by privacy, speed, and absolute comfort, ensuring you arrive ready to conquer.",
    capabilities: ["Private Jet Charter", "Air Ambulance Services", "Helicopter Transfers", "Aviation Consulting"],
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000",
    gradient: "from-cyan-50 via-white to-sky-50",
    details: {
        approach: "We access a global fleet of 5000+ aircraft, offering flexible departure windows and bespoke in-flight services.",
        impact: "Reduced average travel time for corporate clients by 60% compared to commercial aviation.",
        deliverables: ["On-demand Charter", "Medical Evacuation", "Aircraft Management", "Crew Staffing"]
    }
  },
  {
    id: "vedanco-logistics",
    name: "Vedanco Logistics",
    tagline: "The unseen engine of global commerce.",
    description: "Efficiency in movement defines success in trade. Our logistics division manages the complex flow of goods across borders. With a network of trucking, freight, and warehousing solutions, we ensure your supply chain is resilient, transparent, and strictly on time.",
    capabilities: ["Freight Forwarding", "Warehousing Solutions", "Last-Mile Delivery", "Supply Chain Management"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    gradient: "from-sky-50 via-white to-slate-50",
    details: {
        approach: "We integrate IoT tracking on containers and trucks, providing real-time visibility and predictive alerts for delay mitigation.",
        impact: "Maintained a 98% on-time delivery rate during peak global supply chain disruptions.",
        deliverables: ["Ocean & Air Freight", "Customs Brokerage", "3PL Warehousing", "Cold Chain Logistics"]
    }
  }
];

const DomainStorySection: React.FC<{ domain: typeof domains[0], index: number, isExpanded: boolean, onToggle: () => void }> = ({ domain, index, isExpanded, onToggle }) => {
  const isEven = index % 2 === 0;
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
     <section id={domain.id} className={`py-32 scroll-mt-28 bg-gradient-to-br ${domain.gradient} overflow-hidden transition-all duration-700 ease-in-out`}>
         <div className="container mx-auto px-6 md:px-12">
             <div className={`flex flex-col lg:flex-row items-center gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                 
                 <div className="lg:w-1/2 w-full relative group">
                     <motion.div
                         ref={ref}
                         initial={{ opacity: 0, y: 50 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true, margin: "-100px" }}
                         transition={{ duration: 0.8 }}
                         className="relative z-10 overflow-hidden h-[500px] rounded-2xl shadow-2xl"
                     >
                         <motion.div style={{ y: imageY, scale: 1.2 }} className="w-full h-full relative">
                             <img 
                                 src={domain.image} 
                                 alt={domain.name} 
                                 className="w-full h-full object-cover"
                             />
                         </motion.div>
                         
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                     </motion.div>
                     
                     <div className={`absolute -top-16 ${isEven ? '-left-12' : '-right-12'} text-9xl font-serif font-bold text-black/5 z-0`}>
                         {index + 1 < 10 ? `0${index + 1}` : index + 1}
                     </div>
                 </div>

                 <div className="lg:w-1/2 w-full">
                     <motion.div
                         initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true, margin: "-100px" }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                     >
                         <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
                             {domain.name}
                         </h2>
                         <p className="text-xl text-blue-900/80 font-medium mb-8">
                             {domain.tagline}
                         </p>
                         <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                             {domain.description}
                         </p>

                         <div className="mb-10">
                             <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Core Capabilities</h4>
                             <div className="flex flex-wrap gap-x-8 gap-y-3">
                                 {domain.capabilities.map((cap, idx) => (
                                     <div key={idx} className="flex items-center text-slate-700 font-medium">
                                         <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                                         {cap}
                                     </div>
                                 ))}
                             </div>
                         </div>

                         <button 
                             onClick={onToggle}
                             className="text-slate-900 font-bold border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors flex items-center gap-2"
                         >
                             {isExpanded ? 'Close Details' : 'Explore This Domain'}
                             <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>→</span>
                         </button>
                     </motion.div>
                 </div>
             </div>

             <AnimatePresence>
                 {isExpanded && (
                     <motion.div
                         initial={{ height: 0, opacity: 0, marginTop: 0 }}
                         animate={{ height: 'auto', opacity: 1, marginTop: 64 }}
                         exit={{ height: 0, opacity: 0, marginTop: 0 }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="overflow-hidden border-t border-slate-200"
                     >
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
                             <div>
                                 <div className="text-3xl mb-4">🔭</div>
                                 <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">Our Approach</h4>
                                 <p className="text-slate-600 text-sm leading-relaxed">{domain.details.approach}</p>
                             </div>
                             
                             <div>
                                 <div className="text-3xl mb-4">📈</div>
                                 <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">Key Impact</h4>
                                 <p className="text-slate-600 text-sm leading-relaxed font-medium">{domain.details.impact}</p>
                             </div>

                             <div>
                                 <div className="text-3xl mb-4">📦</div>
                                 <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">Deliverables</h4>
                                 <ul className="space-y-2">
                                     {domain.details.deliverables.map((item, i) => (
                                         <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                                             <span className="text-blue-400 mt-1">▪</span> {item}
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
         </div>
     </section>
  );
};

const BusinessPage: React.FC<BusinessPageProps> = ({ targetId }) => {
  const containerRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (targetId) {
        const timer = setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
                // block: 'start' aligns the element to the top of the visible area
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const idx = domains.findIndex(d => d.id === targetId);
                if (idx !== -1) setExpandedIndex(idx);
            }
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [targetId]);
  
  const HeroSection = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 800], [1.1, 1]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div style={{ scale, opacity }} className="w-full h-full">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-60"
                    poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                >
                    <source src="https://videos.pexels.com/video-files/1536322/1536322-uhd_3840_2160_30fps.mp4" type="video/mp4" />
                </video>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/20 to-slate-950/80"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20 flex flex-col items-center text-center">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-5xl"
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur-xl"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-blue-100 text-xs font-bold uppercase tracking-[0.2em]">Unified Global Infrastructure</span>
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-white mb-8 leading-[0.9] tracking-tight drop-shadow-2xl">
                    The Ecosystem
                </h1>
                
                <p className="text-xl md:text-3xl text-slate-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto font-sans drop-shadow-lg">
                    Orchestrating <span className="text-white font-semibold">11 specialized industries</span> into one seamless powerhouse of innovation and execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button 
                        onClick={() => document.getElementById('domain-start')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Verticals 
                            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </span>
                    </button>
                    
                    <button 
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                        Partner With Us
                    </button>
                </div>
            </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
        </motion.div>
        </section>
    );
  };

  const GroupOverview = () => (
    <section className="relative py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
                 <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-10 leading-tight"
                 >
                    A convergence of strategy, technology, and operations.
                 </motion.h2>
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                 >
                     <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Vedanco Group brings together multiple specialized businesses, each led by domain experts and supported by shared AI systems, consulting frameworks, and operational excellence.
                     </p>
                     <p className="text-lg text-slate-500 leading-relaxed">
                        We don't operate in silos. Our finance arm informs our real estate decisions. Our AI division powers our logistics. This interconnectedness allows us to solve problems others can't see.
                     </p>
                 </motion.div>
            </div>
            <div className="relative">
                <motion.div 
                    initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                    whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[600px] w-full"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" 
                        alt="Vedanco Corporate" 
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute -bottom-10 -left-10 text-[10rem] font-serif font-bold text-slate-900/5 select-none -z-10">
                    ONE
                </div>
            </div>
        </div>
    </section>
  );

  const DomainsIntro = () => (
    <section id="domain-start" className="py-32 bg-gradient-to-b from-slate-50 to-blue-50/50 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-6 block"
            >
                11 Specialized Verticals
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8"
            >
                Our Business Domains
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl text-slate-500 font-serif italic"
            >
                "Each domain is built with depth, expertise, and long-term scalability in mind."
            </motion.p>
        </div>
    </section>
  );

  const ConnectingFlow = () => (
    <section className="py-40 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-20">The Power of Connection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-12 left-20 right-20 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

                {[
                    { icon: "⚡", title: "Shared Intelligence", text: "AI frameworks developed for our tech division optimize logistics and aviation routes." },
                    { icon: "💎", title: "Unified Standards", text: "The premium service ethos of our hospitality arm influences our real estate and staffing." },
                    { icon: "🌐", title: "Global Reach", text: "Our logistics network provides the physical backbone for our trade and interior execution." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative bg-white/50 backdrop-blur-sm p-8"
                    >
                         <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center text-4xl mb-8 relative z-10 border border-slate-100">
                             {item.icon}
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                         <p className="text-slate-500 leading-relaxed">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );

  const ScaleTrust = () => (
    <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
            <div className="border-t border-b border-slate-100 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { num: "11+", label: "Specialized Domains" },
                        { num: "Global", label: "Operational Footprint" },
                        { num: "Enterprise", label: "Grade Security & Process" },
                        { num: "24/7", label: "Support Infrastructure" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-2">{stat.num}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );

  const CtaSection = () => (
    <section className="py-40 bg-gradient-to-tr from-blue-900 to-slate-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-5xl font-serif font-bold mb-8">Not Sure Which Domain Fits?</h2>
            <p className="text-xl text-blue-200 mb-12 font-light">
                Our strategic consultants can analyze your needs and direct you to the right solution within the Vedanco ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1">
                    Talk to Our Expert
                </button>
                <button className="bg-transparent border border-white/30 text-white px-12 py-5 rounded-full font-bold hover:bg-white/10 transition-all">
                    Get Strategic Consultation
                </button>
            </div>
        </div>
    </section>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <GroupOverview />
        <DomainsIntro />
        
        {domains.map((domain, idx) => (
            <DomainStorySection 
                key={idx} 
                domain={domain} 
                index={idx}
                isExpanded={expandedIndex === idx}
                onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            />
        ))}
        
        <ConnectingFlow />
        <ScaleTrust />
        <CtaSection />
      </main>
    </div>
  );
};

export default BusinessPage;
