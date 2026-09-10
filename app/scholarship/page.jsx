"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	ArrowRight,
	Dumbbell,
	Utensils,
	Smartphone,
	MapPin,
	Users,
	HeartHandshake,
	Play,
	ImageIcon,
	ChevronDown,
} from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import HeroFooter from "@/components/sections/HeroFooter";
import ScholarshipModal from "@/components/ScholarshipModal";
import useLenis from "@/hooks/useLenis";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
	{
		icon: Dumbbell,
		title: "6 Months of Personal Training",
		description: "One-on-one coaching with the Mo Muscle coaching team.",
	},
	{
		icon: Utensils,
		title: "Personalized Nutrition Plan",
		description: "A nutrition plan designed around her goals and her life.",
	},
	{
		icon: Smartphone,
		title: "Mo Muscle Fitness App",
		description:
			"Full access to follow her training program and track her progress.",
	},
	{
		icon: MapPin,
		title: "Both Training Facilities",
		description: "Access to our Worthington and Hilliard locations.",
	},
	{
		icon: HeartHandshake,
		title: "Ongoing Coaching & Accountability",
		description: "Consistent check-ins, support, and encouragement.",
	},
	{
		icon: Users,
		title: "The Mo Muscle Community",
		description:
			"Surround herself with people working toward becoming stronger and healthier.",
	},
];

// Placeholder journey milestones. Swap `image` for real photos of Shawna when available.
const journey = [
	{
		label: "Where She Started",
		caption:
			"Facing her own health challenges, Shawna made the decision to invest in herself.",
		image: null,
	},
	{
		label: "Showing Up",
		caption:
			"Session after session, her determination and consistency built real momentum.",
		image: null,
	},
	{
		label: "Where She Is Today",
		caption:
			"Stronger, healthier, and proof that it is never too late to change your life.",
		image: null,
	},
];

function PhotoPlaceholder({ label, className = "" }) {
	return (
		<div
			className={`relative w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-dashed border-white/20 rounded-xl text-white/40 ${className}`}
		>
			<ImageIcon className="w-8 h-8" />
			<p className="font-mono-custom text-[10px] sm:text-xs uppercase tracking-wider text-center px-4">
				{label}
			</p>
		</div>
	);
}

export default function ScholarshipPage() {
	useLenis();
	const [showModal, setShowModal] = useState(false);
	const pageRef = useRef(null);
	const heroContentRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero entrance
			gsap.fromTo(
				".hero-reveal",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.15,
					ease: "power3.out",
					delay: 0.3,
				}
			);

			// Scroll reveals
			gsap.utils.toArray(".reveal").forEach((el) => {
				gsap.fromTo(
					el,
					{ y: 50, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					}
				);
			});

			gsap.utils.toArray(".reveal-stagger").forEach((group) => {
				gsap.fromTo(
					group.children,
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.7,
						stagger: 0.1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: group,
							start: "top 80%",
							toggleActions: "play none none none",
						},
					}
				);
			});
		}, pageRef);

		return () => ctx.revert();
	}, []);

	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div ref={pageRef} className="bg-[#050508] text-white min-h-screen">
			<FloatingNav
				showOnly={[
					"Home",
					"Trainers",
					"Blog",
					"Why Mo Muscle",
					"Schedule",
				]}
			/>

			{/* Hero */}
			<section className="relative w-full min-h-screen overflow-hidden flex items-center">
				<div className="absolute inset-0 z-0">
					<Image
						src="/images/bri-training.JPG"
						alt="Training at Mo Muscle"
						fill
						className="object-cover scale-105"
						priority
					/>
					<div className="absolute inset-0 bg-black/60" />
					<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#050508]" />
				</div>

				<div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
					<img
						src="/badge_logo_white.png"
						alt="Mo Muscle"
						className="h-[4rem] md:w-48 md:h-8 object-contain"
					/>
				</div>

				<div
					ref={heroContentRef}
					className="relative z-20 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 text-center"
				>
					<p className="hero-reveal font-mono-custom text-xs sm:text-sm text-[#0582c0] uppercase tracking-[0.3em] mb-6 opacity-0">
						The Shawna Miller Scholarship
					</p>
					<h1 className="hero-reveal font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tighter mb-8 opacity-0">
						ONE STORY CAN
						<br />
						<span className="text-[#0582c0]">INSPIRE ANOTHER.</span>
					</h1>
					<p className="hero-reveal max-w-2xl mx-auto text-white/80 text-base md:text-lg leading-relaxed mb-10 opacity-0">
						A completely free 6-month training and wellness package
						for one woman over 45 who is facing health challenges
						and ready to fight for her health.
					</p>
					<div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
						<button
							onClick={() => setShowModal(true)}
							className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#016a9e] transition-all duration-300"
						>
							Apply Now
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</button>
						<button
							onClick={() => scrollTo("story")}
							className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-[#0582c0] hover:text-[#0582c0] transition-colors duration-300"
						>
							Read Her Story
							<ChevronDown className="w-4 h-4" />
						</button>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0582c0]/40 to-transparent" />
			</section>

			{/* Her Story */}
			<section id="story" className="relative py-24 md:py-32 bg-[#050508]">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						<div className="reveal">
							<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
								Her Story
							</p>
							<h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[1.05]">
								IT IS NEVER TOO LATE{" "}
								<span className="text-white/40">
									TO FIGHT FOR YOUR HEALTH.
								</span>
							</h2>
							<div className="space-y-5 text-white/70 text-base md:text-lg leading-relaxed">
								<p>
									The Shawna Miller Scholarship was created in
									honor of one of our incredible Mo Muscle
									clients, whose journey is a powerful reminder
									that it is never too late to fight for your
									health, build your strength, and change your
									life.
								</p>
								<p>
									After facing her own health challenges, Shawna
									made the decision to invest in herself. Her
									determination, consistency, and willingness to
									keep showing up inspired us to create an
									opportunity for another woman to begin her own
									journey.
								</p>
							</div>
						</div>

						<div className="reveal relative">
							<div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
								<PhotoPlaceholder label="Portrait of Shawna Miller" />
							</div>
							<div className="absolute -bottom-6 -left-6 hidden md:block bg-[#0582c0] rounded-xl px-6 py-5 shadow-2xl">
								<p className="font-display text-3xl text-white leading-none">
									6
								</p>
								<p className="font-mono-custom text-[10px] text-white/80 uppercase tracking-wider mt-1">
									Months, fully covered
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Her Journey */}
			<section className="relative py-24 md:py-32 bg-[#050508] border-t border-white/10">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div className="reveal mb-14 md:mb-20 max-w-3xl">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							Her Journey
						</p>
						<h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.05]">
							SHOWING UP,{" "}
							<span className="text-white/40">AGAIN AND AGAIN.</span>
						</h2>
						<p className="text-white/70 text-base md:text-lg leading-relaxed">
							Shawna's transformation didn't happen overnight. It
							happened one session, one meal, and one decision at a
							time. Here is a look at how far she has come.
						</p>
					</div>

					<div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						{journey.map((milestone, index) => (
							<div key={milestone.label} className="group">
								<div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-5">
									{milestone.image ? (
										<Image
											src={milestone.image}
											alt={milestone.label}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
									) : (
										<PhotoPlaceholder
											label={`${milestone.label} photo`}
										/>
									)}
									<div className="absolute top-4 left-4 font-mono-custom text-[10px] text-white/70 uppercase tracking-wider bg-[#050508]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
										0{index + 1}
									</div>
								</div>
								<h3 className="font-display text-xl text-white mb-2">
									{milestone.label}
								</h3>
								<p className="text-white/60 text-sm md:text-base leading-relaxed">
									{milestone.caption}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* What the recipient receives */}
			<section className="relative py-24 md:py-32 overflow-hidden">
				<div className="absolute inset-0 bg-[#0582c0]" />
				<div className="absolute inset-0 bg-gradient-to-br from-[#0582c0] via-[#0582c0] to-[#016a9e]" />
				<div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
					<div className="reveal mb-14 md:mb-16 max-w-3xl">
						<p className="font-mono-custom text-xs text-white/70 uppercase tracking-wider mb-4">
							The Scholarship
						</p>
						<h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.05]">
							WHAT THE RECIPIENT{" "}
							<span className="text-white/60">WILL RECEIVE</span>
						</h2>
						<p className="text-white/85 text-base md:text-lg leading-relaxed">
							One woman over the age of 45 who is currently facing
							medical or health-related challenges will receive a
							completely free 6-month training and wellness package
							at Mo Muscle.
						</p>
					</div>

					<div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
						{benefits.map((benefit) => {
							const Icon = benefit.icon;
							return (
								<div
									key={benefit.title}
									className="bg-[#050508]/30 backdrop-blur-sm border border-white/15 rounded-xl p-6 md:p-7 hover:bg-[#050508]/45 transition-colors duration-300"
								>
									<div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-5">
										<Icon className="w-5 h-5 text-white" />
									</div>
									<h3 className="font-display text-lg text-white mb-2 leading-tight">
										{benefit.title}
									</h3>
									<p className="text-white/75 text-sm leading-relaxed">
										{benefit.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Who it's for */}
			<section className="relative py-24 md:py-32 bg-[#050508]">
				<div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
					<div className="reveal">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-6">
							Who This Is For
						</p>
						<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-10">
							THIS ISN'T ABOUT ALREADY BEING IN SHAPE.
						</h2>
					</div>
					<div className="reveal space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
						<p>
							It isn't about being the strongest person in the
							room, and you don't need to have everything figured
							out.
						</p>
						<p className="text-white text-xl md:text-2xl font-medium">
							You simply need to be ready to make a change and
							willing to put in the work.
						</p>
						<p>
							If you're a woman over 45 who has been facing health
							challenges and you're ready to make your health a
							priority, we want to hear your story.
						</p>
					</div>
				</div>
			</section>

			{/* Apply CTA */}
			<section
				id="apply"
				className="relative py-24 md:py-32 overflow-hidden border-t border-white/10"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0A0A0F] to-[#050508]" />
				<div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(5,130,192,0.5)_0%,_transparent_60%)]" />
				<div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
					<div className="reveal">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-6">
							Apply Below
						</p>
						<h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-6">
							YOUR JOURNEY COULD BECOME THE STORY{" "}
							<span className="text-[#0582c0]">
								THAT INSPIRES THE NEXT WOMAN TO START.
							</span>
						</h2>
						<p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
							The application takes about 10 minutes. We'll ask
							about your health challenges, why now is the right
							time, and why you deserve this opportunity.
						</p>
						<button
							onClick={() => setShowModal(true)}
							className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-display text-sm md:text-base uppercase tracking-wider rounded-full overflow-hidden transition-colors duration-300 hover:bg-[#0582c0] hover:text-white border-2 border-white hover:border-[#0582c0]"
						>
							Apply for the Shawna Miller Scholarship
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</button>
					</div>
				</div>
			</section>

			{/* Video */}
			<section className="relative py-24 md:py-32 bg-[#050508] border-t border-white/10">
				<div className="max-w-6xl mx-auto px-6 md:px-12">
					<div className="reveal mb-10 md:mb-14 text-center">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							Watch
						</p>
						<h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-[1.05]">
							SHAWNA'S STORY,{" "}
							<span className="text-white/40">IN HER WORDS</span>
						</h2>
						<p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
							Spend five minutes with Shawna to hear about her
							journey, what kept her going, and what she'd tell a
							woman who is thinking about starting.
						</p>
					</div>

					{/* Video placeholder. Replace this block with a <video> or <iframe> when the final cut is ready. */}
					<div className="reveal relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0A0A0F] to-[#050508]">
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(5,130,192,0.25)_0%,_transparent_65%)]" />
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
							<div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0582c0]/20 border border-[#0582c0]/40 flex items-center justify-center">
								<div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0582c0] flex items-center justify-center">
									<Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" fill="currentColor" />
								</div>
							</div>
							<p className="font-mono-custom text-xs text-white/60 uppercase tracking-[0.3em]">
								Video coming soon
							</p>
						</div>
						<div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 font-mono-custom text-[10px] md:text-xs text-white/50 uppercase tracking-wider bg-[#050508]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
							5:00
						</div>
					</div>
				</div>
			</section>

			<HeroFooter />

			<ScholarshipModal open={showModal} onOpenChange={setShowModal} />
		</div>
	);
}
