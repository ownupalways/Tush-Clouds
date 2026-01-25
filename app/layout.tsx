import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
import Script from "next/script";

export const metadata: Metadata = {
	title: "TUSH-CLOUDS - Full Stack Developer",
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
				<SessionProvider>
					<ThemeProvider>
						{/* Site Header */}
						<Navbar />

						{/* Page Container */}
						<main className="section-container pt-28 pb-20 min-h-screen">
							{children}

							{/* Load Cloudinary one globally */}
							<Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="lazyOnload"/>
						</main>

						{/* Site Footer */}
						<Footer />
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
