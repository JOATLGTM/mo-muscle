import React, { FC } from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer: FC = () => {
	return (
		<footer className="bg-black text-white py-16">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
				<div>
					<h3 className="text-sm font-bold mb-6">CONTACT US</h3>
					<address className="space-y-2 text-gray-400 not-italic">
						<p>3675 Park Mill Run Dr</p>
						<p>Hilliard, OH 43026</p>
						<p>(123)456-7890</p>
						<p>
							<a
								href="mailto:yomomma@gmail.com"
								className="hover:text-white"
							>
								yomomma@gmail.com
							</a>
						</p>
					</address>
				</div>

				<div>
					<h3 className="text-sm font-bold mb-6">LINKS</h3>
					<nav className="space-y-2 text-gray-400">
						<p>
							<Link href="/terms" className="hover:text-white">
								TERMS OF SERVICE
							</Link>
						</p>
						<p>
							<Link href="/privacy" className="hover:text-white">
								PRIVACY
							</Link>
						</p>
					</nav>
				</div>
			</div>

			<div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800">
				<div className="flex justify-between items-center">
					<p className="text-gray-400">
						© 2025 Mo Muscles. All rights reserved
					</p>
					<div className="flex space-x-4">
						<Link
							href="#"
							className="text-gray-400 hover:text-white"
							aria-label="Facebook"
						>
							<Facebook className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							className="text-gray-400 hover:text-white"
							aria-label="Instagram"
						>
							<Instagram className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
