import { ArrowRight, Laptop } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative overflow-hidden py-8">
			<div className="container mx-auto grid gap-16 lg:grid-cols-2 items-center px-6">
				{/* Text Content */}
				<div className="text-center lg:text-left">
					<span className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-50 text-violet-600 text-sm font-medium">
						Web Developer • Tech Coach • Community
						Builder
					</span>

					<h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
						I Build{" "}
						<span className="text-violet-500">
							AI-Powered Web Applications
						</span>
						<br /> That Solve Real Business
						Problems
					</h1>

					<p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
						I help businesses and individuals
						launch scalable, high-performance web
						applications using modern technologies
						like Next.js and TypeScript — while
						also mentoring developers with
						practical, real-world skills.
					</p>

					<div className="flex flex-wrap justify-center lg:justify-start gap-4">
						<a
							href="/contact"
							className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium">
							Work With Me{" "}
							<ArrowRight size={18} />
						</a>

						<a
							href="/services"
							className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 border-gray-800 hover:border-gray-500 transition-colors duration-300">
							View Services
						</a>
					</div>
				</div>

				{/* Visual Card */}
				<div className="relative">
					<div className="card backdrop-blur-xl rounded-xl shadow-lg p-8 bg-white/5">
						<div className="flex items-center gap-4 mb-6">
							<Laptop className="text-violet-500" />
							<h3 className="text-lg font-semibold">
								What I Do
							</h3>
						</div>

						<ul className="space-y-4 text-gray-600">
							<li>
								⚡ Build scalable,
								production-ready web apps
							</li>
							<li>
								🎓 Train developers with
								real-world projects
							</li>
							<li>
								🌍 Support individuals & teams
								globally
							</li>
							<li>
								🚀 Help businesses launch and grow
								online
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
