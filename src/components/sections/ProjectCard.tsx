'use client';

import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { useCursorStore } from '@/store/cursor.store';

export function ProjectCard({ type, year, title, description, stack, link, featured }: Project) {
  const { setHovered, setLabel } = useCursorStore();

  const handleMouseEnter = () => {
    setHovered(true);
    setLabel('View →');
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setLabel('');
  };

  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link
    ? { href: link, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      data-cursor-label="View →"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border-sm transition-all duration-500 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5',
        link && 'cursor-pointer',
        featured
          ? 'col-span-full bg-gradient-to-br from-[#141420] via-[#161625] to-[#1a1a2e] p-8 md:p-12 border-accent/15'
          : 'bg-surface-1/80 backdrop-blur-sm p-8'
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/5 group-hover:to-purple-500/5 transition-all duration-700" />

      {/* Top animated line */}
      <div className="absolute top-0 left-0 w-full h-[2px]">
        <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-accent via-purple-400 to-accent transition-all duration-700" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 rounded-tr-lg" />
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-accent/20" />
        <div className="absolute top-0 right-0 h-8 w-[1px] bg-accent/20" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/10 via-transparent to-purple-500/10 blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {type}
            </span>
            <span className="text-xs text-text-3 font-mono">{year}</span>
          </div>
          {link && (
            <div className="flex items-center gap-1 text-text-3 text-xs font-mono group-hover:text-accent transition-colors">
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </div>
          )}
        </div>

        <h3 className={cn(
          'font-syne font-bold text-text-1 mb-4 leading-tight group-hover:text-accent transition-colors duration-300 text-wrap-balance',
          featured ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl'
        )}>
          {title}
        </h3>

        <p className={cn(
          'text-text-2 mb-8 font-light leading-relaxed text-wrap-balance',
          featured ? 'text-lg md:text-xl max-w-2xl' : 'text-sm max-w-lg'
        )}>
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 pb-6">
            {stack.map((item) => (
              <span
                key={item}
                className="px-3.5 py-2 text-[11px] font-medium bg-white/[0.03] text-text-2 border border-white/[0.06] rounded-lg group-hover:border-accent/20 group-hover:bg-accent/5 group-hover:text-accent/80 transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>

          {link && (
            <div className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
