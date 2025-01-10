"use client";

export default function ServicePage() {
	return (
		<div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen overflow-hidden">
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<div className="bg-shape absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
					<div className="bg-shape absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
				</div>
				<div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4] animate-text-shimmer">
						SAMPLE PAGE
					</h1>
				</div>
			</section>
		</div>
	);
}
