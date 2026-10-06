import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wordmark from "@/components/wordmark";
import { Github, Linkedin, PlayCircle, Twitter } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-8">
          <Wordmark className="mx-auto h-16 md:h-24" />
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Muslim, Full-Stack Developer, Builder, Educator
        </p>

        <div className="mt-12 mb-8">
                      <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
              I&apos;m a developer relations engineer and full-stack developer who loves creating 
              educational content and building web applications.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href="/devrel">
              <PlayCircle className="mr-2 h-4 w-4" />
              DevRel Portfolio
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
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