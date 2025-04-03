"use client";

import { useState, useEffect } from "react";
import {
	db,
	storage,
	storageRef,
	uploadBytesResumable,
	getDownloadURL,
} from "@/lib/firebase";
import { ref, get, set } from "firebase/database";
import "./editwhymomuscle.css";

export default function EditWhyMoMuscleForm() {
	const [images, setImages] = useState([]);
	const [data, setData] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [uploadProgress, setUploadProgress] = useState({});

	const fetchData = async () => {
		const dbRef = ref(db, "whymomuscle");
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
		if (images.length === 0) return;

		setUploading(true);
		setError(null);
		setUploadProgress({});

		try {
			const uploadPromises = images.map(async (image) => {
				const fileName = `${Date.now()}-${image.name.toLowerCase()}`;
				const imageRef = storageRef(storage, "whymomuscle/" + fileName);

				// Create upload task
				const uploadTask = uploadBytesResumable(imageRef, image);

				// Track progress
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100;
						setUploadProgress((prev) => ({
							...prev,
							[fileName]: progress,
						}));
					},
					(error) => {
						console.error("Upload error:", error);
						setError(
							`Error uploading ${fileName}: ${error.message}`
						);
					}
				);

				// Wait for upload to complete
				await uploadTask;

				// Get download URL
				const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

				// Save to database
				const itemRef = ref(db, "whymomuscle/" + Date.now());
				await set(itemRef, {
					image: imageURL,
				});

				return imageURL;
			});

			// Wait for all uploads to complete
			await Promise.all(uploadPromises);

			// Reset form and refresh data
			setImages([]);
			fetchData();
		} catch (error) {
			setError("Error uploading images: " + error.message);
		} finally {
			setUploading(false);
			setUploadProgress({});
		}
	};

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setImages((prev) => [...prev, ...files]);
	};

	const removeImage = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<section className="relative min-h-screen pt-16 md:pt-24 overflow-hidden">
			<div className="blog-container">
				<form onSubmit={handleSubmit}>
					<div className="file-upload">
						<input
							type="file"
							onChange={handleFileChange}
							accept="image/*"
							multiple
						/>
					</div>

					{/* Preview selected images */}
					{images.length > 0 && (
						<div className="selected-images mt-4">
							<h3 className="text-white mb-2">
								Selected Images:
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{images.map((image, index) => (
									<div key={index} className="relative">
										<img
											src={URL.createObjectURL(image)}
											alt={`Preview ${index + 1}`}
											className="w-full h-32 object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
										>
											×
										</button>
										{uploadProgress[image.name] && (
											<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
												<div
													className="bg-blue-500 h-1 rounded"
													style={{
														width: `${
															uploadProgress[
																image.name
															]
														}%`,
													}}
												></div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={uploading || images.length === 0}
						className="mt-4"
					>
						{uploading ? "Uploading..." : "Upload Images"}
					</button>
				</form>

				{error && <p style={{ color: "red" }}>Error: {error}</p>}

				<section className="blog-list">
					<h2>Why Mo Muscle Gallery</h2>
					{data.length === 0 ? (
						<p>
							No images available. Add some images to showcase why
							Mo Muscle is the right choice!
						</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{data.map((item) => (
								<div
									key={item.id}
									className="item-card hover-lift"
								>
									{item.image ? (
										<img
											src={item.image}
											alt="Why Mo Muscle"
											className="rounded-lg w-full h-64 object-cover"
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
