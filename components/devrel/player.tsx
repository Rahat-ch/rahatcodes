"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { DevrelItem } from "@/types/devrel";

const PlayerContext = createContext<(item: DevrelItem) => void>(() => {});

const SOURCE_LABEL = { youtube: "Watch on YouTube", x: "View on X" } as const;

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<DevrelItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // `item` is the source of truth; the dialog follows it. Clearing it unmounts the player, which stops playback.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
    document.documentElement.style.overflow = item ? "hidden" : "";
  }, [item]);

  const close = () => setItem(null);

  return (
    <PlayerContext value={setItem}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={item?.title}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        // The native close event is async; ignore a stale one that lands after the dialog reopened.
        onClose={() => !dialogRef.current?.open && close()}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-full max-w-5xl bg-transparent p-4 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {item && <PlayerBody item={item} onClose={close} />}
      </dialog>
    </PlayerContext>
  );
}

function PlayerBody({ item, onClose }: { item: DevrelItem; onClose: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player"
          className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
        {item.platform === "youtube" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`}
            title={item.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            // YouTube embeds need a Referer; the page itself sends none cross-origin.
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        ) : failed || !item.videoUrl ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center gap-1 text-[#2fae74] hover:underline underline-offset-4"
          >
            Couldn&apos;t load the video here. Watch it on X
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <video
            src={item.videoUrl}
            poster={item.thumbnail}
            controls
            autoPlay
            playsInline
            onError={() => setFailed(true)}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <h2 className="text-lg font-semibold leading-snug sm:text-xl">{item.title}</h2>
        <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 text-sm">
          {[{ label: SOURCE_LABEL[item.platform], url: item.url }, ...(item.links ?? [])].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#2fae74] hover:underline underline-offset-4"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// A normal link to the original post, so cmd/ctrl-click and no-JS still open it in a new tab.
export function PlayTrigger({
  item,
  className,
  children,
  ...props
}: { item: DevrelItem } & React.ComponentProps<"a">) {
  const open = useContext(PlayerContext);

  return (
    <a
      {...props}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        open(item);
      }}
    >
      {children}
    </a>
  );
}
