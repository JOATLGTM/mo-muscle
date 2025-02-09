"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firebase initialization
import { ref, set, get } from "firebase/database"; // Realtime Database functions
import "./editblog.css";

export default function AddItemForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null); // Optional image
	const [date, setDate] = useState(""); // State to store the date
	const [data, setData] = useState([]);
	const [imageName, setImageName] = useState(""); // State to store the file name

	// Fetch existing data from Realtime Database
	const fetchData = async () => {
		const dbRef = ref(db, "items"); // Reference to the "items" collection in Realtime Database
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const items = snapshot.val();
			const itemsArray = Object.keys(items).map((key) => ({
				id: key,
				...items[key],
			}));
			setData(itemsArray);
		} else {
			console.log("No data available");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create a reference to the "items" path in the database
		const itemRef = ref(db, "items/" + Date.now()); // Using timestamp as ID for uniqueness

		// Add a new item with title, description, image URL (if an image is uploaded), and date
		await set(itemRef, {
			title,
			description,
			image: image ? image.name : null, // Optional image field
			date, // Save the date
		});

		// Reset form fields
		setTitle("");
		setDescription("");
		setImage(null);
		setDate(""); // Reset the date field

		fetchData();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);

			// Convert file name to lowercase to ensure consistency
			const fileName = file.name.toLowerCase();
			setImageName(fileName); // Update the file name state
		}
	};

	return (
		<section className="relative min-h-screen pt-16 md:pt-24 overflow-hidden">
			<div className="blog-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<div className="file-upload">
						<input type="file" onChange={handleFileChange} />
					</div>
					<button type="submit">Add Item</button>
				</form>

				<section className="blog-list">
					<h2>Blog Items</h2>
					{data.length === 0 ? (
						<p>There are no blogs Mo. You should write something</p>
					) : (
						<div>
							{data.map((item) => (
								<div
									key={item.id}
									className="item-card hover-lift"
								>
									<h3 className="font-playfair text-xl">
										Title
									</h3>
									<p>{item.title}</p>
									<h3 className="font-playfair text-xl">
										Description
									</h3>
									<p className="text-white">
										{item.description}
									</p>

									<h3 className="font-playfair text-xl">
										Date
									</h3>
									<p>{item.date}</p>
									<h3 className="font-playfair text-xl">
										Image
									</h3>
									{item.image ? (
										<img
											src={item.image}
											alt={item.title}
											className="rounded-lg"
										/>
									) : (
										"No image available"
									)}
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</section>
	);
}
