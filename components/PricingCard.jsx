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
	stripeLink,
	duration,
}) {
	const cardRef = useRef(null);

	const handleCheckout = () => {
		window.location.href = stripeLink;
	};

	return (
		<div
			ref={cardRef}
			className={`rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 flex flex-col h-full  bg-gradient-to-br from-[#0283C0] to-[#026a9c] text-white`}
		>
			<h3 className="text-2xl font-bold mb-2">{title}</h3>
			<div className="mb-4">
				<span className="text-5xl font-bold">${price}</span>
				<span className="text-white">{duration}</span>{" "}
			</div>
			<p className={`text-white mb-6`}>{description}</p>
			<ul className="space-y-2 md:space-y-4 mb-6 md:mb-8 flex-grow">
				{features.map((feature, index) => (
					<li key={index} className="flex items-center gap-3">
						<Check className="w-5 h-5 text-white" />
						<span className="text-white italic">{feature}</span>
					</li>
				))}
			</ul>
			<Button
				onClick={handleCheckout}
				className={`w-full mt-auto ${"bg-white text-[#0283C0] hover:bg-gray-200"} transform hover:scale-105 transition-all duration-300 text-sm md:text-base py-2 md:py-3`}
			>
				Choose This Plan
			</Button>
		</div>
	);
}
