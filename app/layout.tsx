import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
	title: "TUSHCLOUDS - Full Stack Developer",
	description:
		"Clean, professional web development portfolio showcasing modern projects and experiences",
	keywords: [
		"web developer",
		"full stack",
		"portfolio",
		"Next.js",
		"React",
	],
	authors: [{ name: "Godwin" }],
	openGraph: {
		title: "TUSH-CLOUDS",
		description: "Full Stack Developer Portfolio",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
				<ThemeProvider>
					{/* Site Header */}
					<Navbar />

					{/* Page Container */}
					<main className="section-container pt-28 pb-20 min-h-screen">
						{children}
					</main>

					{/* Site Footer */}
					<Footer />

					{/* Background gradient overlay */}
					<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
						<div className="absolute top-0 right-0 w-96 h-96 bg-brand-lemon/5 dark:bg-brand-lemon/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 dark:bg-brand-green/10 rounded-full blur-3xl" />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
