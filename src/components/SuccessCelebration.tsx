import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
  shape: 'rect' | 'circle' | 'ribbon';
  duration: number;
  delay: number;
}

const LUXURY_COLORS = [
  '#023e60', // Deep Marine Navy
  '#63ac4c', // Firm Emerald Green
  '#c5a059', // Luxury Champagne Gold
  '#d4af37', // Pure Gold
  '#0c5369', // Deep Teal
  '#10b981', // Vivid Emerald
  '#e2e8f0', // Crisp Silver
];

export const SuccessCelebration: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({
  title = 'Inquiry Received Successfully',
  subtitle = 'Our advisory desk has logged your brief and will coordinate with you shortly.',
}) => {
  // Generate a burst of 36 festive luxury confetti pieces
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      // Angle in radians distributed around 360 degrees
      const angle = (i / 36) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 60 + Math.random() * 110;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 30; // slightly biased upwards
      return {
        id: i,
        x,
        y,
        scale: 0.6 + Math.random() * 0.7,
        rotation: Math.random() * 720 - 360,
        color: LUXURY_COLORS[i % LUXURY_COLORS.length],
        shape: (['rect', 'circle', 'ribbon'] as const)[i % 3],
        duration: 0.9 + Math.random() * 0.5,
        delay: Math.random() * 0.15,
      };
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-6 px-4 overflow-hidden">
      {/* Confetti Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: p.x,
              y: p.y + 25, // gentle gravity drop
              scale: [0, p.scale, p.scale * 0.9, 0],
              rotate: p.rotation,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
            style={{
              width: p.shape === 'ribbon' ? '12px' : p.shape === 'rect' ? '8px' : '7px',
              height: p.shape === 'ribbon' ? '5px' : p.shape === 'rect' ? '8px' : '7px',
              borderRadius: p.shape === 'circle' ? '9999px' : p.shape === 'ribbon' ? '2px' : '1px',
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Ripple Wave Background */}
      <div className="relative mb-5 z-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', repeat: 1, repeatDelay: 0.3 }}
          className="absolute inset-0 rounded-full bg-[#63ac4c]/20"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-[#023e60]/15"
        />

        {/* Animated Checkmark Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: 0.05,
          }}
          className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#023e60] via-[#0b5443] to-[#63ac4c] p-[3px] shadow-xl shadow-emerald-900/15 flex items-center justify-center relative"
        >
          {/* Inner Badge Surface */}
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
            {/* Subtle radial sheen */}
            <div className="absolute inset-0 bg-radial from-emerald-50 via-white to-white pointer-events-none" />

            <svg
              className="w-9 h-9 sm:w-10 sm:h-10 text-[#63ac4c] relative z-10"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer seal circle */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="#63ac4c"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />

              {/* Checkmark stroke */}
              <motion.path
                d="M14 24.5L21 31.5L34 17.5"
                stroke="#023e60"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Animated Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="relative z-10 space-y-1.5 max-w-md mx-auto"
      >
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#023e60] tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};
