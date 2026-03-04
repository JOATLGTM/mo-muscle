"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
	{
		name: "client-transformation",
		image: "/transformation/client1.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client2.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client3.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client4.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client5.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client6.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client7.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client8.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client9.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client10.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client11.jpg",
	},
	{
		name: "client-transformation",
		image: "/transformation/client12.jpg",
	},
];

export default function TestimonialCarousel() {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const carouselRef = useRef(null);

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

			gsap.fromTo(
				carouselRef.current,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					delay: 0.2,
					scrollTrigger: {
						trigger: carouselRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
						once: true,
					},
				}
			);
		}, sectionRef);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<div ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 md:px-12">
			<div ref={titleRef} className="text-center mb-12 md:mb-16">
				<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
					Success Stories
				</p>
				<h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white">
					CLIENT <span className="text-white/40">TRANSFORMATIONS</span>
				</h2>
			</div>

			<div ref={carouselRef}>
				<Carousel
					opts={{
						align: "start",
						loop: true,
						slidesToScroll: 1,
						dragFree: true,
					}}
					className="relative"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{testimonials.map((testimonial, index) => (
							<CarouselItem
								key={index}
								className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/4"
							>
								<div className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300">
									<div className="relative aspect-square">
										<Image
											src={testimonial.image}
											alt={testimonial.name}
											fill
											loading="lazy"
											sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
											className="object-cover transition-transform duration-700 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					<CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0582c0]/90 hover:bg-[#0582c0] text-white border-none" />
					<CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0582c0]/90 hover:bg-[#0582c0] text-white border-none" />
				</Carousel>
			</div>
		</div>
	);
}
