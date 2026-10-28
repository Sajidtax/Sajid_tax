import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, Headphones, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import { getISTStatus } from '../utils/istTime';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { CaLogo } from './CaLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
  onNavigateHome: () => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onNavigateHome,
  onSelectService,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const istStatus = getISTStatus();

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (hash: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setAboutDropdownOpen(false);

    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const matched = SERVICES_DATA.find((s) => s.id === serviceId);
    if (matched) {
      if (onSelectService) {
        onSelectService(matched);
      }
      window.location.hash = `#/service/${matched.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 7 Primary Items for the Services Dropdown matching image_d7b86852.png
  const DROPDOWN_SERVICES = [
    { title: 'Company Registration', serviceId: 'private-limited-company' },
    { title: 'Tax Advisory', serviceId: 'income-tax-itr' },
    { title: 'Company And LLP Compliances', serviceId: 'roc-compliance' },
    { title: 'Auditing & Assurance', serviceId: 'auditing-assurance' },
    { title: 'Project Finance & Fund Raising', serviceId: 'financial-advisory' },
    { title: 'Account Outsourcing & Bookkeeping', serviceId: 'accounting-services' },
    { title: 'GST Advisory Services', serviceId: 'gst-returns' },
    { title: 'NRI Taxation', serviceId: 'nri-taxation' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs font-poppins">
      {/* 1. Desktop Top Utility Bar */}
      <div className="bg-[#f8fafc] text-slate-700 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+917762067143"
              className="flex items-center gap-2 text-slate-800 hover:text-[#023e60] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#63ac4c]" />
              <span>+91 77620 67143</span>
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="mailto:workwithsajid@zohomail.in"
              className="flex items-center gap-2 text-slate-700 hover:text-[#023e60] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#63ac4c]" />
              <span>workwithsajid@zohomail.in</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#63ac4c]" />
              <span>Mumbai, Maharashtra</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#63ac4c]" />
              <span>Mon–Sat: 11:00 AM – 7:00 PM IST</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200">
              <span className={`w-1.5 h-1.5 rounded-full ${istStatus.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
              <span className={istStatus.isOpen ? 'text-[#023e60]' : 'text-slate-600'}>{istStatus.statusText}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Quick Tap Ribbon */}
      <div className="bg-[#023e60] text-white text-[11px] py-1.5 px-4 md:hidden flex items-center justify-between">
        <a href="tel:+917762067143" className="flex items-center gap-1.5 font-medium hover:text-[#87b978]">
          <Phone className="w-3 h-3 text-[#63ac4c]" />
          <span>+91 77620 67143</span>
        </a>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-200">
            <span className={`w-1.5 h-1.5 rounded-full ${istStatus.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
            <span>{istStatus.isOpen ? 'Open Now (IST)' : 'Closed'}</span>
          </span>
          <span className="text-slate-400">·</span>
          <a
            href="https://wa.me/917762067143?text=Hello%20Sajid%20Tax%20Consultant,%20I%20would%20like%20to%20consult%20regarding%20tax%20and%20compliance%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#87b978] font-bold text-[10.5px]"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-20">
          
          {/* Brand Logo Lockup */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group whitespace-nowrap shrink min-w-0"
          >
            <CaLogo size="md" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-2xl font-bold tracking-tight text-[#023e60] truncate leading-tight m-0 p-0 font-inherit">
                Sajid Tax Consultant
              </h1>
              <div className="text-[9px] sm:text-[10.5px] uppercase font-semibold tracking-wider text-[#63ac4c] truncate">
                Tax · GST · Corporate Advisory · Mumbai
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links matching image_d7b86852.png */}
          <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-semibold text-slate-700">
            
            {/* Home */}
            <button
              onClick={() => {
                onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              Home
            </button>

            {/* About Us ▾ Dropdown */}
            <div
              ref={aboutDropdownRef}
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer flex items-center gap-1"
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#63ac4c]" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 z-50 w-56 animate-fadeIn">
                  <div className="bg-[#023e60] text-white rounded shadow-xl border border-[#0c5369] py-2 overflow-hidden">
                    <button
                      onClick={() => handleLinkClick('#/about/overview')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#0c5369] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>About Our Firm</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#87b978]" />
                    </button>
                    <button
                      onClick={() => handleLinkClick('#/about/core-values')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#0c5369] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Core Values</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#87b978]" />
                    </button>
                    <button
                      onClick={() => handleLinkClick('#/about/clients')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#0c5369] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Businesses We Assist</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#87b978]" />
                    </button>
                    <button
                      onClick={() => handleLinkClick('#/about/why-us')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#0c5369] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Why Choose Us</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#87b978]" />
                    </button>
                    <button
                      onClick={() => handleLinkClick('#/testimonials')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#0c5369] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Client Success Stories</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#87b978]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Services ▾ Dropdown matching image_d7b86852.png */}
            <div
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer flex items-center gap-1 text-[#023e60] font-bold"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#63ac4c]" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 z-50 w-72 animate-fadeIn">
                  <div className="bg-[#023e60] text-white rounded shadow-2xl border border-[#0c5369] py-2 overflow-hidden">
                    {DROPDOWN_SERVICES.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(item.serviceId)}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-100 hover:bg-[#0c5369] hover:text-white transition-colors flex items-center justify-between group cursor-pointer border-b border-white/5 last:border-b-0"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {item.title}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#87b978]" />
                      </button>
                    ))}
                    
                    <div className="pt-2 px-4 pb-1 border-t border-white/10 mt-1">
                      <button
                        onClick={() => handleLinkClick('#services')}
                        className="text-[11px] text-[#87b978] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All Services Directory →</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tax Calculator */}
            <button
              onClick={() => handleLinkClick('#tax-calculator')}
              className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer text-[#023e60] font-bold"
            >
              Tax Calculator
            </button>

            {/* Compliance Calendar */}
            <button
              onClick={() => handleLinkClick('#compliance-calendar')}
              className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              Due Dates
            </button>

            {/* Client Stories */}
            <button
              onClick={() => handleLinkClick('#testimonials')}
              className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              Client Stories
            </button>

            {/* FAQ */}
            <button
              onClick={() => handleLinkClick('#faq')}
              className="hover:text-[#63ac4c] transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop Contact Us Button matching image_ee4a46ce.png with Headset/Phone */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('#contact')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#023e60] hover:bg-[#0c5369] rounded transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <Headphones className="w-4 h-4 text-[#63ac4c]" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={onOpenConsultation}
              className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded shadow-xs"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#023e60] rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('#/about')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              About Us
            </button>
            
            {/* Mobile Services Accordion / List */}
            <div className="py-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#63ac4c] mb-2">
                Services
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-2 border-l-2 border-[#023e60]/20">
                {DROPDOWN_SERVICES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleServiceClick(s.serviceId)}
                    className="text-left py-1 text-xs text-slate-700 hover:text-[#023e60] font-medium"
                  >
                    • {s.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleLinkClick('#tax-calculator')}
              className="w-full text-left py-2 text-sm font-semibold text-[#023e60] flex items-center justify-between"
            >
              <span>FY 2025-26 Tax Calculator</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">New</span>
            </button>
            <button
              onClick={() => handleLinkClick('#compliance-calendar')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              Statutory Due Date Calendar
            </button>
            <button
              onClick={() => handleLinkClick('#diagnostic')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              Document Checklist &amp; Diagnostics
            </button>
            <button
              onClick={() => handleLinkClick('#testimonials')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              Client Stories
            </button>
            <button
              onClick={() => handleLinkClick('#faq')}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800"
            >
              FAQ
            </button>
            <button
              onClick={() => handleLinkClick('#contact')}
              className="w-full text-left py-2 text-sm font-semibold text-[#023e60]"
            >
              Contact Us
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] rounded shadow-xs"
            >
              Schedule Consultation
            </button>
            <a
              href="https://wa.me/917762067143?text=Hello%20Sajid%20Tax%20Consultant,%20I%20would%20like%20to%20consult%20regarding%20tax%20and%20compliance%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#023e60] rounded shadow-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
