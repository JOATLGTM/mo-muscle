"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, X, CheckCircle2, Heart } from "lucide-react";

const steps = [
	{
		id: "eligibility",
		type: "eligibility",
		title: "Before we begin",
		subtext:
			"The Shawna Miller Scholarship is open to women over the age of 45 in Columbus, Ohio who are currently facing medical or health-related challenges.",
		fields: [
			{
				id: "isInColumbus",
				question: "Are you located in Columbus, Ohio?",
				options: [
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				],
			},
			{
				id: "isOver45",
				question: "Are you a woman over the age of 45?",
				options: [
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				],
			},
			{
				id: "hasHealthChallenges",
				question:
					"Are you currently facing medical or health-related challenges?",
				options: [
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				],
			},
		],
	},
	{
		id: "healthChallenges",
		type: "textarea",
		question: "Tell us about the health challenges you're facing right now.",
		subtext:
			"Share as much or as little as you're comfortable with. This helps our coaches understand where you're starting from.",
		placeholder: "For example: a recent diagnosis, chronic pain, mobility issues, recovery from surgery...",
		minLength: 40,
	},
	{
		id: "whyNow",
		type: "textarea",
		question: "Why is now the right time for you to make a change?",
		subtext: "What has shifted for you? What made you decide to apply today?",
		placeholder: "Tell us what brought you here...",
		minLength: 40,
	},
	{
		id: "whyDeserve",
		type: "textarea",
		question: "Why do you deserve the Shawna Miller Scholarship?",
		subtext:
			"This isn't about being in shape or having it all figured out. It's about being ready.",
		placeholder: "Tell us your story...",
		minLength: 80,
	},
	{
		id: "goals",
		type: "textarea",
		question: "What do you hope to achieve over the next 6 months?",
		subtext: "Think about how you want to feel, move, and live.",
		placeholder: "For example: walk without pain, keep up with my grandkids, lower my blood pressure, feel strong again...",
		minLength: 40,
	},
	{
		id: "commitment",
		type: "textarea",
		question: "How will you commit to showing up?",
		subtext:
			"Consistency is what made Shawna's journey possible. What will consistency look like for you?",
		placeholder: "Tell us how you'll make this a priority...",
		minLength: 40,
	},
	{
		id: "logistics",
		type: "logistics",
		question: "A few quick details",
		fields: [
			{
				id: "locationPreference",
				question: "Which Mo Muscle location is most convenient for you?",
				options: [
					{ value: "hilliard", label: "Hilliard" },
					{ value: "worthington", label: "Worthington" },
					{ value: "either", label: "Either works for me" },
				],
			},
			{
				id: "availability",
				question: "When are you typically available to train?",
				options: [
					{ value: "mornings", label: "Mornings" },
					{ value: "afternoons", label: "Afternoons" },
					{ value: "evenings", label: "Evenings" },
					{ value: "flexible", label: "Flexible" },
				],
			},
		],
	},
	{
		id: "contact",
		type: "contact",
		question: "How can we reach you?",
		subtext: "We'll use this to follow up about your application.",
	},
];

const initialFormData = {
	isInColumbus: "",
	isOver45: "",
	hasHealthChallenges: "",
	healthChallenges: "",
	whyNow: "",
	whyDeserve: "",
	goals: "",
	commitment: "",
	locationPreference: "",
	availability: "",
	fullName: "",
	email: "",
	phone: "",
	age: "",
	referralSource: "",
};

export default function ScholarshipModal({ open, onOpenChange }) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState(initialFormData);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const step = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;

	// Location is a hard requirement: applicants outside Columbus, Ohio cannot continue.
	const isOutsideColumbus = formData.isInColumbus === "no";
	const isEligible =
		formData.isInColumbus === "yes" &&
		formData.isOver45 === "yes" &&
		formData.hasHealthChallenges === "yes";
	const eligibilityAnswered =
		formData.isInColumbus !== "" &&
		formData.isOver45 !== "" &&
		formData.hasHealthChallenges !== "";

	const handleChange = (id, value) => {
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (errors[id]) {
			setErrors((prev) => ({ ...prev, [id]: "" }));
		}
	};

	const handleClose = () => {
		onOpenChange(false);
		// Delay reset so the close animation finishes before content swaps
		setTimeout(() => {
			setCurrentStep(0);
			setFormData(initialFormData);
			setErrors({});
			setIsSuccess(false);
			setSubmitError("");
		}, 250);
	};

	const isCurrentStepComplete = () => {
		switch (step.type) {
			case "eligibility":
				return eligibilityAnswered && !isOutsideColumbus;
			case "textarea":
				return formData[step.id].trim().length >= step.minLength;
			case "logistics":
				return step.fields.every((f) => Boolean(formData[f.id]));
			case "contact":
				return true;
			default:
				return false;
		}
	};

	const handleNext = () => {
		if (!isLastStep && isCurrentStepComplete()) {
			setCurrentStep((s) => s + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) setCurrentStep((s) => s - 1);
	};

	const validateContact = () => {
		const newErrors = {};
		if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
			newErrors.fullName = "Please enter your full name.";
		}
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailPattern.test(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
		}
		if (!/^[0-9]{10}$/.test(formData.phone)) {
			newErrors.phone = "Phone number must be 10 digits.";
		}
		const ageNum = Number(formData.age);
		if (!formData.age || Number.isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
			newErrors.age = "Please enter your age.";
		} else if (ageNum < 46) {
			newErrors.age = "This scholarship is for women over the age of 45.";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateContact()) return;

		setIsSubmitting(true);
		setSubmitError("");
		try {
			const response = await fetch("/api/scholarship-apply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				setIsSuccess(true);
			} else {
				setSubmitError(
					"There was an error submitting your application. Please try again."
				);
			}
		} catch (error) {
			setSubmitError(
				"There was an error submitting your application. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderRadioField = (field) => (
		<div key={field.id} className="space-y-3">
			<p className="text-white font-medium">{field.question}</p>
			<RadioGroup
				value={formData[field.id]}
				onValueChange={(value) => handleChange(field.id, value)}
				className="grid grid-cols-1 sm:grid-cols-2 gap-3"
			>
				{field.options.map((option) => (
					<Label
						key={option.value}
						htmlFor={`${field.id}-${option.value}`}
						className={`flex items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer bg-white/5 w-full ${
							formData[field.id] === option.value
								? "border-[#0582c0]"
								: "border-white/10 hover:border-[#0582c0]/50"
						}`}
					>
						<RadioGroupItem
							value={option.value}
							id={`${field.id}-${option.value}`}
							className="border-white/30 text-[#0582c0]"
						/>
						<span className="ml-3 text-base text-white">
							{option.label}
						</span>
					</Label>
				))}
			</RadioGroup>
		</div>
	);

	const inputClass = (hasError) =>
		`w-full bg-white/5 text-white border-white/10 placeholder:text-white/30 focus:border-[#0582c0] focus-visible:ring-[#0582c0] transition-all duration-300 ${
			hasError ? "border-red-500" : ""
		}`;

	return (
		<Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : handleClose())}>
			<DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 bg-transparent border-none backdrop-blur-sm">
				<DialogTitle className="sr-only">
					{isSuccess
						? "Application Submitted"
						: step.question || step.title || "Scholarship Application"}
				</DialogTitle>

				<div className="relative bg-[#050508]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/10">
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
							className="text-center py-6"
						>
							<div className="mb-6 flex justify-center">
								<CheckCircle2 className="h-16 w-16 text-[#0582c0]" />
							</div>
							<h2 className="font-display text-2xl font-bold text-white mb-4">
								Thank you for sharing your story.
							</h2>
							<p className="text-white/70 mb-8 max-w-md mx-auto">
								Your application for the Shawna Miller
								Scholarship has been received. Our team will
								review every application carefully and reach
								out to you directly.
							</p>
							<button
								onClick={handleClose}
								className="px-8 py-3 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#016a9e] transition-all duration-300"
							>
								Close
							</button>
						</motion.div>
					) : (
						<form onSubmit={handleSubmit}>
							{/* Progress */}
							<div className="mb-8 mt-4 pr-8">
								<div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
									<div
										className="h-2 bg-[#0582c0] rounded-full transition-all duration-300"
										style={{
											width: `${((currentStep + 1) / steps.length) * 100}%`,
										}}
									/>
								</div>
								<div className="mt-2 text-xs font-mono-custom text-white/60 uppercase tracking-wider">
									Step {currentStep + 1} of {steps.length}
								</div>
							</div>

							<AnimatePresence mode="wait">
								<motion.div
									key={currentStep}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2 }}
									className="space-y-6"
								>
									<div>
										<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
											{step.question || step.title}
										</h2>
										{step.subtext && (
											<p className="text-white/60 text-sm sm:text-base">
												{step.subtext}
											</p>
										)}
									</div>

									{step.type === "eligibility" && (
										<div className="space-y-6">
											{step.fields.map(renderRadioField)}
											{isOutsideColumbus && (
												<div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-white/80">
													<p className="mb-2 text-white font-medium">
														We're sorry, this scholarship
														is only available to women
														located in Columbus, Ohio.
													</p>
													<p>
														Both Mo Muscle training
														facilities are in the
														Columbus area, and the
														scholarship requires
														in-person training. We're
														not able to accept
														applications from other
														cities or states at this
														time.
													</p>
												</div>
											)}
											{!isOutsideColumbus && eligibilityAnswered && !isEligible && (
												<div className="rounded-lg border border-[#0582c0]/40 bg-[#0582c0]/10 p-4 text-sm text-white/80">
													<p className="mb-2">
														This scholarship is
														specifically for women
														over 45 facing health
														challenges. You're still
														welcome to apply, and we'd
														love to help you get
														started another way.
													</p>
													<p>
														Reach out through our
														Schedule form and we'll
														find the right fit for you.
													</p>
												</div>
											)}
										</div>
									)}

									{step.type === "textarea" && (
										<div>
											<textarea
												value={formData[step.id]}
												onChange={(e) =>
													handleChange(step.id, e.target.value)
												}
												placeholder={step.placeholder}
												rows={6}
												className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-[#0582c0] focus:outline-none focus:ring-1 focus:ring-[#0582c0] text-white placeholder:text-white/30 p-4 text-base leading-relaxed resize-y transition-all duration-300"
											/>
											<p className="mt-2 text-xs font-mono-custom text-white/40 uppercase tracking-wider">
												{formData[step.id].trim().length <
												step.minLength
													? `At least ${step.minLength} characters`
													: `${formData[step.id].trim().length} characters`}
											</p>
										</div>
									)}

									{step.type === "logistics" && (
										<div className="space-y-6">
											{step.fields.map(renderRadioField)}
										</div>
									)}

									{step.type === "contact" && (
										<div className="space-y-4">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="sm:col-span-2">
													<Label
														htmlFor="fullName"
														className="text-white/80 mb-2 block"
													>
														Full Name
													</Label>
													<Input
														id="fullName"
														value={formData.fullName}
														onChange={(e) =>
															handleChange("fullName", e.target.value)
														}
														placeholder="Your full name"
														className={inputClass(errors.fullName)}
													/>
													{errors.fullName && (
														<p className="text-red-400 text-sm mt-1">
															{errors.fullName}
														</p>
													)}
												</div>
												<div>
													<Label
														htmlFor="email"
														className="text-white/80 mb-2 block"
													>
														Email
													</Label>
													<Input
														id="email"
														type="email"
														value={formData.email}
														onChange={(e) =>
															handleChange("email", e.target.value)
														}
														placeholder="you@example.com"
														className={inputClass(errors.email)}
													/>
													{errors.email && (
														<p className="text-red-400 text-sm mt-1">
															{errors.email}
														</p>
													)}
												</div>
												<div>
													<Label
														htmlFor="phone"
														className="text-white/80 mb-2 block"
													>
														Phone
													</Label>
													<Input
														id="phone"
														type="tel"
														inputMode="numeric"
														value={formData.phone}
														onChange={(e) =>
															handleChange(
																"phone",
																e.target.value.replace(/\D/g, "").slice(0, 10)
															)
														}
														placeholder="10 digit phone number"
														className={inputClass(errors.phone)}
													/>
													{errors.phone && (
														<p className="text-red-400 text-sm mt-1">
															{errors.phone}
														</p>
													)}
												</div>
												<div>
													<Label
														htmlFor="age"
														className="text-white/80 mb-2 block"
													>
														Age
													</Label>
													<Input
														id="age"
														type="number"
														inputMode="numeric"
														min={18}
														max={120}
														value={formData.age}
														onChange={(e) =>
															handleChange("age", e.target.value)
														}
														placeholder="Your age"
														className={inputClass(errors.age)}
													/>
													{errors.age && (
														<p className="text-red-400 text-sm mt-1">
															{errors.age}
														</p>
													)}
												</div>
												<div>
													<Label
														htmlFor="referralSource"
														className="text-white/80 mb-2 block"
													>
														How did you hear about this?{" "}
														<span className="text-white/40">(optional)</span>
													</Label>
													<Input
														id="referralSource"
														value={formData.referralSource}
														onChange={(e) =>
															handleChange("referralSource", e.target.value)
														}
														placeholder="Instagram, a friend, etc."
														className={inputClass(false)}
													/>
												</div>
											</div>
											{submitError && (
												<p className="text-red-400 text-sm">
													{submitError}
												</p>
											)}
										</div>
									)}
								</motion.div>
							</AnimatePresence>

							{/* Navigation */}
							<div className="mt-8 flex items-center justify-between gap-4">
								<button
									type="button"
									onClick={handlePrevious}
									disabled={currentStep === 0}
									className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white/80 font-display text-xs uppercase tracking-wider hover:border-white/50 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
								>
									<ChevronLeft className="w-4 h-4" />
									Back
								</button>

								{isLastStep ? (
									<button
										type="submit"
										disabled={isSubmitting}
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0582c0] text-white font-display text-xs uppercase tracking-wider hover:bg-[#016a9e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Heart className="w-4 h-4" />
										{isSubmitting ? "Submitting..." : "Submit Application"}
									</button>
								) : (
									<button
										type="button"
										onClick={handleNext}
										disabled={!isCurrentStepComplete()}
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0582c0] text-white font-display text-xs uppercase tracking-wider hover:bg-[#016a9e] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
									>
										Continue
										<ChevronRight className="w-4 h-4" />
									</button>
								)}
							</div>
						</form>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
