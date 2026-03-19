'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Zap, Bot, Palette, Code2, Database, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROLE_ICONS = {
  zap: Zap,
  bot: Bot,
  palette: Palette,
};

interface RoleCardProps {
  icon: 'zap' | 'bot' | 'palette';
  title: string;
  description: string;
  accentColor?: string;
}

function RoleCard({ icon, title, description, accentColor = 'accent' }: RoleCardProps) {
  const Icon = ROLE_ICONS[icon];

  const colorClasses = {
    accent: {
      wrapper: 'group-hover:bg-accent/10',
      icon: 'text-accent group-hover:text-accent',
      border: 'group-hover:border-accent/30',
      glow: 'group-hover:shadow-[0_0_30px_rgba(123,110,246,0.1)]',
    },
    green: {
      wrapper: 'group-hover:bg-green/10',
      icon: 'text-green group-hover:text-green',
      border: 'group-hover:border-green/30',
      glow: 'group-hover:shadow-[0_0_30px_rgba(62,217,164,0.1)]',
    },
    amber: {
      wrapper: 'group-hover:bg-amber/10',
      icon: 'text-amber group-hover:text-amber',
      border: 'group-hover:border-amber/30',
      glow: 'group-hover:shadow-[0_0_30px_rgba(240,168,84,0.1)]',
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.accent;

  return (
    <div
      data-magnetic
      className={cn(
        'role-card relative p-6 bg-surface-1/50 backdrop-blur-sm border border-border-sm rounded-2xl transition-all duration-500 overflow-hidden',
        colors.border,
        colors.glow
      )}
    >
      {/* Hover gradient background */}
      <div className={cn('absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100', colors.wrapper)} />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn('w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5', colors.wrapper, colors.border)}>
            <Icon className={cn('w-6 h-6 transition-colors duration-300', colors.icon)} />
          </div>
          <div>
            <h4 className="font-syne font-bold text-text-1 text-lg">{title}</h4>
            <div className="flex items-center gap-2">
              <span className={cn('w-1 h-1 rounded-full', accentColor === 'accent' ? 'bg-accent' : accentColor === 'green' ? 'bg-green' : 'bg-amber')} />
              <span className="text-[10px] text-text-3 uppercase tracking-widest">Expert</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-text-2 leading-relaxed font-light pl-16">{description}</p>
      </div>
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-text > *', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
        },
      });

      gsap.from('.role-card', {
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.role-cards-container',
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 bg-bg overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="about-text flex flex-col gap-8">
            <div>
              <span className="eyebrow">Biography</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-1 font-syne font-bold leading-tight text-wrap-balance mt-4">
                Building from <span className="text-accent relative">
                  Taxila
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />
                </span> to the world.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-text-2 font-light leading-relaxed">
                I am <span className="text-accent font-medium">Ibrahim Salman</span>, a Software Engineering student at UET Taxila and a self-driven developer building at the intersection of web, AI, and data. From scraping live stock data to shipping creative 3D web experiences, I care about code that works and feels alive.
              </p>
              <p className="text-lg text-text-2 font-light leading-relaxed">
                Alongside my studies I lead digital outreach and build tools for IJT — applying what I learn in the real world from day one. I don&apos;t wait to graduate to ship. I ship now.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-syne font-bold text-text-1">5+</div>
                  <div className="text-xs text-text-3 uppercase tracking-widest">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-green" />
                </div>
                <div>
                  <div className="text-2xl font-syne font-bold text-text-1">2+</div>
                  <div className="text-xs text-text-3 uppercase tracking-widest">AI Systems</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-2xl font-syne font-bold text-text-1">100%</div>
                  <div className="text-xs text-text-3 uppercase tracking-widest">Remote Ready</div>
                </div>
              </div>
            </div>
          </div>

          <div className="role-cards-container flex flex-col gap-5">
            <RoleCard
              icon="zap"
              title="Web Developer"
              description="React, Next.js, TypeScript — building fast, accessible, visually sharp interfaces that deliver exceptional user experiences."
              accentColor="accent"
            />
            <RoleCard
              icon="bot"
              title="Python & AI Builder"
              description="Web scrapers, data pipelines, LangChain agents, OCR workflows, and Ollama-powered tools that automate complex tasks."
              accentColor="green"
            />
            <RoleCard
              icon="palette"
              title="Creative Developer"
              description="Three.js, GSAP, WebGL — adding motion, depth, and interactivity to interfaces that need to be remembered."
              accentColor="amber"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
