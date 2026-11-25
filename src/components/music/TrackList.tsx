
"use client";

import { useEffect, useState } from "react";
import {
  AudioWaveform,
  Play,
  Pause,
  Search,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";

import type { Track } from "@/types/music";
import { usePlayerStore } from "@/stores/playerStore";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

export default function TrackList() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTracks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/music?q=${encodeURIComponent(search)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load music."
          );
        }

        if (!controller.signal.aborted) {
          setTracks(data.tracks || []);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        setTracks([]);
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTracks();

    return () => controller.abort();
  }, [search]);

  return (
    <section id="tracks" className="scroll-mt-28 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-widest text-primary">
            THE MUSE SELECTION
          </p>

          <h2 className="font-display text-3xl font-bold">
            {search ? `Results for "${search}"` : "On rotation."}
          </h2>

          <p className="mt-2 text-sm text-muted">
            Discover music from independent artists.
          </p>
        </div>

        <a
          href="https://www.jamendo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-primary"
        >
          Music provided by Jamendo
        </a>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(query.trim());
        }}
        className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3"
      >
        <Search size={21} className="ml-2 text-muted" />

        <input
          type="search"
          aria-label="Search music"
          placeholder="Search songs or artists..."
          value={query}
          maxLength={100}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
        />

        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:brightness-110"
        >
          Search
        </button>
      </form>

      {search && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setSearch("");
          }}
          className="text-sm text-primary hover:underline"
        >
          Show popular tracks
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div
          role="status"
          className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border py-20"
        >
          <LoaderCircle
            size={32}
            className="animate-spin text-primary"
          />

          <p className="text-sm text-muted">
            Finding your next favorite song...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div role="alert" className="rounded-2xl border border-red-400/20 p-6">
          <p className="text-sm text-red-300">
            {error}
          </p>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && tracks.length === 0 && (
        <div className="rounded-3xl border border-border py-16 text-center">
          <p className="text-muted">
            No tracks found. Try another search.
          </p>
        </div>
      )}

      {/* Music List */}
      {!loading && !error && tracks.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-border bg-surface/50">

          {tracks.map((track, index) => {
            const isCurrent = currentTrack?.id === track.id;
            const active = isCurrent && isPlaying;

            return (
              <article
                key={track.id}
                className={`flex items-center gap-4 border-b border-border p-4 transition last:border-b-0 hover:bg-surface-hover ${
                  isCurrent ? "bg-primary/10" : ""
                }`}
              >
                <span className="hidden w-6 text-xs text-muted sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Album Image */}
                <div
                  style={{ background: track.color }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                >
                  {track.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={track.image}
                      alt={`${track.album} artwork`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AudioWaveform size={25} />
                  )}
                </div>

                {/* Track Details */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-sm font-semibold ${
                      isCurrent
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {track.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-muted">
                    {track.artist}
                  </p>

                  <div className="mt-1 flex gap-3">
                    {track.sourceUrl && (
                      <a
                        href={track.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-muted hover:text-primary"
                      >
                        Jamendo
                        <ExternalLink size={10} />
                      </a>
                    )}

                    {track.licenseUrl && (
                      <a
                        href={track.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-muted hover:text-primary"
                      >
                        License
                      </a>
                    )}
                  </div>
                </div>

                <span className="hidden max-w-40 truncate text-sm text-muted lg:block">
                  {track.album}
                </span>

                <span className="hidden w-12 text-right text-xs text-muted sm:block">
                  {formatTime(track.duration || 0)}
                </span>

                {/* Play Button */}
                <button
                  type="button"
                  aria-label={`${active ? "Pause" : "Play"} ${track.title}`}
                  onClick={() => {
                    if (isCurrent) {
                      togglePlay();
                    } else {
                      playTrack(track, tracks);
                    }
                  }}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:scale-105 ${
                    active
                      ? "bg-accent text-background"
                      : "bg-background hover:bg-primary hover:text-background"
                  }`}
                >
                  {active ? (
                    <Pause size={19} fill="currentColor" />
                  ) : (
                    <Play size={19} fill="currentColor" />
                  )}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
