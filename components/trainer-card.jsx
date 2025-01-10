"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrainerCard({ trainer, reverse = false }) {
	const cardRef = useRef(null);
	const imageRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const card = cardRef.current;
		const image = imageRef.current;
		const content = contentRef.current;

		gsap.set(card, { opacity: 0, y: 100 });
		gsap.set(image, { scale: 1.2, opacity: 0 });
		gsap.set(content, { opacity: 0, x: reverse ? 50 : -50 });

		ScrollTrigger.create({
			trigger: card,
			start: "top 80%",
			onEnter: () => {
				gsap.to(card, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
				});
				gsap.to(image, {
					scale: 1,
					opacity: 1,
					duration: 1.5,
					ease: "power3.out",
				});
				gsap.to(content, {
					opacity: 1,
					x: 0,
					duration: 1,
					ease: "power3.out",
					delay: 0.3,
				});
			},
		});
	}, [reverse]);

	return (
		<div
			ref={cardRef}
			className={`trainer-card flex flex-col ${
				reverse ? "md:flex-row-reverse" : "md:flex-row"
			} items-center gap-12`}
		>
			<div
				ref={imageRef}
				className="w-full md:w-1/2 relative overflow-hidden rounded-lg shadow-2xl"
			>
				<div className="aspect-[3/4] relative">
					<Image
						src={trainer.image}
						alt={trainer.name}
						fill
						className="object-cover"
					/>
				</div>
				<video
					className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 hover:opacity-100"
					loop
					muted
					playsInline
				>
					<source src={trainer.video} type="video/mp4" />
				</video>
			</div>
			<div
				ref={contentRef}
				className="w-full md:w-1/2 text-center md:text-left"
			>
				<h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#03a9f4] to-[#0283C0] animate-text-shimmer">
					{trainer.name}
				</h3>
				<p className="text-2xl text-gray-400 mb-6">{trainer.role}</p>
				<p className="text-gray-300 text-lg leading-relaxed">
					{trainer.description}
				</p>
			</div>
		</div>
	);
}
