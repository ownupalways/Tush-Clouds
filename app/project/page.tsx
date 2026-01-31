import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
	return (
		<div className="min-h-screen py-6 md:py-10">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12">
					<h1 className="mb-4">All Projects</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
						Explore my portfolio of projects
						showcasing expertise in web
						development, AI integration, and
						modern software solutions.
					</p>
				</div>

				{/* Projects Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
						/>
					))}
				</div>

				{/* Empty State (if no projects) */}
				{projects.length === 0 && (
					<div className="text-center py-20">
						<div className="text-6xl mb-4">
							🚀
						</div>
						<h3 className="text-2xl font-bold mb-2">
							No projects yet
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Projects will be added soon!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
