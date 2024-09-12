/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.API_URL,
		CLIENT_URL: process.env.CLIENT_URL,
		FOTO_URL: process.env.FOTO_URL,
		SITE_NAME: process.env.SITE_NAME,
		CURRENCY: process.env.CURRENCY,
		PRODUCTS_COUNT_HOME: process.env.PRODUCTS_COUNT_HOME,
		EXPLORER_INITIAL_COUNT: process.env.EXPLORER_INITIAL_COUNT
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost'
			},
			{
				protocol: 'http',
				hostname: '212.118.38.112'
			},
			{
				protocol: 'https',
				hostname: '212.118.38.112'
			},
			{
				protocol: 'https',
				hostname: 'image-server-2kh2.onrender.com'
			}
		]
	}
};

module.exports = nextConfig;
