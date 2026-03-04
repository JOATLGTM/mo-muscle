import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import NewFooter from "../components/sections/NewFooter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ 
	subsets: ["latin"],
	display: 'swap',
	preload: true,
});

export const metadata = {
	title: "Mo Muscle | Expert Personal Training & Fitness Coaching",
	description:
		"Transform your fitness with Mo Muscle's expert coaching. Get personalized training programs, nutrition guidance, and dedicated support for your fitness goals.",
	robots: "index, follow",
	verification: {
		google: "CCXgAcNqEOViudRmIXOpEYhaR9gzx07qfAH9GfGWlTA",
	},
	icons: {
		icon: '/badge_logo_white.png',
		apple: '/badge_logo_white.png',
		shortcut: '/badge_logo_white.png',
	},
	manifest: '/manifest.json',
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

export const viewport = {
	themeColor: '#0582c0',
};

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
				{/* Preconnect to external domains for faster loading */}
				<link rel="preconnect" href="https://static.elfsight.com" />
				<link rel="dns-prefetch" href="https://static.elfsight.com" />
				<link rel="preconnect" href="https://cdn.prod.website-files.com" />
				<link rel="dns-prefetch" href="https://cdn.prod.website-files.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${inter.className} min-h-screen flex flex-col bg-void-black`}>
				<Header />
				<main className="flex-1">{children}</main>
				<NewFooter />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
