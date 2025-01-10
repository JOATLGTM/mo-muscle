"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

export function PricingCard({
	title,
	price,
	description,
	features,
	icon,
	isPopular = false,
	darkMode = true,
}) {
	const cardRef = useRef(null);

	// useEffect(() => {
	// 	gsap.from(cardRef.current, {
	// 		y: 50,
	// 		opacity: 0,
	// 		duration: 1,
	// 		ease: "power3.out",
	// 		scrollTrigger: {
	// 			trigger: cardRef.current,
	// 			start: "top 100%",
	// 		},
	// 	});
	// }, []);

	return (
		<div
			ref={cardRef}
			className={`rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-[#0283C0] to-[#026a9c] text-white`}
		>
			<div className="mb-6">
				<div
					className={`inline-block rounded-lg p-3 bg-white text-[#0283C0]`}
				>
					{icon}
				</div>
			</div>
			<h3 className="text-2xl font-bold mb-2">{title}</h3>
			<div className="mb-4">
				<span className="text-5xl font-bold">${price}</span>
				<span className={"text-white"}>/month</span>
			</div>
			<p className={`text-white mb-6`}>{description}</p>
			<ul className="space-y-4 mb-8">
				{features.map((feature, index) => (
					<li key={index} className="flex items-center gap-3">
						<Check className="w-5 h-5 text-white" />
						<span className={"text-white"}>{feature}</span>
					</li>
				))}
			</ul>
			<Button
				className={`w-full ${"bg-white text-[#0283C0] hover:bg-gray-200"} transform hover:scale-105 transition-all duration-300`}
			>
				Choose This Plan
			</Button>
		</div>
	);
}
