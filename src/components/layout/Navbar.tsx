
import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState, targetId?: string | null) => void;
  show?: boolean;
}

const MENU_ITEMS = {
  businesses: {
    label: "Businesses",
    type: "mega",
    columns: [
      {
        title: "Technology & Consulting",
        items: ["Vedanco IT Solutions", "Vedanco AI & Automation", "Vedanco Consulting"]
      },
      {
        title: "Growth & People",
        items: ["Vedanco Marketing", "Vedanco Recruitment", "Vedanco Venture Studio"]
      },
      {
        title: "Assets & Infrastructure",
        items: ["Vedanco Interiors", "Vedanco Real Estate", "Vedanco Logistics"]
      },
      {
        title: "Mobility & Travel",
        items: ["Vedanco Tours & Travels", "Vedanco Air"]
      }
    ]
  },
  solutions: {
    label: "Solutions",
    type: "list",
    items: [
      "Digital Transformation", 
      "AI & Automation Solutions", 
      "Business Consulting", 
      "Startup Incubation", 
      "Enterprise Solutions", 
      "International Expansion"
    ]
  },
  portfolio: {
    label: "Portfolio",
    type: "list",
    items: [
      "Featured Projects", 
      "Case Studies", 
      "Client Testimonials", 
      "Industries Served"
    ]
  },
  about: {
    label: "About",
    type: "list",
    items: [
      "About Vedanco Group", 
      "Vision & Mission", 
      "Leadership", 
      "Global Presence"
    ]
  }
};

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, show = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const slugify = (text: string) => {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove special chars like &
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleNavigation = (destination: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    // Determine the type of the destination
    const isBusinessItem = MENU_ITEMS.businesses.columns.some(col => col.items.includes(destination));
    const isSolutionItem = MENU_ITEMS.solutions.items.includes(destination);
    const isAboutItem = MENU_ITEMS.about.items.includes(destination);
    const isPortfolioItem = MENU_ITEMS.portfolio.items.includes(destination);

    const slug = slugify(destination);
    let nextView = ViewState.HOME;
    let nextTargetId: string | null = null;

    if (destination === 'Home') {
      nextView = ViewState.HOME;
    } else if (destination === 'Businesses' || isBusinessItem) {
        nextView = ViewState.BUSINESS;
        nextTargetId = destination === 'Businesses' ? null : slug;
    } else if (destination === 'Portfolio' || isPortfolioItem) {
        nextView = ViewState.PORTFOLIO;
        // Portfolio currently does not support deep linking via slug in this structure
    } else if (destination === 'Solutions' || isSolutionItem) {
        nextView = ViewState.SOLUTIONS;
        nextTargetId = destination === 'Solutions' ? null : slug;
    } else if (destination === 'About' || isAboutItem) {
         nextView = ViewState.ABOUT;
         nextTargetId = destination === 'About' ? null : slug;
    } else if (destination === 'Contact') {
      nextView = ViewState.CONTACT;
    }

    // Direct scroll logic if we are already on the correct view
    if (currentView === nextView) {
        if (nextTargetId) {
            const el = document.getElementById(nextTargetId);
            if (el) {
                // Use scrollIntoView which respects scroll-margin-top CSS property
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // If target is null (e.g. clicking "Businesses" main link), scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Always update state to keep sync, even if view is same
        onChangeView(nextView, nextTargetId);
    } else {
        // Change view, the page component will handle scrolling on mount
        onChangeView(nextView, nextTargetId);
    }
  };

  const isWhiteMode = scrolled || mobileMenuOpen || activeDropdown !== null || currentView !== ViewState.HOME;

  const navClasses = isWhiteMode 
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
    : 'bg-transparent py-6 border-b border-transparent';

  const textClasses = isWhiteMode
    ? 'text-slate-600 hover:text-slate-900'
    : 'text-slate-200 hover:text-white';
    
  const logoTextClasses = isWhiteMode
    ? 'text-slate-900'
    : 'text-white';
    
  const logoSubTextClasses = isWhiteMode
    ? 'text-slate-400 group-hover:text-blue-600'
    : 'text-slate-400 group-hover:text-blue-300';
    
  const toggleButtonClasses = isWhiteMode
    ? 'text-slate-800 hover:text-blue-600'
    : 'text-white hover:text-blue-300';

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out font-sans ${navClasses}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
        <div 
          onClick={() => handleNavigation('Home')}
          className="flex items-center gap-3 cursor-pointer group z-50"
        >
          <div className="w-10 h-10 bg-white text-slate-900 flex items-center justify-center rounded-full shadow-lg border border-slate-100/50">
            <span className="font-serif font-bold text-xl">V</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className={`font-serif font-bold text-lg leading-none tracking-tight transition-colors duration-300 ${logoTextClasses}`}>VEDANCO</span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium leading-none mt-1 transition-colors duration-300 ${logoSubTextClasses}`}>Group</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
            <button 
                onClick={() => handleNavigation('Home')}
                className={`text-sm font-medium transition-colors relative group py-2 ${textClasses}`}
            >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${isWhiteMode ? 'bg-blue-600' : 'bg-white'}`}></span>
            </button>

            {(['about', 'businesses', 'solutions', 'portfolio'] as const).map((key) => (
                <div 
                    key={key}
                    onMouseEnter={() => setActiveDropdown(key)}
                    className="relative py-4"
                >
                    <button 
                        onClick={() => handleNavigation(MENU_ITEMS[key].label)}
                        className={`text-sm font-medium transition-colors flex items-center gap-1 ${activeDropdown === key ? (isWhiteMode ? 'text-blue-600' : 'text-white') : textClasses}`}
                    >
                        {MENU_ITEMS[key].label}
                        <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === key ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <span className={`absolute bottom-2 left-0 w-full h-[2px] transition-transform duration-300 ease-out origin-left ${activeDropdown === key ? 'scale-x-100' : 'scale-x-0'} ${isWhiteMode ? 'bg-blue-600' : 'bg-white'}`}></span>
                </div>
            ))}

            <button 
                onClick={() => handleNavigation('Contact')}
                className={`text-sm font-medium transition-colors relative group py-2 ${textClasses}`}
            >
                Contact
                <span className={`absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${isWhiteMode ? 'bg-blue-600' : 'bg-white'}`}></span>
            </button>
        </div>

        <div className="hidden lg:block">
            <button 
                onClick={() => handleNavigation('Contact')}
                className={`group relative px-6 py-2.5 text-sm font-semibold rounded-full shadow-lg overflow-hidden transition-all hover:scale-[1.02] ${
                    isWhiteMode 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-200 hover:shadow-blue-300' 
                    : 'bg-white text-slate-900 shadow-white/20 hover:shadow-white/30'
                }`}
            >
                <span className="relative z-10 flex items-center gap-2">
                    Get Consultation 
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
                <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isWhiteMode ? 'bg-white/20' : 'bg-slate-200'}`}></div>
            </button>
        </div>

        <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors z-50 ${toggleButtonClasses}`}
        >
            {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
        </button>
      </div>

      <AnimatePresence>
        {activeDropdown && (
            <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onMouseLeave={() => setActiveDropdown(null)}
                className="hidden lg:block absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl overflow-hidden"
            >
                 <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 opacity-50 pointer-events-none"></div>
                 
                 <div className="container mx-auto px-12 py-12 relative z-10">
                    {activeDropdown === 'businesses' && (
                        <div className="grid grid-cols-4 gap-12">
                            {MENU_ITEMS.businesses.columns.map((col, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-4">{col.title}</h4>
                                    <ul className="space-y-3">
                                        {col.items.map((item, i) => (
                                            <li key={i}>
                                                <button 
                                                    onClick={() => handleNavigation(item)}
                                                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2 group w-full text-left"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors"></span>
                                                    {item}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {activeDropdown !== 'businesses' && (
                         <div className="grid grid-cols-12 gap-12">
                             <div className="col-span-3 border-r border-slate-100 pr-8">
                                 <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">{MENU_ITEMS[activeDropdown as keyof typeof MENU_ITEMS].label}</h3>
                                 <p className="text-sm text-slate-500 leading-relaxed">
                                     Explore our comprehensive range of {activeDropdown} tailored for global enterprises.
                                 </p>
                                 <button 
                                    onClick={() => handleNavigation(MENU_ITEMS[activeDropdown as keyof typeof MENU_ITEMS].label)}
                                    className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
                                >
                                    View Overview <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                                </button>
                             </div>
                             <div className="col-span-9 grid grid-cols-3 gap-8">
                                 {(MENU_ITEMS[activeDropdown as keyof typeof MENU_ITEMS] as any).items.map((item: string, i: number) => (
                                     <button 
                                        key={i}
                                        onClick={() => handleNavigation(item)}
                                        className="text-left group p-3 -ml-3 rounded-lg hover:bg-slate-50 transition-colors"
                                     >
                                         <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">{item}</h5>
                                         <p className="text-xs text-slate-400">Discover more about {item.toLowerCase()}.</p>
                                     </button>
                                 ))}
                             </div>
                         </div>
                    )}
                 </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100vh' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white z-40 overflow-y-auto pt-24 pb-12 px-6 lg:hidden flex flex-col"
            >
                <div className="flex flex-col space-y-2">
                    <button onClick={() => handleNavigation('Home')} className="text-left py-4 text-xl font-serif font-bold text-slate-900 border-b border-slate-100">Home</button>
                    
                    {(['businesses', 'solutions', 'about', 'portfolio'] as const).map((key) => (
                        <div key={key} className="border-b border-slate-100">
                            <button 
                                onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                                className="w-full flex justify-between items-center py-4 text-xl font-serif font-bold text-slate-900"
                            >
                                {MENU_ITEMS[key].label}
                                <span className={`text-slate-400 transition-transform ${mobileExpanded === key ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            <AnimatePresence>
                                {mobileExpanded === key && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50 rounded-lg mb-4"
                                    >
                                        <div className="p-4 space-y-4">
                                            {key === 'businesses' ? (
                                                MENU_ITEMS.businesses.columns.map((col, idx) => (
                                                    <div key={idx} className="mb-4 last:mb-0">
                                                        <h6 className="text-xs font-bold uppercase text-slate-400 mb-2">{col.title}</h6>
                                                        <div className="flex flex-col gap-2">
                                                            {col.items.map((item, i) => (
                                                                <button key={i} onClick={() => handleNavigation(item)} className="text-left text-sm text-slate-600 py-1 pl-2 border-l-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
                                                                    {item}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                (MENU_ITEMS[key] as any).items.map((item: string, i: number) => (
                                                    <button key={i} onClick={() => handleNavigation(item)} className="block w-full text-left text-sm text-slate-600 py-2 hover:text-blue-600">
                                                        {item}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <button onClick={() => handleNavigation('Contact')} className="text-left py-4 text-xl font-serif font-bold text-slate-900 border-b border-slate-100">Contact</button>
                </div>
                
                <div className="mt-8">
                     <button 
                        onClick={() => handleNavigation('Contact')}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg"
                    >
                        Get Strategic Consultation
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
