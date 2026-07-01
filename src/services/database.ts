import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("music_player.db");

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS offline_tracks (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      artist TEXT,
      artwork TEXT,
      localUri TEXT NOT NULL
    );
  `);
};

export const saveTrackOffline = (track: Track, localUri: string) => {
  db.runSync(
    `INSERT OR REPLACE INTO offline_tracks (id, url, title, artist, artwork, localUri) VALUES (?, ?, ?, ?, ?, ?);`,
    [
      track.id,
      track.url,
      track.title,
      track.artist || null,
      track.artwork || null,
      localUri,
    ]
  );
};

export const getOfflineTracks = (): Track[] => {
  const rows = db.getAllSync<{
    id: string;
    url: string;
    title: string;
    artist: string | null;
    artwork: string | null;
    localUri: string;
  }>("SELECT * FROM offline_tracks;");

  return rows.map((row) => ({
    id: row.id,
    url: row.localUri,
    title: row.title,
    artist: row.artist || undefined,
    artwork: row.artwork || undefined,
  }));
};
