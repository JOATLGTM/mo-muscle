"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { gsap } from "gsap";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [matchPassword, setMatchPassword] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		setIsFormValid(
			email !== "" && password !== "" && password === matchPassword
		);
	}, [email, password, matchPassword]);

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

	const handleSubmit = () => {
		e.preventDefault();
		console.log("Form submitted", { email, password });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
			<div
				ref={formRef}
				className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-80 border border-gray-700"
			>
				<h1 className="text-4xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
					Login
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
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
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full bg-gray-700 text-white border-gray-600 focus:border-[#0283C0] transition-all duration-300"
						/>
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
						<Link href="/register" className="w-1/2">
							<Button
								type="button"
								disabled={!isFormValid}
								className="w-full bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#026a9c] hover:to-[#0283C0] transition-all duration-300"
							>
								Register
							</Button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
