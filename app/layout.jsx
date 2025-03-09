import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Mo Muscle - Personalized Fitness Coaching Online & In-Person",
	description:
		"Join Mo Muscle for personalized fitness coaching in person or online. Achieve your fitness goals with expert guidance.",
	robots: "index, follow",
	verification: {
		google: "CCXgAcNqEOViudRmIXOpEYhaR9gzx07qfAH9GfGWlTA",
	},
	openGraph: {
		title: "Mo Muscle - Personalized Fitness Coaching",
		description: "Mo Muscle - Personalized Fitness Coaching",
		url: "https://trainmomuscle.com",
		siteName: "Mo Muscle",
		locale: "en_US",
		type: "website",
	},
	alternates: {
		canonical: "https://www.momuscle.com",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="bg-black">
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
