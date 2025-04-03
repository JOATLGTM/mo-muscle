"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Menu, X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const [showModal, setShowModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState({
		hasCoach: "",
		workoutDays: "",
		goals: [],
		needsMealPlan: "",
		coachingPreference: "",
		trainerPreference: "", // Added field for the trainer preference
		fullName: "",
		email: "",
		phone: "",
	});
	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		phone: "",
	});

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
			trainerPreference: "", // Reset the trainer preference
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
							<Link
								href="/whymomuscle"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-xs"
								aria-label="Go to why mo muscle page"
							>
								WHY MO MUSCLE?
							</Link>

							<Button
								onClick={() => setShowModal(true)}
								className="bg-white text-[rgb(2,131,192)] hover:bg-white/90 text-sm px-4 py-2"
							>
								SCHEDULE WITH MO MUSCLE
							</Button>
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
							<Link
								href="/whymomuscle"
								className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize font-serif text-sm px-4 py-2"
								aria-label="Go to why mo muscle page"
							>
								WHY MO MUSCLE?
							</Link>
							<Button
								onClick={() => setShowModal(true)}
								className="bg-white text-[rgb(2,131,192)] hover:bg-white/90 text-sm px-4 py-2"
							>
								SCHEDULE WITH MO MUSCLE
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Modal with form */}
			<Dialog open={showModal} onOpenChange={handleClose}>
				<DialogContent className="max-w-2xl p-0 bg-transparent border-none">
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

													{/* Dropdown input for trainer preference */}
													{questions[currentStep]
														.type ===
														"dropdown" && (
														<div className="space-y-4">
															<select
																value={
																	formData.trainerPreference
																}
																onChange={(e) =>
																	handleChange(
																		"trainerPreference",
																		e.target
																			.value
																	)
																}
																className="w-full p-2 border border-gray-300 rounded"
															>
																{questions[
																	currentStep
																].options.map(
																	(
																		option
																	) => (
																		<option
																			key={
																				option.value
																			}
																			value={
																				option.value
																			}
																		>
																			{
																				option.label
																			}
																		</option>
																	)
																)}
															</select>
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
												/>
												{errors.fullName && (
													<p className="text-red-500 text-sm">
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
		</header>
	);
};

export default Header;
