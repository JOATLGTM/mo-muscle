"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firebase initialization
import { ref, get } from "firebase/database"; // Realtime Database functions

export default function BlogPage() {
	const [data, setData] = useState([]); // State to store data from Firebase

	// Fetch data from Firebase on component mount
	const fetchData = async () => {
		try {
			const dbRef = ref(db, "items"); // Reference to the "items" collection in Firebase
			const snapshot = await get(dbRef);

			if (snapshot.exists()) {
				const items = snapshot.val();
				const itemsArray = Object.keys(items).map((key) => ({
					id: key,
					...items[key],
				}));

				// Sort the items by date (most recent first)
				const sortedItems = itemsArray.sort((a, b) => {
					const [yearA, monthA, dayA] = a.date.split("-");
					const [yearB, monthB, dayB] = b.date.split("-");

					const dateA = new Date(yearA, monthA - 1, dayA);
					const dateB = new Date(yearB, monthB - 1, dayB);

					return dateB - dateA; // Sort in descending order
				});

				setData(sortedItems); // Update state with sorted data
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
			setData([]); // Handle error gracefully
		}
	};

	useEffect(() => {
		fetchData(); // Fetch data when the component mounts
	}, []);

	return (
		<section className="bg-black text-white py-16 px-4 text-center">
			<div className="container mx-auto py-16">
				<h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-transparent bg-clip-text">
					Blog
				</h2>
				<p className="text-xl md:text-2xl mb-8 text-gray-300 md:px-2">
					Welcome to the Mo Muscle Blog — where we share more than
					just workouts. Here, you'll find stories about community
					events, behind-the-scenes moments, and how Mo Muscle
					continues to uplift and inspire beyond the gym. From charity
					drives to local outreach, we're building strength both
					inside and outside the gym
				</p>
				<p className="text-lg text-gray-400 pb-16">
					Explore how our community turns motivation into real
					results—each story and event brings members one step closer
					to becoming the strongest version of themselves.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{data.length === 0 ? (
						<p className="text-center text-gray-300">Loading...</p>
					) : (
						data.map((item) => {
							// Split the string into parts
							const [year, month, day] = item.date.split("-");

							// Create a new Date object with the correct local time
							const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

							// Format the date as "Month Day, Year"
							const options = {
								year: "numeric",
								month: "long",
								day: "numeric",
							};
							const formattedDate = date.toLocaleDateString(
								"en-US",
								options
							);

							return (
								<div
									key={item.id}
									className="relative bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
								>
									<div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-lg"></div>
									{item.image !== undefined && (
										<img
											src={item.image}
											alt={item.title}
											className="rounded-lg"
										/>
									)}
									<h3 className="text-2xl font-playfair text-gradient mb-4 mt-4">
										{item.title}
									</h3>
									{/* Render the date below the title */}
									<p className="text-sm text-gray-400 mb-4">
										{formattedDate}
									</p>
									<p className="text-sm text-gray-300">
										{item.description}
									</p>
								</div>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
