"use client";

import { marqueeConfig } from '@/config/site';

export default function Marquee() {
  return (
    <section className="relative w-full py-12 bg-[#0582c0] overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {marqueeConfig.items.map((item, index) => (
            <span
              key={`marquee-1-${index}`}
              className="font-display text-4xl md:text-6xl lg:text-8xl text-white mx-8"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee" aria-hidden="true">
          {marqueeConfig.items.map((item, index) => (
            <span
              key={`marquee-2-${index}`}
              className="font-display text-4xl md:text-6xl lg:text-8xl text-white mx-8"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
