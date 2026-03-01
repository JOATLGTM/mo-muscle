"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Calendar,
	Dumbbell,
	Zap,
	Timer,
	Heart,
	Utensils,
	FileWarning,
	Shield,
	Leaf,
	Flame,
	Scale,
	Apple,
	Droplet,
	ChevronRight,
} from "lucide-react";
import Image from "next/image";
import VideoCarousel from "@/components/VideoCarousel";
import Schedule from "@/components/Schedule";
import { useScheduleModal } from "@/hooks/useScheduleModal";
import FloatingNav from "@/components/FloatingNav";
import useLenis from "@/hooks/useLenis";
import { ScrollingText } from "@/components/ScrollingText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const tabs = [
	{
		id: "in-person",
		label: "IN PERSON COACHING",
		title: "PERSONALIZED ATTENTION WITH",
		subtitle: "IN PERSON COACHING",
		content: `
  <p>Get hands-on guidance and support from expert trainers in a fully equipped fitness facility.</p>
  <p>Whether you're just beginning your fitness journey or pushing toward elite performance, our in-person coaching is personalized to fit your unique goals. We focus on form, function, and consistency—ensuring every rep counts.</p>
  <p>Our coaches work with you to:</p>
  <ul>
	<li>- Customize your training plan based on strength, mobility, and goals</li>
	<li>- Monitor your progress and adjust your workouts in real-time</li>
	<li>- Prevent injury through correct form and safe training methods</li>
	<li>- Motivate and keep you accountable for long-term results</li>
  </ul>
  <p>Join a supportive, results-driven environment and experience training that's as dynamic as your goals.</p>
  `,
	},
	{
		id: "online-coaching",
		label: "ONLINE COACHING",
		title: "TRAIN WHEREVER YOU ARE WITH",
		subtitle: "ONLINE COACHING",
		content: `
  <p>Our online coaching program brings professional training to your home, gym, or on the go.</p>
  <p>You'll receive a personalized program tailored to your goals, lifestyle, and available equipment. Your coach will stay connected through regular check-ins, progress tracking, and video feedback.</p>
  <p>Benefits include:</p>
  <ul>
	<li>- Workouts designed for your space (home, gym, or travel)</li>
	<li>- Flexible scheduling and anytime access</li>
	<li>- Weekly check-ins and progress reviews</li>
	<li>- Video tutorials and exercise demos</li>
	<li>- Real accountability from real coaches</li>
  </ul>
  <p>Wherever you are, we help you stay consistent and on track.</p>
  `,
	},
	{
		id: "nutrition",
		label: "NUTRITION COACHING",
		title: "FUEL YOUR SUCCESS WITH",
		subtitle: "NUTRITION COACHING",
		content: `
  <p>Training hard is only part of the equation—nutrition is the fuel that powers your progress.</p>
  <p>Our expert coaches craft personalized nutrition strategies that complement your training and lifestyle. Whether your goal is to lose fat, gain muscle, or feel more energized, we guide you with realistic and sustainable plans.</p>
  <p>Here's what we offer:</p>
  <ul>
	<li>- Customized meal plans based on your goals and preferences</li>
	<li>- Guidance on macros, hydration, and food timing</li>
	<li>- Strategies to support performance, recovery, and overall health</li>
	<li>- Accountability check-ins to keep you consistent</li>
  </ul>
  <p>No fad diets. No guesswork. Just smart, supportive nutrition coaching that works.</p>
  `,
	},
];

const elements = [
	{ icon: Calendar, label: "AGE" },
	{ icon: Dumbbell, label: "STRENGTH" },
	{ icon: Zap, label: "POWER" },
	{ icon: Timer, label: "SPEED" },
	{ icon: Heart, label: "AEROBIC\nCAPACITY" },
	{ icon: Utensils, label: "NUTRITION\nINTAKE" },
	{ icon: FileWarning, label: "INJURY\nHISTORY" },
	{ icon: Shield, label: "PHYSICAL\nLIMITS" },
];

const nutritionElements = [
	{ icon: Utensils, label: "BALANCED DIET" },
	{ icon: Heart, label: "HEALTHY HEART" },
	{ icon: Leaf, label: "MICRONUTRIENTS" },
	{ icon: Flame, label: "ENERGY LEVELS" },
	{ icon: Scale, label: "WEIGHT MANAGEMENT" },
	{ icon: Apple, label: "NATURAL INGREDIENTS" },
	{ icon: Droplet, label: "HYDRATION" },
];

export default function ServicesPage() {
	useLenis();
	const [activeTab, setActiveTab] = useState("in-person");
	const { showModal, openModal, setShowModal } = useScheduleModal();
	const heroRef = useRef(null);
	const titleRef = useRef(null);
	const tabsRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero title animation
			gsap.fromTo(
				titleRef.current,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					delay: 0.3,
				}
			);

			// Tabs section scroll animation
			gsap.fromTo(
				tabsRef.current,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: tabsRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);

			// Content section scroll animation
			gsap.fromTo(
				contentRef.current,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					delay: 0.2,
					scrollTrigger: {
						trigger: contentRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="min-h-screen bg-void-black text-white">
			<FloatingNav showOnly={['Home', 'Services', 'Schedule']} />

			{/* Hero Section - Minimal Style */}
			<section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-void-black py-32">
				{/* Subtle background image */}
				<div className="absolute inset-0 z-0 opacity-20">
					<Image
						src="/service_hero.jpg"
						alt="Mo Muscle Services"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-black/80 to-void-black" />
				</div>

				{/* Decorative gradient blur */}
				<div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0582c0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
				<div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#0582c0]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

				{/* Logo */}
				<div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
					<img
						src="/badge_logo_white.png"
						alt="Mo Muscle"
						className="h-[4rem] md:w-48 md:h-8 object-contain"
					/>
				</div>

				<div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center">
					<div ref={titleRef}>
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-6">
							WHAT WE OFFER
						</p>
						<h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-white mb-6 leading-tight">
							OUR <span className="text-white/40">SERVICES</span>
						</h1>
						<div className="flex items-center justify-center gap-4 mb-8">
							<div className="w-12 h-px bg-white/30" />
							<p className="font-mono-custom text-xs sm:text-sm text-white/60 uppercase tracking-wider">
								Transform Your Body. Elevate Your Life.
							</p>
							<div className="w-12 h-px bg-white/30" />
						</div>
					</div>
				</div>

				{/* Bottom gradient line */}
				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0582c0]/30 to-transparent" />
			</section>

			{/* Scrolling Text */}
			<ScrollingText />

			{/* Services Content Section */}
			<section className="relative py-24 md:py-32 bg-void-dark overflow-hidden">
				{/* Decorative gradient blur */}
				<div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0582c0]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
				
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div ref={tabsRef} className="mb-16">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							CHOOSE YOUR PATH
						</p>
						<h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white">
							TRAINING <span className="text-white/40">PROGRAMS</span>
						</h2>
					</div>

					<div className="flex flex-col lg:flex-row gap-12">
						{/* Tabs Sidebar */}
						<div className="w-full lg:w-1/3">
							<div className="lg:sticky lg:top-24 space-y-4">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-between group ${
											activeTab === tab.id
												? "bg-[#0582c0] text-white"
												: "bg-void-black/50 text-white/60 hover:bg-void-black hover:text-white border border-white/10 hover:border-[#0582c0]/30"
										}`}
									>
										<span className="font-mono-custom text-sm uppercase tracking-wider">
											{tab.label}
										</span>
										<ChevronRight className={`w-5 h-5 transition-transform ${activeTab === tab.id ? "translate-x-1" : ""}`} />
									</button>
								))}
							</div>
						</div>

						{/* Tab Content */}
						<div ref={contentRef} className="w-full lg:w-2/3">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									{tabs.map(
										(tab) =>
											tab.id === activeTab && (
												<div key={tab.id}>
													<h2 className="font-display text-4xl md:text-5xl text-white mb-2">
														{tab.title}
													</h2>
													<h3 className="font-display text-4xl md:text-5xl text-[#0582c0] mb-8">
														{tab.subtitle}
													</h3>
													<div
														className="text-white/70 mb-12 space-y-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul>li]:text-white/60"
														dangerouslySetInnerHTML={{
															__html: tab.content,
														}}
													/>

													{/* Individualization Elements - In Person */}
													{tab.id === "in-person" && (
														<>
															<h4 className="font-display text-2xl text-[#0582c0] mb-8 uppercase tracking-wider">
																THE INDIVIDUALIZATION ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{elements.map((element, index) => (
																	<div
																		key={index}
																		className="flex flex-col items-center text-center group"
																	>
																		<div className="w-20 h-20 bg-void-black border border-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:border-[#0582c0]/50 group-hover:bg-[#0582c0]/10 transition-all duration-300">
																			<element.icon className="h-10 w-10 text-[#0582c0]" />
																		</div>
																		<span className="text-white font-mono-custom text-xs uppercase tracking-wider whitespace-pre-line">
																			{element.label}
																		</span>
																	</div>
																))}
															</div>
														</>
													)}

													{/* Video Carousel - Online Coaching */}
													{tab.id === "online-coaching" && (
														<div className="mt-8">
															<VideoCarousel />
														</div>
													)}

													{/* Nutrition Elements - Nutrition */}
													{tab.id === "nutrition" && (
														<>
															<h4 className="font-display text-2xl text-[#0582c0] mb-8 uppercase tracking-wider">
																ESSENTIAL NUTRITIONAL ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{nutritionElements.map((element, index) => (
																	<div
																		key={`${element}-${index}`}
																		className="flex flex-col items-center text-center group"
																	>
																		<div className="w-20 h-20 bg-void-black border border-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:border-[#0582c0]/50 group-hover:bg-[#0582c0]/10 transition-all duration-300">
																			<element.icon className="h-10 w-10 text-[#0582c0]" />
																		</div>
																		<span className="text-white font-mono-custom text-xs uppercase tracking-wider">
																			{element.label}
																		</span>
																	</div>
																))}
															</div>
														</>
													)}
												</div>
											)
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* Bottom gradient line */}
				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0582c0]/20 to-transparent" />
			</section>

			{/* Scrolling Text */}
			<ScrollingText />

			{/* CTA Section */}
			<section className="relative py-24 md:py-32 bg-void-black overflow-hidden">
				{/* Decorative gradient blur */}
				<div className="absolute top-1/2 right-0 w-96 h-96 bg-[#0582c0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
				
				<div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
					<h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
						READY TO <span className="text-[#0582c0]">START?</span>
					</h2>
					<p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
						Join our community and start your transformation journey today
					</p>
					<button
						onClick={openModal}
						className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:bg-[#016a9e]"
					>
						<span className="relative z-10">SCHEDULE YOUR CONSULTATION</span>
						<ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
					</button>
				</div>
			</section>

			{/* Schedule Modal */}
			<Schedule showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}
