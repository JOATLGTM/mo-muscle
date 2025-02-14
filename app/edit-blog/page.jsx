"use client";

import { useState, useEffect } from "react";
import {
	db,
	storage,
	storageRef,
	uploadBytesResumable,
	getDownloadURL,
} from "@/lib/firebase"; // Firebase initialization
import { ref, get, set } from "firebase/database"; // Realtime Database functions
import "./editblog.css";

export default function AddItemForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null); // Optional image
	const [date, setDate] = useState(""); // State to store the date
	const [data, setData] = useState([]);
	const [imageName, setImageName] = useState(""); // State to store the file name
	const [uploading, setUploading] = useState(false); // To track the upload state
	const [error, setError] = useState(null); // To store any upload error

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
			setData(itemsArray); // Set the data state with the fetched items
		} else {
			console.log("No data available");
		}
	};

	useEffect(() => {
		fetchData(); // Fetch data when component mounts
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUploading(true); // Start the upload process

		// Create a reference to the "items" path in the database
		const itemRef = ref(db, "items/" + Date.now()); // Using timestamp as ID for uniqueness

		// If an image is uploaded, upload to Firebase Storage and get the download URL
		let imageURL = null;

		if (image) {
			try {
				// Create a storage reference for the image in Firebase Storage
				const imageRef = storageRef(storage, "images/" + imageName);

				// Upload the image to Firebase Storage
				const uploadTask = uploadBytesResumable(imageRef, image);

				// Wait for the upload to complete and get the download URL
				await uploadTask;

				// Once upload completes, get the image URL
				imageURL = await getDownloadURL(uploadTask.snapshot.ref);
				console.log("File uploaded successfully, URL:", imageURL);
			} catch (error) {
				setError(error.message);
				setUploading(false);
				return; // Stop further execution if upload fails
			}
		}

		// Add a new item with title, description, image URL (if an image is uploaded), and date
		try {
			await set(itemRef, {
				title,
				description,
				image: imageURL, // Save the full URL, not just the name
				date, // Save the date
			});
		} catch (error) {
			setError("Error saving data: " + error.message);
			setUploading(false);
			return;
		}

		// Reset form fields
		setTitle("");
		setDescription("");
		setImage(null);
		setDate(""); // Reset the date field

		// Fetch updated data
		fetchData();
		setUploading(false); // Reset uploading state
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
					<button type="submit" disabled={uploading}>
						{uploading ? "Uploading..." : "Add Item"}
					</button>
				</form>

				{error && <p style={{ color: "red" }}>Error: {error}</p>}

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
											src={item.image} // Image URL from Firebase Storage
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
