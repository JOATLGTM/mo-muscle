"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";
import HeroFooter from "@/components/sections/HeroFooter";
import useLenis from "@/hooks/useLenis";
import FloatingNav from "@/components/FloatingNav";

export default function BlogPage() {
	useLenis();
	const [data, setData] = useState([]);
	const titleRef = useRef(null);
	const cardsRef = useRef(null);
	
	const TARGET_TEXT = "MO MUSCLE BLOG";
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
				cardsRef.current?.children || [],
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					delay: 1.5,
				}
			);
		});

		return () => ctx.revert();
	}, [data]);

	const fetchData = async () => {
		try {
			const dbRef = ref(db, "items");
			const snapshot = await get(dbRef);

			if (snapshot.exists()) {
				const items = snapshot.val();
				const itemsArray = Object.keys(items).map((key) => ({
					id: key,
					...items[key],
				}));

				const sortedItems = itemsArray.sort((a, b) => {
					const [yearA, monthA, dayA] = a.date.split("-");
					const [yearB, monthB, dayB] = b.date.split("-");
					const dateA = new Date(yearA, monthA - 1, dayA);
					const dateB = new Date(yearB, monthB - 1, dayB);
					return dateB - dateA;
				});

				setData(sortedItems);
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
						src="/service_hero.jpg"
						alt="Blog Hero"
						fill
						className="object-cover scale-110"
						priority
					/>
					<div className="absolute inset-0 bg-black/50" />
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
				</div>

			<div className="relative z-20 flex flex-col items-center justify-center h-full pb-20 px-4">
				<div className="absolute top-8 left-8 z-30">
					<img
						src="/badge_logo_white.png"
						alt="Mo Muscle"
						className="w-48 h-8 object-contain"
					/>
				</div>

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
								Community & Inspiration
							</p>
							<div className="w-12 h-px bg-white/30" />
						</div>

						<p className="max-w-2xl text-center text-white/80 text-sm md:text-base mb-8 opacity-0" style={{ animation: 'fadeIn 0.8s ease-out 1.7s forwards' }}>
							Stories about community events, behind-the-scenes moments, and how Mo Muscle continues to uplift and inspire beyond the gym.
						</p>
					</div>
				</div>
			</section>

			{/* Blog Grid Section */}
			<section className="relative py-24 md:py-32 bg-[#050508]">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div className="mb-16 text-center">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							Latest Stories
						</p>
						<h2 className="font-display text-4xl md:text-6xl text-white mb-6">
							FROM THE <span className="text-white/40">COMMUNITY</span>
						</h2>
					</div>

				<div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{data.length === 0 ? (
						// Skeleton Loaders
						Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className="animate-pulse">
								<div className="group relative overflow-hidden rounded-lg bg-[#0A0A0F] border border-white/10 h-full">
									<div className="relative aspect-[4/3] bg-white/5" />
									<div className="p-6">
										<div className="h-3 bg-white/10 rounded w-1/3 mb-3" />
										<div className="h-6 bg-white/10 rounded w-full mb-3" />
										<div className="h-4 bg-white/10 rounded w-full mb-2" />
										<div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
										<div className="h-4 bg-white/10 rounded w-24" />
									</div>
								</div>
							</div>
						))
					) : (
						data.map((item) => {
							const [year, month, day] = item.date.split("-");
							const date = new Date(year, month - 1, day);
							const formattedDate = date.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							});

							return (
								<Link href={`/blog/${item.id}`} key={item.id}>
									<div className="group relative overflow-hidden rounded-lg bg-[#0A0A0F] border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300 cursor-pointer h-full">
										{item.image && (
											<div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0F]">
												<img
													src={item.image}
													alt={item.title}
													loading="lazy"
													decoding="async"
													className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
													style={{ willChange: 'transform' }}
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />
											</div>
										)}
										<div className="p-6">
											<p className="text-xs font-mono-custom text-[#0582c0] uppercase tracking-wider mb-3">
												{formattedDate}
											</p>
											<h3 className="font-display text-xl text-white mb-3 group-hover:text-[#0582c0] transition-colors duration-300 line-clamp-2">
												{item.title}
											</h3>
											<p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
												{item.description}
											</p>
											<div className="flex items-center text-[#0582c0] text-sm font-mono-custom uppercase tracking-wider">
												Read More
												<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
											</div>
										</div>
									</div>
								</Link>
							);
						})
					)}
				</div>
				</div>
			</section>

			<HeroFooter />
		</div>
	);
}
