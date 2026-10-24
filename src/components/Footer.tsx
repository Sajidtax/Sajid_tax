import React from 'react';
import { MapPin, ArrowUp, Phone, Mail, Clock } from 'lucide-react';
import { OfficeHoursCard } from './OfficeHoursCard';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategoryId } from '../types';
import { CaLogo } from './CaLogo';

interface FooterProps {
  onSelectCategory: (catId: ServiceCategoryId) => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrivacy,
  onOpenDisclaimer,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#10255a] to-[#0c5369] text-[#cad5d9] font-poppins text-xs border-t border-[#023e60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block bg-white px-4 py-2 rounded shadow-sm">
              <div className="flex items-center gap-2.5">
                <CaLogo size="sm" />
                <div>
                  <div className="text-base font-bold text-[#023e60] leading-none">
                    Sajid Tax Consultant
                  </div>
                  <div className="text-[9.5px] uppercase font-semibold text-[#63ac4c] mt-0.5">
                    Tax & Corporate Advisory · Mumbai
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#cad5d9] leading-relaxed font-normal">
              Premier tax, GST, business registration, and ROC compliance advisory for individuals, emerging founders, and corporate enterprises. Grounded in statutory accuracy and personalized professional service.
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold pb-1 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#/about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#/about/core-values" className="hover:text-white transition-colors">Our Core Values</a>
              </li>
              <li>
                <a href="#/about/clients" className="hover:text-white transition-colors">Businesses We Serve</a>
              </li>
              <li>
                <a href="#/about/why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#/testimonials" className="hover:text-white transition-colors">Client Stories</a>
              </li>
              <li>
                <a href="#/tax-calculator" className="hover:text-white transition-colors">FY 2025-26 Tax Calculator</a>
              </li>
              <li>
                <a href="#/compliance-calendar" className="hover:text-white transition-colors">Statutory Due Dates</a>
              </li>
              <li>
                <a href="#/diagnostic" className="hover:text-white transition-colors">Document Checklist</a>
              </li>
              <li>
                <a href="#/contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Practice Areas Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold pb-1 border-b border-white/10">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.querySelector('#services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer text-[#cad5d9]"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
              <li>
                <a href="tel:+917762067143" className="text-[#87b978] font-semibold hover:underline">
                  In-Person Advisory Desk →
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours & Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold pb-1 border-b border-white/10">
              Working Hours
            </h4>
            <OfficeHoursCard variant="footer" />
          </div>

        </div>

        {/* Back to top row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#87b978] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11.5px] text-[#a8a4a4]">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Sajid Tax Consultant, Mumbai. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Client Confidentiality & Privacy
            </button>
            <span>·</span>
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Statutory Advisory Notice
            </button>
          </div>

          {/* Requested Designer & Developer Credit */}
          <div className="text-center md:text-right text-[11px] text-[#cad5d9] pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto">
            <span>Designed, Developed &amp; Maintained by </span>
            <span className="text-white font-semibold hover:text-[#87b978] transition-colors underline decoration-[#63ac4c] underline-offset-2">
              Sajid Web Solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
