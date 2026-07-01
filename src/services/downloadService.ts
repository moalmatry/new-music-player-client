import { Directory, File, Paths } from "expo-file-system";

const offlineDir = new Directory(Paths.document, "offline_tracks");

export const ensureDirExists = async () => {
  if (!offlineDir.exists) {
    offlineDir.create();
  }
};

export const downloadAudioFile = async (
  url: string,
  trackId: string,
): Promise<string | null> => {
  try {
    await ensureDirExists();
    const localFile = new File(offlineDir, `${trackId}.mp3`);

    if (localFile.exists) {
      return localFile.uri;
    }

    const downloadedFile = await File.downloadFileAsync(url, localFile);
    return downloadedFile.uri;
  } catch (error) {
    console.error("Failed to download audio file:", error);
    return null;
  }
};
