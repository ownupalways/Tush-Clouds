import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faPlay,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { projects } from "@/data/projects";

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params - required in Next.js 15+
  const { id } = await params;
  
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-green dark:text-brand-lemon hover:gap-3 transition-all mb-8"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm bg-brand-green/10 dark:bg-brand-lemon/10 text-brand-green dark:text-brand-lemon px-3 py-1 rounded-full">
                {project.category}
              </span>
              <h1 className="mt-4 mb-2">{project.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlay} />
                View Demo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faGithub} />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-96 md:h-500px rounded-lg overflow-hidden mb-12 bg-gray-200 dark:bg-gray-700">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="mb-4">About This Project</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
              {/* Add more detailed content here */}
            </div>
          </div>

          <div>
            <div className="card">
              <h3 className="mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-brand-green/10 dark:bg-brand-lemon/10 text-brand-green dark:text-brand-lemon px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="mb-3 font-semibold">Project Links</h4>
                <div className="space-y-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lemon transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lemon transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="w-4 h-4"
                      />
                      Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lemon transition-colors"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div>
          <h2 className="mb-8">More Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.id}`}
                  className="card group cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mb-2 group-hover:text-brand-lemon transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
