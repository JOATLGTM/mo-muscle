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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const trainWithRef = useRef(null);
	const seminarRef = useRef(null);
	const companyRef = useRef(null);
	const pricingRef = useRef(null);
	const instructorsRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Train With Section Animation
			gsap.from(trainWithRef.current, {
				opacity: 0,
				y: 100,
				duration: 1,
				scrollTrigger: {
					trigger: trainWithRef.current,
					start: "top 80%",
				},
			});

			// Seminar Section Animation
			gsap.from(seminarRef.current, {
				opacity: 0,
				x: -100,
				duration: 1,
				scrollTrigger: {
					trigger: seminarRef.current,
					start: "top 80%",
				},
			});

			// Company Section Animation
			gsap.from(companyRef.current, {
				opacity: 0,
				y: 100,
				duration: 1,
				scrollTrigger: {
					trigger: companyRef.current,
					start: "top 80%",
				},
			});

			// Pricing Section Animation
			gsap.from(pricingRef.current, {
				opacity: 0,
				y: 100,
				duration: 1,
				scrollTrigger: {
					trigger: pricingRef.current,
					start: "top 80%",
				},
			});

			// Instructors Section Animation
			gsap.from(instructorsRef.current, {
				opacity: 0,
				x: 100,
				duration: 1,
				scrollTrigger: {
					trigger: instructorsRef.current,
					start: "top 80%",
				},
			});
		});

		return () => ctx.revert();
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
					{/* <h1 className="text-6xl font-bold mb-4">MO MUSCLES</h1> */}
					<p className="text-xl mb-8">
						WELCOME TO THE OFFICIAL SITE OF MO MUSCLES
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white px-8">
						TRAIN WITH US
					</Button>
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
						TRAIN WITH MO
					</h2>
					<p className="max-w-3xl mx-auto text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
						At MoMuscle, we believe in a personalized approach to
						fitness. Our trainers guide you through each step,
						ensuring you achieve your physical goals effectively.
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white transform hover:scale-105 transition-all duration-300">
						TRAIN WITH US
					</Button>
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
							src="/IMG_8380.JPG"
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
							MO MUSCLE TRAINING SERIES
						</h2>
						<p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
							Our trainers are dedicated professionals who
							specialize in transforming your fitness journey.
							With personalized training plans and unwavering
							support, they help you achieve your goals.
						</p>
						<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white self-start transform hover:scale-105 transition-all duration-300">
							LEARN MORE
						</Button>
					</div>
				</div>
			</section>

			{/* Our Company Section */}
			<section
				ref={companyRef}
				className="py-12 md:py-24 text-center bg-white text-black"
			>
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-4 md:mb-8 text-[#0283C0]">
						THE FIRST RULE OF ANY PHYSICAL TRAINING
					</p>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						THE FORM
					</h2>
					<p className="max-w-3xl mx-auto text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
						Mo Muscle is a collective of insanely dedicated and
						hard-working people interested in self-improvement and
						elite physical and mental performance. We don't like
						talking about ourselves, but we'll do our best.
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white transform hover:scale-105 transition-all duration-300">
						LEARN MORE
					</Button>
				</div>
			</section>

			<ScrollingText />

			{/* Pricing Section */}
			<section
				ref={pricingRef}
				className="py-12 md:py-24 bg-white text-black"
			>
				{" "}
				<div className="container mx-auto px-4">
					<div className="text-center mb-8 md:mb-12">
						<p className="text-[#DB4D4D] text-sm tracking-wider mb-2 md:mb-4">
							PRICING PLAN
						</p>
						<h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
							Our Pricing Plan
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						<PricingCard
							title="Basic Membership"
							price="19"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
						/>
						<PricingCard
							title="Standard Membership"
							price="39"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							isPopular
							darkMode={false}
						/>
						<PricingCard
							title="Ultimate Membership"
							price="69"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<ChevronRight className="w-6 h-6" />}
							darkMode={false}
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
						Our Certified instructors have passed through our
						rigorous process of physical and mental testing to
						represent Gym Jones wherever they coach. They embrace
						traditional ideas, and continue to create and implement
						new ones. They are experienced, creative, inquisitive
						and experts in their fields. Meet a certified instructor
						in your area.
					</p>

					<div className="relative">
						<div className="flex flex-col md:flex-row overflow-x-auto gap-6 pb-6 justify-center">
							{" "}
							<InstructorCard
								name="MO NAYAL"
								location="COLUMBUS OHIO"
								image="/placeholder.svg?height=400&width=400"
							/>
							<InstructorCard
								name="THE OTHER LADY"
								location="COLUMBUS OHIO"
								image="/placeholder.svg?height=400&width=400"
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
