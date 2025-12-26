
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactPageProps {
  onBack: () => void;
}

// ------------------------------------------------------------------
// ⚠️ CONFIGURATION ⚠️
// URL is now loaded securely from the environment variable.
// ------------------------------------------------------------------
const GOOGLE_SCRIPT_URL = process.env.CONTACT_SCRIPT_URL || "";
// ------------------------------------------------------------------

const offices = [
  { 
    city: "Gandhinagar", 
    country: "India", 
    address: "InfoCity, Super Mall 1, Office No. 421M, Gandhinagar, Gujarat – India", 
    phone: "+91 6353 097 642", 
    email: "vedanco.official@gmail.com",
    active: true
  },
  { 
    city: "Dubai", 
    country: "UAE", 
    active: false
  },
  { 
    city: "London", 
    country: "UK", 
    active: false
  },
  { 
    city: "New York", 
    country: "USA", 
    active: false
  }
];

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Subject: 'General Inquiry',
    Message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // --- CONFIGURATION CHECKS ---
    if (!GOOGLE_SCRIPT_URL) {
        setStatus('error');
        setErrorMessage("Configuration Error: CONTACT_SCRIPT_URL is missing in the environment variables.");
        return;
    }
    // ----------------------------

    // Basic Validation
    if (!formData.FirstName || !formData.Email || !formData.Message) {
        setStatus('error');
        setErrorMessage('Please fill in all required fields marked with *');
        return;
    }

    try {
      // We use FormData to safely post to Google Apps Script
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
          formPayload.append(key, value);
      });

      // Google Scripts return an opaque response with 'no-cors' usually, 
      // but standard POST often redirects. We handle the fetch.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formPayload
      });

      // Since Google Apps Script Web App redirects can cause CORS issues if we try to read JSON,
      // and we are using a simple POST, we assume success if no Network Error was thrown.
      
      setStatus('success');
      setFormData({
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Subject: 'General Inquiry',
            Message: ''
      });

    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
      setErrorMessage("Network error. Please try again or email us directly at vedanco.official@gmail.com");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-20"></div>
         <div className="container mx-auto px-6 relative z-10 text-center">
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif font-bold mb-6"
             >
                Global Reach, Local Touch.
             </motion.h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                 We are ready to partner with you. Reach out to our global headquarters or find a regional office near you.
             </p>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Send us a message</h2>
                  
                  {status === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                      >
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully</h3>
                          <p className="text-green-700">Your details have been securely recorded in our database. Our team will review your inquiry and respond shortly.</p>
                          <button 
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-sm font-bold text-green-800 underline hover:text-green-900"
                          >
                              Send another message
                          </button>
                      </motion.div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
                                <input 
                                    type="text" 
                                    name="FirstName"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="Jane" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                <input 
                                    type="text" 
                                    name="LastName"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="Doe" 
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                                <input 
                                    type="email" 
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="jane@company.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="Phone"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="+1 (555) 000-0000" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                            <select 
                                name="Subject"
                                value={formData.Subject}
                                onChange={handleChange}
                                className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors"
                            >
                                <option>General Inquiry</option>
                                <option>Business Partnership</option>
                                <option>Media & Press</option>
                                <option>Careers</option>
                                <option>IT & AI Solutions</option>
                                <option>Real Estate & Interiors</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                            <textarea 
                                name="Message"
                                value={formData.Message}
                                onChange={handleChange}
                                className="w-full p-4 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-colors h-40 resize-none" 
                                placeholder="How can we help?"
                                required
                            ></textarea>
                        </div>
                        
                        {status === 'error' && (
                             <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                                 {errorMessage}
                             </div>
                        )}

                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </button>
                    </form>
                  )}
              </div>

              <div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Our Global Presence</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {offices.map((office, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white p-6 rounded-xl shadow-sm border ${office.active ? 'border-slate-100 hover:shadow-md' : 'border-slate-100/60'} transition-all`}
                          >
                              <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{office.country}</div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">{office.city}</h3>
                              
                              {office.active ? (
                                <>
                                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{office.address}</p>
                                    <div className="space-y-1">
                                        <a 
                                          href={`https://wa.me/${office.phone.replace(/[^0-9]/g, '')}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm font-medium text-slate-700 hover:text-green-600 transition-colors flex items-center gap-2 group w-fit"
                                        >
                                          <span>📞</span> 
                                          <span>{office.phone}</span>
                                          <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">WA</span>
                                        </a>
                                        <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><span>✉️</span> {office.email}</p>
                                    </div>
                                </>
                              ) : (
                                <div className="mt-4 pt-4 border-t border-slate-50">
                                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                              )}
                          </motion.div>
                      ))}
                  </div>

                  <div className="mt-12">
                      <h4 className="font-serif font-bold text-slate-900 mb-4 text-xl">Connect with us</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <a 
                            href="https://www.linkedin.com/company/vedanco/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group"
                          >
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow on</p>
                                  <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">LinkedIn</p>
                              </div>
                          </a>
                          
                          <a 
                            href="https://www.instagram.com/vedanco_official?igsh=eXAwcXZuY2l5dDgz" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-400 hover:shadow-md transition-all group"
                          >
                              <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow on</p>
                                  <p className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">Instagram</p>
                              </div>
                          </a>

                          <a 
                            href="https://x.com/vedanco_group?s=11" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-800 hover:shadow-md transition-all group"
                          >
                              <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow on</p>
                                  <p className="font-bold text-slate-900 group-hover:text-black transition-colors">X (Twitter)</p>
                              </div>
                          </a>
                      </div>
                  </div>

                  <div className="mt-8 bg-blue-50 p-8 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-2">Join the Team?</h4>
                      <p className="text-blue-700/80 mb-4 text-sm">We are always looking for exceptional talent to join our global family.</p>
                      <a href="https://www.linkedin.com/company/vedanco/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
                        View Career Opportunities <span>→</span>
                      </a>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ContactPage;
