"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-center md:justify-start h-24">
					<Link
						href="/"
						className="block"
						aria-label="Go to home page"
					>
						<Image
							src="/badge_logo_white.png"
							alt="Mo Muscle"
							width={192}
							height={32}
							className="w-48 h-8 object-contain"
							priority
						/>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
