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
		<section className="bg-black text-white py-16 px-4">
			<div className="container mx-auto">
				<h1 className="text-4xl font-bold text-center m-12 bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-transparent bg-clip-text">
					Why Mo Muscle?
				</h1>
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
