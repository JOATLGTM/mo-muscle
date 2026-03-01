"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Dumbbell, ChevronDown } from "lucide-react";
import { heroConfig } from "@/config/site";
import Image from "next/image";

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const TARGET_TEXT = heroConfig.decodeText;
	const CHARS =
		heroConfig.decodeChars ||
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	const [displayText, setDisplayText] = useState(
		" ".repeat(TARGET_TEXT.length),
	);
	const [isDecoding, setIsDecoding] = useState(true);

	useEffect(() => {
		let iteration = 0;
		const maxIterations = TARGET_TEXT.length * 8;

		const interval = setInterval(() => {
			setDisplayText(() => {
				return TARGET_TEXT.split("")
					.map((_, index) => {
						if (index < iteration / 8) {
							return TARGET_TEXT[index];
						}
						return CHARS[Math.floor(Math.random() * CHARS.length)];
					})
					.join("");
			});

			iteration += 1;

			if (iteration >= maxIterations) {
				clearInterval(interval);
				setDisplayText(TARGET_TEXT);
				setIsDecoding(false);
			}
		}, 40);

		return () => clearInterval(interval);
	}, [TARGET_TEXT, CHARS]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				subtitleRef.current,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					delay: 1.5,
				},
			);

			gsap.fromTo(
				descRef.current,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					delay: 1.7,
				},
			);

			gsap.fromTo(
				ctaRef.current,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					delay: 1.9,
				},
			);
		}, heroRef);

		return () => ctx.revert();
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="hero"
			ref={heroRef}
			className="relative w-full h-screen overflow-hidden bg-void-black"
		>
			<div className="absolute inset-0 z-0">
				<Image
					src={heroConfig.backgroundImage}
					alt="Mo Muscle Hero"
					fill
					className="object-cover scale-110"
					priority
				/>
				<div className="absolute inset-0 bg-black/50" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
				<div
					ref={overlayRef}
					className="absolute inset-0 bg-primary-accent/10 opacity-0"
				/>
			</div>

			{/* Logo - positioned relative to section */}
			<div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
				<img
					src="/badge_logo_white.png"
					alt="Mo Muscle"
					className="h-[4rem] md:w-48 md:h-8 object-contain"
				/>
			</div>

			<div className="relative z-20 flex flex-col items-center justify-center h-full pb-20 px-4">
				<div className="flex flex-col items-center justify-center max-w-7xl w-full">
					<h1
						ref={titleRef}
						className="decode-text text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[4.5vw] font-bold text-white leading-none tracking-tighter mb-6 text-center whitespace-nowrap"
					>
						<span
							className={`${isDecoding ? "text-glow-cyan" : ""} transition-all duration-300`}
						>
							{displayText}
						</span>
					</h1>

					<div
						ref={subtitleRef}
						className="flex items-center gap-4 mb-6 opacity-0"
					>
						<div className="w-12 h-px bg-white/30" />
						<p className="font-mono-custom text-xs sm:text-sm md:text-base text-white font-semibold uppercase tracking-[0.3em] text-center">
							Transform Your Body. Elevate Your Life.
						</p>
						<div className="w-12 h-px bg-white/30" />
					</div>

					<p
						ref={descRef}
						className="max-w-2xl text-center text-white/80 text-sm md:text-base mb-8 opacity-0"
					>
						Join the premier fitness destination where champions are
						made. State-of-the-art equipment, expert trainers, and a
						community that pushes you to be your best.
					</p>

					<div
						ref={ctaRef}
						className="flex flex-col sm:flex-row gap-4 opacity-0"
					>
						<button
							onClick={() => scrollToSection("about")}
							className="group relative px-8 py-3 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300"
						>
							<span className="relative z-10 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
								{heroConfig.ctaPrimary}
								<ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
							</span>
							<span className="absolute inset-0 z-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
							<span className="absolute inset-0 z-20 text-[#0582c0] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								{heroConfig.ctaPrimary}
								<ChevronDown className="w-4 h-4" />
							</span>
						</button>
						<button
							onClick={() =>
								scrollToSection(heroConfig.ctaSecondaryTarget)
							}
							className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-primary-accent hover:text-primary-accent transition-colors duration-300"
						>
							{heroConfig.ctaSecondary}
						</button>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-accent/30 to-transparent" />

			<div className="absolute top-8 right-8 text-right hidden sm:block">
				<p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
					{heroConfig.cornerLabel}
				</p>
				<p className="font-mono-custom text-xs text-white/60">
					{heroConfig.cornerDetail}
				</p>
			</div>
		</section>
	);
}
