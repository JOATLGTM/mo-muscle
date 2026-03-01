"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dumbbell } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export default function HeroFooter() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const portraitRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sectionRef.current) return;

		const ctx = gsap.context(() => {
			// Parallax title effect
			if (titleRef.current && portraitRef.current) {
				gsap.utils
					.toArray(".parallax-title")
					.forEach((element: any) => {
						gsap.fromTo(
							element,
							{ y: 100, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								duration: 1,
								ease: "power3.out",
								scrollTrigger: {
									trigger: sectionRef.current,
									start: "top 80%",
									toggleActions: "play none none none",
								},
							},
						);
					});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="herofooter"
			ref={sectionRef}
			className="relative w-full bg-void-black overflow-hidden"
		>
			{/* Hero portrait section */}
			<div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
				{/* Background portrait */}
				<div
					ref={portraitRef}
					className="absolute inset-0 flex items-center justify-center"
				>
					<div className="relative w-full max-w-xl aspect-[2/3] mx-auto">
						<Image
							src="/mo_1.jpeg"
							alt="Mo Muscle"
							fill
							className="object-cover"
						/>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/30 to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-b from-void-black via-transparent to-transparent opacity-50" />
					</div>
				</div>

				{/* Parallax title overlay */}
				<div
					ref={titleRef}
					className="relative z-10 text-center will-change-transform parallax-title"
				>
					<h2 className="font-display text-[12vw] md:text-[10vw] text-white leading-none tracking-tighter">
						MOMUSCLE
					</h2>
					<p className="font-mono-custom text-lg text-[#0582c0] uppercase tracking-[0.5em] mt-4">
						Transform Your Life
					</p>
				</div>
			</div>
		</section>
	);
}
