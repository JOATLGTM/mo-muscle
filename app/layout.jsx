import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Mo Muscle",
	description: "The start of your physical journey",
	icons: {
		icon: "/icon.ico",
		shortcut: "/icon.ico",
		apple: "/icon.ico",
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
