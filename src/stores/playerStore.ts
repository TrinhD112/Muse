
import { create } from "zustand";
import type { Track } from "@/types/music";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: boolean;
  error: string | null;

  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setError: (error: string | null) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.75,
  progress: 0,
  duration: 0,
  shuffle: false,
  repeat: false,
  error: null,

  playTrack: (track, queue) => {
    set({
      currentTrack: track,
      queue: queue?.length ? queue : [track],
      isPlaying: true,
      progress: 0,
      duration: 0,
      error: null,
    });
  },

  togglePlay: () => {
    if (!get().currentTrack) return;

    set((state) => ({
      isPlaying: !state.isPlaying,
    }));
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setVolume: (volume) =>
    set({ volume: Math.min(1, Math.max(0, volume)) }),

  setProgress: (progress) => set({ progress }),

  setDuration: (duration) => set({ duration }),

  setError: (error) => set({ error }),

  toggleShuffle: () =>
    set((state) => ({
      shuffle: !state.shuffle,
    })),

  toggleRepeat: () =>
    set((state) => ({
      repeat: !state.repeat,
    })),

  nextTrack: () => {
    const { queue, currentTrack, shuffle } = get();

    if (!queue.length || !currentTrack) return;

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );

    let nextIndex = (currentIndex + 1) % queue.length;

    if (shuffle && queue.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex);
    }

    get().playTrack(queue[nextIndex], queue);
  },

  previousTrack: () => {
    const { queue, currentTrack } = get();

    if (!queue.length || !currentTrack) return;

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );

    const previousIndex =
      (currentIndex - 1 + queue.length) % queue.length;

    get().playTrack(queue[previousIndex], queue);
  },
}));
