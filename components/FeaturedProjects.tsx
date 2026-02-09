"use client";

import {
	useEffect,
	useRef,
	useState,
} from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	const [paused, setPaused] = useState(false);
	const [loading, setLoading] = useState(true);

	// Simulated loading
	useEffect(() => {
		const timer = setTimeout(
			() => setLoading(false),
			800,
		);
		return () => clearTimeout(timer);
	}, []);

	// ✅ Desktop-only infinite scroll
	useEffect(() => {
		if (loading || paused) return;
		if (typeof window === "undefined") return;
		if (window.innerWidth < 1024) return;

		const container = scrollRef.current;
		const track = trackRef.current;
		if (!container || !track) return;

		let raf: number;
		let position = container.scrollLeft;
		const trackWidth = track.scrollWidth;

		const animate = () => {
			position += 0.5;
			if (position >= trackWidth) position = 0;
			container.scrollLeft = position;
			raf = requestAnimationFrame(animate);
		};

		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [paused, loading]);

	return (
		<section className="py-8">
			<div className="mx-auto max-w-6xl px-4">
				{/* Header */}
				<div className="mb-10 text-center">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						Featured Projects
					</h2>
					<p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
						Explore selected work
					</p>
				</div>

				{/* Loading */}
				{loading && (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map(
							(_, i) => (
								<ProjectCardSkeleton key={i} />
							),
						)}
					</div>
				)}

				{/* ✅ MOBILE & TABLET: GRID */}
				{!loading && (
					<div className="grid gap-4 sm:grid-cols-2 lg:hidden">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))}
					</div>
				)}

				{/* ✅ DESKTOP: AUTO-SCROLL CAROUSEL */}
				{!loading && (
					<div
						ref={scrollRef}
						className="relative hidden lg:block overflow-hidden">
						<div
							ref={trackRef}
							className="flex gap-6">
							{projects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onHover={setPaused}
								/>
							))}

							{/* clone for infinite loop */}
							{projects.map((project) => (
								<ProjectCard
									key={`${project.id}-clone`}
									project={project}
									onHover={setPaused}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
