export const metadata = {
	title: "The Shawna Miller Scholarship | Mo Muscle",
	description:
		"The Shawna Miller Scholarship gives one woman over 45 facing health challenges a completely free 6-month personal training and wellness package at Mo Muscle. Apply today.",
	alternates: {
		canonical: "https://www.trainmomuscle.com/scholarship",
	},
	// Hidden until launch: keep search engines from indexing the page.
	// Remove this (and re-add the nav link + sitemap entry) when going live.
	robots: "noindex, nofollow",
	openGraph: {
		title: "The Shawna Miller Scholarship | Mo Muscle",
		description:
			"One story can inspire another. A free 6-month training and wellness package for one woman over 45 facing health challenges.",
		url: "https://www.trainmomuscle.com/scholarship",
		siteName: "Mo Muscle",
		type: "website",
	},
};

export default function ScholarshipLayout({ children }) {
	return children;
}
