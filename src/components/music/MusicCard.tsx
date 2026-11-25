
import { AudioWaveform } from "lucide-react";
import type { MusicCollection } from "@/types/music";

interface MusicCardProps {
  collection: MusicCollection;
}

export default function MusicCard({
  collection,
}: MusicCardProps) {
  return (
    <article className="group rounded-2xl border border-transparent bg-surface/60 p-3 transition duration-300 hover:border-border hover:bg-surface">

      {/* Collection Artwork */}
      <div
        style={{ background: collection.color }}
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl"
      >
        <div
          aria-hidden="true"
          className="absolute h-3/4 w-3/4 rounded-full border border-white/20"
        />

        <div
          aria-hidden="true"
          className="absolute h-1/2 w-1/2 rounded-full border border-white/20"
        />

        <AudioWaveform
          size={70}
          strokeWidth={1}
          className="text-white/70 transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-3 top-3 text-[10px] font-semibold tracking-widest text-white/80">
          MUSE MIX
        </span>
      </div>

      {/* Collection Information */}
      <div className="px-1 pb-2 pt-4">
        <h3 className="truncate font-display text-lg font-semibold">
          {collection.title}
        </h3>

        <p className="mt-1 text-xs text-primary">
          {collection.genre}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-muted">
          {collection.description}
        </p>
      </div>
    </article>
  );
}
