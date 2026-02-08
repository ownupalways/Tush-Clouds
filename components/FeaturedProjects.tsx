"use client";
import {
	useRef,
	useEffect,
	useState,
} from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import ProjectCardSkeleton from "./ProjectCardSkeleton"; // optional skeleton for loading

export default function FeaturedProjects() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const setRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [loading, setLoading] = useState(true);

	// Simulate loading
	useEffect(() => {
		const timer = setTimeout(
			() => setLoading(false),
			800,
		); // simulate fetch delay
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (loading) return; // do not scroll while loading

		const container = scrollRef.current;
		const set = setRef.current;
		if (!container || !set || isPaused) return;

		let animationId: number;
		let scrollPosition = container.scrollLeft;
		const setWidth = set.offsetWidth;

		const scroll = () => {
			scrollPosition += 0.5;
			if (scrollPosition >= setWidth)
				scrollPosition = 0;
			container.scrollLeft = scrollPosition;
			animationId = requestAnimationFrame(scroll);
		};

		animationId = requestAnimationFrame(scroll);
		return () =>
			cancelAnimationFrame(animationId);
	}, [isPaused, loading]);

	// Handle hover to pause scrolling
	const handleHover = (hovered: boolean) =>
		setIsPaused(hovered);

	return (
		<section className="overflow-hidden py-6 md:py-8">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-8 md:mb-12">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						Featured Projects
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base md:text-lg">
						Hover over a project to pause and
						explore
					</p>
				</div>

				{/* Cards */}
				{loading ? (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map(
							(_, i) => (
								<ProjectCardSkeleton key={i} />
							),
						)}
					</div>
				) : (
					<div
						ref={scrollRef}
						className="flex gap-4 sm:gap-6 px-2 sm:px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
						{/* Original Set */}
						<div
							ref={setRef}
							className="flex gap-4 sm:gap-6 shrink-0 min-w-max">
							{projects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onHover={handleHover}
								/>
							))}
						</div>

						{/* Clone for infinite scroll */}
						<div className="flex gap-4 sm:gap-6 shrink-0 min-w-max">
							{projects.map((project) => (
								<ProjectCard
									key={`${project.id}-clone`}
									project={project}
									onHover={handleHover}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Custom Scrollbar Hide */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</section>
	);
}
