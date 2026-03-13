"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TrainerCard from "@/components/TrainerCard";
import Schedule from "@/components/Schedule";
import { useScheduleModal } from "@/hooks/useScheduleModal";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const trainersFaq = [
	{
		question: "How do I choose the right trainer for me?",
		answer: "We learn about your goals, experience level, and training preferences, then match you with the coach whose style and expertise best fit your needs.",
	},
	{
		question: "Are Mo Muscle trainers certified?",
		answer: "Yes. Our trainers hold respected certifications and have years of hands-on coaching experience working with a wide range of clients.",
	},
	{
		question: "Do you offer 1-on-1 or small-group sessions?",
		answer: "We primarily focus on 1-on-1 personal and semi-private training.",
	},
	{
		question:
			"Can my trainer design a program around injuries or limitations?",
		answer: "Absolutely. We routinely work around injuries, postural issues, and mobility restrictions. Your coach will design a plan that is both safe and effective.",
	},
];

export default function TrainersPage() {
	const { showModal, openModal, setShowModal } = useScheduleModal();
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
			image: "/images/mo-portrait.JPG",
		},
		{
			name: "Brie Miller",
			role: "Fitness Trainer",
			description:
				"Hi, I'm Brieanna Miller! I'm an ISSA-certified personal trainer and nutrition coach with a deep passion for helping others reach their full potential—both in and out of the gym.<br /><br />Born and raised in Hilliard, Ohio, I attended Bowling Green State University, where I earned my bachelor's degree in Education. Prior to becoming a CPT I taught in a severe autism unit as an Intervention Specialist at the Elementary level. Teaching is my first love, and it has shaped my ability to guide others to achieve their goals.<br /><br />I've also experienced my own fitness journey, losing over 120 pounds and completely transforming my health and lifestyle. This personal transformation fuels my mission to inspire and support others on their paths to being strong and healthy.<br /><br />My mission is to combine my love for teaching with my expertise in fitness and nutrition to help people build healthier, stronger, and more confident versions of themselves. Whether in the classroom or the weight room, I'm dedicated to creating positive, lasting change.",
			image: "/images/brie-portrait.JPG",
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
				},
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
		<div className="bg-[#050508] text-white min-h-screen overflow-hidden">
			<FloatingNav
				showOnly={[
					"Home",
					"Trainers",
					"Blog",
					"Why Mo Muscle",
					"Schedule",
				]}
			/>

			<section
				id="top"
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
				<div className="absolute inset-0 bg-black/50" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

				{/* Logo - positioned relative to section */}
				<div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
					<img
						src="/badge_logo_white.png"
						alt="Mo Muscle"
						className="h-[4rem] md:w-48 md:h-8 object-contain"
					/>
				</div>

				<div
					ref={titleRef}
					className="relative z-10 text-center max-w-4xl mx-auto px-4"
				>
					<div className="flex items-center justify-center gap-4 mb-6">
						<div className="w-12 h-px bg-white/30" />
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider">
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

			<section ref={trainersRef} className="py-24 bg-void-dark relative">
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

			{/* FAQ Section */}
			<section className="py-16 bg-void-dark border-t border-white/10">
				<div className="container mx-auto px-4">
					<h3 className="font-display text-3xl md:text-4xl text-white mb-6">
						Trainer FAQs
					</h3>
					<div className="space-y-6">
						{trainersFaq.map((item) => (
							<div
								key={item.question}
								className="border-b border-white/10 pb-4"
							>
								<h4 className="font-mono-custom text-xs md:text-sm text-[#0582c0] uppercase tracking-wider mb-2">
									{item.question}
								</h4>
								<p className="text-white/70 text-sm md:text-base leading-relaxed">
									{item.answer}
								</p>
							</div>
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
					<button
						onClick={openModal}
						className="bg-[#0582c0] text-white hover:bg-[#016a9e] px-8 py-6 text-lg font-display uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
					>
						START PERSONAL TRAINING TODAY
					</button>
				</div>
			</section>

			<Schedule showModal={showModal} setShowModal={setShowModal} />

			{/* FAQ Schema */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: trainersFaq.map((f) => ({
							"@type": "Question",
							name: f.question,
							acceptedAnswer: {
								"@type": "Answer",
								text: f.answer,
							},
						})),
					}),
				}}
			/>
		</div>
	);
}
