import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, FileCheck, ArrowRight, UserCheck, Briefcase, Rocket, Store, MessageSquare } from 'lucide-react';

export const QuickTaxPlanner: React.FC<{ onOpenConsultation: (serviceTitle?: string) => void }> = ({
  onOpenConsultation,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const scenarios = [
    {
      id: 0,
      title: 'Salaried Individual & Investor',
      shortLabel: 'Salaried / Investor',
      icon: UserCheck,
      applicableFiling: 'ITR-1 or ITR-2 (with Capital Gains)',
      frequency: 'Annual statutory deadline: July 31st',
      checklist: [
        'Form 16 (Part A & B from all employers in the fiscal year)',
        'Annual Information Statement (AIS) & Form 26AS',
        'Consolidated Capital Gains statements from broker/mutual funds',
        'Bank statements for all active savings accounts',
      ],
      keyTip: 'We compute tax under both Old & New regimes so you select the lower liability.',
      ctaService: 'Income Tax Return (ITR) Filing',
    },
    {
      id: 1,
      title: 'Freelancer, Creator or Consultant',
      shortLabel: 'Freelancer / Consultant',
      icon: Briefcase,
      applicableFiling: 'ITR-4 / ITR-3 + GST for Export/Domestic',
      frequency: 'Quarterly Advance Tax + Annual ITR',
      checklist: [
        'Gross receipts summary / invoices issued to clients',
        'Inward remittance Foreign Inward Remittance Certificates (FIRC) if exporting',
        'Bank statements showing client payments',
        'PAN & Aadhaar details',
      ],
      keyTip: 'Eligible professionals can declare 50% profit under Section 44ADA without maintaining detailed books.',
      ctaService: 'Income Tax Return (ITR) Filing',
    },
    {
      id: 2,
      title: 'New Startup / Business Founder',
      shortLabel: 'New Startup / Incorporation',
      icon: Rocket,
      applicableFiling: 'MCA SPICe+ (Pvt Ltd / LLP) + Udyam + PAN/TAN',
      frequency: 'One-time Incorporation + Annual RoC Compliance',
      checklist: [
        'PAN & Aadhaar of all proposed directors/partners',
        'Bank statements or utility bills of directors (under 2 months old)',
        'Registered office electricity bill + NOC from property owner',
        'Passport size photos and active mobile/email IDs',
      ],
      keyTip: 'Udyam MSME certificate provides 50% government fee discount on trademark registration.',
      ctaService: 'Private Limited Company Registration',
    },
    {
      id: 3,
      title: 'Retail Store, Wholesaler or Trader',
      shortLabel: 'Shop / Merchant / Trader',
      icon: Store,
      applicableFiling: 'Gumasta / Shop & Establishment + Monthly GST',
      frequency: 'Monthly GSTR-1 & 3B + Municipal Licensing',
      checklist: [
        'Commercial premises lease agreement or ownership documents',
        'Electricity bill of the shop/office',
        'Photo of premises signboard in Marathi (Devanagari) script',
        'Sales and purchase invoice registers with tax breakups',
      ],
      keyTip: 'Gumasta receipt is mandatory for opening commercial current accounts with Mumbai banks.',
      ctaService: 'Gumasta / Shop and Establishment Services',
    },
  ];

  const current = scenarios[selectedScenario];
  const whatsappUrl = `https://wa.me/917762067143?text=${encodeURIComponent(
    `Hello Sajid Tax Consultant, I am reviewing my compliance requirements for: ${current.title}. Please guide me on next steps.`
  )}`;

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc] border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block">
            Compliance Planner
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            Check Your Required Documents & Filings
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-3 rounded-full" />
          <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3">
            Select your business or individual scenario below to verify the exact forms, statutory deadlines, and required records before filing.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-200 rounded max-w-4xl mx-auto mb-8">
          {scenarios.map((scen) => {
            const Icon = scen.icon;
            const isActive = selectedScenario === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenario(scen.id)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded btn-luxury-tab cursor-pointer ${
                  isActive
                    ? 'bg-[#023e60] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#63ac4c]' : 'text-slate-500'}`} />
                <span className="truncate">{scen.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scenario Result Card */}
        <motion.div
          key={selectedScenario}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="max-w-4xl mx-auto bg-white rounded border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#63ac4c]">
                Filing Profile
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#023e60] mt-0.5">
                {current.title}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">Applicable Filing:</span>
              <span className="text-xs font-bold text-[#023e60]">{current.applicableFiling}</span>
            </div>
          </div>

          {/* Checklist & Key Advice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Document Checklist (7 cols) */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <FileCheck className="w-4 h-4 text-[#023e60]" />
                <span>Essential Documents Required</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {current.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded bg-[#f8fafc] border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#63ac4c] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Key Insight & Action (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 rounded bg-[#eef5fa] border border-[#cadbe8] space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#023e60] font-bold">
                  Expert Advisory Tip
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {current.keyTip}
                </p>
                <div className="pt-2 text-[11px] text-[#023e60] font-semibold">
                  Timing: {current.frequency}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss On WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenConsultation(current.ctaService)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#023e60] bg-slate-100 hover:bg-slate-200 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
