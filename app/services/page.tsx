import {
	Code,
	GraduationCap,
	Rocket,
	Users,
} from "lucide-react";

export default function ServicesPage() {
	const services = [
		{
			icon: (
				<Code className="w-10 h-10 text-brand-green-600" />
			),
			title: "Web Development",
			description:
				"Custom websites and applications built with Next.js, React, and TypeScript. I focus on performance, scalability, and clean code that lasts.",
		},
		{
			icon: (
				<GraduationCap className="w-10 h-10 text-brand-lemon-500" />
			),
			title: "Tech Coaching",
			description:
				"Hands‑on coaching sessions tailored to your level. Learn modern web development practices through structured guidance and real projects.",
		},
		{
			icon: (
				<Users className="w-10 h-10 text-brand-green-600" />
			),
			title: "Workshops & Training",
			description:
				"Interactive group workshops for startups, schools, and organizations. Upskill your team with practical knowledge in modern web technologies.",
		},
		{
			icon: (
				<Rocket className="w-10 h-10 text-brand-lemon-500" />
			),
			title: "Career Mentorship",
			description:
				"Personalized mentorship to help you grow your career, build a strong portfolio, and navigate the tech industry with confidence.",
		},
	];

	return (
		<main className="py-20 bg-(--bg-secondary)]">
			<div className="container mx-auto px-6">
				{/* Page Header */}
				<header className="text-center mb-16">
					<h1 className="text-5xl font-bold text-linear">
						My Services
					</h1>
					<p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
						Whether you&apos;re an individual
						looking to learn, a team aiming to
						scale, or a business needing a modern
						web presence — I offer services
						designed to deliver clarity,
						performance, and growth.
					</p>
				</header>

				{/* Services Grid */}
				<section className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
					{services.map((service, index) => (
						<div
							key={index}
							className="card flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
							<div className="mb-6">
								{service.icon}
							</div>
							<h3 className="text-xl font-semibold mb-3">
								{service.title}
							</h3>
							<p className="text-gray-600">
								{service.description}
							</p>
						</div>
					))}
				</section>

				{/* Call to Action */}
				<section className="text-center mt-20">
					<h2 className="text-3xl font-semibold mb-4">
						Ready to Work Together?
					</h2>
					<p className="mb-6 text-gray-600">
						Let&apos;s discuss your project or
						training needs and create a plan
						<span
							role="img"
							aria-label="calendar">
							📅
						</span> 
						 that works for you.
					</p>
					<a
						href="/contact"
						className="btn-primary inline-block px-8 py-1 rounded-xl font-medium">
						Start Now!
					</a>
				</section>
			</div>
		</main>
	);
}
