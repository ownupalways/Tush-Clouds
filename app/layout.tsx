import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
import Script from "next/script";

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================
// Enhanced SEO metadata with brand tagline and comprehensive information
// Updated: Added new tagline "Engineering Excellence, Exceeding Expectations"
// ============================================================================

export const metadata: Metadata = {
	// ========================================
	// PRIMARY METADATA
	// ========================================
	metadataBase: new URL(
		"https://tush-clouds.vercel.app",
	), // ✅ Add this line
	title:
		"TUSH-CLOUDS | Engineering Excellence, Exceeding Expectations",
	description:
		"Your trusted partner in digital transformation. Full-stack web development, cloud solutions, and innovative software engineering. Professional portfolio showcasing modern projects and real-world experiences.",

	// ========================================
	// SEO KEYWORDS
	// ========================================
	// Comprehensive keywords covering services, technologies, and brand
	keywords: [
		"web developer",
		"full stack developer",
		"portfolio",
		"Next.js",
		"React",
		"TypeScript",
		"Node.js",
		"MongoDB",
		"cloud solutions",
		"digital transformation",
		"software engineering",
		"TUSH-CLOUDS",
		"Godwin Oluwadipe",
		"professional web development",
		"modern web applications",
		"responsive design",
		"API development",
	],

	// ========================================
	// AUTHOR & CREATOR
	// ========================================
	authors: [
		{
			name: "Godwin Oluwadipe",
			url: "https://tush-clouds.vercel.app",
		},
	],
	creator: "Godwin Oluwadipe",
	publisher: "TUSH-CLOUDS",

	// ========================================
	// OPEN GRAPH (Facebook, LinkedIn, etc.)
	// ========================================
	// Controls how your site appears when shared on social media
	openGraph: {
		title:
			"TUSH-CLOUDS | Engineering Excellence, Exceeding Expectations",
		description:
			"Your trusted partner in digital transformation. Full-stack developer specializing in modern web solutions and cloud technologies.",
		type: "website",
		siteName: "TUSH-CLOUDS",
		locale: "en_US",
		url: "https://tush-clouds.vercel.app", // Update with your actual domain
		// Uncomment when you have an OG image (1200x630px recommended)
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "TUSH-CLOUDS - Engineering Excellence, Exceeding Expectations",
			},
		],
	},

	// ========================================
	// TWITTER CARD
	// ========================================
	// Optimizes appearance when shared on Twitter/X
    twitter: {
        card: "summary_large_image", title: "TUSH-CLOUDS | Engineering Excellence, Exceeding Expectations", description: "Full-stack developer & digital transformation partner.", images: ["/twitter-card.png"],
    },
    // 1200x600px },
	// ========================================
	// ROBOTS & INDEXING
	// ========================================
	// Controls how search engines crawl and index your site
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// ========================================
	// VERIFICATION CODES
	// ========================================
	// Uncomment and add these when you set up webmaster tools
	// verification: {
	//     google: "your-google-search-console-code",
	//     yandex: "your-yandex-verification-code",
	//     bing: "your-bing-webmaster-code",
	// },

	// ========================================
	// ADDITIONAL METADATA
	// ========================================
	category: "Technology",
	applicationName: "TUSH-CLOUDS Portfolio",
	referrer: "origin-when-cross-origin",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to external domains for better performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://widget.cloudinary.com" />
            </head>
            
            <body className="antialiased min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <SessionProvider>
                    <ThemeProvider>
                        {/* ================================ */}
                        {/* SITE HEADER / NAVIGATION        */}
                        {/* ================================ */}
                        <Navbar />
                        
                        {/* ================================ */}
                        {/* MAIN CONTENT AREA                */}
                        {/* ================================ */}
                        <main className="section-container pt-28 pb-20 min-h-screen">
                            {children}
                        </main>
                        
                        {/* ================================ */}
                        {/* SITE FOOTER                      */}
                        {/* ================================ */}
                        <Footer />
                        
                        {/* ================================ */}
                        {/* EXTERNAL SCRIPTS                 */}
                        {/* ================================ */}
                        {/* Cloudinary Widget - Loaded lazily for image uploads */}
                        <Script 
                            src="https://widget.cloudinary.com/v2.0/global/all.js" 
                            strategy="lazyOnload"
                        />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
