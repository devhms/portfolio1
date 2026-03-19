'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    type: 'Rust · Desktop App',
    year: '2025',
    title: 'Zuban',
    description: 'Offline speech-to-text desktop application built with Tauri (Rust + React). Privacy-focused transcription using Whisper models with voice activity detection. Cross-platform support for macOS, Windows, and Linux with GPU acceleration.',
    stack: ['Rust', 'React', 'TypeScript', 'Tauri', 'Whisper', 'Tailwind'],
    link: 'https://github.com/devhms/Zuban',
    featured: true,
  },
  {
    id: 'p2',
    type: 'Python · AI Automation',
    year: '2025',
    title: 'DailyAutomationSystem',
    description: 'Automated news aggregation and delivery system that fetches news from multiple sources, summarizes them using Google Gemini AI, and delivers personalized reports via WhatsApp. Includes HTML analytics dashboard with Chart.js and text-to-speech video briefings.',
    stack: ['Python', 'Google Gemini', 'WhatsApp API', 'Chart.js', 'TTS'],
    link: 'https://github.com/devhms/DailyAutomationSystem',
    featured: true,
  },
  {
    id: 'p3',
    type: 'Python · Web Scraping',
    year: '2025',
    title: 'Dawn News Scraper',
    description: 'Automated news aggregator using Python and BeautifulSoup that scrapes Dawn.com, parses headlines, categories, and article bodies, and exports structured data for downstream analysis.',
    stack: ['Python', 'BeautifulSoup', 'Requests', 'JSON'],
    link: 'https://github.com/devhms/dawn-news-scraper',
    featured: false,
  },
  {
    id: 'p4',
    type: 'Python · Desktop App',
    year: '2025',
    title: 'B.L.A.S.T.',
    description: 'OCR GUI desktop application for optical character recognition. Extract text from images with a user-friendly interface. Built with Python and Tkinter for cross-platform desktop usage.',
    stack: ['Python', 'Tkinter', 'OCR', 'Pillow', 'pytesseract'],
    link: 'https://github.com/devhms',
    featured: false,
  },
  {
    id: 'p5',
    type: 'React · Next.js',
    year: '2025',
    title: 'This Portfolio',
    description: 'Performance-first personal portfolio built with Next.js 14, Three.js, GSAP scroll animations, and a physics-based magnetic cursor system.',
    stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/devhms/Portfolio',
    featured: false,
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 60,
        rotateX: -15,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-6 bg-bg overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="eyebrow">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-1 font-syne font-bold leading-tight">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="text-lg text-text-2 font-light leading-relaxed max-w-xl">
            Real-world projects that solve problems and deliver impact. From AI automation to desktop applications.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className="project-card perspective-1000">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
