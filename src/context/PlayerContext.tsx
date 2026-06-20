import React, { createContext, useContext, useState, useEffect } from 'react';
import tracksData from '../data/tracks.json';

export interface Track {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [tracks] = useState<Track[]>(tracksData as Track[]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Set default track to the first track when initialized
  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks, currentTrack]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        tracks,
        playTrack,
        togglePlay,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
