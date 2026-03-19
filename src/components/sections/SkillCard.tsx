'use client';

import { useRef } from 'react';
import { Skill } from '@/types';
import { cn } from '@/lib/utils';

// Note: internal bar animation is handled by staggered ScrollTrigger in parent Skills.tsx

export function SkillCard({ name, level, info, color, tags }: Skill) {
  // colorMap used for border accent on hover and glow effects
  const colorMap = {
    accent: {
      border: 'group-hover:border-accent/40',
      glow: 'group-hover:shadow-[0_0_30px_rgba(123,110,246,0.15)]',
      text: 'group-hover:text-accent',
      dot: 'bg-accent',
    },
    green: {
      border: 'group-hover:border-green/40',
      glow: 'group-hover:shadow-[0_0_30px_rgba(62,217,164,0.15)]',
      text: 'group-hover:text-green',
      dot: 'bg-green',
    },
    amber: {
      border: 'group-hover:border-amber/40',
      glow: 'group-hover:shadow-[0_0_30px_rgba(240,168,84,0.15)]',
      text: 'group-hover:text-amber',
      dot: 'bg-amber',
    },
    red: {
      border: 'group-hover:border-red/40',
      glow: 'group-hover:shadow-[0_0_30px_rgba(240,96,112,0.15)]',
      text: 'group-hover:text-red',
      dot: 'bg-red',
    },
  };

  const colors = colorMap[color];

  return (
    <div
      data-magnetic
      className={cn(
        'group relative p-6 bg-surface-1 border border-border-sm rounded-2xl hover:bg-surface-2 transition-all duration-500 overflow-hidden',
        colors.border,
        colors.glow
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {/* Animated dot indicator */}
          <div className="relative">
            <div className={cn('w-2 h-2 rounded-full', colors.dot)} />
            <div className={cn('absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-30', colors.dot)} />
          </div>
          <h3 className={cn('text-lg font-syne font-bold text-text-1 transition-colors duration-300', colors.text)}>{name}</h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] text-text-3 font-mono uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md">
            {level}
          </span>
        </div>

        <p className="text-sm text-text-2 font-light leading-relaxed mb-6">
          {info}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[11px] bg-white/5 border border-white/5 text-text-2 rounded-lg group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
