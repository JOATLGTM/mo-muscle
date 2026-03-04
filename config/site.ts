// Site Configuration for MoMuscle
// Centralized content management

export interface SiteConfig {
	title: string;
	description: string;
	language: string;
}

export const siteConfig: SiteConfig = {
	title: "Mo Muscle | Expert Personal Training & Fitness Coaching",
	description:
		"Transform your fitness with Mo Muscle's expert coaching. Get personalized training programs, nutrition guidance, and dedicated support for your fitness goals.",
	language: "en",
};

// Hero Section
export interface HeroNavItem {
	label: string;
	sectionId: string;
	icon: "disc" | "play" | "calendar" | "music" | "dumbbell";
}

export interface HeroConfig {
	backgroundImage: string;
	brandName: string;
	decodeText: string;
	decodeChars: string;
	subtitle: string;
	ctaPrimary: string;
	ctaPrimaryTarget: string;
	ctaSecondary: string;
	ctaSecondaryTarget: string;
	cornerLabel: string;
	cornerDetail: string;
	navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
	backgroundImage:
		"https://cdn.prod.website-files.com/64f1a4c13c8ab83aab9bdbf6/64f3572971e6427a9c79344c_anastase-maragos-FP7cfYPPUKM-unsplash.webp",
	brandName: "Mo Muscle",
	decodeText: "UNLEASH YOUR POWER",
	decodeChars:
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
	subtitle: "The Mind Is Primary",
	ctaPrimary: "Start Your Journey",
	ctaPrimaryTarget: "services",
	ctaSecondary: "View Services",
	ctaSecondaryTarget: "services",
	cornerLabel: "Est. 2020",
	cornerDetail: "Expert Training",
	navItems: [
		{ label: "Home", sectionId: "hero", icon: "disc" },
		{ label: "About", sectionId: "about", icon: "play" },
		{ label: "Services", sectionId: "services", icon: "calendar" },
		{ label: "Team", sectionId: "team", icon: "dumbbell" },
	],
};

// About/Train With Section
export interface AboutConfig {
	sectionLabel: string;
	sectionTitle: string;
	sectionTitleHighlight: string;
	description: string;
	images: { id: number; src: string; alt: string }[];
}

export const aboutConfig: AboutConfig = {
	sectionLabel: "Explore",
	sectionTitle: "TRAIN WITH",
	sectionTitleHighlight: "MO MUSCLE",
	description:
		"At Mo Muscle, we believe in a personalized approach to fitness. Our expert trainers guide you through each step, ensuring you achieve your physical goals efficiently and effectively.",
	images: [
		{ id: 1, src: "/images/bri-training.JPG", alt: "Brie Training" },
		{ id: 2, src: "/images/mo-training.JPG", alt: "Mo Nayal Training" },
		{ id: 3, src: "/images/mo-training.jpeg", alt: "Mo Nayal Training" },
		{ id: 4, src: "/images/mo-training2.jpg", alt: "Mo Training Session" },
	],
};

// Mission Section
export interface MissionConfig {
	backgroundImage: string;
	title: string;
	subtitle: string;
	description: string;
}

export const missionConfig: MissionConfig = {
	backgroundImage: "/family.jpeg",
	title: "THE MO MUSCLE FAMILY",
	subtitle: "Find The Problem. Fix The Problem.",
	description:
		"Join the Mo Muscle program and discover a community that inspires and empowers you. Our trainers provide personalized guidance while fostering a supportive environment where you can connect with others, stay motivated, and make steady progress toward your fitness goals.",
};

// Marquee Section
export interface MarqueeConfig {
	items: string[];
	speed: number;
}

export const marqueeConfig: MarqueeConfig = {
	items: [
		"STRENGTH",
		"CONDITIONING",
		"TRAINING",
		"RECOVERY",
		"NUTRITION",
		"WELLNESS",
		"POWER",
		"ENDURANCE",
	],
	speed: 30,
};

// Services Section
export interface Service {
	id: number;
	title: string;
	description: string;
	image: string;
	details: string;
}

export interface ServicesConfig {
	sectionLabel: string;
	sectionTitle: string;
	sectionTitleHighlight: string;
	services: Service[];
}

export const servicesConfig: ServicesConfig = {
	sectionLabel: "What We Offer",
	sectionTitle: "PREMIUM",
	sectionTitleHighlight: "SERVICES",
	services: [
		{
			id: 1,
			title: "In Person Coaching",
			description:
				"Get hands-on guidance and support from expert trainers in a fully equipped fitness facility.",
			image: "/images/person-coaching.JPG",
			details:
				"Whether you're just beginning your fitness journey or pushing toward elite performance, our in-person coaching is personalized to fit your unique goals. We focus on form, function, and consistency—ensuring every rep counts.",
		},
		{
			id: 2,
			title: "Online Coaching",
			description:
				"Train wherever you are with professional training programs delivered directly to you.",
			image: "/images/online-coaching.JPG",
			details:
				"You'll receive a personalized program tailored to your goals, lifestyle, and available equipment. Your coach will stay connected through regular check-ins, progress tracking, and video feedback.",
		},
		{
			id: 3,
			title: "Nutrition Coaching",
			description:
				"Fuel your success with personalized nutrition strategies that complement your training.",
			image: "/images/nutrition.JPG",
			details:
				"Our expert coaches craft personalized nutrition strategies that complement your training and lifestyle. Whether your goal is to lose fat, gain muscle, or feel more energized, we guide you with realistic and sustainable plans.",
		},
	],
};

// Team Section
export interface Trainer {
	id: number;
	name: string;
	role: string;
	location: string;
	image: string;
	description?: string;
}

export interface TeamConfig {
	sectionLabel: string;
	sectionTitle: string;
	sectionTitleHighlight: string;
	description: string;
	trainers: Trainer[];
}

export const teamConfig: TeamConfig = {
	sectionLabel: "The Team",
	sectionTitle: "CERTIFIED",
	sectionTitleHighlight: "INSTRUCTORS",
	description:
		"Our Certified Instructors have undergone our rigorous physical and mental testing process to proudly represent Mo Muscle wherever they coach. They honor time-tested principles while continuously developing and applying innovative techniques. Experienced, creative, and experts in their fields, they are here to guide you. Connect with a certified Mo Muscle instructor today.",
	trainers: [
		{
			id: 1,
			name: "MO NAYAL",
			role: "Head Trainer",
			location: "COLUMBUS OHIO",
			image: "/images/mo-portrait.JPG",
			description:
				"Welcome to Mo Muscle, your gateway to a transformed, stronger, and healthier you. With over a decade of dedicated training experience and a specialization in muscle gain and fat loss, I'm here to guide you on your fitness journey.",
		},
		{
			id: 2,
			name: "BRIE MILLER",
			role: "Certified Trainer",
			location: "COLUMBUS OHIO",
			image: "/images/brie-portrait.JPG",
			description:
				"Hi, I'm Brieanna Miller! I'm an ISSA-certified personal trainer and nutrition coach with a deep passion for helping others reach their full potential—both in and out of the gym.",
		},
	],
};

// Locations Section
export interface GymLocation {
	id: number;
	name: string;
	address: string;
	city: string;
	image: string;
}

export interface LocationsConfig {
	sectionLabel: string;
	sectionTitle: string;
	sectionTitleHighlight: string;
	mainImage: string;
	locations: GymLocation[];
}

export const locationsConfig: LocationsConfig = {
	sectionLabel: "Our Facilities",
	sectionTitle: "GYM",
	sectionTitleHighlight: "LOCATIONS",
	mainImage: "/service_hero.jpg",
	locations: [
		{
			id: 1,
			name: "Worthington Location",
			address: "7530 Reliance St",
			city: "Columbus, Ohio 43085",
			image: "/service_hero.jpg",
		},
		{
			id: 2,
			name: "Hilliard Location",
			address: "3675 Park Mill Run Dr",
			city: "Hilliard, OH 43026",
			image: "/service_hero.jpg",
		},
	],
};

// Blog Section
export interface BlogPost {
	id: number;
	title: string;
	category: string;
	image: string;
	excerpt?: string;
}

export interface BlogConfig {
	sectionLabel: string;
	sectionTitle: string;
	sectionTitleHighlight: string;
	posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
	sectionLabel: "Latest Insights",
	sectionTitle: "FITNESS",
	sectionTitleHighlight: "BLOG",
	posts: [
		{
			id: 1,
			title: "From Novice to Pro: Tips for Gym Etiquette",
			category: "Fitness",
			image: "/service_hero.jpg",
			excerpt:
				"Learn the essential gym etiquette rules to make your workout experience better.",
		},
		{
			id: 2,
			title: "Nutrition 101: Foods That Fuel Your Workouts",
			category: "Nutrition",
			image: "/service_hero.jpg",
			excerpt:
				"Discover the best foods to power your training and recovery.",
		},
	],
};

// CTA Section
export interface CTAConfig {
	title: string;
	titleHighlight: string;
	subtitle: string;
	buttonText: string;
	buttonTarget: string;
	images: string[];
}

export const ctaConfig: CTAConfig = {
	title: "READY TO",
	titleHighlight: "TRANSFORM?",
	subtitle:
		"Join thousands who have already changed their lives with Mo Muscle.",
	buttonText: "Schedule With Mo Muscle",
	buttonTarget: "contact",
	images: [
		"/images/transform.jpeg",
		"/images/transform2.jpeg",
		"/images/transform3.jpeg",
	],
};

// Footer Section
export interface FooterConfig {
	brandName: string;
	brandSubtitle: string;
	contactTitle: string;
	locations: {
		name: string;
		address: string;
		city: string;
	}[];
	email: string;
	phone: string;
	socialLinks: {
		icon: "facebook" | "instagram";
		label: string;
		href: string;
	}[];
	copyrightText: string;
}

export const footerConfig: FooterConfig = {
	brandName: "Mo Muscle",
	brandSubtitle: "Transform Your Life",
	contactTitle: "Contact Us",
	locations: [
		{
			name: "Worthington Location",
			address: "7530 Reliance St",
			city: "Columbus, Ohio 43085",
		},
		{
			name: "Hilliard Location",
			address: "3675 Park Mill Run Dr",
			city: "Hilliard, OH 43026",
		},
	],
	email: "trainmomuscle@gmail.com",
	phone: "(614) 357-8780",
	socialLinks: [
		{
			icon: "facebook",
			label: "Facebook",
			href: "https://www.facebook.com/momuscle20",
		},
		{
			icon: "instagram",
			label: "Instagram",
			href: "https://www.instagram.com/momuscle20/",
		},
	],
	copyrightText: "© 2025 Mo Muscle. All rights reserved",
};
