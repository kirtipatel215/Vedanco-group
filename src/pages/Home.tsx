
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ViewState } from '../types';

interface HomeProps {
    introFinished: boolean;
    setView: (view: ViewState) => void;
    handleViewChange: (view: ViewState, targetId?: string | null) => void;
}

interface BusinessItemProps {
    biz: any;
    index: number;
    onExplore: () => void;
}

// Animation Constants
const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const BusinessItem: React.FC<BusinessItemProps> = ({ biz, index, onExplore }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Smooth parallax for images
    const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
      <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP_VARIANTS}
          className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
      >
           <div 
                ref={ref} 
                onClick={onExplore}
                className="w-full md:w-1/2 h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative group bg-slate-100 cursor-pointer transform transition-transform duration-700 hover:scale-[1.01]"
           >
               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
               <motion.div style={{ y: imageY, scale: 1.15 }} className="w-full h-full relative">
                  <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
               </motion.div>
           </div>

           <motion.div 
              className="w-full md:w-1/2 px-4"
           >
               <div className="text-8xl text-slate-100 font-serif font-bold absolute -z-10 -translate-y-16 -translate-x-4 select-none opacity-50">0{index + 1}</div>
               <h3 className="text-5xl font-serif font-bold mb-6 text-slate-900 leading-tight">{biz.name}</h3>
               <p className="text-xl text-slate-500 mb-10 font-light leading-relaxed max-w-md">{biz.desc}</p>
               <button 
                   onClick={onExplore}
                   className="group flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
               >
                   Explore Vertical
                   <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
               </button>
           </motion.div>
      </motion.div>
    );
};

const Hero = ({ introFinished, setView, handleViewChange }: any) => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    
    // Signature Scroll Effect: Video zooms OUT from 1.15 to 1.0 as you scroll down
    const scale = useTransform(scrollY, [0, 1000], [1.15, 1]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const textY = useTransform(scrollY, [0, 500], [0, 150]);
    
    // Use spring for smoother playback on scroll
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 20, mass: 0.5 });

    return (
        <div ref={containerRef} id="hero" className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-slate-950">
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.div 
                 style={{ scale: smoothScale, opacity }}
                 className="w-full h-full"
              >
                 <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
                 >
                     {/* High-quality Earth Rotation Loop */}
                     <source src="https://videos.pexels.com/video-files/1851190/1851190-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                 </video>
              </motion.div>
              {/* Dark overlay to ensure text readability against the bright Earth video */}
              <div className="absolute inset-0 bg-slate-950/40 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none"></div>
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80 pointer-events-none"></div>
          </div>
    
          {/* Content Layer */}
          <motion.div 
            style={{ y: textY }}
            className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
          >
            <motion.div
                initial="hidden"
                animate={introFinished ? "visible" : "hidden"}
                variants={STAGGER_CONTAINER}
            >
                <div className="overflow-hidden mb-2">
                    <motion.h1 
                        variants={FADE_UP_VARIANTS}
                        className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight drop-shadow-2xl"
                    >
                        Empowering Businesses
                    </motion.h1>
                </div>
                
                <div className="overflow-hidden mb-8">
                     <motion.h1 
                        variants={FADE_UP_VARIANTS}
                        className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 leading-tight tracking-tight pb-2"
                    >
                        Across Industries
                    </motion.h1>
                </div>

                <motion.p 
                    variants={FADE_UP_VARIANTS}
                    className="text-base md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
                >
                  One powerful group delivering IT, AI, Consulting, Design, Talent, Aviation, and Growth solutions under one global brand.
                </motion.p>
                
                <motion.div 
                    variants={FADE_UP_VARIANTS}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <button 
                        onClick={() => setView(ViewState.BUSINESS)}
                        className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 transform duration-300 text-sm tracking-wide"
                    >
                        Explore Our Businesses
                    </button>
                    <button 
                        onClick={() => handleViewChange(ViewState.CONTACT)}
                        className="group bg-white/5 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all hover:-translate-y-1 text-sm tracking-wide"
                    >
                        <span className="flex items-center gap-2">
                            Request Consultation
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </button>
                </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={introFinished ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer"
            onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-[20px] h-[32px] border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                <motion.div 
                    animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
            </div>
            <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-medium animate-pulse">Scroll</span>
          </motion.div>
        </div>
    );
};

const GroupOverview = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section id="about" className="relative py-40 bg-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center opacity-[0.03]" />
            </div>
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={FADE_UP_VARIANTS}
                    className="max-w-xl"
                >
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">About The Group</h2>
                    <h3 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-slate-900">
                        One Group.<br/>
                        Multiple Industries.<br/>
                        <span className="text-slate-400">Endless Possibilities.</span>
                    </h3>
                </motion.div>
                <div className="relative">
                    <div ref={ref} className="h-[600px] w-full overflow-hidden rounded-sm relative">
                        <motion.div 
                            style={{ y: imageY, scale: 1.2 }}
                            className="w-full h-full absolute inset-0"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" 
                                alt="Vedanco Corporate" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div 
                            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 bg-slate-100 z-10"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 text-[10rem] font-serif font-bold text-slate-900/5 select-none -z-10">
                        ONE
                    </div>
                </div>
            </div>
             <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-50px" }}
                 variants={STAGGER_CONTAINER}
                 className="container mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                 {[
                    { title: "11+ Businesses", desc: "Operating under one unified brand identity." },
                    { title: "Global Reach", desc: "Serving clients across India, UAE, USA, and Europe." },
                    { title: "AI-Powered", desc: "Embedding automation in every solution we deliver." },
                    { title: "End-to-End", desc: "From concept to execution, we handle it all." }
                 ].map((item, i) => (
                     <motion.div variants={FADE_UP_VARIANTS} key={i} className="flex gap-4 border-l-2 border-slate-100 pl-6 group hover:border-blue-600 transition-colors cursor-default">
                         <div>
                             <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                             <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                         </div>
                     </motion.div>
                 ))}
            </motion.div>
        </section>
    );
};

const BusinessesShowcase = ({ handleViewChange }: any) => {
    const businesses = [
        { id: "vedanco-it-solutions", name: "Vedanco IT Solutions", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", desc: "Software, Apps & Enterprise Systems" },
        { id: "vedanco-ai-automation", name: "Vedanco AI & Automation", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000", desc: "Machine Learning & Workflow Intelligence" },
        { id: "vedanco-consulting", name: "Vedanco Consulting", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070", desc: "Strategy, Growth & Startup Incubation" },
        { id: "vedanco-interiors", name: "Vedanco Interiors", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000", desc: "Premium Residential & Commercial Spaces" },
        { id: "vedanco-marketing", name: "Vedanco Marketing", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070", desc: "Branding, Digital & Performance Marketing" },
        { id: "vedanco-air", name: "Vedanco Air", image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000", desc: "Private Aviation & Charter Services" },
    ];
    return (
        <section id="businesses" className="bg-white py-40">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={FADE_UP_VARIANTS}
                className="container mx-auto px-6 mb-32"
            >
                <h2 className="text-6xl font-serif font-bold text-center text-slate-900 mb-8">Our Ecosystem</h2>
                <div className="max-w-4xl mx-auto text-center">
                     <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light">
                        Vedanco Group transcends the traditional conglomerate model, operating as a unified, symbiotic ecosystem. By integrating eleven specialized verticals—from sovereign AI and enterprise IT to luxury aviation and sustainable logistics—we eliminate operational friction. We don't just invest in diverse industries; we architect cross-sector dominance, empowering our partners to scale with a single, powerful global ally.
                    </p>
                </div>
            </motion.div>
            <div className="container mx-auto px-6 space-y-40">
                {businesses.map((biz, i) => (
                    <BusinessItem 
                        key={i} 
                        biz={biz} 
                        index={i} 
                        onExplore={() => handleViewChange(ViewState.BUSINESS, biz.id)}
                    />
                ))}
            </div>
            <div className="text-center mt-32">
                <button 
                    onClick={() => handleViewChange(ViewState.BUSINESS)}
                    className="bg-slate-50 text-slate-900 border border-slate-200 px-10 py-4 rounded-full font-medium hover:bg-slate-100 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 transform duration-300"
                >
                    + View All 11 Businesses
                </button>
            </div>
        </section>
    );
};

const Solutions = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section id="solutions" className="min-h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden">
            <div ref={ref} className="lg:w-1/2 min-h-[50vh] lg:h-auto relative overflow-hidden">
                 <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
                 <motion.div style={{ y: imageY, scale: 1.2 }} className="w-full h-full">
                    <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" className="w-full h-full object-cover" alt="Office Abstract" />
                 </motion.div>
            </div>
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-white">
                 <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={STAGGER_CONTAINER}
                 >
                    <motion.h2 variants={FADE_UP_VARIANTS} className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Why Vedanco?</motion.h2>
                    <motion.h3 variants={FADE_UP_VARIANTS} className="text-5xl md:text-6xl font-serif mb-12 text-slate-900 leading-tight">Designed for Scale.<br/>Built for Growth.</motion.h3>
                    <div className="space-y-12">
                        {[
                            { title: "Integrated Ecosystem", desc: "IT, AI, Automation, and Operations under one roof means zero friction in scaling your business." },
                            { title: "Global Quality, Local Cost", desc: "Leveraging Indian efficiency to deliver world-class solutions at a fraction of the global cost." },
                            { title: "Single Accountability", desc: "One partner, one vision. We take full ownership of your growth journey." }
                        ].map((item, i) => (
                            <motion.div variants={FADE_UP_VARIANTS} key={i} className="group">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {item.title}
                                </h4>
                                <p className="text-slate-500 leading-relaxed pl-5 border-l-2 border-slate-100 group-hover:border-blue-200 transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                 </motion.div>
            </div>
        </section>
    );
};

const VideoGrid = () => (
    <section className="py-32 bg-white">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP_VARIANTS}
            className="container mx-auto px-6 text-center mb-16"
        >
            <h2 className="text-4xl font-serif mb-4 text-slate-900">Vedanco In Motion</h2>
            <p className="text-slate-500">Innovation happens every second.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
             {[
                { 
                  src: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4", 
                  label: "Digital Intelligence",
                  desc: "Sovereign AI & Enterprise Tech"
                },
                { 
                  src: "https://videos.pexels.com/video-files/3025807/3025807-uhd_3840_2160_30fps.mp4", 
                  label: "Global Mobility",
                  desc: "Aviation & Logistics Network"
                },
                { 
                  src: "https://videos.pexels.com/video-files/1722882/1722882-uhd_3840_2160_25fps.mp4", 
                  label: "Urban Infrastructure",
                  desc: "Real Estate & Modern Spaces"
                }
             ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="aspect-[4/3] relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]"
                >
                     <video src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" loop muted autoPlay playsInline />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                     <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">{item.label}</div>
                        <div className="text-xl font-serif">{item.desc}</div>
                     </div>
                 </motion.div>
             ))}
        </div>
    </section>
);

const Trust = () => (
    <section id="trust" className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
             <h2 className="text-2xl font-serif text-center text-slate-400">Trusted By Innovators Globally</h2>
        </div>
        <div className="relative flex overflow-x-hidden group">
             <div className="flex animate-marquee whitespace-nowrap gap-16 px-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {["TechCorp", "GlobalLogistics", "SkyHigh Aviation", "BuildWell Real Estate", "Future AI", "HealthPlus", "EduTech India", "AutoMotive X"].map((logo, i) => (
                    <span key={i} className="text-3xl font-bold font-serif text-slate-300 hover:text-slate-500 transition-colors cursor-default">{logo}</span>
                ))}
                {["TechCorp", "GlobalLogistics", "SkyHigh Aviation", "BuildWell Real Estate", "Future AI", "HealthPlus", "EduTech India", "AutoMotive X"].map((logo, i) => (
                    <span key={`dup-${i}`} className="text-3xl font-bold font-serif text-slate-300 hover:text-slate-500 transition-colors cursor-default">{logo}</span>
                ))}
             </div>
        </div>
    </section>
);

const HomeContactPreview = ({ handleViewChange }: any) => (
    <section className="py-32 bg-white text-center">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP_VARIANTS}
            className="container mx-auto px-6 max-w-4xl"
        >
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">Ready to Transform?</h2>
            <button 
              onClick={() => handleViewChange(ViewState.CONTACT)}
              className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 transform duration-300"
            >
                Contact Us
            </button>
        </motion.div>
    </section>
);

const Home: React.FC<HomeProps> = ({ introFinished, setView, handleViewChange }) => {
    return (
        <>
            <Hero introFinished={introFinished} setView={setView} handleViewChange={handleViewChange} />
            <GroupOverview />
            <BusinessesShowcase handleViewChange={handleViewChange} />
            <Solutions />
            <VideoGrid />
            <Trust />
            <HomeContactPreview handleViewChange={handleViewChange} />
        </>
    );
};

export default Home;
