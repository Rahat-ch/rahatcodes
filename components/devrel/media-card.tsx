import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { PlayTrigger } from "@/components/devrel/player";
import { DevrelItem } from "@/types/devrel";
import { cn } from "@/lib/utils";

const PLATFORM_LABEL = { youtube: "YouTube", x: "X" } as const;

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function MediaCard({
  item,
  featured = false,
  priority = false,
}: {
  item: DevrelItem;
  featured?: boolean;
  priority?: boolean;
}) {
  const meta = [item.host ?? PLATFORM_LABEL[item.platform], formatDate(item.date)].join(" · ");

  return (
    <article
      className={cn(
        "group grid grid-cols-[8.5rem_1fr] gap-x-4 gap-y-2 sm:block",
        featured && "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:items-center"
      )}
    >
      <PlayTrigger
        item={item}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-video overflow-hidden rounded-md bg-muted ring-1 ring-border"
      >
        <Image
          src={item.thumbnail}
          alt=""
          fill
          priority={priority}
          sizes={featured ? "(min-width: 640px) 50vw, 136px" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 136px"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-5 w-5 translate-x-px fill-current" />
          </span>
        </span>
        {item.duration && (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[10px] text-white tabular-nums">
            {formatDuration(item.duration)}
          </span>
        )}
      </PlayTrigger>

      <div className="min-w-0 sm:mt-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {meta}
        </p>
        <h3 className={cn("mt-1 font-medium leading-snug", featured && "sm:text-2xl sm:font-semibold sm:tracking-tight")}>
          <PlayTrigger
            item={item}
            className="decoration-brand underline-offset-4 group-hover:underline focus-visible:underline outline-none"
          >
            {item.title}
          </PlayTrigger>
        </h3>
        {item.description && (
          <p className="mt-1.5 hidden text-sm text-muted-foreground leading-relaxed sm:block">
            {item.description}
          </p>
        )}
        {item.links && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-sm text-brand hover:underline underline-offset-4"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
