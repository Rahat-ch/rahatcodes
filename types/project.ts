export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
}
