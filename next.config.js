/** @type {import('next').NextConfig} */
const nextConfig = {
	// Empty turbopack config to silence warning about webpack config
	turbopack: {},
	
	// Configure external image domains
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 31536000,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.prod.website-files.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},

	// Ensure static files are properly served
	async headers() {
		return [
			{
				source: "/robots.txt",
				headers: [
					{
						key: "Content-Type",
						value: "text/plain",
					},
				],
			},
			// Cache static assets aggressively
			{
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/transformation/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/:path*.{jpg,jpeg,png,gif,webp,avif,svg,ico}",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
