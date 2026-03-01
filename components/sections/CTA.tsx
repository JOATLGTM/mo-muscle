"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ctaConfig } from '@/config/site';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTAProps {
  onScheduleClick?: () => void;
}

export default function CTA({ onScheduleClick }: CTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const images = imagesRef.current?.querySelectorAll('.cta-image');
      if (images) {
        images.forEach((image, index) => {
          gsap.fromTo(
            image,
            { y: 30 * (index + 1), opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: imagesRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background split */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#0582c0]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-void-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Images grid */}
        <div
          ref={imagesRef}
          className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {ctaConfig.images.map((image, index) => (
            <div
              key={index}
              className={`cta-image relative overflow-hidden rounded-xl ${
                index === 1 ? 'mt-8' : ''
              }`}
            >
              <div className="aspect-[2/3]">
                <Image
                  src={image}
                  alt={`Fitness ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/30 to-transparent" />
              <div className="absolute inset-0 border border-white/10 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="text-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            {ctaConfig.title}{' '}
            <span className="text-[#0582c0]">{ctaConfig.titleHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            {ctaConfig.subtitle}
          </p>
          <button
            onClick={onScheduleClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display text-sm uppercase tracking-wider rounded-full overflow-hidden transition-colors duration-300 hover:bg-black hover:text-white border-2 border-white"
          >
            <span className="relative z-10">{ctaConfig.buttonText}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
