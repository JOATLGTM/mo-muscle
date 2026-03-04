"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

const servicesFaq = [
	{
		question: "What's the difference between in-person and online coaching?",
		answer:
			"In-person coaching happens at our Columbus gyms with hands-on guidance, real-time form corrections, and equipment access. Online coaching delivers a fully customized plan, check-ins, and video feedback so you can train anywhere on your schedule.",
	},
	{
		question: "How many times per week should I train?",
		answer:
			"Most clients see great results with 2–4 structured sessions per week. We’ll recommend a schedule based on your goals, recovery, and lifestyle.",
	},
	{
		question: "Do I need to be in shape before starting?",
		answer:
			"No. We coach beginners through advanced athletes. Your program starts from your current level and progresses safely over time.",
	},
	{
		question: "Is nutrition coaching included?",
		answer:
			"Nutrition coaching is available as a dedicated service and can be combined with training. We align your nutrition plan with your workouts to support your goals.",
	},
	{
		question: "Where is Mo Muscle located?",
		answer:
			"We coach out of locations in Worthington and Hilliard, Ohio. You can train with us in person locally or remotely through our online coaching.",
	},
];

function ServicesContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	
	// Get tab from URL query parameter, default to "in-person"
	const tabFromUrl = searchParams.get("tab") || "in-person";
	const [activeTab, setActiveTab] = useState(tabFromUrl);
	
	const { showModal, openModal, setShowModal } = useScheduleModal();
	const tabsRef = useRef(null);
	const contentRef = useRef(null);
	
	// Update activeTab when URL changes
	useEffect(() => {
		const tab = searchParams.get("tab");
		if (tab && tab !== activeTab) {
			setActiveTab(tab);
		}
	}, [searchParams]);
	
	// Function to handle tab change and update URL
	const handleTabChange = (tabId) => {
		setActiveTab(tabId);
		router.push(`/services?tab=${tabId}`, { scroll: false });
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
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
				},
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
				},
			);
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="min-h-screen bg-void-black text-white">
			<FloatingNav showOnly={["Home", "Trainers", "Why Mo Muscle", "Blog", "Schedule"]} />

			{/* Logo - Fixed at top */}
			<div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
				<img
					src="/badge_logo_white.png"
					alt="Mo Muscle"
					className="h-[4rem] md:w-48 md:h-8 object-contain"
				/>
			</div>

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
							TRAINING{" "}
							<span className="text-white/40">PROGRAMS</span>
						</h2>
					</div>

					<div className="flex flex-col lg:flex-row gap-12">
						{/* Tabs Sidebar */}
						<div className="w-full lg:w-1/3">
							<div className="lg:sticky lg:top-24 space-y-4">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => handleTabChange(tab.id)}
										className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-between group ${
											activeTab === tab.id
												? "bg-[#0582c0] text-white"
												: "bg-void-black/50 text-white/60 hover:bg-void-black hover:text-white border border-white/10 hover:border-[#0582c0]/30"
										}`}
									>
										<span className="font-mono-custom text-sm uppercase tracking-wider">
											{tab.label}
										</span>
										<ChevronRight
											className={`w-5 h-5 transition-transform ${activeTab === tab.id ? "translate-x-1" : ""}`}
										/>
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
																THE
																INDIVIDUALIZATION
																ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{elements.map(
																	(
																		element,
																		index,
																	) => (
																		<div
																			key={
																				index
																			}
																			className="flex flex-col items-center text-center group"
																		>
																			<div className="w-20 h-20 bg-void-black border border-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:border-[#0582c0]/50 group-hover:bg-[#0582c0]/10 transition-all duration-300">
																				<element.icon className="h-10 w-10 text-[#0582c0]" />
																			</div>
																			<span className="text-white font-mono-custom text-xs uppercase tracking-wider whitespace-pre-line">
																				{
																					element.label
																				}
																			</span>
																		</div>
																	),
																)}
															</div>
														</>
													)}

													{/* Video Carousel - Online Coaching */}
													{tab.id ===
														"online-coaching" && (
														<div className="mt-8">
															<VideoCarousel />
														</div>
													)}

													{/* Nutrition Elements - Nutrition */}
													{tab.id === "nutrition" && (
														<>
															<h4 className="font-display text-2xl text-[#0582c0] mb-8 uppercase tracking-wider">
																ESSENTIAL
																NUTRITIONAL
																ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{nutritionElements.map(
																	(
																		element,
																		index,
																	) => (
																		<div
																			key={`${element}-${index}`}
																			className="flex flex-col items-center text-center group"
																		>
																			<div className="w-20 h-20 bg-void-black border border-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:border-[#0582c0]/50 group-hover:bg-[#0582c0]/10 transition-all duration-300">
																				<element.icon className="h-10 w-10 text-[#0582c0]" />
																			</div>
																			<span className="text-white font-mono-custom text-xs uppercase tracking-wider">
																				{
																					element.label
																				}
																			</span>
																		</div>
																	),
																)}
															</div>
														</>
													)}
												</div>
											),
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* FAQ Section */}
				<div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 border-t border-white/10 pt-12">
					<h3 className="font-display text-3xl md:text-4xl text-white mb-6">
						Frequently Asked Questions
					</h3>
					<div className="space-y-6">
						{servicesFaq.map((item) => (
							<div key={item.question} className="border-b border-white/10 pb-4">
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

				{/* Bottom gradient line */}

				{/* Bottom gradient line */}
				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0582c0]/20 to-transparent" />
			</section>

			{/* FAQ Schema */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: servicesFaq.map((f) => ({
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
						Join our community and start your transformation journey
						today
					</p>
					<button
						onClick={openModal}
						className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:bg-[#016a9e]"
					>
						<span className="relative z-10">
							SCHEDULE YOUR CONSULTATION
						</span>
						<ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
					</button>
				</div>
			</section>

			{/* Schedule Modal */}
			<Schedule showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default function ServicesPage() {
	useLenis();
	
	return (
		<Suspense fallback={
			<div className="min-h-screen bg-void-black flex items-center justify-center">
				<div className="w-16 h-16 border-4 border-[#0582c0] border-t-transparent rounded-full animate-spin" />
			</div>
		}>
			<ServicesContent />
		</Suspense>
	);
}
