import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
	return (
		<main className="flex flex-col space-y-28">
			{/* Hero Section */}
			<Hero />

			{/* Intro / Personal Statement */}
			<section className="text-center max-w-3xl mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight">
					Hi, I&apos;m Godwin
				</h1>
				<p className="mt-6 text-lg text-gray-600 leading-relaxed">
					I design and build clean, professional
					web experiences using
					<span className="font-semibold">
						{" "}
						Express.js, React.js, Next.js,
					</span>
					and{" "}
					<span className="font-semibold">
						TypeScript
					</span>{" "}
					— focused on clarity, performance, and
					long-term maintainability.
				</p>
			</section>

			{/* Featured Projects */}
			<section className="px-4">
				<FeaturedProjects />
			</section>

			{/* Testimonials */}
			<section className="px-4">
				<Testimonial />
			</section>

			{/* Contact CTA */}
			<section className="text-center px-4">
				<h2 className="text-3xl font-semibold mb-4">
					Get in Touch
				</h2>
				<p className="mb-6 text-gray-600">
					Interested in working together or
					discussing a project?
				</p>
				<a
					href="/contact"
					className="btn-primary inline-block px-6 py-3 rounded-lg font-medium">
					Contact Me
				</a>
			</section>
		</main>
	);
}
