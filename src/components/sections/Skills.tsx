'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SkillCard } from './SkillCard';
import { Skill } from '@/types';

const SKILLS_DATA: Skill[] = [
  {
    name: 'Python',
    level: 'Advanced',
    info: '10+ projects including scrapers & data pipelines',
    color: 'green',
    tags: ['BeautifulSoup', 'FastAPI', 'LangChain'],
  },
  {
    name: 'React / Next.js',
    level: 'Advanced',
    info: 'Built 5+ high-performance web applications',
    color: 'accent',
    tags: ['App Router', 'RSC', 'Hooks'],
  },
  {
    name: 'TypeScript',
    level: 'Proficient',
    info: 'Strictly typed foundations for all web projects',
    color: 'accent',
    tags: ['Interfaces', 'Generics', 'Types'],
  },
  {
    name: 'C++ / OOP',
    level: 'Advanced',
    info: 'Strong DSA foundation and systems programming',
    color: 'green',
    tags: ['OOP', 'DSA', 'Algorithms'],
  },
  {
    name: 'Three.js / WebGL',
    level: 'Proficient',
    info: 'Creative 3D experiences and mesh optimizations',
    color: 'amber',
    tags: ['R3F', 'Matcap', 'Drei'],
  },
  {
    name: 'AI / LangChain',
    level: 'Proficient',
    info: 'LLM agents and automated data extraction',
    color: 'amber',
    tags: ['Ollama', 'CrewAI', 'OCR'],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.8,
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
    <section id="skills" ref={containerRef} className="py-32 px-6 bg-bg overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="eyebrow">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-1 font-syne font-bold text-wrap-balance leading-tight">
            Skills that <span className="text-accent">ship product</span>
          </h2>
          <p className="text-lg text-text-2 font-light leading-relaxed max-w-xl">
            A diverse toolkit built through real-world projects, from AI automation to immersive 3D web experiences.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILLS_DATA.map((skill) => (
            <div key={skill.name} className="skill-card">
              <SkillCard {...skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
