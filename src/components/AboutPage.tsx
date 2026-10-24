import React from 'react';
import { PageContainer } from './PageContainer';
import { AboutFirm } from './AboutFirm';
import { TrustApproach } from './TrustApproach';
import { WhoWeAssist } from './WhoWeAssist';
import { WhyChooseUs } from './WhyChooseUs';
import { Building2, ShieldCheck, Users, Award } from 'lucide-react';

export type AboutSubTab = 'overview' | 'values' | 'clients' | 'why-us';

interface AboutPageProps {
  activeSubTab: AboutSubTab;
  onSelectSubTab: (tab: AboutSubTab) => void;
  onNavigateHome: () => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  activeSubTab,
  onSelectSubTab,
  onNavigateHome,
  onOpenConsultation,
}) => {
  const tabs = [
    {
      id: 'overview' as const,
      label: 'Firm Overview',
      badge: 'Profile & Mission',
      icon: Building2,
    },
    {
      id: 'values' as const,
      label: 'Core Values & Ethics',
      badge: 'Chartered Standards',
      icon: ShieldCheck,
    },
    {
      id: 'clients' as const,
      label: 'Businesses We Assist',
      badge: 'MSME & Corporates',
      icon: Users,
    },
    {
      id: 'why-us' as const,
      label: 'Why Choose Us',
      badge: 'Mumbai Expertise',
      icon: Award,
    },
  ];

  const currentTabObj = tabs.find((t) => t.id === activeSubTab) || tabs[0];

  return (
    <PageContainer
      breadcrumbs={[
        { label: 'About Us', onClick: () => onSelectSubTab('overview') },
        { label: currentTabObj.label },
      ]}
      badge="About Sajid Tax Consultant"
      title="Trusted Financial & Tax Advisory in Mumbai"
      subtitle="Discover our professional credentials, code of ethics, practice areas, and dedication to safeguarding our clients against statutory liabilities."
      onNavigateHome={onNavigateHome}
    >
      {/* Nested Drill-Down Subnavigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 sm:p-2.5 shadow-xs mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectSubTab(tab.id)}
                className={`btn-luxury-tab p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'bg-[#023e60] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/15 text-[#63ac4c]' : 'bg-white text-[#023e60] shadow-2xs'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {tab.label}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {tab.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nested Tab Content Views */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {activeSubTab === 'overview' && (
          <div className="p-2 sm:p-4">
            <AboutFirm onOpenConsultation={onOpenConsultation} />
          </div>
        )}

        {activeSubTab === 'values' && (
          <div className="p-2 sm:p-4">
            <TrustApproach />
          </div>
        )}

        {activeSubTab === 'clients' && (
          <div className="p-2 sm:p-4">
            <WhoWeAssist />
          </div>
        )}

        {activeSubTab === 'why-us' && (
          <div className="p-2 sm:p-4">
            <WhyChooseUs />
          </div>
        )}
      </div>

      {/* Bottom Consultation CTA */}
      <div className="mt-8 bg-gradient-to-r from-[#023e60] to-[#0c5369] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">
            Ready to Consult with Our Senior Tax Advisory Desk?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            Book a confidential in-person consultation at our Opera House office or request digital assistance via WhatsApp.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenConsultation}
          className="btn-luxury-tab px-6 py-3 rounded-xl bg-[#63ac4c] hover:bg-[#52993d] text-white font-bold text-xs uppercase tracking-wider shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
        >
          Schedule Consultation
        </button>
      </div>
    </PageContainer>
  );
};
