import React from 'react';
import { motion } from 'motion/react';
import {
  Laptop,
  HeartPulse,
  HardHat,
  GraduationCap,
  Landmark,
  PlaneTakeoff,
  ShoppingBag,
  Building,
  Truck,
  Film,
  Factory,
  Briefcase,
  UserCheck,
  Globe2,
  Store,
  Users
} from 'lucide-react';

export const WhoWeAssist: React.FC = () => {
  const industries = [
    { name: 'Information Technology', icon: Laptop, desc: 'SaaS, Software Developers, IT Consultants' },
    { name: 'Pharmaceuticals & Healthcare', icon: HeartPulse, desc: 'Clinics, Pharmacies, Diagnostic Centers' },
    { name: 'Engineering & Infra Services', icon: HardHat, desc: 'Contractors, Architecture, Turnkey Projects' },
    { name: 'Education Sector', icon: GraduationCap, desc: 'Institutions, Coaching Centers, EdTech' },
    { name: 'Banking & Financial Services', icon: Landmark, desc: 'Fintech, Loan Syndication, Wealth Planners' },
    { name: 'Import & Export', icon: PlaneTakeoff, desc: 'IEC Holders, International Trade, Remittances' },
    { name: 'E-Commerce & Retail', icon: ShoppingBag, desc: 'Online Sellers, Marketplace Vendors, D2C' },
    { name: 'Real Estate & Construction', icon: Building, desc: 'Developers, Agents, Property Managers' },
    { name: 'Logistics Services', icon: Truck, desc: 'Transporters, Warehousing, Supply Chain' },
    { name: 'Media & Entertainment', icon: Film, desc: 'Production Studios, Creators, Advertising' },
    { name: 'Manufacturing & Trading', icon: Factory, desc: 'Industrial Units, Wholesalers, Distributors' },
    { name: 'MSME & Startups', icon: Briefcase, desc: 'New Ventures, Seed-Stage Companies, Udyam' },
    { name: 'HNI Advisory', icon: UserCheck, desc: 'High Net-Worth Families, Capital Gains' },
    { name: 'NRI Client Advisory', icon: Globe2, desc: 'Cross-Border Taxes, 15CA/CB, Indian Assets' },
    { name: 'Self-Employed Professionals', icon: Users, desc: 'Doctors, Lawyers, Architects, Freelancers' },
    { name: 'Local Retailers & Shops', icon: Store, desc: 'Mumbai Gumasta, Commercial Stores, Dealers' },
  ];

  return (
    <section id="industries" className="py-16 lg:py-24 bg-white border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching jainanuragassociates.com: text-center blue */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block mb-2">
            Diverse Sector Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            Businesses We Serve
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
            From emerging startups and retail merchants to corporate enterprises and high-net-worth individuals, we deliver specialized statutory advisory across sectors.
          </p>
        </div>

        {/* Industry Grid matching reference website */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="bg-white rounded-lg p-3.5 sm:p-5 border border-slate-200/90 hover:border-[#63ac4c] hover:shadow-md card-luxury-hover text-center flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#023e60] group-hover:bg-[#023e60] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs mb-2.5 sm:mb-3 border border-slate-100">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#63ac4c] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#023e60] mb-1 leading-snug line-clamp-2">
                  {ind.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
