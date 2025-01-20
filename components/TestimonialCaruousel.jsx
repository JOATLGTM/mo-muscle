"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
		role: "Fitness Enthusiast",
		image: "/placeholder.svg?height=200&width=200",
		quote: "Mo Muscle has completely transformed my fitness journey. The trainers are exceptional and the results speak for themselves!",
	},
	{
		name: "Mike Thompson",
		role: "Amateur Athlete",
		image: "/placeholder.svg?height=200&width=200",
		quote: "I've tried many gyms, but none compare to the personalized attention and motivation I get at Mo Muscle. It's been a game-changer for my performance.",
	},
	{
		name: "Emily Rodriguez",
		role: "Working Professional",
		image: "/placeholder.svg?height=200&width=200",
		quote: "As a busy professional, Mo Muscle's flexible scheduling and efficient workouts have made it possible for me to prioritize my health without sacrificing my career.",
	},
	{
		name: "David Chen",
		role: "Weight Loss Success Story",
		image: "/placeholder.svg?height=200&width=200",
		quote: "I've lost over 50 pounds with Mo Muscle's guidance. Their holistic approach to fitness and nutrition has changed my life.",
	},
	{
		name: "Lisa Patel",
		role: "Yoga Enthusiast",
		image: "/placeholder.svg?height=200&width=200",
		quote: "The mind-body connection emphasized at Mo Muscle sets it apart. I've found a perfect balance of strength training and mindfulness here.",
	},
	{
		name: "Tom Jackson",
		role: "Senior Fitness Advocate",
		image: "/placeholder.svg?height=200&width=200",
		quote: "At 65, I never thought I could feel this strong and energetic. Mo Muscle's age-appropriate programs have given me a new lease on life.",
	},
];

export default function TestimonialCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
				slidesToScroll: 4,
				dragFree: true,
			}}
			className="w-full max-w-7xl mx-auto"
		>
			<CarouselContent className="-ml-2 md:-ml-4">
				{testimonials.map((testimonial, index) => (
					<CarouselItem
						key={index}
						className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/4"
					>
						<div className="h-full">
							<Card className="bg-gray-800 border-gray-700 h-full">
								<CardContent className="flex flex-col items-center justify-between p-6 h-full">
									<div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 flex-shrink-0">
										<Image
											src={
												testimonial.image ||
												"/placeholder.svg"
											}
											alt={testimonial.name}
											width={96}
											height={96}
											className="object-cover w-full h-full"
										/>
									</div>
									<blockquote className="text-center mb-4 flex-grow">
										<p className="text-gray-300 italic text-sm md:text-base">
											"{testimonial.quote}"
										</p>
									</blockquote>
									<div className="text-center mt-auto">
										<p className="font-semibold text-[#0283C0] text-sm md:text-base">
											{testimonial.name}
										</p>
										<p className="text-xs md:text-sm text-gray-400">
											{testimonial.role}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full" />
			<CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full" />
		</Carousel>
	);
}
