"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Blog() {
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
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.blog-card');
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
      id="blog"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-12 md:mb-16 text-center">
          <p className="font-mono-custom text-xs text-primary-accent/60 uppercase tracking-wider mb-4">
            {blogConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white">
            {blogConfig.sectionTitle}{' '}
            <span className="text-white/40">{blogConfig.sectionTitleHighlight}</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogConfig.posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <div className="blog-card group relative overflow-hidden rounded-lg bg-void-dark border border-white/10 hover:border-primary-accent/30 transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-dark via-void-dark/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary-accent rounded-full text-xs text-white font-mono-custom uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-primary-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-primary-accent text-sm font-mono-custom uppercase tracking-wider">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-primary-accent hover:text-primary-accent transition-all duration-300">
              View All Posts
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
