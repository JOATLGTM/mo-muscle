import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-between h-24 py-4">
					<Link href="/" className="relative w-48 h-8">
						<Image
							src="/badge-logo-white.png"
							alt="Mo Muscle"
							fill
							className="object-contain"
							priority
						/>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/"
							className="text-white hover:text-gray-300 capitalize font-serif text-xs"
						>
							HOME
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
				</nav>
			</div>
		</header>
	);
};

export default Header;
