"use client";
import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    const set = setRef.current;
    if (!container || !set || isPaused) return;

    let animationId: number;
    let scrollPosition = container.scrollLeft;
    const setWidth = set.offsetWidth;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= setWidth) {
        scrollPosition = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="mb-28 overflow-hidden">
      <div className="mb-7 px-5">
        <h2>Featured Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hover over a project to pause and explore
        </p>
      </div>

      {/* Cards Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-8 px-5 overflow-hidden max-sm:flex-wrap max-sm:justify-center"
      >
        <div
          ref={setRef}
          className="flex gap-8 shrink-0 min-w-max justify-center"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
            >
              <ProjectCard project={project} onHover={setIsPaused} />
            </div>
          ))}
        </div>

        <div className="flex gap-8 shrink-0 min-w-max">
          {projects.map((project) => (
            <div
              key={`${project.id}-clone`}
              className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
            >
              <ProjectCard project={project} onHover={setIsPaused} />
            </div>
          ))}
        </div>

        <div className="flex gap-8 shrink-0">
          {projects.map((project) => (
            <div
              key={`${project.id}-clone2`}
              className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
            >
              <ProjectCard project={project} onHover={setIsPaused} />
            </div>
          ))}
        </div>
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
