"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
	ChevronRight,
	ChevronLeft,
	Dumbbell,
	Target,
	Users,
	X,
	CheckCircle2,
} from "lucide-react";

export default function ScheduleSection({ showModal: externalShowModal, setShowModal: externalSetShowModal }) {
	const [showModal, setShowModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	// Use external state if provided, otherwise use internal state
	const isModalOpen = externalShowModal !== undefined ? externalShowModal : showModal;
	const handleModalChange = externalSetShowModal !== undefined ? externalSetShowModal : setShowModal;
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState({
		hasCoach: "",
		workoutDays: "",
		goals: [],
		needsMealPlan: "",
		coachingPreference: "",
		locationPreference: "",
		trainerPreference: "",
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
			id: "locationPreference",
			question: "Which location do you want to train at?",
			type: "radio",
			options: [
				{ value: "hilliard", label: "Hilliard" },
				{ value: "worthington", label: "Worthington" },
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
		handleModalChange(false);
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

	return (
		<div className="hidden">
			{/* Hidden Schedule Modal - only shown when triggered */}
			<Dialog open={isModalOpen} onOpenChange={handleClose}>
				<DialogContent className="max-w-2xl p-0 bg-transparent border-none backdrop-blur-sm">
					<DialogTitle className="sr-only">
						{isSuccess 
							? "Registration Successful" 
							: currentStep >= questions.length 
								? "Contact Information"
								: questions[currentStep]?.question || "Fitness Questionnaire"
						}
					</DialogTitle>
					<div className="relative bg-[#050508]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
							<button
								onClick={handleClose}
								className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
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
										<CheckCircle2 className="h-16 w-16 text-[#0582c0]" />
									</div>
									<h2 className="font-display text-2xl font-bold text-white mb-4">
										Congratulations!
									</h2>
									<p className="text-white/70 mb-8">
										Thank you for signing up. We will
										contact you shortly to discuss your
										fitness journey.
									</p>
									<button
										onClick={handleClose}
										className="px-8 py-3 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#016a9e] transition-all duration-300"
									>
										Return Home
									</button>
								</motion.div>
							) : (
								<>
									<>
										{currentStep <= questions.length - 1 ? (
											<>
												<div className="mb-8 mt-4">
													<div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
														<div
															className="h-2 bg-[#0582c0] rounded-full transition-all duration-300"
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
													<div className="mt-2 text-sm font-mono-custom text-white/60 uppercase tracking-wider">
														Question{" "}
														{currentStep + 1} of{" "}
														{questions.length}
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
														<h2 className="font-display text-2xl font-bold text-white mb-4">
															{
																questions[
																	currentStep
																].question
															}
														</h2>
														{questions[currentStep]
															.subtext && (
															<p className="text-white/60 -mt-2 mb-4">
																{
																	questions[
																		currentStep
																	].subtext
																}
															</p>
														)}

														{questions[currentStep]
															.type ===
															"radio" && (
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
																	(
																		option
																	) => (
																		<Label
																			key={
																				option.value
																			}
																			htmlFor={`${questions[currentStep].id}-${option.value}`}
																			className="flex items-center p-4 rounded-lg border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300 cursor-pointer bg-white/5 w-full"
																		>
																			<RadioGroupItem
																				value={
																					option.value
																				}
																				id={`${questions[currentStep].id}-${option.value}`}
																				className="border-white/30 text-[#0582c0] focus:ring-[#0582c0]"
																			/>
																			<span className="ml-3 text-lg text-white">
																				{
																					option.label
																				}
																			</span>
																		</Label>
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
																	(
																		option
																	) => (
																		<Label
																			key={
																				option.value
																			}
																			htmlFor={`${questions[currentStep].id}-${option.value}`}
																			className="flex items-center p-4 rounded-lg border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300 cursor-pointer bg-white/5 w-full"
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
																				className="border-white/30 text-[#0582c0] focus:ring-[#0582c0]"
																			/>
																			<span className="ml-3 text-lg text-white">
																				{
																					option.label
																				}
																			</span>
																		</Label>
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
																	onChange={(
																		e
																	) =>
																		handleChange(
																			"trainerPreference",
																			e
																				.target
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
												<h2 className="font-display text-2xl font-bold text-center text-white">
													Contact Us
												</h2>
												<p className="text-center text-white/60">
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
														value={
															formData.fullName
														}
														onChange={(e) =>
															handleChange(
																"fullName",
																e.target.value
															)
														}
														className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#0582c0] focus:ring-[#0582c0]"
													/>
													{errors.fullName && (
														<p className="text-red-400 text-sm">
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
														className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#0582c0] focus:ring-[#0582c0]"
													/>
													{errors.email && (
														<p className="text-red-400 text-sm">
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
														className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#0582c0] focus:ring-[#0582c0]"
													/>
													{errors.phone && (
														<p className="text-red-400 text-sm">
															{errors.phone}
														</p>
													)}
												</div>
											</motion.div>
										)}

										<div className="flex justify-between mt-8">
											<button
												type="button"
												onClick={handlePrevious}
												disabled={currentStep === 0}
												className="flex items-center px-6 py-2.5 border border-white/20 text-white rounded-full hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
											>
												<ChevronLeft className="mr-2 h-4 w-4" />
												Previous
											</button>

											{currentStep >= questions.length ? (
												<button
													onClick={handleSubmit}
													className="px-8 py-2.5 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#016a9e] transition-all duration-300"
												>
													Submit
												</button>
											) : (
												<button
													onClick={handleNext}
													disabled={
														!isCurrentQuestionAnswered()
													}
													className="px-8 py-2.5 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#016a9e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-300"
												>
													Next
													<ChevronRight className="ml-2 h-4 w-4" />
												</button>
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
