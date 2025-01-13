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
					<div className="flex-shrink-0">
						<Link href="/" className="block">
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

					<div className="hidden md:flex flex-grow justify-center">
						<div className="flex items-center space-x-8">
							<Link
								href="#"
								className="text-white hover:text-gray-300 capitalize font-serif text-xs"
							>
								ABOUT US
							</Link>
							<Link
								href="/trainers"
								className="text-white hover:text-gray-300 capitalize font-serif text-xs"
							>
								TRAINERS
							</Link>
							<Link
								href="/services"
								className="text-white hover:text-gray-300 capitalize font-serif text-xs"
							>
								SERVICES
							</Link>
						</div>
					</div>

					<div className="hidden md:flex flex-shrink-0">
						<div className="flex items-center space-x-4">
							<Link href="/login">
								<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white">
									LOGIN
								</Button>
							</Link>
							<Link href="/register">
								<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white">
									REGISTER
								</Button>
							</Link>
						</div>
					</div>

					<div className="md:hidden">
						<button onClick={toggleMenu} className="text-white">
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</nav>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-black/90 backdrop-blur-sm py-4 absolute left-0 right-0">
						<div className="flex flex-col space-y-4 px-4">
							<Link
								href="#"
								className="text-white hover:text-gray-300 capitalize font-serif text-sm px-4 py-2"
							>
								ABOUT US
							</Link>
							<Link
								href="/trainers"
								className="text-white hover:text-gray-300 capitalize font-serif text-sm px-4 py-2"
							>
								TRAINERS
							</Link>
							<Link
								href="/services"
								className="text-white hover:text-gray-300 capitalize font-serif text-sm px-4 py-2"
							>
								SERVICES
							</Link>
							<div className="flex flex-col space-y-2 px-4">
								<Link href="/login">
									<Button className="w-full bg-[#0283C0] hover:bg-[#026a9c] text-white">
										LOGIN
									</Button>
								</Link>
								<Link href="/register">
									<Button className="w-full bg-[#0283C0] hover:bg-[#026a9c] text-white">
										REGISTER
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
