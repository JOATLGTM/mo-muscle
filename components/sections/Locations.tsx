"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { locationsConfig } from '@/config/site';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Locations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
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
      id="locations"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-void-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-12 md:mb-16 text-center">
          <p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
            {locationsConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-12">
            {locationsConfig.sectionTitle}{' '}
            <span className="text-white/40">{locationsConfig.sectionTitleHighlight}</span>
          </h2>
          
          {/* Gym Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/images/gym.JPG"
                alt="Mo Muscle Gym"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/images/gym-2.JPG"
                alt="Mo Muscle Gym 2"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/images/gym-4.jpeg"
                alt="Mo Muscle Gym 4"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
          </div>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locationsConfig.locations.map((location) => (
            <div
              key={location.id}
              className="group relative overflow-hidden rounded-lg bg-void-black border border-white/10 hover:border-primary-accent/30 transition-all duration-300 p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-accent to-primary-hover flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white mb-3 group-hover:text-primary-accent transition-colors duration-300">
                    {location.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-1">{location.address}</p>
                  <p className="text-white/60 text-sm">{location.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
