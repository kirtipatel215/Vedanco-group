
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LegalPageProps {
  onBack: () => void;
  targetId?: string | null;
}

const sections = [
  {
    id: "terms",
    title: "Terms & Conditions",
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <h3 className="text-xl font-bold text-slate-900">1. Introduction</h3>
        <p>Welcome to Vedanco Group ("Company", "We", "Us", or "Our"). By accessing our website, engaging our services, or using our products across any of our verticals (IT Solutions, AI, Consulting, Interiors, Marketing, Recruitment, Venture Studio, Real Estate, Travel, Aviation, Logistics), you agree to comply with and be bound by these Terms and Conditions.</p>

        <h3 className="text-xl font-bold text-slate-900">2. Scope of Services</h3>
        <p>Vedanco Group operates as a multi-industry conglomerate. The specific scope of work, deliverables, and engagement models will vary based on the service vertical:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Technology & AI:</strong> Software development, licensing, and SaaS products.</li>
            <li><strong>Physical Services:</strong> Interior design, logistics, and real estate brokerage.</li>
            <li><strong>Travel & Aviation:</strong> Booking management, charter services, and itinerary planning.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">3. Eligibility & User Responsibilities</h3>
        <p>You must be at least 18 years old to use our services. You agree to provide accurate, current, and complete information during any registration or inquiry process. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

        <h3 className="text-xl font-bold text-slate-900">4. Engagement, Deliverables & Timelines</h3>
        <p>All professional engagements (Consulting, IT, Interiors) will be governed by a separate Master Services Agreement (MSA) or Statement of Work (SOW) detailing specific timelines. While we strive to meet all deadlines, Vedanco Group shall not be liable for delays caused by third-party dependencies, force majeure, or delayed client feedback.</p>

        <h3 className="text-xl font-bold text-slate-900">5. Payments, Pricing & Taxes</h3>
        <p>Pricing is project-specific or service-based. All invoices are due upon receipt unless otherwise agreed in writing. Failure to pay may result in suspension of services. You are responsible for all applicable taxes (GST, VAT, etc.) based on your jurisdiction.</p>

        <h3 className="text-xl font-bold text-slate-900">6. Intellectual Property Rights</h3>
        <p>Unless explicitly transferred via contract, Vedanco Group retains ownership of all pre-existing IP, code repositories, design frameworks, and methodologies used to deliver services. Client IP provided to us remains the property of the Client.</p>

        <h3 className="text-xl font-bold text-slate-900">7. Confidentiality</h3>
        <p>We adhere to strict non-disclosure standards. Any proprietary information shared during the course of business will be treated as confidential and will not be disclosed to third parties without consent, except where required by law.</p>

        <h3 className="text-xl font-bold text-slate-900">8. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, Vedanco Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

        <h3 className="text-xl font-bold text-slate-900">9. Governing Law</h3>
        <p>These Terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Gandhinagar, Gujarat.</p>

        <h3 className="text-xl font-bold text-slate-900">10. Contact Information</h3>
        <p>For legal inquiries, please contact:<br/>
        <strong>Email:</strong> vedanco.official@gmail.com<br/>
        <strong>Address:</strong> InfoCity Super Mall 1, Office No. 421M, Gandhinagar, Gujarat – India</p>
      </div>
    )
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>Your privacy is critically important to us. This policy outlines how Vedanco Group collects, uses, and protects your data.</p>
        
        <h3 className="text-xl font-bold text-slate-900">1. Information We Collect</h3>
        <p>We may collect personal identification information (Name, Email, Phone Number, Job Title) and technical data (IP address, browser type) when you use our website or services.</p>

        <h3 className="text-xl font-bold text-slate-900">2. How We Use Your Data</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">3. Data Security</h3>
        <p>We use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet is 100% secure.</p>

        <h3 className="text-xl font-bold text-slate-900">4. Third-Party Sharing</h3>
        <p>We do not sell your data. We may share data with trusted third-party service providers (e.g., cloud hosting, payment processors) solely for operational purposes.</p>

        <h3 className="text-xl font-bold text-slate-900">5. Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at vedanco.official@gmail.com.</p>
      </div>
    )
  },
  {
    id: "refund",
    title: "Refund & Cancellation Policy",
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <h3 className="text-xl font-bold text-slate-900">1. Service-Based Refunds</h3>
        <p>Due to the customized nature of our services (IT development, consulting, design), advance payments and milestone payments are generally non-refundable once the work has commenced.</p>

        <h3 className="text-xl font-bold text-slate-900">2. Third-Party Services</h3>
        <p>For services involving third parties (Vedanco Air, Tours & Travels, Logistics), refunds and cancellations are subject to the policies of the respective airlines, hotels, or shipping carriers.</p>

        <h3 className="text-xl font-bold text-slate-900">3. Cancellation Process</h3>
        <p>Clients wishing to cancel a contract must provide written notice as per the terms specified in their Service Agreement. Refunds, if applicable, will be processed within 14 business days via the original mode of payment.</p>
      </div>
    )
  },
  {
    id: "disclaimer",
    title: "Service Disclaimer",
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>Vedanco Group provides services on a best-effort basis.</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>No Guarantees:</strong> We do not guarantee specific business outcomes, revenue generation, funding acquisition (for Venture Studio), or marketing ROI. Results depend on market conditions and client inputs.</li>
            <li><strong>Regulatory Approvals:</strong> Services related to Aviation, Logistics, and Real Estate are subject to government regulations and approvals. Vedanco Group is not liable for delays caused by regulatory bodies.</li>
            <li><strong>Non-Profit:</strong> Vedanco Foundation operates independently as a non-profit initiative and is separate from the commercial liabilities of the Group.</li>
        </ul>
      </div>
    )
  },
  {
    id: "cookies",
    title: "Cookies Policy",
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>We use cookies to enhance your browsing experience.</p>
        <h3 className="text-xl font-bold text-slate-900">1. Types of Cookies</h3>
        <p>We use Essential Cookies (for site functionality) and Analytics Cookies (to understand site usage).</p>
        <h3 className="text-xl font-bold text-slate-900">2. Managing Cookies</h3>
        <p>You can choose to disable cookies through your browser settings, though this may affect the functionality of our website.</p>
      </div>
    )
  }
];

const LegalPage: React.FC<LegalPageProps> = ({ onBack, targetId }) => {
  const [activeTab, setActiveTab] = useState("terms");

  useEffect(() => {
    if (targetId) {
      const section = sections.find(s => s.id === targetId || targetId.includes(s.id));
      if (section) {
        setActiveTab(section.id);
      }
    }
  }, [targetId]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 py-12">
            <button onClick={onBack} className="mb-6 text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors">
                <span>←</span> Back to Main Site
            </button>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Legal Documentation</h1>
            <p className="text-slate-500 mt-4">Last Updated: October 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/4">
                <div className="sticky top-32 space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveTab(section.id);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                                activeTab === section.id 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="lg:w-3/4">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm"
                >
                    {sections.find(s => s.id === activeTab)?.content}
                </motion.div>

                <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-400 text-center">
                    <p>© 2025 Vedanco Group. All rights reserved. These documents are legally binding. Unauthorized reproduction is prohibited.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
        