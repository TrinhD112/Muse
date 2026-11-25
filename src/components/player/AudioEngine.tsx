
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/playerStore";

export default function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const volume = usePlayerStore((s) => s.volume);
  const repeat = usePlayerStore((s) => s.repeat);

  const setProgress = usePlayerStore((s) => s.setProgress);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const setError = usePlayerStore((s) => s.setError);
  const nextTrack = usePlayerStore((s) => s.nextTrack);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioUrl;
    audio.load();
    setProgress(0);
    setDuration(0);
  }, [currentTrack, setProgress, setDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      let active = true;

      audio.play().catch((error) => {
        if (!active || error.name === "AbortError") return;

        setIsPlaying(false);
        setError("Unable to play this track. Check the audio file.");
      });

      return () => {
        active = false;
      };
    }

    audio.pause();
  }, [isPlaying, currentTrack, setIsPlaying, setError]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeat;
    }
  }, [repeat]);

  return (
    <audio
      ref={audioRef}
      id="muse-audio"
      preload="metadata"
      onTimeUpdate={() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      }}
      onLoadedMetadata={() => {
        const duration = audioRef.current?.duration ?? 0;

        setDuration(Number.isFinite(duration) ? duration : 0);
      }}
      onEnded={() => {
        const { queue, currentTrack } = usePlayerStore.getState();

        if (queue.length === 1 && currentTrack) {
          setIsPlaying(false);
        } else {
          nextTrack();
        }
      }}
      onError={() => {
  const { currentTrack } = usePlayerStore.getState();

  if (!currentTrack) return;

  setIsPlaying(false);

  setError(
    `"${currentTrack.title}" is currently unavailable. Please try another track.`
  );
}}
    />
  );
}
