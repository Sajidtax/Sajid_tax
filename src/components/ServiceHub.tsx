import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServiceHubProps {
  onSelectService: (service: ServiceItem) => void;
}

// 12 Primary Excellence Grid Items matching image_635061a8.png exactly
interface ExcellenceCardDef {
  title: string;
  serviceId: string;
  iconSvg: React.ReactNode;
}

export const ServiceHub: React.FC<ServiceHubProps> = ({ onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Subtle skeleton screen on initial load to enhance perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // High-fidelity green line SVG icons matching image_635061a8.png stroke style
  const EXCELLENCE_SERVICES: ExcellenceCardDef[] = [
    {
      title: 'Company Registration',
      serviceId: 'private-limited-company',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Document with portrait and checklist */}
          <rect x="12" y="6" width="32" height="46" rx="2" />
          <circle cx="28" cy="18" r="5" />
          <path d="M20 28c0-4 4-5 8-5s8 1 8 5" />
          <line x1="18" y1="36" x2="38" y2="36" />
          <line x1="18" y1="42" x2="32" y2="42" />
          {/* Pen / Quill */}
          <path d="M48 30 L52 26 L56 30 L52 34 Z" />
          <path d="M48 30 L40 50 L44 54 L52 34" />
          <path d="M40 50 L38 56 L44 54" />
        </svg>
      ),
    },
    {
      title: 'Business Setup India',
      serviceId: 'firm-registration',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* 3 Interlocking gears */}
          <circle cx="26" cy="24" r="8" />
          <path d="M26 12v4M26 32v4M14 24h4M34 24h4M17.5 15.5l2.8 2.8M31.7 29.7l2.8 2.8M17.5 32.5l2.8-2.8M31.7 18.3l2.8-2.8" />
          <circle cx="42" cy="38" r="7" />
          <path d="M42 27v4M42 45v4M31 38h4M49 38h4M34.5 30.5l2.8 2.8M46.7 42.7l2.8 2.8" />
        </svg>
      ),
    },
    {
      title: 'Company And LLP Compliances',
      serviceId: 'roc-compliance',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Shield protecting document with checkmark */}
          <path d="M32 8l16 6v14c0 14-16 24-16 24S16 42 16 28V14z" />
          <rect x="24" y="20" width="16" height="22" rx="1.5" strokeDasharray="3 0" />
          <path d="M28 31l3 3 6-6" />
        </svg>
      ),
    },
    {
      title: 'Auditing & Assurance',
      serviceId: 'auditing-assurance',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Audit report clipboard with magnifying glass */}
          <rect x="14" y="8" width="28" height="42" rx="2" />
          <path d="M22 8V5h12v3" />
          <circle cx="20" cy="20" r="1.5" fill="#63ac4c" />
          <line x1="26" y1="20" x2="36" y2="20" />
          <circle cx="20" cy="28" r="1.5" fill="#63ac4c" />
          <line x1="26" y1="28" x2="36" y2="28" />
          <circle cx="20" cy="36" r="1.5" fill="#63ac4c" />
          <line x1="26" y1="36" x2="32" y2="36" />
          {/* Glass */}
          <circle cx="42" cy="42" r="8" />
          <line x1="48" y1="48" x2="56" y2="56" />
        </svg>
      ),
    },
    {
      title: 'Tax Advisory',
      serviceId: 'income-tax-itr',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Tax Professional figure with currency emblem */}
          <circle cx="30" cy="20" r="7" />
          <path d="M18 44c0-7 6-11 12-11s12 4 12 11" />
          <path d="M27 33l3 8 3-8" />
          <circle cx="46" cy="28" r="6" />
          <path d="M46 25v6M44 26.5h4a1.5 1.5 0 0 1 0 3h-4" />
        </svg>
      ),
    },
    {
      title: 'GST Advisory Services',
      serviceId: 'gst-returns',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Two persons at consultation desk with speech bubble */}
          <circle cx="22" cy="22" r="5" />
          <path d="M14 38c0-5 4-8 8-8s8 3 8 8" />
          <circle cx="42" cy="22" r="5" />
          <path d="M34 38c0-5 4-8 8-8s8 3 8 8" />
          <line x1="10" y1="42" x2="54" y2="42" />
          <line x1="16" y1="42" x2="16" y2="52" />
          <line x1="48" y1="42" x2="48" y2="52" />
          <path d="M36 12h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4l-3 3v-3h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" />
        </svg>
      ),
    },
    {
      title: 'NRI Taxation',
      serviceId: 'nri-taxation',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Banknote with TAX and currency */}
          <rect x="8" y="20" width="48" height="28" rx="3" />
          <circle cx="32" cy="34" r="8" />
          <text x="32" y="38" fontSize="9" textAnchor="middle" fill="#63ac4c" fontWeight="bold" stroke="none">TAX</text>
          <circle cx="16" cy="34" r="2.5" />
          <circle cx="48" cy="34" r="2.5" />
          <path d="M8 26c6 0 6-6 6-6" />
          <path d="M8 42c6 0 6 6 6 6" />
          <path d="M56 26c-6 0-6-6-6-6" />
          <path d="M56 42c-6 0-6 6-6 6" />
        </svg>
      ),
    },
    {
      title: 'Transfer Pricing',
      serviceId: 'transfer-pricing',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Euro and Dollar with circular exchange arrows */}
          <circle cx="20" cy="24" r="8" />
          <text x="20" y="28" fontSize="10" textAnchor="middle" fill="#63ac4c" fontWeight="bold" stroke="none">€</text>
          <circle cx="44" cy="40" r="8" />
          <text x="44" y="44" fontSize="10" textAnchor="middle" fill="#63ac4c" fontWeight="bold" stroke="none">$</text>
          <path d="M30 18c8-2 16 1 18 8l2-2" />
          <path d="M34 46c-8 2-16-1-18-8l-2 2" />
        </svg>
      ),
    },
    {
      title: 'Registration of Indian Subsidiary Company',
      serviceId: 'indian-subsidiary-registration',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Document with corporate portrait and verified badge */}
          <rect x="14" y="8" width="30" height="42" rx="2" />
          <circle cx="29" cy="20" r="4.5" />
          <path d="M22 30c0-3 3-4 7-4s7 1 7 4" />
          <line x1="20" y1="36" x2="38" y2="36" />
          <line x1="20" y1="42" x2="32" y2="42" />
          {/* Approved badge */}
          <circle cx="44" cy="44" r="8" />
          <path d="M40 44l3 3 5-5" />
        </svg>
      ),
    },
    {
      title: 'Foreign Company Registration in India',
      serviceId: 'foreign-company-registration',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Global foreign enterprise charter with checkmark */}
          <rect x="14" y="8" width="30" height="42" rx="2" />
          <circle cx="29" cy="20" r="4.5" />
          <path d="M22 30c0-3 3-4 7-4s7 1 7 4" />
          <line x1="20" y1="36" x2="38" y2="36" />
          <line x1="20" y1="42" x2="34" y2="42" />
          {/* Verified round seal */}
          <circle cx="44" cy="44" r="8" />
          <path d="M40 44l3 3 5-5" />
        </svg>
      ),
    },
    {
      title: 'Account Outsourcing & Bookkeeping',
      serviceId: 'accounting-services',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Spiral ledger binder with calculator and currency */}
          <rect x="18" y="10" width="32" height="44" rx="2" />
          {/* Spiral rings */}
          <path d="M14 16h8M14 24h8M14 32h8M14 40h8M14 48h8" />
          <rect x="28" y="16" width="16" height="12" rx="1" />
          <text x="36" y="25" fontSize="8" textAnchor="middle" fill="#63ac4c" fontWeight="bold" stroke="none">₹</text>
          <rect x="28" y="32" width="16" height="16" rx="1" />
          <line x1="32" y1="36" x2="34" y2="36" />
          <line x1="38" y1="36" x2="40" y2="36" />
          <line x1="32" y1="40" x2="34" y2="40" />
          <line x1="38" y1="40" x2="40" y2="40" />
          <line x1="32" y1="44" x2="40" y2="44" />
        </svg>
      ),
    },
    {
      title: 'Tax Investment & Financial Advisory',
      serviceId: 'financial-advisory',
      iconSvg: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#63ac4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-13 h-13 mx-auto">
          {/* Computer screen with financial bar charts and TAX */}
          <rect x="10" y="12" width="44" height="34" rx="2" />
          <line x1="24" y1="46" x2="40" y2="46" />
          <line x1="32" y1="46" x2="32" y2="52" />
          <line x1="22" y1="52" x2="42" y2="52" />
          <line x1="10" y1="20" x2="54" y2="20" />
          {/* Rising bars */}
          <rect x="16" y="28" width="4" height="12" />
          <rect x="24" y="24" width="4" height="16" />
          <rect x="32" y="22" width="4" height="18" />
          <rect x="40" y="26" width="4" height="14" />
          <text x="32" y="42" fontSize="7" textAnchor="middle" fill="#63ac4c" fontWeight="bold" stroke="none">TAX</text>
        </svg>
      ),
    },
  ];

  const handleCardClick = (serviceId: string) => {
    const match = SERVICES_DATA.find((s) => s.id === serviceId);
    if (match) {
      onSelectService(match);
    }
  };

  const filteredAll = searchQuery.trim()
    ? SERVICES_DATA.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SERVICES_DATA;

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching image_635061a8.png exactly */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-tight">
            <span className="text-[#63ac4c]">Committed</span>{' '}
            <span className="text-[#023e60]">to Excellence</span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 font-normal leading-relaxed mt-3 max-w-3xl mx-auto">
            One Stop Destination to provide unified and agile solutions to manage all your business complexities and regulatory compliances
          </p>
        </div>

        {/* 12 Clean White Cards Grid matching image_635061a8.png with Subtle Skeleton Loading Screen */}
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
            aria-busy="true"
            aria-label="Loading statutory services"
          >
            {[...Array(12)].map((_, idx) => (
              <div
                key={`service-skeleton-${idx}`}
                className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-2xs min-h-[160px] sm:min-h-[190px] animate-shimmer"
              >
                {/* Skeleton Green/Gray Icon Placeholder */}
                <div className="w-13 h-13 rounded-xl bg-slate-100 flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/60" />
                </div>

                {/* Skeleton Title Placeholder Bars */}
                <div className="w-full flex flex-col items-center gap-1.5 px-2">
                  <div className="w-4/5 h-3 rounded bg-slate-200/80" />
                  <div className="w-3/5 h-2.5 rounded bg-slate-200/60" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 animate-fastFadeIn">
            {EXCELLENCE_SERVICES.map((card, idx) => (
              <button
                key={idx}
                onClick={() => handleCardClick(card.serviceId)}
                className="bg-white rounded-lg border border-slate-200/90 hover:border-[#63ac4c] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md card-luxury-hover group cursor-pointer min-h-[160px] sm:min-h-[190px] relative overflow-hidden"
                aria-label={`View details for ${card.title}`}
              >
                {/* Green Outline Icon */}
                <div className="mb-3 sm:mb-4 transition-transform duration-200 group-hover:scale-108 shrink-0">
                  {card.iconSvg}
                </div>

                {/* Clean Title Only - No outside clutter */}
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#023e60] transition-colors leading-snug line-clamp-3">
                  {card.title}
                </h3>
              </button>
            ))}
          </div>
        )}

        {/* Minimal Search & Full Directory Toggle (Keeps layout clean while giving full access) */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            <span>Need a specific filing or license? </span>
            <span className="text-slate-700 font-semibold">Also serving Udyam, Gumasta, Trademark, DSC & FSSAI.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#023e60] bg-white border border-slate-300 hover:border-[#023e60] rounded shadow-2xs transition-colors cursor-pointer"
            >
              {showAllServices ? 'Hide Extended Directory' : `Explore All Services (${SERVICES_DATA.length})`}
            </button>
          </div>
        </div>

        {/* Expanded Directory (Only shown on toggle, keeping main view 100% clean) */}
        {showAllServices && (
          <div className="mt-6 p-6 rounded-lg bg-white border border-slate-200 shadow-sm animate-fadeIn space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <h4 className="text-sm font-bold text-[#023e60]">
                Complete Statutory Service Directory ({filteredAll.length})
              </h4>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter directory..."
                  className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#023e60]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredAll.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectService(s)}
                  className="p-3 text-left rounded bg-slate-50 hover:bg-[#eef5fa] border border-slate-200 hover:border-[#023e60] transition-colors group cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#023e60] group-hover:text-[#0c5369] truncate">
                    {s.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-normal">
                    {s.tagline}
                  </div>
                  <div className="text-[11px] font-semibold text-[#63ac4c] mt-2 flex items-center gap-1">
                    <span>View inside</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
