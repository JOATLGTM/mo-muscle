"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [service, setService] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const formRef = useRef(null);
	const searchParams = useSearchParams();

	useEffect(() => {
		const plan = searchParams.get("plan");
		if (plan) {
			setService(plan);
		}
	}, [searchParams]);

	useEffect(() => {
		setIsFormValid(
			name !== "" && email !== "" && phone !== "" && service !== ""
		);
	}, [name, email, phone, service]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(formRef.current, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				ease: "power3.out",
			});
			gsap.from(".form-input", {
				opacity: 0,
				y: 20,
				duration: 0.5,
				stagger: 0.1,
				ease: "power2.out",
				delay: 0.3,
			});
		});

		return () => ctx.revert();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, phone, service }),
			});

			if (response.ok) {
				setSubmitMessage(
					"Thank you for your submission. We'll be in touch soon!"
				);
				setName("");
				setEmail("");
				setPhone("");
				setService("");
			} else {
				setSubmitMessage(
					"There was an error submitting the form. Please try again."
				);
			}
		} catch (error) {
			setSubmitMessage(
				"There was an error submitting the form. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
			<div
				ref={formRef}
				className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-80 border border-gray-700"
			>
				<h1 className="text-4xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
					Contact Us
				</h1>
				<p className="text-white text-center mb-6">
					We are looking forward to helping with your physical
					training. Please fill in the form so we can contact you.
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="form-input">
						<Input
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full bg-gray-700 text-white border-gray-600 focus:border-[#0283C0] transition-all duration-300"
						/>
					</div>
					<div className="form-input">
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full bg-gray-700 text-white border-gray-600 focus:border-[#0283C0] transition-all duration-300"
						/>
					</div>
					<div className="form-input">
						<Input
							type="tel"
							placeholder="Phone Number"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							className="w-full bg-gray-700 text-white border-gray-600 focus:border-[#0283C0] transition-all duration-300"
						/>
					</div>
					<div className="form-input">
						<Select
							onValueChange={setService}
							value={service}
							required
						>
							<SelectTrigger className="w-full bg-gray-700 text-white border-gray-600 focus:border-[#0283C0] transition-all duration-300">
								<SelectValue placeholder="Select a plan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="3-month-plan">
									3 Month Plan
								</SelectItem>
								<SelectItem value="6-month-plan">
									6 Month Plan
								</SelectItem>
								<SelectItem value="12-month-plan">
									12 Month Plan
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex justify-between items-center space-x-4">
						<Link href="/" className="w-1/2">
							<Button
								type="button"
								variant="outline"
								className="w-full bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white transition-all duration-300"
							>
								Back
							</Button>
						</Link>
						<Button
							type="submit"
							disabled={!isFormValid || isSubmitting}
							className="w-1/2 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#026a9c] hover:to-[#0283C0] transition-all duration-300"
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</form>
				{submitMessage && (
					<p className="mt-4 text-center text-white">
						{submitMessage}
					</p>
				)}
			</div>
		</div>
	);
}
