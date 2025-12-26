
import React from 'react';
import { ViewState } from '../../types';

interface FooterProps {
    handleViewChange: (view: ViewState, targetId?: string | null) => void;
}

const Footer: React.FC<FooterProps> = ({ handleViewChange }) => {
    // Helper to scroll top
    const navTo = (view: ViewState, id?: string) => {
        handleViewChange(view, id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 text-slate-300 py-20 border-t border-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                 <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-900/20 blur-[100px]"></div>
                 <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white text-slate-950 flex items-center justify-center rounded-sm font-serif font-bold text-xl shadow-[0_0_15px_rgba(255,255,255,0.3)]">V</div>
                             <div>
                                 <h2 className="font-serif font-bold text-xl text-white tracking-wide leading-none">VEDANCO </h2>
                                 <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-medium mt-1">GROUP</p>
                             </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-light">
                            Orchestrating specialized industries into one seamless powerhouse of innovation, sustainability, and execution.
                        </p>
                        <div className="flex gap-4">
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/vedanco/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300" aria-label="LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>
                            </a>
                            {/* X (Twitter) */}
                            <a href="https://x.com/vedanco_group?s=11" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white hover:border-slate-700 transition-all duration-300" aria-label="X (Twitter)">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/vedanco_official?igsh=eXAwcXZuY2l5dDgz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300" aria-label="Instagram">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 tracking-wide">Company</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><button onClick={() => navTo(ViewState.ABOUT)} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span> About Us</button></li>
                            <li><button onClick={() => navTo(ViewState.CAREERS)} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span> Careers</button></li>
                            <li><button onClick={() => navTo(ViewState.PORTFOLIO)} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span> Portfolio</button></li>
                          
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h3 className="text-white font-bold mb-6 tracking-wide">Ecosystem</h3>
                        <ul className="space-y-4 text-sm font-medium">
                             <li><button onClick={() => navTo(ViewState.BUSINESS, 'vedanco-it-solutions')} className="hover:text-blue-400 transition-colors">IT Solutions</button></li>
                             <li><button onClick={() => navTo(ViewState.BUSINESS, 'vedanco-ai-automation')} className="hover:text-blue-400 transition-colors">AI & Automation</button></li>
                             <li><button onClick={() => navTo(ViewState.BUSINESS, 'vedanco-air')} className="hover:text-blue-400 transition-colors">Aviation</button></li>
                             <li><button onClick={() => navTo(ViewState.BUSINESS, 'vedanco-consulting')} className="hover:text-blue-400 transition-colors">Consulting</button></li>
                             <li><button onClick={() => navTo(ViewState.BUSINESS)} className="text-blue-400 hover:text-blue-300 transition-colors text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-1 group">View All Verticals <span className="group-hover:translate-x-1 transition-transform">→</span></button></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6 tracking-wide">Contact</h3>
                        <div className="space-y-4 text-sm text-slate-400">
                            <div className="flex items-start gap-3">
                                <span className="mt-1 text-slate-600">📍</span>
                                <span>InfoCity, Super Mall 1, Office No. 421/M,<br/>Gandhinagar, Gujarat – India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-600">📞</span>
                                <a href="tel:+916353097642" className="hover:text-white transition-colors">+91 6353 097 642</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-600">✉️</span>
                                <a href="mailto:vedanco.official@gmail.com" className="hover:text-white transition-colors">vedanco.official@gmail.com</a>
                            </div>
                            <button 
                                onClick={() => navTo(ViewState.CONTACT)}
                                className="mt-6 border border-slate-700 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all hover:scale-105"
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Vedanco Group. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <button onClick={() => navTo(ViewState.LEGAL, 'privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                        <button onClick={() => navTo(ViewState.LEGAL, 'terms')} className="hover:text-white transition-colors">Terms of Service</button>
                        <button onClick={() => navTo(ViewState.LEGAL, 'cookies')} className="hover:text-white transition-colors">Cookies Settings</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
