// data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
	{
		id: "ecommerce-platform",
		title: "E-Commerce Platform",
		description:
			"A full-stack e-commerce system designed to help businesses sell products online with secure payments, inventory tracking, and real-time order insights.",
		image: "/projects/ecommerce.jpg",
		tags: [
			"React.js",
			"JavaScript",
			"Stripe",
			"MongoDB",
		],
		demoUrl: "https://demo.example.com",
		liveUrl: "https://aiefashionz.com",
		category: "Web Application",
		featured: true,
	},
	{
		id: "syd-and-co",
		title: "E-Commerce Platform",
		description:
			"A full-stack e-commerce system designed to help businesses sell products online with secure payments, inventory tracking, and real-time order insights.",
		image: "/projects/syd&co.bmp",
		tags: [
			"React.js",
			"TypeScript",
			"Stripe",
			"MongoDB",
		],
		demoUrl: "https://demo.example.com",
		liveUrl: "https://sydandco-inc.com",
		category: "Web Application",
		featured: true,
	},
	{
		id: "admin-dashboard",
		title: "Admin Dashboard",
		description:
			"A real-time admin system for managing users, orders, and business operations with live updates, analytics, and performance monitoring.",
		image: "/projects/ecommAdmin.bmp",
		tags: [
			"React",
			"Node.js",
			"Socket.io",
			"PostgreSQL",
		],
		demoUrl: "https://demo.example.com/tasks",
		liveUrl: "https://tasks.example.com",
		category: "Productivity",
		featured: true,
	},
	{
		id: "landing-page",
		title: "High-Converting Landing Page",
		description:
			"A modern, conversion-focused landing page built to help businesses attract users, improve engagement, and increase conversions with optimized UI and performance.",
		image: "/projects/landingpage.bmp",
		tags: [
			"Next.js",
			"TypeScript",
			"React",
			"Tailwindcss",
		],
		demoUrl: "https://demo.landingpage.com",
		liveUrl:
			"https://landingpage-psi-nine-74.vercel.app/",
		category: "Web Application",
		featured: true,
	},
	// {
	// 	id: "ai-chatbot",
	// 	title: "AI-Powered Chatbot",
	// 	description:
	// 		"Intelligent chatbot using natural language processing to provide customer support and automate responses.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=AI+Chatbot",
	// 	tags: [
	// 		"Python",
	// 		"OpenAI",
	// 		"React",
	// 		"FastAPI",
	// 	],
	// 	demoUrl: "https://demo.example.com/chatbot",
	// 	githubUrl:
	// 		"https://github.com/example/chatbot",
	// 	category: "AI/ML",
	// 	featured: true,
	// },
	// {
	// 	id: "task-manager",
	// 	title: "Task Management System",
	// 	description:
	// 		"Collaborative task management with real-time updates, team collaboration, and project tracking features.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Task+Manager",
	// 	tags: [
	// 		"React",
	// 		"Node.js",
	// 		"Socket.io",
	// 		"PostgreSQL",
	// 	],
	// 	demoUrl: "https://demo.example.com/tasks",
	// 	liveUrl: "https://tasks.example.com",
	// 	category: "Productivity",
	// 	featured: true,
	// },
	// {
	// 	id: "portfolio-builder",
	// 	title: "Portfolio Builder",
	// 	description:
	// 		"Drag-and-drop portfolio builder allowing users to create stunning portfolios without coding.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Portfolio+Builder",
	// 	tags: ["Vue.js", "TailwindCSS", "Firebase"],
	// 	demoUrl: "https://demo.example.com/portfolio",
	// 	liveUrl: "https://portfolio.example.com",
	// 	category: "Web Application",
	// 	featured: true,
	// },
	// {
	// 	id: "weather-dashboard",
	// 	title: "Weather Dashboard",
	// 	description:
	// 		"Real-time weather monitoring with forecasts, interactive maps, and historical data analysis.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Weather+Dashboard",
	// 	tags: ["React", "D3.js", "Weather API"],
	// 	demoUrl: "https://demo.example.com/weather",
	// 	githubUrl:
	// 		"https://github.com/example/weather",
	// 	category: "Data Visualization",
	// 	featured: true,
	// },
	// {
	// 	id: "fitness-tracker",
	// 	title: "Fitness Tracking App",
	// 	description:
	// 		"Mobile-first fitness application with workout tracking, nutrition planning, and progress analytics.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Fitness+Tracker",
	// 	tags: ["React Native", "Redux", "MongoDB"],
	// 	demoUrl: "https://demo.example.com/fitness",
	// 	category: "Mobile App",
	// 	featured: true,
	// },
	// {
	// 	id: "blog-cms",
	// 	title: "Headless CMS for Blogs",
	// 	description:
	// 		"Modern content management system with markdown support, SEO optimization, and multi-author capabilities.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Blog+CMS",
	// 	tags: ["Next.js", "Sanity.io", "TypeScript"],
	// 	demoUrl: "https://demo.example.com/cms",
	// 	liveUrl: "https://blog.example.com",
	// 	category: "CMS",
	// 	featured: true,
	// },
	// {
	// 	id: "analytics-platform",
	// 	title: "Analytics Dashboard",
	// 	description:
	// 		"Comprehensive analytics platform with customizable charts, data exports, and real-time insights.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Analytics+Platform",
	// 	tags: [
	// 		"React",
	// 		"Chart.js",
	// 		"Node.js",
	// 		"Redis",
	// 	],
	// 	demoUrl: "https://demo.example.com/analytics",
	// 	category: "Data Analytics",
	// 	featured: true,
	// },
	// {
	// 	id: "video-streaming",
	// 	title: "Video Streaming Platform",
	// 	description:
	// 		"Netflix-style video streaming service with content management, user subscriptions, and recommendations.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Video+Streaming",
	// 	tags: [
	// 		"Next.js",
	// 		"AWS",
	// 		"Video.js",
	// 		"Stripe",
	// 	],
	// 	demoUrl: "https://demo.example.com/streaming",
	// 	category: "Media",
	// 	featured: true,
	// },
	// {
	// 	id: "booking-system",
	// 	title: "Appointment Booking System",
	// 	description:
	// 		"Automated booking solution with calendar integration, email notifications, and payment processing.",
	// 	image:
	// 		"https://placehold.co/800x600/14532d/facc15?text=Booking+System",
	// 	tags: [
	// 		"React",
	// 		"Express",
	// 		"PostgreSQL",
	// 		"Twilio",
	// 	],
	// 	demoUrl: "https://demo.example.com/booking",
	// 	liveUrl: "https://booking.example.com",
	// 	category: "Business Tools",
	// 	featured: true,
	// },
];
