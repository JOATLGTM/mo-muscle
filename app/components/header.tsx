import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header: FC = () => {
	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-between h-24 py-4">
					<Link href="/" className="relative w-48 h-8">
						<Image
							src="/MoMuscle_Logo_FINAL_Horiz_1Color_Blue.png"
							alt="Mo Muscle"
							fill
							className="object-contain"
							priority
						/>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="#"
							className="text-white hover:text-gray-300 capitalize font-serif text-xs"
						>
							ABOUT US
						</Link>
						<Link
							href="#"
							className="text-white hover:text-gray-300 capitalize font-serif text-xs"
						>
							TRAINERS
						</Link>
						<Link
							href="#"
							className="text-white hover:text-gray-300 capitalize font-serif text-xs"
						>
							SERVICES
						</Link>

						<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white">
							START TRAINING
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
