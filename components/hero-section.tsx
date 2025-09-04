import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RahatCodes
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Muslim, Full-Stack Developer, Builder, Educator
        </p>

        <div className="mt-12 mb-8">
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a developer relations engineer and full-stack developer who loves creating 
            educational content and building web applications.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <a href="https://github.com/Rahat-ch" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/rahatc/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://x.com/Rahatcodes" target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-4 w-4" />
              X/Twitter
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}