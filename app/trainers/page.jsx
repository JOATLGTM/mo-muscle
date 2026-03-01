"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TrainerCard from "@/components/TrainerCard";
import Link from "next/link";
import useLenis from "@/hooks/useLenis";
import { Dumbbell } from "lucide-react";

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export default function TrainersPage() {
	useLenis();
	const headerRef = useRef(null);
	const trainersRef = useRef(null);
	const ctaRef = useRef(null);
	const titleRef = useRef(null);

	const trainers = [
		{
			name: "Mo Nayal",
			role: "Fitness Trainer",
			description:
				"Welcome to Mo Muscle, your gateway to a transformed, stronger, and healthier you. I'm Mo Nayal, the driving force behind this personal training venture, and I'm thrilled to extend a warm invitation to you.<br /><br />With over a decade of dedicated training experience and a specialization in muscle gain and fat loss, I'm here to guide you on your fitness journey. What sets me apart? I've been there myself, experiencing an incredible transformation that saw me gain a remarkable 80 pounds, turning my thin and skinny physique into a robust, muscular one. I know the ups and downs, the doubts, and the triumphs that come with such a journey, and I'm here to share my expertise with you.<br /><br />With a bachelor's degree in Public Health from The Ohio State University, I discovered my passion for creating impactful, one-on-one connections with individuals striving to improve their health. As a personal trainer, I blend my academic foundation with a hands-on approach, empowering clients to achieve their fitness goals and enhance their overall well-being.<br /><br />My approach combines the latest in scientific training techniques, personalized workout plans, and a focus on nutrition to help you reach your fitness aspirations. We'll work together to sculpt your dream physique, boost your confidence, and uncover the strength you never knew you had.",
			image: "/mo_1.jpeg",
		},
		{
			name: "Brie Miller",
			role: "Fitness Trainer",
			description:
				"Hi, I'm Brieanna Miller! I'm an ISSA-certified personal trainer and nutrition coach with a deep passion for helping others reach their full potential—both in and out of the gym.<br /><br />Born and raised in Hilliard, Ohio, I attended Bowling Green State University, where I earned my bachelor's degree in Education. Prior to becoming a CPT I taught in a severe autism unit as an Intervention Specialist at the Elementary level. Teaching is my first love, and it has shaped my ability to guide others to achieve their goals.<br /><br />I've also experienced my own fitness journey, losing over 120 pounds and completely transforming my health and lifestyle. This personal transformation fuels my mission to inspire and support others on their paths to being strong and healthy.<br /><br />My mission is to combine my love for teaching with my expertise in fitness and nutrition to help people build healthier, stronger, and more confident versions of themselves. Whether in the classroom or the weight room, I'm dedicated to creating positive, lasting change.",
			image: "/brie.jpeg",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					delay: 0.3,
				}
			);

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
		<div className="bg-void-black text-white min-h-screen overflow-hidden">
			<section
				ref={headerRef}
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
			>
				<Image
					src="/both.jpeg"
					alt="two trainers posing together"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-void-black/70" />
				<div className="absolute inset-0 bg-gradient-to-b from-void-black/50 via-void-black/60 to-void-black" />
				
				<div className="absolute top-8 left-8">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-accent to-primary-hover flex items-center justify-center">
							<Dumbbell className="w-4 h-4 text-white" />
						</div>
						<span className="font-display text-lg text-white">Mo Muscle</span>
					</div>
				</div>

				<div ref={titleRef} className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<div className="flex items-center justify-center gap-4 mb-6">
						<div className="w-12 h-px bg-white/30" />
						<p className="font-mono-custom text-xs text-primary-accent/60 uppercase tracking-wider">
							Meet The Team
						</p>
						<div className="w-12 h-px bg-white/30" />
					</div>
					<h1 className="font-display text-6xl md:text-8xl text-white mb-6 leading-none tracking-tighter">
						OUR <span className="text-white/40">TRAINERS</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/70 leading-relaxed">
						Meet the experts who will guide your fitness journey and
						push you beyond your limits
					</p>
				</div>
			</section>

			<section
				ref={trainersRef}
				className="py-24 bg-void-dark relative"
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

			<section
				ref={ctaRef}
				className="py-24 bg-gradient-to-br from-primary-accent via-primary-hover to-[#015a84] text-white text-center relative overflow-hidden"
			>
				<div className="absolute inset-0 bg-void-black/30" />
				<div className="container mx-auto px-4 relative z-10">
					<h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
						Ready to{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
							Redefine
						</span>{" "}
						Your Limits?
					</h2>
					<p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
						Our world-class trainers are ready to guide you on your
						journey to peak physical and mental performance. Join Mo
						Muscle today and unlock your true potential.
					</p>
					<Link href="/services">
						<button className="bg-white text-void-black hover:bg-white/90 px-8 py-6 text-lg font-display uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
							START PERSONAL TRAINING TODAY
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
}
