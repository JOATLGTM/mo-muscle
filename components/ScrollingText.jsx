"use client";

import { useEffect, useState } from "react";

export function ScrollingText() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="overflow-hidden font-bold text-2xl md:text-3xl">
			{/* Top row - scrolling left */}
			<div className="relative bg-[#0283C0] py-2 text-white whitespace-nowrap">
				<div className="animate-scroll-left inline-block">
					TRAIN HARD • STAY HUMBLE • STAY HUMBLE • BE PROUD • BELIEVE
					IN YOURSELF • RISE UP • NEVER GIVE UP • TRAIN HARD •&nbsp;
				</div>
				<div className="animate-scroll-left inline-block">
					TRAIN HARD • STAY HUMBLE • STAY HUMBLE • BE PROUD • BELIEVE
					IN YOURSELF • RISE UP • NEVER GIVE UP • TRAIN HARD •&nbsp;
				</div>
			</div>

			{/* Bottom row - scrolling right */}
			<div className="relative bg-[#9CAFA3] py-2 text-white whitespace-nowrap">
				<div className="animate-scroll-right inline-block">
					PUSH YOUR LIMITS • EXCEED YOUR EXPECTATIONS • SWEAT NOW,
					SHINE LATER • STRONGER EVERY REP • PROUDER EVERY STEP • PUSH
					YOUR LIMITS •&nbsp;
				</div>
				<div className="animate-scroll-right inline-block">
					PUSH YOUR LIMITS • EXCEED YOUR EXPECTATIONS • SWEAT NOW,
					SHINE LATER • STRONGER EVERY REP • PROUDER EVERY STEP • PUSH
					YOUR LIMITS •&nbsp;
				</div>
			</div>
		</div>
	);
}
