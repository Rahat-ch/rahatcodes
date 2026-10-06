import Link from "next/link";
import Wordmark from "@/components/wordmark";

export default function SiteHeader() {
  return (
    <header className="px-4 py-5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" aria-label="Home" className="text-foreground">
          <Wordmark className="h-6" />
        </Link>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/devrel" className="hover:text-foreground transition-colors">
            DevRel
          </Link>
        </nav>
      </div>
    </header>
  );
}
