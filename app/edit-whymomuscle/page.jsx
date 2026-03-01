"use client";

import { useState, useEffect } from "react";
import {
	db,
	storage,
	storageRef,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "@/lib/firebase";
import { ref, get, set, remove } from "firebase/database";
import { Upload, Image as ImageIcon, X, CheckCircle2, AlertCircle, Loader2, Trash2 } from "lucide-react";

export default function EditWhyMoMuscleForm() {
	const [images, setImages] = useState([]);
	const [data, setData] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [deleting, setDeleting] = useState(null);

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
		setSuccess(false);
		setUploadProgress({});

		try {
			const uploadPromises = images.map(async (image, index) => {
				const fileName = `${Date.now()}-${index}-${image.name.toLowerCase()}`;
				const imageRef = storageRef(storage, "whymomuscle/" + fileName);

				const uploadTask = uploadBytesResumable(imageRef, image);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100;
						setUploadProgress((prev) => ({
							...prev,
							[image.name]: progress,
						}));
					},
					(error) => {
						console.error("Upload error:", error);
						setError(
							`Error uploading ${fileName}: ${error.message}`
						);
					}
				);

				await uploadTask;
				const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

				const itemRef = ref(db, "whymomuscle/" + Date.now() + "-" + index);
				await set(itemRef, {
					image: imageURL,
					fileName: fileName,
				});

				return imageURL;
			});

			await Promise.all(uploadPromises);

			setSuccess(true);
			setImages([]);
			fetchData();
			
			setTimeout(() => setSuccess(false), 3000);
		} catch (error) {
			setError("Error uploading images: " + error.message);
		} finally {
			setUploading(false);
			setUploadProgress({});
		}
	};

	const handleDelete = async (item) => {
		if (!confirm("Are you sure you want to delete this image?")) return;

		setDeleting(item.id);
		try {
			// Delete from database
			const itemRef = ref(db, `whymomuscle/${item.id}`);
			await remove(itemRef);

			// Delete from storage if fileName exists
			if (item.fileName) {
				const imageRef = storageRef(storage, `whymomuscle/${item.fileName}`);
				await deleteObject(imageRef);
			}

			fetchData();
		} catch (error) {
			setError("Error deleting image: " + error.message);
		} finally {
			setDeleting(null);
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
		<div className="min-h-screen bg-[#050508] text-white flex">
			{/* Left Side - Fixed Form */}
			<div className="w-full lg:w-2/5 xl:w-1/3 h-screen sticky top-0 p-8 lg:p-12 overflow-y-auto border-r border-white/10">
				<div className="max-w-xl">
					{/* Header */}
					<div className="mb-8">
						<img
							src="/badge_logo_white.png"
							alt="Mo Muscle"
							className="h-8 object-contain mb-6"
						/>
						<h1 className="font-display text-3xl lg:text-4xl text-white mb-2">
							Gallery <span className="text-[#0582c0]">Manager</span>
						</h1>
						<p className="text-white/60 text-sm font-mono-custom uppercase tracking-wider">
							Why Mo Muscle Admin
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* File Upload Area */}
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-mono-custom text-white/80 uppercase tracking-wider">
								<ImageIcon className="w-4 h-4" />
								Upload Images
							</label>
							<div className="relative">
								<input
									type="file"
									onChange={handleFileChange}
									accept="image/*"
									multiple
									className="hidden"
									id="file-upload"
								/>
								<label
									htmlFor="file-upload"
									className="flex flex-col items-center justify-center gap-3 w-full px-4 py-12 bg-white/5 border-2 border-dashed border-white/10 rounded-lg text-white/60 hover:border-[#0582c0]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
								>
									<Upload className="w-8 h-8 group-hover:text-[#0582c0] transition-colors" />
									<div className="text-center">
										<p className="text-sm font-medium">
											Click to upload or drag and drop
										</p>
										<p className="text-xs text-white/40 mt-1">
											Multiple images supported
										</p>
									</div>
								</label>
							</div>
						</div>

						{/* Preview Selected Images */}
						{images.length > 0 && (
							<div className="space-y-3">
								<p className="text-sm font-mono-custom text-white/80 uppercase tracking-wider">
									Selected: {images.length} image{images.length > 1 ? 's' : ''}
								</p>
								<div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
									{images.map((image, index) => (
										<div key={index} className="relative group">
											<img
												src={URL.createObjectURL(image)}
												alt={`Preview ${index + 1}`}
												className="w-full h-32 object-cover rounded-lg"
											/>
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
											>
												<X className="w-4 h-4" />
											</button>
											{uploadProgress[image.name] !== undefined && (
												<div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 rounded-b-lg">
													<div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
														<div
															className="bg-[#0582c0] h-full transition-all duration-300"
															style={{
																width: `${uploadProgress[image.name]}%`,
															}}
														/>
													</div>
													<p className="text-xs text-white/80 mt-1 text-center">
														{Math.round(uploadProgress[image.name])}%
													</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Success/Error Messages */}
						{success && (
							<div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
								<CheckCircle2 className="w-5 h-5" />
								Images uploaded successfully!
							</div>
						)}

						{error && (
							<div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
								<AlertCircle className="w-5 h-5" />
								{error}
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={uploading || images.length === 0}
							className="w-full px-6 py-4 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-lg hover:bg-[#016a9e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{uploading ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Uploading {images.length} image{images.length > 1 ? 's' : ''}...
								</>
							) : (
								<>
									<Upload className="w-5 h-5" />
									Upload {images.length > 0 ? `${images.length} ` : ''}Image{images.length !== 1 ? 's' : ''}
								</>
							)}
						</button>
					</form>
				</div>
			</div>

			{/* Right Side - Scrollable Masonry Gallery */}
			<div className="w-full lg:w-3/5 xl:w-2/3 h-screen overflow-y-auto p-8 lg:p-12">
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="mb-12">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-2">
							Gallery Images
						</p>
						<h2 className="font-display text-3xl text-white">
							Why Mo Muscle <span className="text-white/40">Gallery</span>
						</h2>
					</div>

					{/* Gallery Grid */}
					{data.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20 text-center">
							<div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
								<ImageIcon className="w-10 h-10 text-white/30" />
							</div>
							<h3 className="text-xl text-white/60 mb-2">No images yet</h3>
							<p className="text-white/40 text-sm">
								Upload images to showcase Why Mo Muscle
							</p>
						</div>
					) : (
						<div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
							{data.map((item) => (
								<div
									key={item.id}
									className="group relative break-inside-avoid mb-4"
								>
									<div className="relative overflow-hidden rounded-lg border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300">
										{item.image && (
											<img
												src={item.image}
												alt="Why Mo Muscle"
												className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
											/>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										
										{/* Delete Button */}
										<button
											onClick={() => handleDelete(item)}
											disabled={deleting === item.id}
											className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white rounded-lg px-3 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
										>
											{deleting === item.id ? (
												<>
													<Loader2 className="w-4 h-4 animate-spin" />
													<span className="text-xs font-medium">Deleting...</span>
												</>
											) : (
												<>
													<Trash2 className="w-4 h-4" />
													<span className="text-xs font-medium">Delete</span>
												</>
											)}
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
