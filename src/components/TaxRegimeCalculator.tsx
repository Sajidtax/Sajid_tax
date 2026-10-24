import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Sparkles, TrendingDown, DollarSign } from 'lucide-react';

interface TaxRegimeCalculatorProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const TaxRegimeCalculator: React.FC<TaxRegimeCalculatorProps> = ({ onOpenConsultation }) => {
  // Inputs
  const [grossIncome, setGrossIncome] = useState<number>(1200000);
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [hraExemption, setHraExemption] = useState<number>(60000);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0);
  const [npsContribution, setNpsContribution] = useState<number>(0);

  // Quick income presets
  const presets = [800000, 1200000, 1500000, 2000000, 3000000];

  // Old Regime Tax Computation
  const oldRegime = useMemo(() => {
    const stdDeduction = 50000;
    const capped80C = Math.min(150000, Math.max(0, sec80C));
    const capped80D = Math.min(50000, Math.max(0, sec80D));
    const cappedNps = Math.min(50000, Math.max(0, npsContribution));
    const cappedHomeLoan = Math.min(200000, Math.max(0, homeLoanInterest));
    const totalDeductions = stdDeduction + capped80C + capped80D + hraExemption + cappedHomeLoan + cappedNps;

    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    let tax = 0;

    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.20;
    } else {
      tax = 250000 * 0.05 + 500000 * 0.20 + (taxableIncome - 1000000) * 0.30;
    }

    // 87A Rebate for Old Regime (up to 5L taxable)
    if (taxableIncome <= 500000) {
      tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = Math.round(tax + cess);

    return {
      taxableIncome,
      taxBeforeCess: Math.round(tax),
      cess: Math.round(cess),
      totalTax,
      totalDeductions,
    };
  }, [grossIncome, sec80C, sec80D, hraExemption, homeLoanInterest, npsContribution]);

  // New Regime Tax Computation (FY 2024-25 / FY 2025-26 under Sec 115BAC)
  const newRegime = useMemo(() => {
    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, grossIncome - stdDeduction);
    let tax = 0;

    // Slabs:
    // 0-3L: Nil
    // 3L-7L: 5% (400,000 * 0.05 = 20,000)
    // 7L-10L: 10% (300,000 * 0.10 = 30,000)
    // 10L-12L: 15% (200,000 * 0.15 = 30,000)
    // 12L-15L: 20% (300,000 * 0.20 = 60,000)
    // >15L: 30%
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 700000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 20000 + (taxableIncome - 700000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 20000 + 30000 + (taxableIncome - 1000000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 20000 + 30000 + 30000 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 20000 + 30000 + 30000 + 60000 + (taxableIncome - 1500000) * 0.30;
    }

    // 87A Rebate for New Regime (taxable income <= 7,00,000 is Nil tax)
    if (taxableIncome <= 700000) {
      tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = Math.round(tax + cess);

    return {
      taxableIncome,
      taxBeforeCess: Math.round(tax),
      cess: Math.round(cess),
      totalTax,
      stdDeduction,
    };
  }, [grossIncome]);

  const diff = Math.abs(oldRegime.totalTax - newRegime.totalTax);
  const isNewBetter = newRegime.totalTax < oldRegime.totalTax;
  const isSame = newRegime.totalTax === oldRegime.totalTax;

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <section id="tax-calculator" className="py-16 sm:py-20 bg-white border-t border-slate-200/90 font-poppins relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive FY 2025-26 Tax Analyzer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            New vs Old Tax Regime Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Compare your exact statutory tax liability under Section 115BAC versus the traditional deduction regime. Find where you save more before filing.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Gross Annual Income */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span>Gross Annual CTC / Total Income</span>
                </label>
                <span className="text-base font-extrabold text-[#023e60] bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
                  {formatINR(grossIncome)}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="400000"
                max="5000000"
                step="50000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023e60]"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3">
                <span className="text-[11px] text-slate-500 font-medium">Quick Select:</span>
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setGrossIncome(p)}
                    className={`btn-luxury-tab px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                      grossIncome === p
                        ? 'bg-[#023e60] text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {p >= 10000000 ? `${p / 10000000}Cr` : `${p / 100000}L`}
                  </button>
                ))}
              </div>
            </div>

            {/* Deductions for Old Regime */}
            <div className="pt-4 border-t border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
                  Deductions Applicable Under Old Regime
                </h4>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  New Regime grants flat ₹75,000 std deduction
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 80C */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Section 80C (PPF/ELSS/EPF)
                    </label>
                    <span className="text-xs font-bold text-slate-900">{formatINR(sec80C)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    step="10000"
                    value={sec80C}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#63ac4c]"
                  />
                  <span className="text-[10px] text-slate-600 block mt-1">Capped at ₹1.5 Lakh</span>
                </div>

                {/* HRA */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      HRA Exemption Claimed
                    </label>
                    <span className="text-xs font-bold text-slate-900">{formatINR(hraExemption)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="400000"
                    step="10000"
                    value={hraExemption}
                    onChange={(e) => setHraExemption(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#63ac4c]"
                  />
                  <span className="text-[10px] text-slate-600 block mt-1">Rent receipts required</span>
                </div>

                {/* 80D */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Section 80D (Health Insurance)
                    </label>
                    <span className="text-xs font-bold text-slate-900">{formatINR(sec80D)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="5000"
                    value={sec80D}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#63ac4c]"
                  />
                  <span className="text-[10px] text-slate-600 block mt-1">Up to ₹50k with parents</span>
                </div>

                {/* Home Loan Interest 24b */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Home Loan Interest (Sec 24b)
                    </label>
                    <span className="text-xs font-bold text-slate-900">{formatINR(homeLoanInterest)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={homeLoanInterest}
                    onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#63ac4c]"
                  />
                  <span className="text-[10px] text-slate-600 block mt-1">Self-occupied property</span>
                </div>
              </div>
            </div>

            {/* Statutory Disclaimer */}
            <p className="text-[11px] text-slate-600 leading-relaxed pt-2">
              *Calculated with standard 4% Health & Education Cess. Surcharge applies for taxable incomes above ₹50 Lakhs. Consult our advisory desk for precise capital gains, business turnover (44AD/ADA), and foreign asset disclosures.
            </p>
          </div>

          {/* Right Column: Comparative Verdict Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Recommendation Highlight Banner */}
            <div
              className={`p-6 rounded-2xl border text-white shadow-lg transition-all ${
                isSame
                  ? 'bg-slate-800 border-slate-700'
                  : isNewBetter
                  ? 'bg-gradient-to-br from-[#023e60] to-emerald-800 border-emerald-600/40'
                  : 'bg-gradient-to-br from-slate-900 to-[#023e60] border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {isSame ? 'Both Regimes Identical' : 'Optimal Statutory Recommendation'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {isSame
                  ? 'Zero Difference'
                  : isNewBetter
                  ? `Save ${formatINR(diff)} in New Regime`
                  : `Save ${formatINR(diff)} in Old Regime`}
              </h3>

              <p className="text-xs text-slate-200/90 leading-relaxed font-normal">
                {isSame
                  ? 'Your income level qualifies for full statutory rebate under both regimes.'
                  : isNewBetter
                  ? `Under Section 115BAC, you benefit from lower slab tax rates and a flat ₹75,000 standard deduction without locking money in investments.`
                  : `Your high deduction claims (${formatINR(oldRegime.totalDeductions)}) outweigh the lower slabs of the new regime, giving you a better net take-home.`}
              </p>
            </div>

            {/* Side-by-Side Comparison Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Side-by-Side Tax Breakdown</span>
                <span className="text-xs text-slate-500 font-normal">AY 2026-27</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* New Regime Column */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isNewBetter
                      ? 'bg-emerald-50/60 border-emerald-400 ring-2 ring-emerald-400/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">New Regime</span>
                    {isNewBetter && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#023e60] mt-1">
                    {formatINR(newRegime.totalTax)}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                    <div>Taxable: {formatINR(newRegime.taxableIncome)}</div>
                    <div>Std Deduction: ₹75,000</div>
                    <div>4% Cess: {formatINR(newRegime.cess)}</div>
                  </div>
                </div>

                {/* Old Regime Column */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    !isNewBetter && !isSame
                      ? 'bg-emerald-50/60 border-emerald-400 ring-2 ring-emerald-400/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Old Regime</span>
                    {!isNewBetter && !isSame && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#023e60] mt-1">
                    {formatINR(oldRegime.totalTax)}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                    <div>Taxable: {formatINR(oldRegime.taxableIncome)}</div>
                    <div>Deductions: {formatINR(oldRegime.totalDeductions)}</div>
                    <div>4% Cess: {formatINR(oldRegime.cess)}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenConsultation('Income Tax Regime Planning & Return Filing')}
                className="w-full btn-luxury-tab py-3 px-4 rounded-xl bg-[#023e60] hover:bg-[#0c5369] text-white font-semibold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Request CA Tax Filing Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#63ac4c]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
