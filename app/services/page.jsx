"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ServicesPage() {
	const headerRef = useRef(null);
	const servicesRef = useRef(null);
	const detailsRef = useRef(null);
	const ctaRef = useRef(null);

	const services = [
		{
			title: "3 Months Plan",
			price: "$39",
			duration: "per session",
			description:
				"Get started with our 3-month training package. Perfect for those looking to kickstart their fitness journey.",
			features: [
				"As low as $39 per session",
				"Personalized workout plan",
				"Weekly check-ins",
				"Access to gym facilities",
				"Nutritional guidance",
			],
		},
		{
			title: "6 Months Plan",
			price: "$35",
			duration: "per session",
			description:
				"Take your fitness to the next level with our comprehensive 6-month package.",
			features: [
				"As low as $35 per session",
				"All features of 3 Months Plan",
				"Bi-weekly progress assessments",
				"Customized meal plans",
				"Priority scheduling",
			],
		},
		{
			title: "12 Months Plan",
			price: "$32",
			duration: "per session",
			description:
				"For those serious about long-term results. Our most comprehensive package for maximum results.",
			features: [
				"As low as $32 per session",
				"All features of 6 Months Plan",
				"Monthly one-on-one coaching",
				"Access to exclusive workshops",
				"Personalized supplement advice",
			],
		},
		{
			title: "Online Coaching",
			price: "$50",
			duration: "per week",
			description:
				"Transform your fitness from anywhere with our comprehensive online coaching program.",
			features: [
				"$50 per week",
				"Tailored workout program",
				"Customized meal plans",
				"Access to Mo Muscle app",
				"24/7 coach communication",
				"Video exercise instructions",
				"Progress tracking",
			],
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".hero-text", {
				y: 100,
				opacity: 0,
				stagger: 0.2,
				duration: 1,
				ease: "power3.out",
				delay: 0.5,
			});

			// Animated background shapes
			gsap.to(".bg-shape", {
				rotation: 360,
				transformOrigin: "center center",
				repeat: -1,
				duration: 20,
				ease: "none",
			});

			// Services section animation
			gsap.from(".service-card", {
				opacity: 0,
				y: 100,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: servicesRef.current,
					start: "top 80%",
				},
			});

			// Details section animation
			gsap.from(".detail-section", {
				opacity: 0,
				y: 50,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: detailsRef.current,
					start: "top 80%",
				},
			});

			// CTA section animation
			gsap.from(ctaRef.current, {
				opacity: 0,
				y: 50,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ctaRef.current,
					start: "top 80%",
				},
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen overflow-hidden">
			{/* Hero Section */}
			<section
				ref={headerRef}
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
			>
				<div className="absolute inset-0">
					<div className="bg-shape absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
					<div className="bg-shape absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
				</div>
				<Image
					src="/deadlift.jpg"
					alt="Gym equipment"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						OUR SERVICES
					</h1>
					<p className="hero-text text-xl md:text-2xl mb-12 text-gray-300">
						Transform your body and mind with our tailored training
						programs
					</p>
				</div>
			</section>

			{/* Detailed Sections */}
			<section ref={detailsRef} className="py-24 bg-black">
				<div className="container mx-auto px-4">
					<DetailSection
						title="3 Months Plan - As low as $39 per session"
						description="Our 3 Months Plan is designed to kickstart your fitness journey. For as low as $39 per session, you'll get a comprehensive introduction to our training methodology and personalized guidance to help you achieve your initial fitness goals."
						features={[
							"Personalized workout plan tailored to your fitness level and goals",
							"Weekly check-ins with a certified trainer to track progress and adjust your plan",
							"Access to our state-of-the-art gym facilities",
							"Nutritional guidance to support your fitness journey",
							"Access to our mobile app with exercise demonstrations and tracking tools",
						]}
						image="/placeholder.svg?height=600&width=800"
						stripeLink="https://buy.stripe.com/test_6oEcNI6Z03eJges4gi"
					/>

					<DetailSection
						title="6 Months Plan - As low as $35 per session"
						description="Take your fitness to the next level with our 6 Months Plan. At as low as $35 per session, this package offers a more comprehensive approach to your fitness journey, including advanced training techniques and nutrition strategies."
						features={[
							"All features of the 3 Months Plan",
							"Bi-weekly progress assessments to fine-tune your training",
							"Customized meal plans designed by our nutrition experts",
							"Priority scheduling for gym sessions and trainer consultations",
							"Access to exclusive workout videos and challenges",
						]}
						image="/placeholder.svg?height=600&width=800"
						reverse
						stripeLink="https://buy.stripe.com/test_3cs294abcbLf9Q4fZ1"
					/>

					<DetailSection
						title="12 Months Plan - As low as $32 per session"
						description="Our 12 Months Plan is designed for those who are serious about achieving long-term, sustainable results. At as low as $32 per session, this comprehensive package provides you with the ultimate support and resources for your fitness transformation."
						features={[
							"All features of the 6 Months Plan",
							"Monthly one-on-one coaching sessions with a senior trainer",
							"Access to exclusive Mo Muscle workshops and seminars",
							"Personalized supplement recommendations based on your goals and body composition",
							"Quarterly fitness assessments to track your progress in detail",
						]}
						image="/placeholder.svg?height=600&width=800"
					/>

					<DetailSection
						title="Online Coaching - $50 per week"
						description="Transform your fitness from anywhere with our comprehensive Online Coaching program. For $50 per week, you'll receive personalized guidance and support to achieve your fitness goals, no matter where you are."
						features={[
							"Tailored workout program updated weekly",
							"Customized meal plans to support your fitness goals",
							"Access to the Mo Muscle app for workout tracking and progress monitoring",
							"24/7 communication with our expert coaches",
							"Video instructions on how to perform exercises correctly",
							"Detailed progress tracking and regular check-ins",
						]}
						image="/placeholder.svg?height=600&width=800"
						reverse
						stripeLink="https://buy.stripe.com/test_3cs294abcbLf9Q4fZ1"
					/>
				</div>
			</section>
		</div>
	);
}

function ServiceCard({ service }) {
	return (
		<div className="service-card bg-gray-800 rounded-lg p-6 flex flex-col h-full transform hover:scale-105 transition-all duration-300 shadow-lg">
			<h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
				{service.title}
			</h3>
			<p className="text-4xl font-bold mb-2">
				{service.price}
				<span className="text-xl font-normal text-gray-400">
					{service.duration}
				</span>
			</p>
			<p className="text-gray-400 mb-6">{service.description}</p>
			<ul className="space-y-2 mb-6 flex-grow">
				{service.features.map((feature, index) => (
					<li key={index} className="flex items-center">
						<svg
							className="w-5 h-5 mr-2 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{feature}
					</li>
				))}
			</ul>
			<Button className="mt-auto w-full bg-[#0283C0] hover:bg-[#026a9c] text-white transform hover:scale-105 transition-all duration-300">
				Choose Plan
			</Button>
		</div>
	);
}

function DetailSection({
	title,
	description,
	features,
	image,
	reverse = false,
	stripeLink,
}) {
	const handleCheckout = () => {
		window.location.href = stripeLink;
	};

	return (
		<div
			className={`detail-section flex flex-col ${
				reverse ? "md:flex-row-reverse" : "md:flex-row"
			} items-center gap-12 py-16 border-b border-gray-800`}
		>
			<div className="w-full md:w-1/2">
				<h3 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer relative inline-block tracking-tight font-helvetica uppercase">
					{title.split(" - ")[0]}
					<span className="font-playfair normal-case text-2xl md:text-3xl italic ml-2">
						- {title.split(" - ")[1]}
					</span>
				</h3>
				<p className="text-gray-300 mb-6">{description}</p>
				<ul className="space-y-2 mb-6">
					{" "}
					{features.map((feature, index) => (
						<li key={index} className="flex items-start italic">
							<svg
								className="w-6 h-6 mr-2 text-green-500 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							<span>{feature}</span>
						</li>
					))}
				</ul>
				<Button
					className="w-full bg-[#0283C0] hover:bg-[#026a9c] text-white transform hover:scale-105 transition-all duration-300"
					onClick={handleCheckout}
				>
					Choose This Plan
				</Button>
			</div>
			<div className="w-full md:w-1/2">
				<Image
					src={image}
					alt={title}
					width={800}
					height={600}
					className="rounded-lg shadow-lg"
				/>
			</div>
		</div>
	);
}
