"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export default function WhyMoMusclePage() {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const dbRef = ref(db, "whymomuscle");
			const snapshot = await get(dbRef);

			if (snapshot.exists()) {
				const items = snapshot.val();
				const itemsArray = Object.keys(items).map((key) => ({
					id: key,
					...items[key],
				}));
				setData(itemsArray);
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="bg-black text-white py-16 md:py-24">
			{/* Hero Section */}
			<div className="container mx-auto mb-16 mt-16 px-8">
				<div className="mx-auto text-center">
					<h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-transparent bg-clip-text">
						Why Choose Mo Muscle?
					</h2>
					<p className="text-xl md:text-2xl mb-8 text-gray-300 md:px-2">
						At Mo Muscle, we're not just a gym – we're a community
						of dedicated individuals committed to transforming lives
						through fitness. Our unique approach combines
						cutting-edge training techniques with personalized
						attention, creating an environment where every member
						can thrive and achieve their goals.
					</p>
					<p className="text-lg text-gray-400">
						Join a supportive community where motivation meets
						results, and every workout brings you closer to becoming
						the strongest version of yourself.
					</p>
				</div>
			</div>

			{/* Image Grid Section */}
			<div className="container mx-auto px-8 md:px-0">
				<h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-transparent bg-clip-text">
					Our Community in Action
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{data.length === 0 ? (
						<p className="text-center text-gray-300 col-span-full">
							Loading...
						</p>
					) : (
						data.map((item) => (
							<div
								key={item.id}
								className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
							>
								{item.image && (
									<div className="relative w-full h-full">
										<img
											src={item.image}
											alt="Why Mo Muscle"
											className="w-full h-full object-cover"
										/>
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</section>
	);
}
