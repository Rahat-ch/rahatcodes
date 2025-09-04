import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star } from "lucide-react";
import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export default function WorkSection() {
  const projects: Project[] = (projectsData as Project[]).sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then sort by status: completed, in-progress, planned
    const statusOrder = { completed: 0, "in-progress": 1, planned: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in web development, blockchain, and developer education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex flex-col gap-2 items-end">
                    {project.featured && (
                      <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                    <Badge 
                      variant={
                        project.status === "completed" ? "default" : 
                        project.status === "in-progress" ? "secondary" : 
                        "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
