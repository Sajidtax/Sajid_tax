import React, { useEffect } from 'react';
import { X, ShieldAlert, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto font-poppins"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#023e60] text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            {type === 'privacy' ? (
              <>
                <FileText className="w-4 h-4 text-[#63ac4c]" />
                <span>Privacy & Client Data Policy</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-[#63ac4c]" />
                <span>Professional & Statutory Disclaimer</span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-200 hover:text-white rounded cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Sajid Tax Consultant</strong> values the confidentiality of your financial data, identity records, and business secrets.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                1. Collection of Client Documents
              </h4>
              <p>
                Documents provided to our office—including Permanent Account Numbers (PAN), Aadhaar numbers, Form 16, Bank statements, and Books of Account—are gathered solely for preparing statutory returns, governmental registrations, or advisory computations.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                2. Non-Disclosure & Storage
              </h4>
              <p>
                We do not sell, rent, lease, or distribute personal tax or corporate accounting information to any commercial third parties. Data is shared exclusively with authorized government agencies (e.g., Income Tax Department, GSTN, MCA, EPFO, DGFT) upon explicit client instruction.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                3. Contact Information
              </h4>
              <p>
                For questions regarding your data privacy, please write directly to our official email at <strong>workwithsajid@zohomail.in</strong> or visit our office at Office No. 114A, 2nd Floor, Paras Juice Building, Opera House, Mumbai – 400004.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>General Informational Notice:</strong> The information contained on this website is for general informational and educational guidance on direct taxes, GST, commercial registration, and corporate compliance in India.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                1. No Formal Legal Guarantee
              </h4>
              <p>
                Statutory outcomes, license approvals, trademark registrations, and assessment orders remain under the legal jurisdiction of respective government authorities. We do not provide false guarantees of government approval.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                2. Legislative Variations
              </h4>
              <p>
                Tax regulations, circulars, and notifications issued by the CBDT, CBIC, and Ministry of Corporate Affairs change periodically. Clients are advised to seek a dedicated consultation based on their specific transaction facts before taking commercial action.
              </p>
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">
                3. Jurisdiction
              </h4>
              <p>
                All consultancy engagements executed through Sajid Tax Consultant are governed by the applicable laws of India and subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
