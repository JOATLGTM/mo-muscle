"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firebase initialization
import { ref, get } from "firebase/database"; // Realtime Database functions
import Image from "next/image";

export default function BlogPage() {
	const [data, setData] = useState([]); // State to store data from Firebase

	// Fetch data from Firebase on component mount
	const fetchData = async () => {
		const dbRef = ref(db, "items"); // Reference to the "items" collection in Firebase
		const snapshot = await get(dbRef);

		if (snapshot.exists()) {
			const items = snapshot.val();
			const itemsArray = Object.keys(items).map((key) => ({
				id: key,
				...items[key],
			}));
			setData(itemsArray); // Update state with fetched data
		} else {
			console.log("No data available");
		}
	};

	useEffect(() => {
		fetchData(); // Fetch data when the component mounts
	}, []);

	return (
		<section className="bg-black text-white py-16 px-4">
			<div className="container mx-auto">
				<h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-transparent bg-clip-text">
					Blog
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{data.length === 0 ? (
						<p className="text-center text-gray-300">Loading...</p>
					) : (
						data.map((item) => {
							console.log(item.image === undefined);
							return (
								<div
									key={item.id}
									className="relative bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] opacity-20 rounded-lg"></div>
									{/* {item.image && (
									<Image
										src={item.image} // Fallback image if image is missing
										alt={item.title}
										className="w-full h-64 object-cover rounded-lg mb-6"
										height={300}
										width={500}
									/>
								)} */}
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
