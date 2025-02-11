"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ChevronRight,
	Calendar,
	Dumbbell,
	Zap,
	Timer,
	Heart,
	Utensils,
	FileWarning,
	Shield,
	Smile,
	DollarSign,
	FingerprintIcon as Fist,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const tabs = [
	{
		id: "individualized",
		label: "INDIVIDUALIZED TRAINING",
		title: "ALL WORKOUTS MADE FOR YOU-",
		subtitle: "INDIVIDUALIZED TRAINING",
		content:
			"Your health and well-being at the top of our priority list. Our individualized programs will be designed to help you achieve optimal performance, stay injury free and improve your quality of life while showing the results you're looking for.",
	},
	{
		id: "total-body",
		label: "TOTAL BODY WORKOUTS",
		title: "RELY ON SOUL, MIND, AND HEART WITH",
		subtitle: "TOTAL BODY WORKOUTS",
		content:
			"Our total-body training programs minimize the use of machines to maximize the use of the body. At CFP, however, complete success is not measured in the number of reps achieved or results visualized on the scale. It encompasses your mental well-being - to help break barriers and plateaus both in and out of the gym.",
	},
	{
		id: "semi-private",
		label: "SEMI-PRIVATE WORKOUTS",
		title: "YOU ARE NOT IN THIS ALONE-",
		subtitle: "SEMI-PRIVATE WORKOUTS",
		content:
			"SEMI-PRIVATE WORKOUTS offer the perfect balance of a private gym experience and the camaraderie of working out with others. Enjoy the cost efficiency of a group setting while still receiving personalized, hands-on training from our expert trainer.",
	},
];

const elements = [
	{ icon: Calendar, label: "AGE" },
	{ icon: Dumbbell, label: "STRENGTH" },
	{ icon: Zap, label: "POWER" },
	{ icon: Timer, label: "SPEED" },
	{ icon: Heart, label: "AEROBIC\nCAPACITY" },
	{ icon: Utensils, label: "NUTRITION\nINTAKE" },
	{ icon: FileWarning, label: "INJURY\nHISTORY" },
	{ icon: Shield, label: "PHYSICAL\nLIMITS" },
];

const benefits = [
	{ icon: Smile, label: "HAVE FUN" },
	{ icon: DollarSign, label: "SAVE MONEY" },
	{ icon: Fist, label: "COMPETITION" },
	{ icon: Users, label: "FIND COMMUNITY" },
];

const workoutImages = [
	"/placeholder.svg?height=300&width=300",
	"/placeholder.svg?height=300&width=300",
	"/placeholder.svg?height=300&width=300",
	"/placeholder.svg?height=300&width=300",
	"/placeholder.svg?height=300&width=300",
];

export default function ServicesPage() {
	const [activeTab, setActiveTab] = useState("individualized");

	return (
		<div className="min-h-screen bg-black">
			{/* Hero Section */}
			<section className="relative h-[600px] flex items-center">
				<div className="absolute inset-0 bg-cover bg-center">
					<Image
						src="/service_hero.jpg"
						alt="Clean empty gym"
						fill
						className="object-cover brightness-50"
						priority
					/>{" "}
				</div>
				<div className="relative container mx-auto px-4">
					<div className="max-w-2xl">
						<h2 className="text-white text-xl mb-4">
							GET STARTED ON YOUR JOURNEY WITH
						</h2>
						<h1 className="text-white text-6xl font-bold leading-tight mb-8">
							THE COMPLETE
							<br />
							FITNESS PROGRAMS
						</h1>
						<Link href="/contact">
							<Button className="bg-[#F5A623] hover:bg-[#d88f1a] text-white px-8 py-6 text-xl">
								JOIN NOW
								<ChevronRight className="ml-2 h-6 w-6" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="bg-white py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row gap-8">
						{/* Tabs */}
						<div className="w-full md:w-1/3">
							<div className="space-y-4">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full text-left px-6 py-4 rounded transition-colors ${
											activeTab === tab.id
												? "bg-[rgb(2,131,192)] text-white"
												: "bg-white text-[rgb(2,131,192)] hover:bg-gray-100"
										}`}
									>
										<span className="flex items-center">
											{tab.label}
											<ChevronRight className="ml-auto h-5 w-5" />
										</span>
									</button>
								))}
							</div>
						</div>

						{/* Content */}
						<div className="w-full md:w-2/3">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									{tabs.map(
										(tab) =>
											tab.id === activeTab && (
												<div key={tab.id}>
													<h2 className="text-4xl font-bold text-[rgb(2,131,192)] mb-2">
														{tab.title}
													</h2>
													<h3 className="text-4xl font-bold text-[#66A1FF] mb-6">
														{tab.subtitle}
													</h3>
													<p className="text-gray-700 mb-12">
														{tab.content}
													</p>

													{tab.id ===
														"individualized" && (
														<>
															<h4 className="text-2xl font-bold text-[#F5A623] mb-8">
																THE
																INDIVIDUALIZATION
																ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{elements.map(
																	(
																		element,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className="flex flex-col items-center text-center"
																		>
																			<div className="w-20 h-20 bg-[rgb(2,131,192)] rounded-lg flex items-center justify-center mb-4">
																				<element.icon className="h-10 w-10 text-white" />
																			</div>
																			<span className="text-[rgb(2,131,192)] font-bold whitespace-pre-line">
																				{
																					element.label
																				}
																			</span>
																		</div>
																	)
																)}
															</div>
														</>
													)}

													{tab.id ===
														"total-body" && (
														<>
															<h4 className="text-2xl font-bold text-[#F5A623] mb-8">
																VIEW OUR
																WORKOUTS
															</h4>
															<div className="flex overflow-x-auto space-x-4 mb-8">
																{workoutImages.map(
																	(
																		src,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className="flex-shrink-0"
																		>
																			<Image
																				src={
																					src ||
																					"/placeholder.svg"
																				}
																				alt={`Workout ${
																					index +
																					1
																				}`}
																				width={
																					300
																				}
																				height={
																					300
																				}
																				className="rounded-lg"
																			/>
																		</div>
																	)
																)}
															</div>
														</>
													)}

													{tab.id ===
														"semi-private" && (
														<>
															<h4 className="text-2xl font-bold text-[#F5A623] mb-8">
																BENEFITS OF
																WORKING TOGETHER
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{benefits.map(
																	(
																		benefit,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className="flex flex-col items-center text-center"
																		>
																			<div className="w-20 h-20 bg-[rgb(2,131,192)] rounded-lg flex items-center justify-center mb-4">
																				<benefit.icon className="h-10 w-10 text-white" />
																			</div>
																			<span className="text-[rgb(2,131,192)] font-bold">
																				{
																					benefit.label
																				}
																			</span>
																		</div>
																	)
																)}
															</div>
														</>
													)}
												</div>
											)
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
