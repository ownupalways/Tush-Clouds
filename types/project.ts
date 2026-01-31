// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
}


