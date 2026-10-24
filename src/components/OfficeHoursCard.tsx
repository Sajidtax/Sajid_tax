import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { getISTStatus } from '../utils/istTime';
import { ISTStatus } from '../types';

interface OfficeHoursCardProps {
  variant?: 'compact' | 'detailed' | 'footer';
  className?: string;
}

export const OfficeHoursCard: React.FC<OfficeHoursCardProps> = ({ variant = 'detailed', className = '' }) => {
  const [status, setStatus] = useState<ISTStatus>(getISTStatus());

  useEffect(() => {
    // Recalculate every 15 seconds to keep IST status accurate without burning CPU
    const interval = setInterval(() => {
      setStatus(getISTStatus());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const scheduleDays = [
    { day: 'Monday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Tuesday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Wednesday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Thursday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Friday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Saturday', hours: '11:00 AM – 7:00 PM IST', isClosed: false },
    { day: 'Sunday', hours: 'Closed', isClosed: true },
  ];

  if (variant === 'compact') {
    return (
      <div className={`p-3 rounded border border-slate-200 bg-white font-poppins shadow-xs ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#023e60]" />
            <span className="text-xs font-semibold text-slate-800">Office Hours:</span>
            <span className="text-xs text-slate-600">Mon–Sat 11:00 AM – 7:00 PM IST</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold">
            <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
            <span className={status.isOpen ? 'text-[#023e60]' : 'text-slate-600'}>
              {status.statusText}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 font-poppins ${className}`}>
        <div className="flex items-center justify-between text-xs text-slate-200 border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5 text-white">
            <Clock className="w-3.5 h-3.5 text-[#63ac4c]" />
            <span className="font-semibold text-white">Office Schedule (IST)</span>
          </div>
          <span className="text-[11px] font-semibold text-[#87b978]">
            {status.formattedTimeIST}
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-slate-200">
            <span>Monday – Saturday:</span>
            <span className="text-white font-semibold">11:00 AM – 7:00 PM</span>
          </div>
          <div className="flex justify-between items-center text-rose-300">
            <span>Sunday:</span>
            <span className="font-semibold text-rose-400">Closed</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-[#63ac4c]' : 'bg-slate-400'}`} />
            <span className={status.isOpen ? 'text-[#87b978] font-semibold' : 'text-slate-400'}>
              {status.statusText}
            </span>
          </div>
          <span className="text-slate-300 truncate max-w-[170px]" title={status.subText}>
            {status.subText}
          </span>
        </div>
      </div>
    );
  }

  // Detailed Card (Used in Contact Section)
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-6 sm:p-7 shadow-sm font-poppins ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#023e60]" />
            <h4 className="text-sm font-bold tracking-wide uppercase text-[#023e60]">
              Official Working Schedule
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Indian Standard Time (UTC+05:30) · Mumbai
          </p>
        </div>

        {/* Live IST indicator */}
        <div className="flex items-center gap-2.5 bg-[#f0f7f2] border border-[#cadbe8] px-3.5 py-1.5 rounded shrink-0">
          <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
          <div className="text-left">
            <div className={`text-xs font-bold leading-none ${status.isOpen ? 'text-[#023e60]' : 'text-slate-700'}`}>
              {status.statusText}
            </div>
            <div className="text-[10.5px] text-slate-600 leading-none mt-1 font-semibold">
              {status.formattedTimeIST}
            </div>
          </div>
        </div>
      </div>

      {/* Weekday Breakdown */}
      <div className="mt-4 space-y-1">
        <div className="grid grid-cols-1 divide-y divide-slate-100 text-xs">
          {scheduleDays.map((item) => {
            const isToday = status.currentDayName === item.day;
            return (
              <div
                key={item.day}
                className={`flex items-center justify-between py-2 px-2 rounded transition-colors ${
                  isToday ? 'bg-[#eef5fa] font-semibold' : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isToday ? 'text-[#023e60] font-bold' : 'text-slate-700'}>
                    {item.day}
                  </span>
                  {isToday && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 text-[#023e60] bg-white rounded border border-[#023e60]/20">
                      Today
                    </span>
                  )}
                </div>

                <div>
                  {item.isClosed ? (
                    <span className="text-rose-600 font-bold px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                      Closed
                    </span>
                  ) : (
                    <span className="text-slate-800 font-medium">
                      {item.hours}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-[#023e60] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="text-slate-800 font-semibold">{status.subText}</span>. Prior appointment is recommended for in-person consultation.
        </p>
      </div>
    </div>
  );
};
