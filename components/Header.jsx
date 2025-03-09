"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-between h-24">
					<div className="flex-shrink-0 hidden md:block">
						<Link
							href="/"
							className="block"
							aria-label="Go to home page"
						>
							<Image
								src="/badge-logo-white.png"
								alt="Mo Muscle"
								width={192}
								height={32}
								className="w-48 h-8 object-contain"
								priority
							/>
						</Link>
					</div>

					<div className="hidden md:flex flex-shrink-0">
						<div className="flex items-center space-x-8">
							<Link
								href="/"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-xs"
								aria-label="Go to home page"
							>
								HOME
							</Link>
							<Link
								href="/trainers"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-xs"
								aria-label="Go to trainers page"
							>
								TRAINERS
							</Link>
							<Link
								href="/services"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-xs"
								aria-label="Go to services page"
							>
								SERVICES
							</Link>
							<Link
								href="/blog"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-xs"
								aria-label="Go to blog page"
							>
								BLOG
							</Link>
						</div>
					</div>

					{/* Mobile hamburger button */}
					<div className="md:hidden absolute right-4">
						<button
							onClick={toggleMenu}
							className="text-white"
							aria-label="Toggle navigation menu"
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</nav>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-black/90 backdrop-blur-sm py-4 absolute left-0 right-0">
						<div className="flex flex-col space-y-4 px-4">
							<Link
								href="/"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-sm px-4 py-2"
								aria-label="Go to home page"
							>
								HOME
							</Link>
							<Link
								href="/trainers"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-sm px-4 py-2"
								aria-label="Go to trainers page"
							>
								TRAINERS
							</Link>
							<Link
								href="/services"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-sm px-4 py-2"
								aria-label="Go to services page"
							>
								SERVICES
							</Link>
							<Link
								href="/blog"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-sm px-4 py-2"
								aria-label="Go to blog page"
							>
								BLOG
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
