"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
	faExternalLinkAlt,
	faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/types/project";

interface ProjectCardProps {
	project: Project;
	onHover?: (isHovered: boolean) => void;
}

export default function ProjectCard({
	project,
	onHover,
}: ProjectCardProps) {
	const handleMouseEnter = () => onHover?.(true);
	const handleMouseLeave = () => onHover?.(false);

	const isDevelopment =
		process.env.NODE_ENV === "development";
	const isExternalImage =
		project.image.startsWith("http");

	return (
		<Link
			href={`/projects/${project.id}`}
			className="w-full sm:w-[280px] md:w-[320px] lg:w-[360px] flex-shrink-0">
			<article
				className="card cursor-pointer group relative overflow-hidden flex flex-col h-full min-h-[420px] sm:min-h-[450px] md:min-h-[480px] lg:min-h-[500px] transition-shadow duration-300 hover:shadow-xl rounded-xl"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				{/* Image */}
				<div className="relative h-40 sm:h-48 md:h-52 lg:h-56 mb-3 rounded-t-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
					<Image
						src={project.image}
						alt={project.title}
						fill
						unoptimized={
							isDevelopment || isExternalImage
						}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Quick Buttons */}
					<div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{project.demoUrl && (
							<button
								onClick={(e) => {
									e.preventDefault();
									window.open(
										project.demoUrl,
										"_blank",
									);
								}}
								className="bg-brand-lemon text-brand-green p-2 rounded-full hover:bg-brand-lemon/90 transition-colors"
								title="View Demo">
								<FontAwesomeIcon
									icon={faPlay}
									className="w-4 h-4"
								/>
							</button>
						)}
						{project.githubUrl && (
							<button
								onClick={(e) => {
									e.preventDefault();
									window.open(
										project.githubUrl,
										"_blank",
									);
								}}
								className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								title="View Code">
								<FontAwesomeIcon
									icon={faGithub}
									className="w-4 h-4"
								/>
							</button>
						)}
					</div>

					{/* Category */}
					<div className="absolute top-3 left-3">
						<span className="text-[10px] sm:text-xs md:text-sm bg-brand-green/90 dark:bg-brand-lemon/90 text-white dark:text-brand-green px-2 sm:px-3 py-1 rounded-full font-medium">
							{project.category}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-col flex-1 px-3 sm:px-4 pb-3">
					<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 line-clamp-2 group-hover:text-brand-lemon transition-colors">
						{project.title}
					</h3>
					<p className="text-[10px] sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 line-clamp-3 flex-1">
						{project.description}
					</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
						{project.tags
							.slice(0, 3)
							.map((tag) => (
								<span
									key={tag}
									className="text-[9px] sm:text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
									{tag}
								</span>
							))}
						{project.tags.length > 3 && (
							<span className="text-[8px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">
								+{project.tags.length - 3} more
							</span>
						)}
					</div>

					{/* View Details */}
					<div className="mt-auto inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm md:text-base lg:text-base text-brand-green dark:text-brand-lemon group-hover:gap-2.5 transition-all font-medium">
						View Details
						<FontAwesomeIcon
							icon={faExternalLinkAlt}
							className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4"
						/>
					</div>
				</div>
			</article>
		</Link>
	);
}
