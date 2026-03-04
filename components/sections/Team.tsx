"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.team-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
            {teamConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            {teamConfig.sectionTitle}{' '}
            <span className="text-white/40">{teamConfig.sectionTitleHighlight}</span>
          </h2>
        </div>

        <div ref={cardsRef} className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {teamConfig.trainers.map((trainer) => (
            <Link href="/trainers" key={trainer.id}>
              <div className="team-card min-w-[350px] md:min-w-[500px] group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
                  {trainer.name}
                </h3>
                <p className="text-gray-400 text-sm">{trainer.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/trainers">
            <button className="px-8 py-3 bg-primary-accent text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-primary-hover transform hover:scale-105 transition-all duration-300">
              See All Trainers
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
