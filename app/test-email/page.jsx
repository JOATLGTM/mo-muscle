"use client";

import { useState } from "react";
import { generateContactFormEmail } from "@/lib/email-templates/contact-form-template";

export default function TestEmailPage() {
	const [formData, setFormData] = useState({
		fullName: "John Doe",
		email: "johndoe@example.com",
		phone: "6145551234",
		hasCoach: "yes",
		workoutDays: "3",
		goals: ["lose-fat", "build-muscle", "get-stronger"],
		needsMealPlan: "yes",
		coachingPreference: "in-person",
		locationPreference: "hilliard",
		trainerPreference: "mo-nayal",
	});

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleGoalsChange = (goal) => {
		setFormData((prev) => {
			const currentGoals = prev.goals || [];
			const newGoals = currentGoals.includes(goal)
				? currentGoals.filter((g) => g !== goal)
				: [...currentGoals, goal];
			return { ...prev, goals: newGoals };
		});
	};

	const htmlContent = generateContactFormEmail(formData, { isProduction: false });

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Email Template Preview
					</h1>
					<p className="text-gray-600">
						Test and preview your contact form email template
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Form Controls */}
					<div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-bold text-gray-900 mb-4">
							Test Data
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Full Name
								</label>
								<input
									type="text"
									value={formData.fullName}
									onChange={(e) =>
										handleChange("fullName", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone
								</label>
								<input
									type="tel"
									value={formData.phone}
									onChange={(e) =>
										handleChange("phone", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Previous Coach
								</label>
								<select
									value={formData.hasCoach}
									onChange={(e) =>
										handleChange("hasCoach", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Workout Days
								</label>
								<select
									value={formData.workoutDays}
									onChange={(e) =>
										handleChange(
											"workoutDays",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="1">1 day</option>
									<option value="2">2 days</option>
									<option value="3">3 days</option>
									<option value="4">4 days</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Goals (Select Multiple)
								</label>
								<div className="space-y-2">
									{[
										"lose-fat",
										"build-muscle",
										"tone-up",
										"get-stronger",
										"become-healthier",
										"injury",
									].map((goal) => (
										<label
											key={goal}
											className="flex items-center"
										>
											<input
												type="checkbox"
												checked={formData.goals.includes(
													goal
												)}
												onChange={() =>
													handleGoalsChange(goal)
												}
												className="mr-2"
											/>
											<span className="text-sm text-gray-700">
												{goal
													.split("-")
													.map(
														(word) =>
															word.charAt(0).toUpperCase() +
															word.slice(1)
													)
													.join(" ")}
											</span>
										</label>
									))}
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Meal Plan
								</label>
								<select
									value={formData.needsMealPlan}
									onChange={(e) =>
										handleChange(
											"needsMealPlan",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Coaching Type
								</label>
								<select
									value={formData.coachingPreference}
									onChange={(e) =>
										handleChange(
											"coachingPreference",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="in-person">
										In Person
									</option>
									<option value="online">Online</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Location
								</label>
								<select
									value={formData.locationPreference}
									onChange={(e) =>
										handleChange(
											"locationPreference",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="hilliard">Hilliard</option>
									<option value="worthington">
										Worthington
									</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Trainer
								</label>
								<select
									value={formData.trainerPreference}
									onChange={(e) =>
										handleChange(
											"trainerPreference",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
								>
									<option value="mo-nayal">Mo Nayal</option>
									<option value="brie-miller">
										Brie Miller
									</option>
									<option value="no-preference">
										No Preference
									</option>
								</select>
							</div>
						</div>
					</div>

					{/* Email Preview */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-900">
									Email Preview
								</h2>
								<button
									onClick={() => {
										const newWindow = window.open();
										newWindow.document.write(htmlContent);
										newWindow.document.close();
									}}
									className="px-4 py-2 bg-[#0283C0] text-white rounded-md hover:bg-[#016a9e] transition-colors"
								>
									Open in New Window
								</button>
							</div>
							<div className="border border-gray-300 rounded-md overflow-hidden">
								<iframe
									srcDoc={htmlContent}
									className="w-full h-[800px] border-0"
									title="Email Preview"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
