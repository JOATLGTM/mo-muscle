import React, { useState } from "react";
import Slider from "react-slick"; // Import React Slick

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
	const [currentVideo, setCurrentVideo] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % workoutVideos.length);
	};

	const goToPrevious = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + workoutVideos.length) % workoutVideos.length
		);
	};

	// Function to handle opening the modal
	const openVideoModal = (video) => {
		setCurrentVideo(video);
		setIsVideoModalOpen(true);
	};

	// Function to handle closing the modal
	const closeVideoModal = () => {
		setCurrentVideo(null);
		setIsVideoModalOpen(false);
	};

	// Slider settings for React Slick
	const settings = {
		dots: true,
		infinite: true, // Ensure looping is enabled
		speed: 500,
		slidesToShow: 3, // Display 3 slides at once
		slidesToScroll: 1,
		nextArrow: (
			<button
				onClick={goToNext}
				className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
			>
				&#8594;
			</button>
		),
		prevArrow: (
			<button
				onClick={goToPrevious}
				className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
			>
				&#8592;
			</button>
		),
	};

	return (
		<div className="relative">
			<h4 className="text-2xl font-bold text-[#F5A623] mb-8">
				VIEW OUR WORKOUTS
			</h4>

			{/* React Slick Carousel */}
			<Slider {...settings}>
				{workoutVideos.map((video, index) => (
					<div key={index} className="relative w-full h-72">
						<button onClick={() => openVideoModal(video)}>
							<div className="relative w-full h-full bg-gray-200 rounded-lg">
								<video
									src={video}
									alt={`Workout Video ${index + 1}`}
									width={300}
									height={300}
									className="rounded-lg object-cover"
									muted
									loop
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
									Play Video
								</div>
							</div>
						</button>
					</div>
				))}
			</Slider>

			{/* Modal */}
			{isVideoModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
					onClick={closeVideoModal}
				>
					<video
						src={currentVideo}
						controls
						className="max-w-full max-h-[90vh] object-contain rounded-lg" // Ensures the video is 90% height of the screen and centered
						autoPlay
					/>
					<button
						onClick={closeVideoModal}
						className="absolute top-2 right-2 text-black text-2xl font-bold"
					>
						X
					</button>
				</div>
			)}
		</div>
	);
};

export default VideoCarousel;
