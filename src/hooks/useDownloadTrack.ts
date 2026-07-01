import { useState } from "react";
import { Alert } from "react-native";

import { saveTrackOffline } from "@/services/database";
import { downloadAudioFile } from "@/services/downloadService";

export function useDownloadTrack() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTrack = async (track: Track) => {
    setIsDownloading(true);
    try {
      const localUri = await downloadAudioFile(track.url, track.id);
      if (localUri) {
        saveTrackOffline(track, localUri);
        Alert.alert("Success", `"${track.title}" has been saved offline.`);
      } else {
        Alert.alert("Error", `Failed to download "${track.title}".`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        `An error occurred while downloading "${track.title}".`,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadTrack, isDownloading };
}
