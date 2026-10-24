import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { getISTStatus } from '../utils/istTime';
import { ISTStatus } from '../types';

export const FloatingWhatsApp: React.FC = () => {
  const [istStatus, setIstStatus] = useState<ISTStatus>(getISTStatus());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIstStatus(getISTStatus());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = encodeURIComponent(
    'Hello Sajid Tax Consultant, I am visiting your website and would like to consult regarding tax and business compliance.'
  );
  const whatsappUrl = `https://wa.me/917762067143?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 font-poppins">
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="bg-white border border-slate-200 text-slate-800 p-3 rounded shadow-xl text-xs max-w-[220px] relative animate-fade-in mb-1">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-[#023e60] pr-4">Direct Consultation Desk</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Mon–Sat 11:00 AM – 7:00 PM IST
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#023e60] font-semibold text-[11px]">
            <span className={`w-2 h-2 rounded-full ${istStatus.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
            <span>{istStatus.statusText}</span>
          </div>
        </div>
      )}

      {/* Main Buttons Pill / Floating Action */}
      <div className="flex items-center gap-2">
        {/* Telephone Call Button */}
        <a
          href="tel:+917762067143"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-slate-700 hover:text-[#023e60] border border-slate-200 shadow-md flex items-center justify-center transition-transform hover:scale-105"
          title="Call +91 77620 67143"
          aria-label="Direct Call"
        >
          <Phone className="w-4 h-4 text-[#023e60]" />
        </a>

        {/* WhatsApp Button matching signature green */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#63ac4c] hover:bg-[#52993d] text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Status Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                istStatus.isOpen ? 'bg-white' : 'bg-slate-300'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                istStatus.isOpen ? 'bg-white' : 'bg-slate-200'
              }`}
            />
          </span>

          <MessageSquare className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
};
