/** @type {import('next').NextConfig} */
const nextConfig = {
	// ... existing config ...

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
