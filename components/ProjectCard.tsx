"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onHover?: (isHovered: boolean) => void;
}

export default function ProjectCard({ project, onHover }: ProjectCardProps) {
  const handleMouseEnter = () => {
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    onHover?.(false);
  };

  // Detect development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Check if image is external URL
  const isExternalImage = project.image.startsWith('http');

  return (
    <Link href={`/projects/${project.id}`}>
      <article
        className="card cursor-pointer group relative overflow-hidden min-w-300px md:min-w-350px h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Section */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <Image
            src={project.image}
            alt={project.title}
            fill
            // Only use unoptimized in development or for external images
            unoptimized={isDevelopment || isExternalImage}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.demoUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.demoUrl, '_blank');
                }}
                className="bg-brand-lemon text-brand-green p-2 rounded-full hover:bg-brand-lemon/90 transition-colors"
                title="View Demo"
              >
                <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.githubUrl, '_blank');
                }}
                className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="View Code"
              >
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-xs bg-brand-green/90 dark:bg-brand-lemon/90 text-white dark:text-brand-green px-3 py-1 rounded-full font-medium">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-bold group-hover:text-brand-lemon transition-colors line-clamp-1">
              {project.title}
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          {/* View Details Link */}
          <div className="inline-flex items-center gap-2 text-brand-green dark:text-brand-lemon group-hover:gap-3 transition-all text-sm font-medium">
            View Details
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
          </div>
        </div>
      </article>
    </Link>
  );
}
