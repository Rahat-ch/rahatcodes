export type Platform = "youtube" | "x";

export interface DevrelLink {
  label: string;
  url: string;
}

export interface DevrelItem {
  id: string;
  title: string;
  url: string;
  /** Direct MP4 for X posts, played in the modal. */
  videoUrl?: string;
  thumbnail: string;
  platform: Platform;
  date: string;
  duration?: number;
  host?: string;
  series?: string;
  description?: string;
  links?: DevrelLink[];
}

export interface DevrelData {
  livestreams: DevrelItem[];
  demos: DevrelItem[];
  workshops: DevrelItem[];
  tutorials: DevrelItem[];
}
