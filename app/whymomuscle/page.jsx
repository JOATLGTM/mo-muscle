"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import HeroFooter from "@/components/sections/HeroFooter";
import useLenis from "@/hooks/useLenis";
import FloatingNav from "@/components/FloatingNav";

export default function WhyMoMusclePage() {
	useLenis();
	const [data, setData] = useState([]);
	const titleRef = useRef(null);
	const gridRef = useRef(null);
	
	const TARGET_TEXT = "WHY MO MUSCLE";
	const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
	const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
	const [isDecoding, setIsDecoding] = useState(true);

	useEffect(() => {
		let iteration = 0;
		const maxIterations = TARGET_TEXT.length * 8;

		const interval = setInterval(() => {
			setDisplayText(() => {
				return TARGET_TEXT.split('')
					.map((_, index) => {
						if (index < iteration / 8) {
							return TARGET_TEXT[index];
						}
						return CHARS[Math.floor(Math.random() * CHARS.length)];
					})
					.join('');
			});

			iteration += 1;

			if (iteration >= maxIterations) {
				clearInterval(interval);
				setDisplayText(TARGET_TEXT);
				setIsDecoding(false);
			}
		}, 40);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				gridRef.current?.children || [],
				{ y: 60, opacity: 0, scale: 0.95 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					delay: 1.5,
				}
			);
		});

		return () => ctx.revert();
	}, [data]);

	const fetchData = async () => {
		try {
			const dbRef = ref(db, "whymomuscle");
			const snapshot = await get(dbRef);

			if (snapshot.exists()) {
				const items = snapshot.val();
				const itemsArray = Object.keys(items).map((key) => ({
					id: key,
					...items[key],
				}));
				setData(itemsArray);
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="bg-[#050508] text-white min-h-screen">
			<FloatingNav showOnly={['Home', 'Trainers', 'Blog', 'Why Mo Muscle', 'Schedule']} />
			
			{/* Hero Section */}
			<section className="relative w-full h-screen overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="/family.jpeg"
						alt="Why Mo Muscle"
						fill
						className="object-cover scale-110"
						priority
					/>
				<div className="absolute inset-0 bg-black/50" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
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
							<span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
								{displayText}
							</span>
						</h1>

						<div className="flex items-center gap-4 mb-6 opacity-0" style={{ animation: 'fadeIn 0.8s ease-out 1.5s forwards' }}>
							<div className="w-12 h-px bg-white/30" />
							<p className="font-mono-custom text-xs sm:text-sm md:text-base text-white font-semibold uppercase tracking-[0.3em]">
								More Than A Gym
							</p>
							<div className="w-12 h-px bg-white/30" />
						</div>

						<p className="max-w-2xl text-center text-white/80 text-sm md:text-base mb-8 opacity-0" style={{ animation: 'fadeIn 0.8s ease-out 1.7s forwards' }}>
							At Mo Muscle, we're not just a gym – we're a community of dedicated individuals committed to transforming lives through fitness.
						</p>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="relative py-24 md:py-32 bg-[#050508]">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div className="mb-16">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							Our Philosophy
						</p>
						<h2 className="font-display text-4xl md:text-6xl text-white mb-6">
							WHY CHOOSE <span className="text-white/40">MO MUSCLE</span>
						</h2>
						<p className="text-lg text-white/70 max-w-3xl leading-relaxed">
							Our unique approach combines cutting-edge training techniques with personalized attention, creating an environment where every member can thrive and achieve their goals. Join a supportive community where motivation meets results, and every workout brings you closer to becoming the strongest version of yourself.
						</p>
					</div>

					{/* Image Grid */}
					<div>
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-6">
							Our Community in Action
						</p>
					<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{data.length === 0 ? (
							// Skeleton Loaders
							Array.from({ length: 8 }).map((_, index) => (
								<div key={index} className="animate-pulse">
									<div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
										<div className="relative aspect-square bg-white/10" />
									</div>
								</div>
							))
						) : (
							data.map((item) => (
								<div
									key={item.id}
									className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300"
								>
									{item.image && (
										<div className="relative aspect-square bg-[#050508]">
											<img
												src={item.image}
												alt="Mo Muscle Community"
												loading="lazy"
												decoding="async"
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
												style={{ willChange: 'transform' }}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>
									)}
								</div>
							))
						)}
					</div>
					</div>
				</div>
			</section>

			<HeroFooter />
		</div>
	);
}
