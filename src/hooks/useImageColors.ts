import { useEffect, useState } from 'react';
import ImageColors from 'react-native-image-colors';

export interface ThemeColors {
  background: string;
  text: string;
}

export const useImageColors = (imageUrl: string, fallbackColor: string = '#1C1C1E') => {
  const [colors, setColors] = useState<ThemeColors>({
    background: fallbackColor,
    text: '#000000',
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    const fetchColors = async () => {
      try {
        setLoading(true);
        const result = await ImageColors.getColors(imageUrl, {
          fallback: fallbackColor,
          cache: true,
          key: imageUrl,
        });

        switch (result.platform) {
          case 'android':
            setColors({
              background: result.darkVibrant || fallbackColor,
              text: result.lightMuted || '#000000',
            });
            break;
          case 'ios':
            setColors({
              background: result.background || fallbackColor,
              text: result.primary || '#000000',
            });
            break;
          default:
            setColors({
              background: result.dominant || fallbackColor,
              text: '#000000',
            });
            break;
        }
      } catch (error) {
        console.error('Error fetching image colors:', error);
        setColors({ background: fallbackColor, text: '#000000' });
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [imageUrl, fallbackColor]);

  return { imageColors: colors, isLoadingImageColors: loading };
};
