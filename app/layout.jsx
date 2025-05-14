import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Mo Muscle | Personal Training & Fitness Coaching Services",
	description:
		"Transform your fitness journey with Mo Muscle's expert coaching. Get personalized training programs, nutrition guidance, and dedicated support both online and in-person.",
	robots: "index, follow",
	verification: {
		google: "CCXgAcNqEOViudRmIXOpEYhaR9gzx07qfAH9GfGWlTA",
	},
	openGraph: {
		title: "Mo Muscle - Personalized Fitness Coaching",
		description: "Mo Muscle - Personalized Fitness Coaching",
		url: "https://www.trainmomuscle.com",
		siteName: "Mo Muscle",
		locale: "en_US",
		type: "website",
	},
	alternates: {
		canonical: "https://www.trainmomuscle.com",
	},
};

// Add JSON-LD schema
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "FitnessCenter",
	name: "Mo Muscle",
	url: "https://www.trainmomuscle.com",
	logo: "https://www.trainmomuscle.com/horizontal_logo_white.png",
	description:
		"Transform your fitness journey with Mo Muscle's expert coaching. Get personalized training programs, nutrition guidance, and dedicated support both online and in-person.",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Hilliard",
		addressRegion: "OH",
		addressCountry: "US",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: "40.0334",
		longitude: "-83.1588",
	},
	openingHours: "Mo-Su 06:00-20:00",
	telephone: "+1-614-555-0123",
	priceRange: "$$",
	sameAs: [
		"https://www.facebook.com/momuscle",
		"https://www.instagram.com/momuscle",
		"https://www.linkedin.com/company/momuscle",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="bg-black">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
