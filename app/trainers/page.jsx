"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrainerCard from "@/components/trainer-card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function TrainersPage() {
	const headerRef = useRef(null);
	const trainersRef = useRef(null);
	const ctaRef = useRef(null);

	const trainers = [
		{
			name: "Mo Nayal",
			role: "Fitness Trainer",
			description:
				"Mo is our head trainer with over 10 years of experience in strength and conditioning. He specializes in powerlifting and functional fitness.",
			image: "/mo_1.jpeg",
			// video: "/placeholder-video.mp4",
		},
		{
			name: "Brie Miller",
			role: "Fitness Trainer",
			description:
				"Brie brings tranquility to our high-intensity environment. With her 200-hour fitness training, she helps our members find strength and courage.",
			image: "/brie.jpeg",
			// video: "/placeholder-video.mp4",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero section animation
			gsap.from(headerRef.current, {
				opacity: 0,
				duration: 1.5,
				ease: "power3.out",
			});

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

			// Trainers section animation
			gsap.from(".trainer-card", {
				opacity: 0,
				y: 100,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: trainersRef.current,
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
				<Image
					src="/both.jpeg"
					alt="two traineres posing together"
					fill
					className="object-cover brightness-50"
					priority
				/>
				<div className="absolute inset-0">
					<div className="bg-shape absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
					<div className="bg-shape absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
				</div>
				<div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						OUR TRAINERS
					</h1>
					<p className="hero-text text-xl md:text-2xl mb-12 text-gray-300">
						Meet the experts who will guide your fitness journey and
						push you beyond your limits
					</p>
				</div>
			</section>

			{/* <section
				ref={headerRef}
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
			>
				<div className="absolute inset-0">
					<div className="bg-shape absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
					<div className="bg-shape absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
				</div>
				<div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						OUR TRAINERS
					</h1>
					<p className="hero-text text-xl md:text-2xl mb-12 text-gray-300">
						Meet the experts who will guide your fitness journey and
						push you beyond your limits
					</p>
				</div>
			</section> */}

			{/* Trainers Section */}
			<section
				ref={trainersRef}
				className="py-24 bg-gradient-to-b from-gray-900 to-black relative"
			>
				<div className="container mx-auto px-4">
					<div className="space-y-32">
						{trainers.map((trainer, index) => (
							<TrainerCard
								key={index}
								trainer={trainer}
								reverse={index % 2 !== 0}
							/>
						))}
					</div>
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
							Redefine
						</span>{" "}
						Your Limits?
					</h2>
					<p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200">
						Our world-class trainers are ready to guide you on your
						journey to peak physical and mental performance. Join Mo
						Muscle today and unlock your true potential.
					</p>
					<Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
						BEGIN YOUR JOURNEY
					</Button>
				</div>
				<div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
			</section>
		</div>
	);
}
