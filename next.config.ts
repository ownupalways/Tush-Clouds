import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**", // Allows all Cloudinary images
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "ui-avatars.com",
				pathname: "/api/**", // Allows images from the UI Avatars API
			},
		],
	},
};

export default nextConfig;
