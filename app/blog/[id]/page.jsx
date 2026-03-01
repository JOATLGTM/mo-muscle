"use client";
import React, { useState, useEffect, use } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import Link from "next/link";
import { ArrowLeft, Calendar, Dumbbell } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import useLenis from "@/hooks/useLenis";

export default function BlogPost({ params }) {
	useLenis();
	const unwrappedParams = use(params);
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const postRef = ref(db, `items/${unwrappedParams.id}`);
				const snapshot = await get(postRef);

				if (snapshot.exists()) {
					setPost(snapshot.val());
				}
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [unwrappedParams.id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#050508] flex items-center justify-center">
				<div className="text-white/60 text-xl">Loading...</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="min-h-screen bg-[#050508] flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-display text-white mb-4">Post Not Found</h1>
					<Link
						href="/blog"
						className="text-[#0582c0] hover:text-[#016a9e] transition-colors inline-flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Blog
					</Link>
				</div>
			</div>
		);
	}

	const formatDate = (dateString) => {
		const [year, month, day] = dateString.split("-");
		const date = new Date(year, month - 1, day);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-[#050508]">
			<FloatingNav showOnly={['Home', 'Trainers', 'Blog', 'Why Mo Muscle', 'Schedule']} />

			<article className="relative">
				{/* Hero Section with Image */}
				<section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
					<div className="absolute inset-0 z-0">
						{post.image && (
							<img
								src={post.image}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
						)}
						<div className="absolute inset-0 bg-black/60" />
						<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#050508]" />
					</div>

					<div className="relative z-20 h-full flex flex-col justify-end pb-16 px-6 md:px-12">
					<div className="max-w-4xl mx-auto w-full">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							<span className="font-mono-custom text-sm uppercase tracking-wider">Back to Blog</span>
						</Link>

						<div className="mb-4">
							<img
								src="/badge_logo_white.png"
								alt="Mo Muscle"
								className="w-48 h-8 object-contain"
							/>
						</div>

						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
								{post.title}
							</h1>

							<div className="flex items-center gap-2 text-white/60">
								<Calendar className="w-4 h-4" />
								<span className="font-mono-custom text-sm uppercase tracking-wider">
									{formatDate(post.date)}
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* Content Section */}
				<section className="relative py-16 md:py-24 bg-[#050508]">
					<div className="max-w-4xl mx-auto px-6 md:px-12">
						<div className="prose prose-lg prose-invert max-w-none">
							<p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light">
								{post.description}
							</p>

							{post.content && (
								<div 
									className="text-white/80 leading-relaxed space-y-6"
									dangerouslySetInnerHTML={{ __html: post.content }}
								/>
							)}
						</div>
					</div>
				</section>

				{/* Back to Blog CTA */}
				<section className="relative py-16 bg-[#0A0A0F] border-t border-white/10">
					<div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
						<p className="font-mono-custom text-xs text-[#0582c0] uppercase tracking-wider mb-4">
							Continue Reading
						</p>
						<h2 className="font-display text-3xl md:text-4xl text-white mb-8">
							More From Our Blog
						</h2>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 bg-[#0582c0] text-white hover:bg-[#016a9e] px-8 py-4 rounded-full font-mono-custom text-sm uppercase tracking-wider transition-colors"
						>
							View All Posts
							<ArrowLeft className="w-4 h-4 rotate-180" />
						</Link>
					</div>
				</section>
			</article>
		</div>
	);
}
