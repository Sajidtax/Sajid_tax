import React from 'react';
import {
  Building2,
  Calculator,
  Calendar,
  FileCheck2,
  Award,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PortalNavigationHubProps {
  onNavigate: (hash: string) => void;
}

export const PortalNavigationHub: React.FC<PortalNavigationHubProps> = ({ onNavigate }) => {
  const portals = [
    {
      hash: '#/about',
      title: 'About Our Firm & Credentials',
      badge: 'Chartered Practice',
      description:
        'Explore our firm profile, code of professional ethics, South Mumbai roots, and dedicated advisory team.',
      icon: Building2,
      actionText: 'Read Firm Profile',
      accentColor: 'from-[#023e60] to-[#0c5369]',
    },
    {
      hash: '#/tax-calculator',
      title: 'FY 2025-26 Tax Regime Analyzer',
      badge: 'Interactive Tool',
      description:
        'Compare your exact tax liability under Section 115BAC New Regime vs Old Deductions. See where you save.',
      icon: Calculator,
      actionText: 'Calculate Savings',
      accentColor: 'from-emerald-700 to-[#63ac4c]',
    },
    {
      hash: '#/compliance-calendar',
      title: 'Statutory Due Date Calendar',
      badge: 'GST • ITR • ROC',
      description:
        'Stay ahead of statutory deadlines for GSTR-1, GSTR-3B, TDS payments, Advance Tax, and MCA annual returns.',
      icon: Calendar,
      actionText: 'View Due Dates',
      accentColor: 'from-[#023e60] to-emerald-800',
    },
    {
      hash: '#/diagnostic',
      title: 'Document Checklist & Diagnostics',
      badge: 'Filing Preparations',
      description:
        'Instant requirement checklists for Private Limited incorporation, GST registration, and NRI tax returns.',
      icon: FileCheck2,
      actionText: 'Open Checklist',
      accentColor: 'from-slate-800 to-[#023e60]',
    },
    {
      hash: '#/testimonials',
      title: 'Client Success Stories',
      badge: 'Mumbai Track Record',
      description:
        'Verified case studies for enterprises in Zaveri Bazaar, BKC, Lower Parel, and Fort commercial hubs.',
      icon: Award,
      actionText: 'Read Case Studies',
      accentColor: 'from-amber-700 to-amber-600',
    },
    {
      hash: '#/faq',
      title: 'Advisory Knowledge Base & FAQ',
      badge: 'Statutory Answers',
      description:
        'Clear explanations on GST reconciliation notices, section 148A scrutiny, and annual compliance retainers.',
      icon: HelpCircle,
      actionText: 'Browse FAQs',
      accentColor: 'from-teal-800 to-emerald-700',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/80 border-t border-slate-200/90 font-poppins relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#023e60]/10 border border-[#023e60]/20 text-[#023e60] text-xs font-semibold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#023e60]" />
            <span>Dedicated Multi-Page Portals</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Advisory Portals &amp; Statutory Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto">
            Click into our dedicated pages for in-depth credentials, live tax calculation models, compliance calendars, and statutory filing checklists.
          </p>
        </div>

        {/* 6 Clean Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.hash}
                type="button"
                onClick={() => onNavigate(portal.hash)}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#63ac4c] p-6 text-left shadow-2xs hover:shadow-lg card-luxury-hover flex flex-col justify-between transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Top Accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity from-[#023e60] to-[#63ac4c]" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-[#023e60] group-hover:text-white group-hover:bg-[#023e60] flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#023e60] transition-colors leading-snug mb-2">
                    {portal.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                    {portal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#023e60] group-hover:text-[#63ac4c] transition-colors">
                  <span>{portal.actionText}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
