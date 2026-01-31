"use client";
import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft;

    const scroll = () => {
      if (scrollContainer) {
        scrollPosition += 0.5; // Adjust speed here
        
        // Get the width of one set of projects
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        
        // If we've scrolled past one full set, reset position seamlessly
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft = scrollPosition;
        }

        animationId = requestAnimationFrame(scroll);
      }
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Triple the projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <section className="mb-28 overflow-hidden">
      <div className="mb-7 px-5">
        <h2>Featured Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hover over a project to pause and explore
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 px-5 overflow-x-hidden hover:overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            onHover={setIsPaused}
          />
        ))}
      </div>

      {/* Custom Scrollbar Hide CSS */}
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
