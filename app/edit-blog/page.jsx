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
import { Upload, Image as ImageIcon, Calendar, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AddItemForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [date, setDate] = useState("");
	const [data, setData] = useState([]);
	const [imageName, setImageName] = useState("");
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

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
		setUploading(true);
		setError(null);
		setSuccess(false);

		const itemRef = ref(db, "items/" + Date.now());
		let imageURL = null;

		if (image) {
			try {
				const imageRef = storageRef(storage, "images/" + imageName);
				const uploadTask = uploadBytesResumable(imageRef, image);
				await uploadTask;
				imageURL = await getDownloadURL(uploadTask.snapshot.ref);
			} catch (error) {
				setError(error.message);
				setUploading(false);
				return;
			}
		}

		try {
			await set(itemRef, {
				title,
				description,
				image: imageURL,
				date,
			});
			
			setSuccess(true);
			setTitle("");
			setDescription("");
			setImage(null);
			setImageName("");
			setDate("");
			
			fetchData();
			
			setTimeout(() => setSuccess(false), 3000);
		} catch (error) {
			setError("Error saving data: " + error.message);
		}
		
		setUploading(false);
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
							Blog <span className="text-[#0582c0]">Editor</span>
						</h1>
						<p className="text-white/60 text-sm font-mono-custom uppercase tracking-wider">
							Admin Panel
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Title Input */}
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-mono-custom text-white/80 uppercase tracking-wider">
								<FileText className="w-4 h-4" />
								Title
							</label>
							<input
								type="text"
								placeholder="Enter blog title..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#0582c0] focus:ring-2 focus:ring-[#0582c0]/20 transition-all duration-300"
							/>
						</div>

						{/* Description Textarea */}
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-mono-custom text-white/80 uppercase tracking-wider">
								<FileText className="w-4 h-4" />
								Description
							</label>
							<textarea
								placeholder="Write your blog content..."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
								rows={8}
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#0582c0] focus:ring-2 focus:ring-[#0582c0]/20 transition-all duration-300 resize-none"
							/>
						</div>

						{/* Date Input */}
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-mono-custom text-white/80 uppercase tracking-wider">
								<Calendar className="w-4 h-4" />
								Publish Date
							</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0582c0] focus:ring-2 focus:ring-[#0582c0]/20 transition-all duration-300"
							/>
						</div>

						{/* Image Upload */}
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-mono-custom text-white/80 uppercase tracking-wider">
								<ImageIcon className="w-4 h-4" />
								Cover Image
							</label>
							<div className="relative">
								<input
									type="file"
									onChange={handleFileChange}
									accept="image/*"
									className="hidden"
									id="file-upload"
								/>
								<label
									htmlFor="file-upload"
									className="flex items-center justify-center gap-3 w-full px-4 py-6 bg-white/5 border-2 border-dashed border-white/10 rounded-lg text-white/60 hover:border-[#0582c0]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
								>
									<Upload className="w-5 h-5 group-hover:text-[#0582c0] transition-colors" />
									<span className="text-sm">
										{imageName || "Click to upload image"}
									</span>
								</label>
							</div>
						</div>

						{/* Success/Error Messages */}
						{success && (
							<div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
								<CheckCircle2 className="w-5 h-5" />
								Blog post published successfully!
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
							disabled={uploading}
							className="w-full px-6 py-4 bg-[#0582c0] text-white font-display text-sm uppercase tracking-wider rounded-lg hover:bg-[#016a9e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{uploading ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Publishing...
								</>
							) : (
								<>
									<Upload className="w-5 h-5" />
									Publish Blog Post
								</>
							)}
						</button>
					</form>
				</div>
			</div>

			{/* Right Side - Scrollable Blog List */}
			<div className="w-full lg:w-3/5 xl:w-2/3 h-screen overflow-y-auto p-8 lg:p-12">
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="mb-12">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-2">
							Published Posts
						</p>
						<h2 className="font-display text-3xl text-white">
							All <span className="text-white/40">Blog Posts</span>
						</h2>
					</div>

					{/* Blog Grid */}
					{data.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20 text-center">
							<div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
								<FileText className="w-10 h-10 text-white/30" />
							</div>
							<h3 className="text-xl text-white/60 mb-2">No blog posts yet</h3>
							<p className="text-white/40 text-sm">
								Create your first blog post to get started
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{data.map((item) => {
								const [year, month, day] = item.date.split("-");
								const date = new Date(year, month - 1, day);
								const formattedDate = date.toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								});

								return (
									<div
										key={item.id}
										className="group relative overflow-hidden rounded-lg bg-[#0A0A0F] border border-white/10 hover:border-[#0582c0]/50 transition-all duration-300 h-full"
									>
										{item.image && (
											<div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0F]">
												<img
													src={item.image}
													alt={item.title}
													className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />
											</div>
										)}
										<div className="p-6">
											<p className="text-xs font-mono-custom text-[#0582c0] uppercase tracking-wider mb-3">
												{formattedDate}
											</p>
											<h3 className="font-display text-xl text-white mb-3 group-hover:text-[#0582c0] transition-colors duration-300 line-clamp-2">
												{item.title}
											</h3>
											<p className="text-white/60 text-sm leading-relaxed line-clamp-3">
												{item.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
