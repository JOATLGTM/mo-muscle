"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Home,
	Users,
	Briefcase,
	Dumbbell,
	BookOpen,
	Heart,
	Calendar,
	Menu,
	X,
} from "lucide-react";
import Schedule from "@/components/Schedule";
import { useScheduleModal } from "@/hooks/useScheduleModal";

const allNavItems = [
	{ label: "Home", sectionId: "hero", icon: Home, href: "/" },
	{ label: "About", sectionId: "about", icon: Users, href: "/#about" },
	{
		label: "Services",
		sectionId: "services",
		icon: Briefcase,
		href: "/#services",
	},
	{ label: "Team", sectionId: "team", icon: Dumbbell, href: "/#team" },
	{ label: "Trainers", sectionId: null, icon: Users, href: "/trainers" },
	{
		label: "Why Mo Muscle",
		sectionId: null,
		icon: Heart,
		href: "/whymomuscle",
	},
	{ label: "Blog", sectionId: null, icon: BookOpen, href: "/blog" },
	{ label: "Schedule", sectionId: null, icon: Calendar, href: null },
];

interface FloatingNavProps {
	showOnly?: string[]; // Optional filter to show only specific items
}

export default function FloatingNav({ showOnly }: FloatingNavProps = {}) {
	const navRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const { showModal, openModal, setShowModal } = useScheduleModal();

	// Filter nav items if showOnly is provided
	const navItems = showOnly
		? allNavItems.filter((item) => showOnly.includes(item.label))
		: allNavItems;

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < 100) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isMobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobileMenuOpen]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const handleNavClick =
		(item: (typeof navItems)[0]) => (e: React.MouseEvent) => {
			// If it's the Schedule button, open modal
			if (item.label === "Schedule") {
				e.preventDefault();
				openModal();
				setIsMobileMenuOpen(false); // Close mobile menu
				return;
			}

			// If on homepage and has sectionId, scroll to section
			if (isHomePage && item.sectionId) {
				e.preventDefault();
				const element = document.getElementById(item.sectionId);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}
			setIsMobileMenuOpen(false); // Close mobile menu after navigation
			// Otherwise, let the Link handle navigation (including /#section for other pages)
		};

	return (
		<>
			{/* Desktop Navigation */}
			<nav
				className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 hidden md:block transition-all duration-300 ${
					isVisible
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
			>
				<div className="flex items-center gap-1">
					{navItems.map((item) => {
						const IconComponent = item.icon;

						if (item.href === null) {
							// Schedule button - no Link wrapper
							return (
								<button
									key={item.label}
									onClick={handleNavClick(item)}
									className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5 whitespace-nowrap"
									aria-label={item.label}
								>
									<IconComponent className="w-3.5 h-3.5" />
									<span>{item.label}</span>
								</button>
							);
						}

						return (
							<Link
								key={item.label}
								href={item.href}
								onClick={handleNavClick(item)}
								className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5 whitespace-nowrap"
								aria-label={item.label}
							>
								<IconComponent className="w-3.5 h-3.5" />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>

			{/* Mobile Hamburger Button */}
			<button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className={`fixed top-4 right-4 z-50 md:hidden p-3 rounded-full bg-[#0582c0] text-white transition-all duration-300 ${
					isVisible
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
				aria-label="Toggle menu"
			>
				{isMobileMenuOpen ? (
					<X className="w-6 h-6" />
				) : (
					<Menu className="w-6 h-6" />
				)}
			</button>

			{/* Mobile Slide-out Menu */}
			<div
				ref={navRef}
				className={`fixed top-0 right-0 h-full w-[280px] bg-[#050508]/98 backdrop-blur-xl border-l border-white/10 z-40 md:hidden transition-transform duration-300 ease-in-out ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full pt-20 px-6 pb-6">
					<nav className="flex-1 space-y-2">
						{navItems.map((item) => {
							const IconComponent = item.icon;

							if (item.href === null) {
								// Schedule button
								return (
									<button
										key={item.label}
										onClick={handleNavClick(item)}
										className="flex items-center gap-4 w-full px-4 py-4 text-sm font-mono-custom uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-lg"
									>
										<IconComponent className="w-5 h-5 text-[#0582c0]" />
										<span>{item.label}</span>
									</button>
								);
							}

							return (
								<Link
									key={item.label}
									href={item.href}
									onClick={handleNavClick(item)}
									className="flex items-center gap-4 px-4 py-4 text-sm font-mono-custom uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-lg"
								>
									<IconComponent className="w-5 h-5 text-[#0582c0]" />
									<span>{item.label}</span>
								</Link>
							);
						})}
					</nav>

					{/* Footer */}
					<div className="pt-6 border-t border-white/10">
						<p className="text-xs text-white/40 font-mono-custom uppercase tracking-wider text-center">
							Mo Muscle
						</p>
					</div>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			{/* Schedule Modal */}
			<Schedule showModal={showModal} setShowModal={setShowModal} />
		</>
	);
}
