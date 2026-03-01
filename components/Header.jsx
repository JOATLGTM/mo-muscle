"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-center md:justify-start h-24">
					{/* Logo rendered in hero sections instead */}
				</nav>
			</div>
		</header>
	);
};

export default Header;
