"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
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

      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-void-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
            {servicesConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white">
            {servicesConfig.sectionTitle}{' '}
            <span className="text-white/40">{servicesConfig.sectionTitleHighlight}</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesConfig.services.map((service) => {
            // Map service titles to tab IDs
            const tabMap: { [key: string]: string } = {
              "In Person Coaching": "in-person",
              "Online Coaching": "online-coaching",
              "Nutrition Coaching": "nutrition"
            };
            const tabId = tabMap[service.title] || "in-person";
            
            return (
              <Link href={`/services?tab=${tabId}`} key={service.id}>
                <div className="service-card group relative overflow-hidden rounded-lg bg-void-black border border-white/10 hover:border-primary-accent/30 transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-white mb-3 group-hover:text-primary-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent" />
    </section>
  );
}
