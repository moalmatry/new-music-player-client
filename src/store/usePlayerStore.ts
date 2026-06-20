import { create } from 'zustand';
import tracksData from '../data/tracks.json';

export interface Track {
  id: string;
  url: string;
  title: string;
  artist?: string;
  artwork?: string;
  rating?: number;
  playlist?: string[];
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  tracks: tracksData as Track[],
  currentTrack: (tracksData as Track[])[0] || null,
  isPlaying: false,
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    set({ currentTrack: tracks[nextIndex] });
  },
  playPrevious: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    set({ currentTrack: tracks[prevIndex] });
  },
}));

export const usePlayer = () => {
  return usePlayerStore();
};
