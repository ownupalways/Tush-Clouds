"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faUsers, faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";


export const metadata: Metadata = {
    title: "About | TUSH-CLOUDS",
    description: "Learn about Godwin and the TUSH-CLOUDS mission to deliver exceptional digital solutions.",
};

export default function AboutPage() {
    return (
			<main className="pt-10 pb-4 max-w-6xl mx-auto px-6">
				{/* Page Heading */}
				<section className="flex flex-col md:flex-row items-center gap-12">
					{/* Image */}
					<div className="shrink md:w-1/3 mb-2">
						<div className="rounded-xl overflow-hidden border-2 border-brand-green shadow-sm">
							<Image
								src="/images/Jesuropo.png"
								alt="About Me"
								width={400}
								height={400}
								className="w-full h-auto object-cover"
							/>
						</div>
					</div>
					<div className="md:flex-1 md:text-left text-center mb-5">
						<h5 className="text-lg text-white mb-2 items-center">
							Get To Know
						</h5>
						<h2 className="text-4xl font-bold text-brand-green flex items-center gap-2">
							About Me
						</h2>
					</div>
				</section>
				<section className="mb-12 text-center">
					{/* Content */}
					<div className="md:flex-1 space-y-6">
						{/* Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
							<div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 text-center cursor-pointer">
								<FontAwesomeIcon
									icon={faAward}
									className="text-3xl text-brand-green mb-2"
								/>
								<h5 className="font-semibold text-black">
									Experience
								</h5>
								<small className="text-black/70">
									2+ Years Working Experience
								</small>
							</div>
							<div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 text-center cursor-pointer">
								<FontAwesomeIcon
									icon={faUsers}
									className="text-3xl text-brand-green mb-2"
								/>
								<h5 className="font-semibold text-black">
									Clients
								</h5>
								<small className="text-black/70">
									2+ Nationwide
								</small>
							</div>
							<div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 text-center cursor-pointer">
								<FontAwesomeIcon
									icon={faDiagramProject}
									className="text-3xl text-brand-green mb-2"
								/>
								<h5 className="font-semibold text-black">
									Projects
								</h5>
								<small className="text-black/70">
									2+ Completed
								</small>
								<small className="text-black/70">
									3+ In Progress
								</small>
							</div>
						</div>
						{/* Paragraphs */}
						<div className="space-y-4 text-black/70">
							<p>
								I work with intention to achieve
								customer satisfaction on service
								quality, time bound and create a
								referral close end. We work with
								customer&apos;s specifications and
								expectations to create unending
								business relationships.
							</p>
							<p>
								I am Godwin, a web developer
								specializing in Next.js and
								TypeScript. I focus on clean,
								professional UI/UX, fast load
								times, and maintainable code.
							</p>
							<p>
								My workflow emphasizes simplicity
								and readability, ensuring that
								projects are both beautiful and
								functional. I believe in strong
								foundations before adding fancy
								features.
							</p>
							<p>
								When I&apos;m not coding, I enjoy
								learning about design systems,
								exploring new frameworks, and
								refining the craft of
								user-centered development.
							</p>
						</div>
						{/* CTA Button */}
						<div className="pt-4">
							<a
								href="/contact"
								className="inline-block px-6 py-3 bg-brand-lemon text-black font-semibold rounded-md cursor-pointer hover:bg-yellow-400 transition-colors">
								Let&apos;s Talk
							</a>
						</div>
					</div>
				</section>
			</main>
		);
}
