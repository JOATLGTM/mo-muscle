"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { missionConfig } from '@/config/site';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Mission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={missionConfig.backgroundImage}
          alt="Mo Muscle Mission"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-void-black/70 to-void-black" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p className="font-mono-custom text-xs text-primary-accent uppercase tracking-wider mb-4">
          {missionConfig.subtitle}
        </p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-8">
          {missionConfig.title}
        </h2>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          {missionConfig.description}
        </p>
      </div>
    </section>
  );
}
