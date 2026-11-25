
"use client";

import {
  AudioWaveform,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Headphones,
} from "lucide-react";

import { usePlayerStore } from "@/stores/playerStore";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    shuffle,
    repeat,
    error,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    setProgress,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const handleSeek = (value: number) => {
    const audio = document.getElementById(
      "muse-audio"
    ) as HTMLAudioElement | null;

    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = value;
      setProgress(value);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-[1200px] -translate-x-1/2 sm:bottom-6">

      <div className="rounded-[26px] border border-white/10 bg-[#211c30]/95 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:px-6">

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_1.4fr_1fr]">

          {/* Track Information */}
          <div className="flex min-w-0 items-center gap-3">

            <div
              style={{
                background:
                  currentTrack?.color || "#352e45",
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
            >
              
{currentTrack?.image ? (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={currentTrack.image}
    alt={`${currentTrack.album} artwork`}
    className="h-full w-full rounded-xl object-cover"
  />
) : (
  <AudioWaveform
    size={25}
    className="text-white/80"
  />
)}

            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {currentTrack?.title || "Nothing playing"}
              </p>

              <p className="mt-1 truncate text-xs text-muted">
                {currentTrack?.artist || "Discover your sound"}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col items-center gap-2">

            <div className="flex items-center gap-3 sm:gap-5">

              <button
                type="button"
                aria-label="Shuffle"
                aria-pressed={shuffle}
                onClick={toggleShuffle}
                className={`hidden transition hover:text-primary sm:block ${
                  shuffle ? "text-accent" : "text-muted"
                }`}
              >
                <Shuffle size={17} />
              </button>

              <button
                type="button"
                aria-label="Previous track"
                disabled={!currentTrack}
                onClick={previousTrack}
                className="text-muted transition hover:text-foreground disabled:opacity-40"
              >
                <SkipBack size={21} />
              </button>

              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={!currentTrack}
                onClick={togglePlay}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-background transition hover:scale-105 disabled:opacity-40"
              >
                {isPlaying ? (
                  <Pause size={21} fill="currentColor" />
                ) : (
                  <Play size={21} fill="currentColor" />
                )}
              </button>

              <button
                type="button"
                aria-label="Next track"
                disabled={!currentTrack}
                onClick={nextTrack}
                className="text-muted transition hover:text-foreground disabled:opacity-40"
              >
                <SkipForward size={21} />
              </button>

              <button
                type="button"
                aria-label="Repeat track"
                aria-pressed={repeat}
                onClick={toggleRepeat}
                className={`hidden transition hover:text-primary sm:block ${
                  repeat ? "text-accent" : "text-muted"
                }`}
              >
                <Repeat size={17} />
              </button>

            </div>

            {/* Desktop Progress Bar */}
            <div className="hidden w-full items-center gap-3 md:flex">

              <span className="w-9 text-right text-[11px] text-muted">
                {formatTime(progress)}
              </span>

              <input
                type="range"
                aria-label="Playback progress"
                min={0}
                max={duration || 1}
                step={0.1}
                value={progress}
                disabled={!duration}
                onChange={(event) =>
                  handleSeek(Number(event.target.value))
                }
                className="w-full cursor-pointer accent-primary"
              />

              <span className="w-9 text-[11px] text-muted">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="hidden items-center justify-end gap-3 md:flex">

            <Headphones size={18} className="mr-2 text-muted" />

            <button
              type="button"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
              onClick={() =>
                setVolume(volume === 0 ? 0.75 : 0)
              }
              className="text-muted transition hover:text-foreground"
            >
              {volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

            <input
              type="range"
              aria-label="Volume"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) =>
                setVolume(Number(event.target.value))
              }
              className="w-20 cursor-pointer accent-primary lg:w-28"
            />

          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="mt-3 flex items-center gap-2 md:hidden">

          <span className="text-[10px] text-muted">
            {formatTime(progress)}
          </span>

          <input
            type="range"
            aria-label="Playback progress"
            min={0}
            max={duration || 1}
            step={0.1}
            value={progress}
            disabled={!duration}
            onChange={(event) =>
              handleSeek(Number(event.target.value))
            }
            className="w-full accent-primary"
          />

          <span className="text-[10px] text-muted">
            {formatTime(duration)}
          </span>

        </div>

        {error && (
          <p role="alert" className="mt-2 text-center text-xs text-red-300">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}
