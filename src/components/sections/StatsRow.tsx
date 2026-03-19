'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
}

function StatItem({ value, label, suffix = '' }: StatItemProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    // Fixed: was critically underdamped (tension:20, friction:10) causing wild oscillation.
    // These values produce a smooth count-up with a gentle ease-out settle.
    config: { mass: 1, tension: 80, friction: 30 },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        onEnter: () => setInView(true),
        once: true,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-3xl font-syne font-bold text-text-1">
        <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
        {suffix}
      </div>
      <div className="text-xs text-text-3 uppercase tracking-eyebrow">{label}</div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-16 border-t border-border-sm">
      <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <StatItem value={5} label="Projects" />
      </div>
      <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-green/0 via-green/10 to-green/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <StatItem value={2} label="AI Projects" />
      </div>
      <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-amber/0 via-amber/10 to-amber/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <StatItem value={2} label="Desktop Apps" />
      </div>
      <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <StatItem value={5} label="Technologies" />
      </div>
    </div>
  );
}
