"use client";

import React from "react";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
	{
		name: "Sarah Johnson",
		image: "/transformation/amir.jpg",
	},
	{
		name: "Mike Thompson",
		image: "/transformation/client1.jpg",
	},
	{
		name: "Emily Rodriguez",
		image: "/transformation/client2.jpg",
	},
	{
		name: "David Chen",
		image: "/transformation/client3.jpg",
	},
	{
		name: "Lisa Patel",
		image: "/transformation/client4.jpg",
	},
	{
		name: "Tom Jackson",
		image: "/transformation/client5.jpg",
	},
];

export default function TestimonialCarousel() {
	return (
		<div className="w-full max-w-7xl mx-auto">
			{/* Title above the carousel */}
			{/* <h2 className="hero-text text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer text-center">
				CLIENT TRANSFORMATIONS
			</h2> */}

			<div className="text-center mb-8 md:mb-12">
				<h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
					CLIENT TRANSFORMATIONS
				</h2>
			</div>

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
							<div className="h-full">
								<div className="w-full h-full relative">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										width={400}
										height={400}
										className="object-cover w-full h-full rounded-lg"
									/>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full" />
				<CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full" />
			</Carousel>
		</div>
	);
}
