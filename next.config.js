/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure external image domains
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.prod.website-files.com',
				port: '',
				pathname: '/**',
			},
		],
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
		];
	},
};

module.exports = nextConfig;
