import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }): Promise<Metadata> {
	// In a real implementation, fetch post data from your CMS or database
	const post = {
		title: "Sample Blog Post Title",
		description:
			"This is a sample blog post description that will be replaced with actual content.",
		date: "2024-03-20",
		author: "Mo Muscle",
		image: "/blog-placeholder.jpg",
	};

	return {
		title: `${post.title} | Mo Muscle Blog`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			images: [
				{
					url: post.image,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [post.image],
		},
	};
}

export default function BlogPost({ params }) {
	return (
		<article className="max-w-4xl mx-auto px-4 py-12">
			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">
					Sample Blog Post Title
				</h1>
				<div className="flex items-center text-gray-600 mb-4">
					<span className="mr-4">By Mo Muscle</span>
					<span>March 20, 2024</span>
				</div>
				<div className="relative w-full h-[400px] mb-8">
					<Image
						src="/blog-placeholder.jpg"
						alt="Blog post featured image"
						fill
						className="object-cover rounded-lg"
					/>
				</div>
			</header>

			<div className="prose prose-lg max-w-none">
				<p>
					This is a sample blog post template. Replace this content
					with your actual blog post content. Make sure to include
					relevant keywords naturally throughout the content.
				</p>

				<h2>Key Points to Include</h2>
				<ul>
					<li>Valuable information for your target audience</li>
					<li>Expert insights and tips</li>
					<li>Real-world examples and case studies</li>
					<li>Actionable advice</li>
				</ul>

				<h2>Engage Your Readers</h2>
				<p>
					Include a call-to-action at the end of your post to
					encourage engagement and sharing. This could be a question,
					a request for comments, or an invitation to learn more about
					your services.
				</p>
			</div>

			<footer className="mt-12 pt-8 border-t">
				<div className="flex flex-wrap gap-4">
					<span className="text-sm text-gray-600">
						Share this post:
					</span>
					{/* Add social sharing buttons here */}
				</div>
			</footer>
		</article>
	);
}
