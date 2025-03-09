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
		"Join Mo Muscle for tailored fitness training in person or online. Start your fitness journey today with personalized coaching.",
	icons: {
		icon: "/icon.ico",
		shortcut: "/icon.ico",
		apple: "/icon.ico",
	},
	meta: {
		robots: "index, follow",
		author: "Mo Muscle",
		"og:type": "website",
		"og:title": "Mo Muscle",
		"og:description":
			"Join Mo Muscle for personalized fitness coaching in person or online.",
		"og:image": "/icon.ico",
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
