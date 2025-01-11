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
			title: "1 Month Training",
			price: "$19",
			duration: "1 month",
			description:
				"Get started with our basic training package. Perfect for those looking to kickstart their fitness journey.",
			features: [
				"Personalized workout plan",
				"Weekly check-ins",
				"Access to our mobile app",
				"Email support",
			],
		},
		{
			title: "3 Month Transformation",
			price: "$49",
			duration: "3 months",
			description:
				"Take your fitness to the next level with our comprehensive 3-month package.",
			features: [
				"Everything in 1 Month Training",
				"Customized meal plan",
				"Bi-weekly video consultations",
				"Access to exclusive workout videos",
			],
		},
		{
			title: "6 Month Elite Program",
			price: "$75",
			duration: "6 months",
			description:
				"For those serious about long-term results. Our most comprehensive package for maximum results.",
			features: [
				"Everything in 3 Month Transformation",
				"Monthly in-person training session",
				"24/7 chat support",
				"Quarterly fitness assessments",
				"Customized supplement recommendations",
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
					<Button className="hero-text bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
						Start Your Journey
					</Button>
				</div>
			</section>

			{/* Detailed Sections */}
			<section ref={detailsRef} className="py-24 bg-black">
				<div className="container mx-auto px-4">
					<DetailSection
						title="1 Month Training - $19"
						description="Our 1 Month Training program is designed to kickstart your fitness journey. For just $19, you'll get a comprehensive introduction to our training methodology and personalized guidance to help you achieve your initial fitness goals."
						features={[
							"Initial fitness assessment to determine your starting point",
							"Customized workout plan tailored to your fitness level and goals",
							"Weekly check-ins with a certified trainer to track progress and adjust your plan",
							"Access to our mobile app with exercise demonstrations and tracking tools",
							"Email support for any questions or concerns throughout the month",
						]}
						image="/placeholder.svg?height=600&width=800"
					/>

					<DetailSection
						title="3 Month Transformation - $49"
						description="Take your fitness to the next level with our 3 Month Transformation program. At $49 per month, this package offers a more comprehensive approach to your fitness journey, including nutrition guidance to maximize your results."
						features={[
							"All features of the 1 Month Training program",
							"Customized meal plan designed by our nutrition experts",
							"Bi-weekly video consultations with your personal trainer",
							"Access to exclusive workout videos and challenges",
							"Progress tracking with before and after photos and measurements",
						]}
						image="/placeholder.svg?height=600&width=800"
						reverse
					/>

					<DetailSection
						title="6 Month Elite Program - $75"
						description="Our 6 Month Elite Program is designed for those who are serious about achieving long-term, sustainable results. At $75 per month, this comprehensive package provides you with the ultimate support and resources for your fitness transformation."
						features={[
							"All features of the 3 Month Transformation program",
							"Monthly in-person training session with a senior trainer",
							"24/7 chat support for immediate assistance and motivation",
							"Quarterly fitness assessments to track your progress in detail",
							"Customized supplement recommendations based on your goals and body composition",
							"Access to exclusive Mo Muscle events and workshops",
						]}
						image="/placeholder.svg?height=600&width=800"
					/>
				</div>
			</section>

			{/* CTA Section */}
			<section
				ref={ctaRef}
				className="py-24 bg-gradient-to-br from-[#0283C0] via-[#026a9c] to-[#015a84] text-white text-center relative overflow-hidden"
			>
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="absolute inset-0 bg-gradient-to-br from-[#0283C0] to-[#03a9f4] opacity-50"></div>
				</div>
				<div className="container mx-auto px-4 relative z-10">
					<h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
						Ready to{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03a9f4] to-[#0283C0] animate-text-shimmer">
							Transform
						</span>{" "}
						Your Life?
					</h2>
					<p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200">
						Join Mo Muscle today and start your journey towards a
						stronger, healthier you. Our expert trainers are ready
						to guide you every step of the way.
					</p>
					<Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
						GET STARTED NOW
					</Button>
				</div>
				<div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
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
					/{service.duration}
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
}) {
	return (
		<div
			className={`detail-section flex flex-col ${
				reverse ? "md:flex-row-reverse" : "md:flex-row"
			} items-center gap-12 py-16 border-b border-gray-800`}
		>
			<div className="w-full md:w-1/2">
				<h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
					{title}
				</h3>
				<p className="text-gray-300 mb-6">{description}</p>
				<ul className="space-y-2">
					{features.map((feature, index) => (
						<li key={index} className="flex items-start">
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
