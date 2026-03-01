"use client";

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Mission from '@/components/sections/Mission';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Locations from '@/components/sections/Locations';
import CTA from '@/components/sections/CTA';
import HeroFooter from '@/components/sections/HeroFooter';
import { ScrollingText } from '@/components/ScrollingText';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import FloatingNav from '@/components/FloatingNav';
import useLenis from '@/hooks/useLenis';
import { useScheduleModal } from '@/hooks/useScheduleModal';

export default function Home() {
  useLenis();
  const { openModal } = useScheduleModal();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      <FloatingNav />
      
      <Hero />
      
      <About />
      
      <Mission />
      
      <Marquee />
      
      <Services />
      
      <Team />
      
      <section className="py-12 bg-white">
        <div
          className="elfsight-app-88d2e0fd-0af7-448d-ad90-643f857f8de3"
          data-elfsight-app-lazy
        ></div>
      </section>
      
      <ScrollingText />
      
      <section className="relative pt-16 md:pt-12 pb-20 overflow-hidden flex items-center bg-void-black">
        <TestimonialCarousel />
      </section>
      
      <ScrollingText />
      
      <Locations />
      
      <CTA onScheduleClick={openModal} />
      
      <HeroFooter />
    </main>
  );
}
