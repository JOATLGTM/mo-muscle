"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
	ChevronRight,
	ChevronLeft,
	Calendar,
	Dumbbell,
	Zap,
	Timer,
	Heart,
	Utensils,
	FileWarning,
	Shield,
	X,
	CheckCircle2,
	Leaf,
	Flame,
	Scale,
	Apple,
	Droplet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import VideoCarousel from "@/components/VideoCarousel";

const tabs = [
	{
		id: "in-person",
		label: "IN PERSON COACHING",
		title: "PERSONALIZED ATTENTION WITH",
		subtitle: "IN PERSON COACHING",
		content:
			"Get hands-on guidance and support from expert trainers in a fully equipped fitness facility.",
	},
	{
		id: "online-coaching",
		label: "ONLINE COACHING",
		title: "TRAIN WHEREVER YOU ARE WITH",
		subtitle: "ONLINE COACHING",
		content:
			"Access personalized training programs and guidance from the comfort of your own home, with regular check-ins and support from your coach.",
	},
	{
		id: "nutrition",
		label: "NUTRITION COACHING",
		title: "FUEL YOUR SUCCESS WITH",
		subtitle: "NUTRITION COACHING",
		content:
			"Receive a customized nutrition plan that complements your training program, with ongoing support to help you achieve your health and fitness goals.",
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

const nutritionElements = [
	{ icon: Utensils, label: "BALANCED DIET" },
	{ icon: Heart, label: "HEALTHY HEART" },
	{ icon: Leaf, label: "MICRONUTRIENTS" },
	{ icon: Flame, label: "ENERGY LEVELS" },
	{ icon: Scale, label: "WEIGHT MANAGEMENT" },
	{ icon: Apple, label: "NATURAL INGREDIENTS" },
	{ icon: Droplet, label: "HYDRATION" },
];

const workoutVideos = [
	"/videos/video1.mp4",
	"/videos/video2.mp4",
	"/videos/video3.mp4",
	"/videos/video4.mp4",
	"/videos/video5.mp4",
	"/videos/video6.mp4",
	"/videos/video7.mp4",
];

export default function ServicesPage() {
	const [activeTab, setActiveTab] = useState("in-person");
	const [showModal, setShowModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState({
		hasCoach: "",
		workoutDays: "",
		goals: [],
		needsMealPlan: "",
		coachingPreference: "",
		fullName: "",
		email: "",
		phone: "",
		trainerPreference: "", // Added field for the trainer preference
	});
	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		phone: "",
	});
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const [currentVideo, setCurrentVideo] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const questions = [
		{
			id: "hasCoach",
			question: "Have you worked with a coach before?",
			type: "radio",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
		},
		{
			id: "workoutDays",
			question: "How many days do you want to workout per week?",
			type: "radio",
			options: [
				{ value: "1", label: "1 day" },
				{ value: "2", label: "2 days" },
				{ value: "3", label: "3 days" },
				{ value: "4", label: "4 days" },
			],
		},
		{
			id: "goals",
			question: "What is your goal?",
			subtext: "Check all that apply",
			type: "checkbox",
			options: [
				{ value: "lose-fat", label: "Lose fat" },
				{ value: "build-muscle", label: "Build muscle" },
				{ value: "tone-up", label: "Tone up" },
				{ value: "get-stronger", label: "Get stronger" },
				{ value: "become-healthier", label: "Become healthier" },
				{ value: "injury", label: "Prevent Injury" },
			],
		},
		{
			id: "needsMealPlan",
			question: "Do you need a meal plan?",
			type: "radio",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
		},
		{
			id: "coachingPreference",
			question: "Do you prefer in person or online coaching?",
			type: "radio",
			options: [
				{ value: "in-person", label: "In person" },
				{ value: "online", label: "Online" },
			],
		},
		{
			id: "trainerPreference",
			question: "Who do you want to train with?", // New question for trainer preference
			type: "radio",
			options: [
				{ value: "mo-nayal", label: "Mo Nayal" },
				{ value: "brie-miller", label: "Brie Miller" },
				{ value: "no-preference", label: "No Preference" },
			],
		},
	];

	const handleNext = () => {
		if (currentStep < questions.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleChange = (questionId, value) => {
		setFormData((prev) => ({
			...prev,
			[questionId]: value,
		}));
	};

	const validateForm = () => {
		let isValid = true;
		let newErrors = { fullName: "", email: "", phone: "" };

		// Full Name Validation
		if (!formData.fullName) {
			newErrors.fullName = "Full name is required.";
			isValid = false;
		} else if (formData.fullName.length < 3) {
			newErrors.fullName =
				"Full name must be at least 3 characters long.";
			isValid = false;
		}

		// Email Validation
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!formData.email) {
			newErrors.email = "Email is required.";
			isValid = false;
		} else if (!emailPattern.test(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
			isValid = false;
		}

		// Phone Validation
		const phonePattern = /^[0-9]{10}$/;
		if (!formData.phone) {
			newErrors.phone = "Phone number is required.";
			isValid = false;
		} else if (!phonePattern.test(formData.phone)) {
			newErrors.phone = "Phone number must be 10 digits.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(formData);
		if (validateForm()) {
			// If validation is successful, proceed with the form submission logic
			try {
				const response = await fetch("/api/send-email", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					setIsSuccess(true);
				} else {
					setIsSuccess(false);
					alert(
						"There was an error submitting the form. Please try again."
					);
				}
			} catch (error) {
				setIsSuccess(false);
				alert(
					"There was an error submitting the form. Please try again."
				);
			}
		}
	};

	const handleClose = () => {
		setShowModal(false);
		setCurrentStep(0);
		setIsSuccess(false);
		setFormData({
			hasCoach: "",
			workoutDays: "",
			goals: [],
			needsMealPlan: "",
			coachingPreference: "",
			fullName: "",
			email: "",
			phone: "",
		});
	};

	const isCurrentQuestionAnswered = () => {
		if (currentStep >= questions.length) return true;
		const currentQuestion = questions[currentStep];
		const currentValue = formData[currentQuestion.id];
		return currentQuestion.type === "checkbox"
			? currentValue.length > 0
			: Boolean(currentValue);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % workoutVideos.length);
	};

	// Navigate to the previous set of 4 videos, wrapping around the entire list
	const goToPrevious = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + workoutVideos.length) % workoutVideos.length
		);
	};

	// Function to slice the workoutVideos array to show 4 at a time, ensuring loop
	const currentVideosToShow = [
		workoutVideos[(currentIndex + 0) % workoutVideos.length],
		workoutVideos[(currentIndex + 1) % workoutVideos.length],
		workoutVideos[(currentIndex + 2) % workoutVideos.length],
		workoutVideos[(currentIndex + 3) % workoutVideos.length],
	];

	// Function to handle opening the modal
	const openVideoModal = (video) => {
		setCurrentVideo(video);
		setIsVideoModalOpen(true);
	};

	// Function to handle closing the modal
	const closeVideoModal = () => {
		setCurrentVideo(null);
		setIsVideoModalOpen(false);
	};

	return (
		<div className="min-h-screen bg-black">
			{/* Hero Section */}
			<section className="relative h-[600px] flex items-center">
				<div className="absolute inset-0 bg-cover bg-center">
					<Image
						src="/service_hero.jpg"
						alt="Clean empty gym interior showcasing fitness equipment at Mo Muscle"
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
						<Button
							onClick={() => setShowModal(true)}
							className="bg-[#F5A623] hover:bg-[#d88f1a] text-white px-8 py-6 text-xl"
						>
							JOIN NOW
							<ChevronRight className="ml-2 h-6 w-6" />
						</Button>
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

													{tab.id === "in-person" && (
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
														"online-coaching" && (
														<>
															<VideoCarousel />
														</>
													)}

													{tab.id === "nutrition" && (
														<>
															<h4 className="text-2xl font-bold text-[#F5A623] mb-8">
																ESSENTIAL
																NUTRITIONAL
																ELEMENTS
															</h4>
															<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
																{nutritionElements.map(
																	(
																		element,
																		index
																	) => (
																		<div
																			key={`${element}-${index}`}
																			className="flex flex-col items-center text-center"
																		>
																			<div className="w-20 h-20 bg-[rgb(2,131,192)] rounded-lg flex items-center justify-center mb-4">
																				<element.icon className="h-10 w-10 text-white" />
																			</div>
																			<span className="text-[rgb(2,131,192)] font-bold">
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
												</div>
											)
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</section>

			<Dialog
				open={showModal}
				onOpenChange={handleClose}
				aria-labelledby="modalTitle"
				aria-describedby="modalDescription"
			>
				<DialogContent className="max-w-2xl p-0 bg-transparent border-none">
					<h2 id="modalTitle" className="text-2xl">
						Form Submission
					</h2>
					<p id="modalDescription">
						Please fill out the form below to start your fitness
						journey with Mo Muscle.
					</p>

					<div className="relative bg-white rounded-2xl shadow-xl p-8">
						<button
							onClick={handleClose}
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors z-10 mt-1 mr-1"
						>
							<X className="h-6 w-6" />
							<span className="sr-only">Close</span>
						</button>

						{isSuccess ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="text-center"
							>
								<div className="mb-6 flex justify-center">
									<CheckCircle2 className="h-16 w-16 text-green-500" />
								</div>
								<h2 className="text-2xl font-bold text-gray-900 mb-4">
									Congratulations!
								</h2>
								<p className="text-gray-600 mb-8">
									Thank you for signing up. We will contact
									you shortly to discuss your fitness journey.
								</p>
								<Button
									onClick={handleClose}
									className="bg-[rgb(2,131,192)] text-white hover:bg-[rgb(2,131,192)]/90"
								>
									Return Home
								</Button>
							</motion.div>
						) : (
							<>
								<>
									{currentStep <= questions.length - 1 ? (
										<>
											<div className="mb-8 mt-4">
												<div className="h-2 w-full bg-gray-200 rounded-full">
													<div
														className="h-2 bg-[rgb(2,131,192)] rounded-full transition-all duration-300"
														style={{
															width: `${
																((currentStep +
																	1) /
																	(questions.length +
																		1)) *
																100
															}%`,
														}}
													/>
												</div>
												<div className="mt-2 text-sm text-gray-600">
													Question {currentStep + 1}{" "}
													of {questions.length}
												</div>
											</div>

											<AnimatePresence mode="wait">
												<motion.div
													key={currentStep}
													initial={{
														opacity: 0,
														x: 20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													exit={{
														opacity: 0,
														x: -20,
													}}
													className="space-y-6"
												>
													<h2 className="text-2xl font-bold text-gray-900 mb-4">
														{
															questions[
																currentStep
															].question
														}
													</h2>
													{questions[currentStep]
														.subtext && (
														<p className="text-gray-600 -mt-2 mb-4">
															{
																questions[
																	currentStep
																].subtext
															}
														</p>
													)}

													{questions[currentStep]
														.type === "radio" && (
														<RadioGroup
															value={
																formData[
																	questions[
																		currentStep
																	].id
																]
															}
															onValueChange={(
																value
															) =>
																handleChange(
																	questions[
																		currentStep
																	].id,
																	value
																)
															}
															className="space-y-4"
														>
															{questions[
																currentStep
															].options.map(
																(option) => (
																	<div
																		key={
																			option.value
																		}
																		className="flex items-center"
																	>
																		<RadioGroupItem
																			value={
																				option.value
																			}
																			id={`${questions[currentStep].id}-${option.value}`}
																			className="border-gray-300 text-[rgb(2,131,192)] focus:ring-[rgb(2,131,192)]"
																		/>
																		<Label
																			htmlFor={`${questions[currentStep].id}-${option.value}`}
																			className="ml-2 text-lg text-gray-700"
																		>
																			{
																				option.label
																			}
																		</Label>
																	</div>
																)
															)}
														</RadioGroup>
													)}

													{questions[currentStep]
														.type ===
														"checkbox" && (
														<div className="space-y-4">
															{questions[
																currentStep
															].options.map(
																(option) => (
																	<div
																		key={
																			option.value
																		}
																		className="flex items-center"
																	>
																		<Checkbox
																			id={`${questions[currentStep].id}-${option.value}`}
																			checked={formData[
																				questions[
																					currentStep
																				]
																					.id
																			].includes(
																				option.value
																			)}
																			onCheckedChange={(
																				checked
																			) => {
																				const currentValues =
																					formData[
																						questions[
																							currentStep
																						]
																							.id
																					];
																				const newValues =
																					checked
																						? [
																								...currentValues,
																								option.value,
																						  ]
																						: currentValues.filter(
																								(
																									v
																								) =>
																									v !==
																									option.value
																						  );
																				handleChange(
																					questions[
																						currentStep
																					]
																						.id,
																					newValues
																				);
																			}}
																			className="border-gray-300 text-[rgb(2,131,192)] focus:ring-[rgb(2,131,192)]"
																		/>
																		<Label
																			htmlFor={`${questions[currentStep].id}-${option.value}`}
																			className="ml-2 text-lg text-gray-700"
																		>
																			{
																				option.label
																			}
																		</Label>
																	</div>
																)
															)}
														</div>
													)}
												</motion.div>
											</AnimatePresence>
										</>
									) : (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="space-y-6"
										>
											<h2 className="text-2xl font-bold text-center text-gray-900">
												Contact Us
											</h2>
											<p className="text-center text-gray-600">
												We are looking forward to
												helping with your physical
												training. Please fill in the
												form so we can contact you.
											</p>
											<div className="space-y-4">
												{/* Full Name Input */}
												<Input
													type="text"
													placeholder="Full Name"
													value={formData.fullName}
													onChange={(e) =>
														handleChange(
															"fullName",
															e.target.value
														)
													}
													className="w-full text-black"
													aria-describedby="fullNameError"
												/>
												{errors.fullName && (
													<p
														id="fullNameError"
														className="text-red-500 text-sm"
													>
														{errors.fullName}
													</p>
												)}

												{/* Email Input */}
												<Input
													type="email"
													placeholder="Your Email"
													value={formData.email}
													onChange={(e) =>
														handleChange(
															"email",
															e.target.value
														)
													}
													className="w-full text-black"
												/>
												{errors.email && (
													<p className="text-red-500 text-sm">
														{errors.email}
													</p>
												)}

												{/* Phone Input */}
												<Input
													type="tel"
													placeholder="Your Phone Number"
													value={formData.phone}
													onChange={(e) =>
														handleChange(
															"phone",
															e.target.value
														)
													}
													className="w-full text-black"
												/>
												{errors.phone && (
													<p className="text-red-500 text-sm">
														{errors.phone}
													</p>
												)}
											</div>
										</motion.div>
									)}

									<div className="flex justify-between mt-8">
										<Button
											type="button"
											variant="outline"
											onClick={handlePrevious}
											disabled={currentStep === 0}
											className="flex items-center text-black"
										>
											<ChevronLeft className="mr-2 h-4 w-4" />
											Previous
										</Button>

										{currentStep >= questions.length ? (
											<Button
												onClick={handleSubmit}
												className="bg-[rgb(2,131,192)] text-white hover:bg-[rgb(2,131,192)]/90"
											>
												Submit
											</Button>
										) : (
											<Button
												onClick={handleNext}
												disabled={
													!isCurrentQuestionAnswered()
												}
												className="bg-[rgb(2,131,192)] text-white hover:bg-[rgb(2,131,192)]/90 flex items-center"
											>
												Next
												<ChevronRight className="ml-2 h-4 w-4" />
											</Button>
										)}
									</div>
								</>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
