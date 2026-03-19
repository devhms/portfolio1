'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { StatsRow } from '@/components/sections/StatsRow';
import { MagnetLines } from '@/components/ui/MagnetLines';
import { CanvasSkeleton } from '@/components/three/CanvasSkeleton';

// FuzzyText import removed — component was imported but never used in JSX

const Scene = dynamic(() => import('@/components/three/Scene').then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(mobileCheck);

    if (mobileCheck) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        rotateX: -40,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.from(subTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      if (canvasWrapperRef.current) {
        gsap.to(canvasWrapperRef.current, {
          scale: 0.7,
          opacity: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col justify-center px-6 py-24 overflow-hidden hero">
      {/* Enhanced background with gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b10] via-[#0d0d14] to-[#0a0a0f]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        <MagnetLines rows={12} columns={12} color="rgba(123, 110, 246, 0.06)" className="opacity-40" />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        <div className="flex flex-col gap-8 z-10">
          <AvailabilityBadge />

          <div ref={titleRef} className="perspective-1000">
            <h1 className="text-display-h1 leading-[1.1] text-text-1 text-wrap-balance">
              I build <span className="text-accent underline-effect">fast</span>, beautiful <br />
              <span className="text-accent">web experiences.</span>
            </h1>
          </div>

          <p ref={subTitleRef} className="text-lg md:text-xl text-text-2 max-w-[560px] font-light leading-relaxed text-wrap-balance">
            Software Engineering student at UET Taxila. Building web apps, AI tools, and creative digital experiences with React, Python, and Three.js.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            {/* Scroll to projects section */}
            <a
              href="#projects"
              data-magnetic
              className="group px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-2 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                View my work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            {/* Link to actual CV — update href when CV PDF is uploaded to /public/cv.pdf */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="group px-8 py-4 bg-white/5 border border-white/10 text-text-1 font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                Download CV
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>

          <StatsRow />
        </div>

        <div ref={canvasWrapperRef} className="hidden md:block h-[500px] lg:h-[700px] w-full relative">
          {isMobile ? <CanvasSkeleton /> : <Scene />}
        </div>
      </div>
    </section>
  );
}
