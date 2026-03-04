import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const workoutVideos = [
	"/videos/video1.mp4",
	"/videos/video2.mp4",
	"/videos/video3.mp4",
	"/videos/video4.mp4",
	"/videos/video5.mp4",
	"/videos/video6.mp4",
	"/videos/video7.mp4",
];

const VideoCarousel = () => {
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [isVideoLoading, setIsVideoLoading] = useState(true);

	// Function to open modal at specific index
	const openVideoModal = (index) => {
		setCurrentVideoIndex(index);
		setIsVideoModalOpen(true);
		setIsVideoLoading(true);
		// Prevent body scroll when modal opens
		document.body.style.overflow = 'hidden';
	};

	// Function to close modal
	const closeVideoModal = () => {
		setIsVideoModalOpen(false);
		setIsVideoLoading(true);
		// Restore body scroll
		document.body.style.overflow = 'unset';
	};

	// Navigate to next video
	const goToNextVideo = (e) => {
		e?.stopPropagation();
		setCurrentVideoIndex((prev) => (prev + 1) % workoutVideos.length);
		setIsVideoLoading(true);
	};

	// Navigate to previous video
	const goToPreviousVideo = (e) => {
		e?.stopPropagation();
		setCurrentVideoIndex((prev) => (prev - 1 + workoutVideos.length) % workoutVideos.length);
		setIsVideoLoading(true);
	};

	// Handle keyboard navigation
	useEffect(() => {
		if (!isVideoModalOpen) return;

		const handleKeyPress = (e) => {
			if (e.key === 'Escape') {
				closeVideoModal();
			} else if (e.key === 'ArrowRight') {
				goToNextVideo();
			} else if (e.key === 'ArrowLeft') {
				goToPreviousVideo();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [isVideoModalOpen]);

	// Custom arrow components
	const NextArrow = ({ onClick }) => (
		<button
			onClick={onClick}
			className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#0582c0] hover:bg-[#016a9e] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
			aria-label="Next videos"
		>
			<ChevronRight className="w-6 h-6 text-white" />
		</button>
	);

	const PrevArrow = ({ onClick }) => (
		<button
			onClick={onClick}
			className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#0582c0] hover:bg-[#016a9e] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
			aria-label="Previous videos"
		>
			<ChevronLeft className="w-6 h-6 text-white" />
		</button>
	);

	// Slider settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		],
		dotsClass: "slick-dots !bottom-[-40px]",
		customPaging: () => (
			<div className="w-3 h-3 bg-white/30 rounded-full hover:bg-[#0582c0]/50 transition-colors duration-300 [.slick-active_&]:bg-[#0582c0] [.slick-active_&]:scale-125" />
		),
	};

	return (
		<div className="relative pb-12">
			<h4 className="font-display text-2xl text-[#0582c0] mb-8 uppercase tracking-wider">
				VIEW OUR WORKOUTS
			</h4>

			{/* React Slick Carousel */}
			<Slider {...settings}>
				{workoutVideos.map((video, index) => (
					<div key={index} className="px-2">
						<button 
							onClick={() => openVideoModal(index)}
							className="group relative w-full aspect-[9/16] rounded-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0582c0]"
						>
							<div className="relative w-full h-full bg-void-black">
								<video
									src={video}
									className="w-full h-full object-cover"
									muted
									playsInline
								/>
								{/* Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
								
								{/* Play button */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="w-16 h-16 bg-[#0582c0] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
										<Play className="w-8 h-8 text-white ml-1" fill="white" />
									</div>
								</div>

								{/* Video number */}
								<div className="absolute bottom-4 left-4 text-white font-mono-custom text-sm">
									Video {index + 1}
								</div>
							</div>
						</button>
					</div>
				))}
			</Slider>

			{/* Enhanced Modal */}
			{isVideoModalOpen && (
				<div
					className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4"
					onClick={closeVideoModal}
				>
					<div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
						{/* Video counter */}
						<div className="absolute -top-12 left-0 text-white font-mono-custom text-sm">
							{currentVideoIndex + 1} / {workoutVideos.length}
						</div>

						{/* Close button */}
						<button
							onClick={closeVideoModal}
							className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
							aria-label="Close video"
						>
							<X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
						</button>

						{/* Previous button */}
						<button
							onClick={goToPreviousVideo}
							className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0582c0] hover:bg-[#016a9e] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 z-10"
							aria-label="Previous video"
						>
							<ChevronLeft className="w-6 h-6 text-white" />
						</button>

						{/* Next button */}
						<button
							onClick={goToNextVideo}
							className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0582c0] hover:bg-[#016a9e] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 z-10"
							aria-label="Next video"
						>
							<ChevronRight className="w-6 h-6 text-white" />
						</button>

						{/* Loading spinner */}
						{isVideoLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-void-black rounded-lg">
								<div className="w-16 h-16 border-4 border-[#0582c0] border-t-transparent rounded-full animate-spin" />
							</div>
						)}

						{/* Video player */}
						<video
							key={currentVideoIndex}
							src={workoutVideos[currentVideoIndex]}
							controls
							autoPlay
							className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
							onLoadedData={() => setIsVideoLoading(false)}
							onWaiting={() => setIsVideoLoading(true)}
							onPlaying={() => setIsVideoLoading(false)}
						/>

						{/* Keyboard hints */}
						<div className="absolute -bottom-12 left-0 right-0 text-center text-white/60 text-sm font-mono-custom">
							Use arrow keys to navigate • ESC to close
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoCarousel;
