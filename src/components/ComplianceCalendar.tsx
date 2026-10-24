import React, { useState, useMemo } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Search, ShieldAlert, ArrowUpRight, Filter } from 'lucide-react';

interface ComplianceEvent {
  id: string;
  title: string;
  category: 'GST' | 'Income Tax' | 'ROC' | 'TDS';
  dueDateText: string;
  frequency: string;
  authority: string;
  description: string;
  penaltyNotice: string;
  isUrgent?: boolean;
}

const STATUTORY_DEADLINES: ComplianceEvent[] = [
  {
    id: 'gstr-1-monthly',
    title: 'GSTR-1 (Monthly Outward Supplies)',
    category: 'GST',
    dueDateText: '11th of Every Month',
    frequency: 'Monthly (Turnover > ₹5 Cr or Monthly Option)',
    authority: 'GSTN / CBIC',
    description: 'Mandatory reporting of all outward sales and B2B invoices to allow buyers to claim Input Tax Credit (ITC).',
    penaltyNotice: 'Late fee ₹50/day (₹20 for Nil return) + buyer credit freeze',
    isUrgent: true,
  },
  {
    id: 'tds-deposit',
    title: 'TDS & TCS Challan 281 Deposit',
    category: 'TDS',
    dueDateText: '7th of Every Month',
    frequency: 'Monthly (Previous month deductions)',
    authority: 'Income Tax Department',
    description: 'Deposit of tax deducted at source from contractor payments (194C), professional fees (194J), rent (194I), and salaries (192).',
    penaltyNotice: 'Interest penalty at 1.5% per month for late deposit',
    isUrgent: true,
  },
  {
    id: 'gstr-3b-monthly',
    title: 'GSTR-3B (Monthly Summary & Tax Settlement)',
    category: 'GST',
    dueDateText: '20th of Every Month',
    frequency: 'Monthly',
    authority: 'GSTN / CBIC',
    description: 'Summary return for declaring net tax liability after claiming eligible ITC and cash ledger settlements.',
    penaltyNotice: 'Late fee up to ₹50/day + 18% annual interest on delayed tax liability',
    isUrgent: true,
  },
  {
    id: 'advance-tax-q4',
    title: 'Advance Tax Final Installment (100%)',
    category: 'Income Tax',
    dueDateText: '15th March',
    frequency: 'Quarterly (Final Installment of Fiscal Year)',
    authority: 'Central Board of Direct Taxes (CBDT)',
    description: 'Mandatory advance tax payment for taxpayers whose estimated annual tax liability exceeds ₹10,000.',
    penaltyNotice: 'Interest mandatory under Section 234B & 234C if shortfall exceeds 10%',
    isUrgent: true,
  },
  {
    id: 'advance-tax-q1',
    title: 'Advance Tax First Installment (15%)',
    category: 'Income Tax',
    dueDateText: '15th June',
    frequency: 'Quarterly',
    authority: 'CBDT',
    description: 'First installment of advance tax liability for companies and self-employed individuals.',
    penaltyNotice: 'Interest under Section 234C on installment default',
  },
  {
    id: 'tds-q4-return',
    title: 'Quarterly TDS Return Filing (Form 24Q / 26Q)',
    category: 'TDS',
    dueDateText: '31st May (Q4) / 31st July (Q1)',
    frequency: 'Quarterly',
    authority: 'TRACES / Income Tax Department',
    description: 'Quarterly statement of tax deducted for salary and non-salary deductees to generate Form 16 / 16A.',
    penaltyNotice: 'Late fee ₹200/day under Section 234E until return is filed',
  },
  {
    id: 'itr-non-audit',
    title: 'Annual Income Tax Return (Non-Audit Cases)',
    category: 'Income Tax',
    dueDateText: '31st July',
    frequency: 'Annual',
    authority: 'Income Tax Department',
    description: 'Statutory ITR-1, ITR-2, and ITR-4 filing for salaried individuals, freelancers, HUFs, and non-audit business entities.',
    penaltyNotice: 'Late filing fee up to ₹5,000 u/s 234F + loss of carry-forward benefits',
  },
  {
    id: 'tax-audit-report',
    title: 'Tax Audit Report (Form 3CA / 3CD)',
    category: 'Income Tax',
    dueDateText: '30th September',
    frequency: 'Annual',
    authority: 'CBDT',
    description: 'Statutory audit certification by a practicing Chartered Accountant for businesses exceeding turnover thresholds (₹1Cr / ₹10Cr digital).',
    penaltyNotice: 'Penalty of 0.5% of turnover (up to ₹1,50,000) under Section 271B',
  },
  {
    id: 'corporate-itr',
    title: 'Corporate & Audit Entity ITR Filing',
    category: 'Income Tax',
    dueDateText: '31st October',
    frequency: 'Annual',
    authority: 'Income Tax Department',
    description: 'ITR-6 for Private Limited companies and ITR-5 for audited partnership firms and LLPs.',
    penaltyNotice: 'Late fee + interest on unpaid statutory balances',
  },
  {
    id: 'roc-aoc-4',
    title: 'ROC Form AOC-4 (Financial Statements)',
    category: 'ROC',
    dueDateText: 'Within 30 Days of AGM (Typically 30th Oct)',
    frequency: 'Annual',
    authority: 'Ministry of Corporate Affairs (MCA)',
    description: 'Filing of audited balance sheet, profit and loss account, directors report, and auditor notes with the Registrar of Companies.',
    penaltyNotice: 'Hefty late fee of ₹100 per day without any upper cap',
  },
  {
    id: 'roc-mgt-7',
    title: 'ROC Form MGT-7 / 7A (Annual Return)',
    category: 'ROC',
    dueDateText: 'Within 60 Days of AGM (Typically 29th Nov)',
    frequency: 'Annual',
    authority: 'MCA',
    description: 'Annual return capturing shareholding structure, directorship changes, board meetings, and corporate transfers.',
    penaltyNotice: 'Statutory late fee of ₹100/day + company status marked inactive',
  },
  {
    id: 'gstr-9-annual',
    title: 'GSTR-9 & 9C (Annual GST Return & Reconciliation)',
    category: 'GST',
    dueDateText: '31st December',
    frequency: 'Annual',
    authority: 'GSTN / CBIC',
    description: 'Consolidated annual return reconciling financial books with GSTR-1 and GSTR-3B filings for the financial year.',
    penaltyNotice: 'Late fee ₹200/day up to a maximum of 0.5% of turnover in state',
  },
];

export const ComplianceCalendar: React.FC<{
  onOpenConsultation: (serviceTitle?: string) => void;
}> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'GST', 'Income Tax', 'ROC', 'TDS'];

  const filteredEvents = useMemo(() => {
    return STATUTORY_DEADLINES.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dueDateText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="compliance-calendar" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/90 font-poppins relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#023e60]/10 border border-[#023e60]/20 text-[#023e60] text-xs font-semibold tracking-wide uppercase mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#023e60]" />
              <span>Statutory Compliance Tracker • India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tax &amp; ROC Due Date Calendar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Stay ahead of critical statutory deadlines. Our desk monitors, files, and reconciles all GST, TDS, ITR, and MCA compliances to ensure zero penalty notices.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deadline (e.g. GSTR-3B)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#023e60] shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? STATUTORY_DEADLINES.length
                : STATUTORY_DEADLINES.filter((d) => d.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn-luxury-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#023e60] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deadlines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md card-luxury-hover flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  item.category === 'GST'
                    ? 'bg-[#63ac4c]'
                    : item.category === 'Income Tax'
                    ? 'bg-[#023e60]'
                    : item.category === 'ROC'
                    ? 'bg-amber-500'
                    : 'bg-purple-600'
                }`}
              />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      item.category === 'GST'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        : item.category === 'Income Tax'
                        ? 'bg-[#023e60]/10 text-[#023e60] border border-[#023e60]/20'
                        : item.category === 'ROC'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        : 'bg-purple-50 text-purple-800 border border-purple-200/60'
                    }`}
                  >
                    {item.category}
                  </span>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.authority}
                  </span>
                </div>

                {/* Due Date Badge */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#023e60]" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.dueDateText}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
                    {item.frequency}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#023e60] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>
              </div>

              {/* Penalty Notice & Action Button */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/60">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-tight font-medium">{item.penaltyNotice}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(`Compliance Assistance for ${item.title}`)}
                  className="w-full btn-luxury-tab py-2 px-3 rounded-lg bg-white border border-[#023e60]/30 hover:bg-[#023e60] text-[#023e60] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <span>Delegate Filing to Our Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#63ac4c] flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                Annual Retainership Compliance Management
              </div>
              <div className="text-xs text-slate-500 font-normal">
                Let our Chartered team handle all monthly, quarterly, and annual return calendars under a single fixed fee retainership.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultation('Annual Corporate Compliance Retainership')}
            className="btn-luxury-tab px-5 py-2.5 rounded-xl bg-[#023e60] hover:bg-[#0c5369] text-white font-semibold text-xs uppercase tracking-wider shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
          >
            Inquire About Retainership
          </button>
        </div>

      </div>
    </section>
  );
};
