"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	const isDevelopment =
		process.env.NODE_ENV === "development";
	const isExternalImage =
		project.image.startsWith("http");

	const openExternal = (url: string) => {
		window.open(
			url,
			"_blank",
			"noopener,noreferrer",
		);
	};

	return (
		<Link
			href={`/projects/${project.id}`}
			className="block w-70 sm:w-[320px] shrink-0 snap-start"
			onMouseEnter={() => onHover?.(true)}
			onMouseLeave={() => onHover?.(false)}>
			<article
				className="
          group flex h-full flex-col overflow-hidden
          rounded-xl bg-white dark:bg-gray-900
          shadow-md transition-all
          hover:-translate-y-1 hover:shadow-xl
          motion-reduce:transform-none
        ">
				{/* Image */}
				<div className="relative aspect-video overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						fill
						unoptimized={
							isDevelopment || isExternalImage
						}
						sizes="(min-width:1024px) 320px, 100vw"
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>

					{/* Overlay */}
					<div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
						
						{project.demoUrl && (
							<button
								type="button"
								aria-label="View live demo"
								onClick={(e) => {
									e.preventDefault();
									openExternal(project.demoUrl!);
								}}
								className="h-11 w-11 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition">
								<FontAwesomeIcon
									icon={faPlay}
									className="text-white"
								/>
							</button>
						)}

						<div className="h-11 w-11 rounded-full bg-brand-lemon/20 flex items-center justify-center">
							<FontAwesomeIcon
								icon={faExternalLinkAlt}
								className="text-brand-lemon"
							/>
						</div>
					</div>

					{project.category && (
						<span className="absolute top-3 right-3 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
							{project.category}
						</span>
					)}
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col p-4">
					<h3 className="mb-1 line-clamp-2 font-bold text-sm sm:text-base group-hover:text-brand-lemon transition-colors">
						{project.title}
					</h3>

					<p className="text-xs text-gray-500 mb-2">
						{project.category === "AI" &&
							"AI-powered solution"}
						{project.category === "Web" &&
							"Full-stack web system"}
						{project.category === "Ecommerce" &&
							"Business-ready platform"}
					</p>

					<p className="mb-3 flex-1 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
						{project.description}
					</p>
					<p className="text-xs text-violet-500 mb-3">
						Designed to solve real user and
						business needs.
					</p>
					<p className="text-xs text-gray-500 mb-3">
						Built for performance, scalability,
						and real-world usability.
					</p>

					{project.tags?.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{project.tags
								.slice(0, 3)
								.map((tag) => (
									<span
										key={tag}
										className="rounded-md bg-brand-lemon/10 px-2 py-1 text-xs text-brand-green">
										{tag}
									</span>
								))}
							{project.tags.length > 3 && (
								<span className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
									+{project.tags.length - 3}
								</span>
							)}
						</div>
					)}
				</div>
			</article>
		</Link>
	);
}
