import { AudioPlayer, createAudioPlayer } from "expo-audio";
import { create } from "zustand";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  player: AudioPlayer | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;

  playTrack: (track: Track) => void;
  loadPlaylist: (playlist: Track[], startIndex?: number) => void;
  togglePlayPause: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  currentIndex: -1,
  player: null,
  isPlaying: false,
  volume: 1.0,
  isMuted: false,

  playTrack: (track) => {
    const { player, volume, isMuted } = get();

    if (player) {
      player.pause();
      player.remove();
    }

    const newPlayer = createAudioPlayer(track.url);
    newPlayer.volume = volume;
    newPlayer.muted = isMuted;
    newPlayer.play();

    set({
      currentTrack: track,
      player: newPlayer,
      isPlaying: true,
      queue: [track],
      currentIndex: 0,
    });
  },

  loadPlaylist: (playlist, startIndex = 0) => {
    const { player, volume, isMuted } = get();

    if (player) {
      player.pause();
      player.remove();
    }

    const track = playlist[startIndex];
    if (!track) return;

    const newPlayer = createAudioPlayer(track.url);
    newPlayer.volume = volume;
    newPlayer.muted = isMuted;
    newPlayer.play();

    set({
      queue: playlist,
      currentIndex: startIndex,
      currentTrack: track,
      player: newPlayer,
      isPlaying: true,
    });
  },

  togglePlayPause: () => {
    const { player, isPlaying } = get();
    if (!player) return;

    if (isPlaying) {
      player.pause();
      set({ isPlaying: false });
    } else {
      player.play();
      set({ isPlaying: true });
    }
  },

  skipToNext: () => {
    const { queue, currentIndex, loadPlaylist } = get();

    if (queue.length === 0) return;

    const isLastTrack = currentIndex === queue.length - 1;
    const nextIndex = isLastTrack ? 0 : currentIndex + 1;

    loadPlaylist(queue, nextIndex);
  },

  // --- التعديل الجديد هنا ---
  skipToPrevious: () => {
    const { queue, currentIndex, loadPlaylist } = get();

    if (queue.length === 0) return;

    const isFirstTrack = currentIndex === 0;
    const previousIndex = isFirstTrack ? queue.length - 1 : currentIndex - 1;

    loadPlaylist(queue, previousIndex);
  },

  setVolume: (value) => {
    const { player, isMuted } = get();
    const normalizedValue = Math.max(0, Math.min(1, value));

    if (player) {
      player.volume = normalizedValue;
      if (normalizedValue > 0 && isMuted) {
        player.muted = false;
        set({ isMuted: false });
      }
    }
    set({ volume: normalizedValue });
  },

  toggleMute: () => {
    const { player, isMuted } = get();
    const newMutedState = !isMuted;

    if (player) {
      player.muted = newMutedState;
    }
    set({ isMuted: newMutedState });
  },
}));
