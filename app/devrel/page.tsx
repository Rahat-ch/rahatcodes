import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";
import MediaCard from "@/components/devrel/media-card";
import { PlayerProvider } from "@/components/devrel/player";
import { DevrelData, DevrelItem } from "@/types/devrel";
import devrelData from "@/data/devrel.json";

export const metadata: Metadata = {
  title: "DevRel Portfolio - Rahat Codes",
  description: "Livestreams, demos, workshops and tutorials by Rahat Chowdhury.",
  // video.twimg.com rejects requests with a cross-site Referer, which breaks the X players.
  referrer: "same-origin",
};

const data = devrelData as DevrelData;

const SECTIONS: { id: keyof DevrelData; title: string; description: string }[] = [
  { id: "demos", title: "Demos", description: "Proofs of concept and things I built to see if they'd work." },
  { id: "tutorials", title: "Tutorials", description: "Short walkthroughs, with code and docs to go with them." },
  { id: "workshops", title: "Workshops", description: "Hands-on sessions for hackathons and developer communities." },
  { id: "livestreams", title: "Livestreams", description: "Building in public, live." },
];

const SERIES_DESCRIPTION: Record<string, string> = {
  Movescan: "Vibecoding a block explorer for Movement from scratch.",
  "Protocol Explorer": "Each episode picks a protocol or SDK and builds with it live.",
};

const byNewest = (a: DevrelItem, b: DevrelItem) => b.date.localeCompare(a.date);

function groupBySeries(items: DevrelItem[]) {
  const groups = new Map<string, DevrelItem[]>();
  for (const item of items) {
    const key = item.series ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups].map(([name, items]) => ({ name, items: items.sort(byNewest) }));
}

function Grid({ items, priorityCount = 0 }: { items: DevrelItem[]; priorityCount?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
      {items.map((item, i) => (
        <MediaCard key={item.id} item={item} priority={i < priorityCount} />
      ))}
    </div>
  );
}

export default function DevrelPage() {
  return (
    <PlayerProvider>
      <SiteHeader />
      <main className="px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-12 md:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Developer Relations
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              Portfolio<span className="text-brand">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Demos, tutorials, workshops and livestreams. Teaching developers by building in the open.
            </p>
          </section>
        </div>

        <nav
          aria-label="Sections"
          className="sticky top-0 z-10 -mx-4 border-y bg-background/85 px-4 backdrop-blur"
        >
          <ul className="no-scrollbar max-w-6xl mx-auto flex gap-3 sm:gap-6 overflow-x-auto py-3 text-[13px] sm:text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {s.title}
                  <span className="ml-1 sm:ml-1.5 font-mono text-xs text-brand">{data[s.id].length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-6xl mx-auto">
          {SECTIONS.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-14 border-b py-12 md:py-16 last:border-b-0">
              <header className="mb-8 md:mb-10">
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
                  {section.title}
                  <span className="text-brand">.</span>
                </h2>
                <p className="mt-2 text-muted-foreground">{section.description}</p>
              </header>

              {section.id === "livestreams" ? (
                <div className="space-y-12">
                  {groupBySeries(data.livestreams).map((group) => (
                    <div key={group.name}>
                      <div className="mb-5 flex items-baseline justify-between gap-4 border-l-2 border-brand pl-3">
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          {SERIES_DESCRIPTION[group.name] && (
                            <p className="text-sm text-muted-foreground">{SERIES_DESCRIPTION[group.name]}</p>
                          )}
                        </div>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {group.items.length} {group.items.length === 1 ? "stream" : "streams"}
                        </span>
                      </div>
                      {group.items.length === 1 ? (
                        <MediaCard item={group.items[0]} featured />
                      ) : (
                        <Grid items={group.items} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Grid items={[...data[section.id]].sort(byNewest)} priorityCount={i === 0 ? 3 : 0} />
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </PlayerProvider>
  );
}
