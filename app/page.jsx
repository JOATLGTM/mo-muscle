"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { ScrollingText } from "@/components/ScrollingText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCarousel from "@/components/TestimonialCarousel";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const trainWithRef = useRef(null);
	const seminarRef = useRef(null);
	const companyRef = useRef(null);
	const pricingRef = useRef(null);
	const instructorsRef = useRef(null);
	const testimonialRef = useRef(null);

	useEffect(() => {
		// Dynamically add the script tag to the head
		const script = document.createElement("script");
		script.src = "https://static.elfsight.com/platform/platform.js";
		script.async = true;
		document.head.appendChild(script);

		// Clean up the script on unmount
		return () => {
			document.head.removeChild(script);
		};
	}, []);

	return (
		<div className="bg-black text-white">
			{/* Hero Section */}
			<section className="relative min-h-screen pt-16 md:pt-24 overflow-hidden">
				<Image
					src="/deadlift.jpg"
					alt="Deadlift Exercise"
					fill
					className="object-cover brightness-50"
					priority
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
					<p className="text-sm tracking-wider">
						THE MIND IS PRIMARY
					</p>
					<Image
						src="/horizontal_logo_white.png"
						alt="horizontal logo"
						className="object-cover brightness-50"
						width={400}
						height={200}
					/>
					<p className="text-xl mb-8">
						WELCOME TO THE OFFICIAL SITE OF MO MUSCLE
					</p>
				</div>
			</section>

			{/* Train With Gym Mo Section */}
			<section
				ref={trainWithRef}
				className="py-12 md:py-24 text-center bg-white text-black"
			>
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-4 md:mb-8 text-[#0283C0]">
						FIND THE PROBLEM, FIX THE PROBLEM
					</p>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						TRAIN WITH MO MUSCLE
					</h2>
					<p className="max-w-3xl mx-auto text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
						At Mo Muscle, we believe in a personalized approach to
						fitness. Our trainers guide you through each step,
						ensuring you achieve your physical goals effectively.
					</p>
				</div>
			</section>

			{/* Seminar Section */}
			<section
				ref={seminarRef}
				className="py-12 md:py-24 bg-black text-white"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 container mx-auto px-4 items-center">
					<div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl">
						<Image
							src="/family.jpeg"
							alt="Mo Muscle Team"
							fill
							className="object-cover transform hover:scale-110 transition-all duration-500"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<p className="text-sm tracking-wider mb-2 md:mb-4 text-[#0283C0]">
							LEARN WITH US
						</p>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
							WITH THE MO MUSCLE FAMILY
						</h2>
						<p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
							Join the Mo Muscle program and discover a community
							that inspires and empowers you. Our trainers provide
							personalized guidance while fostering a supportive
							environment where you can connect with others, stay
							motivated, and make steady progress toward your
							fitness goals
						</p>
					</div>
				</div>
			</section>

			{/* Testimonial Section */}
			<section ref={testimonialRef} className="py-12 bg-white">
				<div
					className="elfsight-app-88d2e0fd-0af7-448d-ad90-643f857f8de3"
					data-elfsight-app-lazy
				></div>

				{/* <div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						What Our Members Say
					</h2>
					<div className="relative px-12">
						<TestimonialCarousel />
					</div>
				</div> */}
			</section>

			<ScrollingText />

			<section className="relative pt-16 md:pt-12 pb-20 overflow-hidden flex items-center">
				<TestimonialCarousel />
			</section>

			{/* Pricing Section */}
			<section
				ref={pricingRef}
				className="py-6 md:py-24 bg-white text-black"
			>
				{" "}
				<div className="container mx-auto px-4">
					<div className="text-center mb-8 md:mb-12">
						<h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
							Our Pricing Plan
						</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						<PricingCard
							title="3 Months Plan"
							price="39"
							duration="/ session"
							description="As low as $39 per session for a 3-month commitment."
							features={[
								"Personalized workout plan",
								"Weekly check-ins",
								"Access to gym facilities",
								"Nutritional guidance",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
						/>
						<PricingCard
							title="6 Months Plan"
							price="35"
							duration="/ session"
							description="As low as $35 per session for a 6-month commitment."
							features={[
								"All features of 3 Months Plan",
								"Bi-weekly progress assessments",
								"Customized meal plans",
								"Priority scheduling",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							isPopular
							darkMode={false}
						/>
						<PricingCard
							title="12 Months Plan"
							price="32"
							duration="/ session"
							description="As low as $32 per session for a 12-month commitment."
							features={[
								"All features of 6 Months Plan",
								"Monthly one-on-one coaching",
								"Access to exclusive workshops",
								"Personalized supplement advice",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
						/>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-7">
						<PricingCard
							title="Online Coaching"
							price="50"
							duration="/ week"
							description="Comprehensive online coaching program for $50 per week."
							features={[
								"Tailored workout program",
								"Customized meal plans",
								"Access to Mo Muscle app",
								"24/7 coach communication",
								"Video exercise instructions",
								"Progress tracking",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
							stripeLink="https://buy.stripe.com/00g15C37qf2vgjSdQU"
						/>
						<PricingCard
							title="Online Coaching"
							price="5"
							duration="/ week"
							description="Basic online coaching program for $5 per week."
							features={[
								"Tailored workout program",
								"Access to Mo Muscle app",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
							stripeLink="https://buy.stripe.com/7sIcOkazS4nR9VueUZ"
						/>
					</div>
				</div>
			</section>

			{/* Certified Instructors Section */}
			<section
				ref={instructorsRef}
				className="py-12 md:py-24 text-center bg-black text-white"
			>
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-2 md:mb-4 text-[#0283C0]">
						FIND A COACH
					</p>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						CERTIFIED INSTRUCTORS
					</h2>
					<p className="max-w-3xl mx-auto text-gray-300 mb-8 md:mb-12 text-sm md:text-base">
						Our Certified Instructors have undergone our rigorous
						physical and mental testing process to proudly represent
						Mo Muscle wherever they coach. They honor time-tested
						principles while continuously developing and applying
						innovative techniques. Experienced, creative, and
						experts in their fields, they are here to guide you.
						Connect with a certified Mo Muscle instructor today.
					</p>

					<div className="relative">
						<div className="flex flex-col md:flex-row overflow-x-auto gap-6 pb-6 justify-center">
							{" "}
							<InstructorCard
								name="MO NAYAL"
								location="COLUMBUS OHIO"
								image="/mo_2.jpeg"
							/>
							<InstructorCard
								name="BRIE MILLER"
								location="COLUMBUS OHIO"
								image="/brie.jpeg"
							/>
						</div>
					</div>
					<Link href="/trainers">
						<Button className="mt-8 md:mt-12 bg-[#0283C0] hover:bg-[#026a9c] text-white transform hover:scale-105 transition-all duration-300">
							{" "}
							SEE ALL INSTRUCTORS
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}

function InstructorCard({ name, location, image }) {
	return (
		<div className="min-w-[250px] md:min-w-[300px] group cursor-pointer transform hover:scale-105 transition-all duration-300">
			{" "}
			<div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
				<Image
					src={image}
					alt={name}
					fill
					className="object-cover transition-all duration-500 group-hover:scale-110"
				/>
			</div>
			<h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
				{name}
			</h3>
			<p className="text-gray-400">{location}</p>
		</div>
	);
}

// function PricingCard({ title, price, description, features, icon }) {
// 	return (
// 		<div
// 			className={`border border-gray-200 rounded-lg p-6 shadow-md bg-[#0283C0] text-white`}
// 		>
// 			<div className="flex items-center mb-4">
// 				{icon}
// 				<h3 className="font-bold text-lg ml-4">{title}</h3>
// 			</div>
// 			<p className="text-3xl font-bold mb-4">${price}/month</p>
// 			<p className="text-white mb-4">{description}</p>
// 			<ul className="list-disc list-inside">
// 				{features.map((feature, index) => (
// 					<li key={index}>{feature}</li>
// 				))}
// 			</ul>
// 			<Button className="mt-4 bg-white text-[#0283C0]">SIGN UP</Button>
// 		</div>
// 	);
// }
